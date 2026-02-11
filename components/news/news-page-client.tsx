"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

import { AnimatedSection } from "@/components/ui/animated-section";
import { PageHero } from "@/components/gallery/page-hero";
import { NewsFilterSidebar } from "@/components/news/new-filter-sidebar";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsCard } from "@/components/news/news-card";
import { listBlogsService } from "@/service/blog/blog-service";
import {
	mapToUICategories,
	UICategory,
} from "@/service/category/category-service";
import type { BlogPost } from "@/lib/types/blog";

const POSTS_PER_PAGE = 12;

interface NewsPageClientProps {
	initialPosts: BlogPost[];
	initialCategories: any[]; // Raw categories from API
	initialTotalPages: number;
}

export function NewsPageClient({
	initialPosts,
	initialCategories,
	initialTotalPages,
}: NewsPageClientProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get initial state from URL or props
	const initialSearch = searchParams.get("q") || "";
	const initialCategory = searchParams.get("category") || "all";
	const initialSubCategory = searchParams.get("subCategory") || null;

	const [searchTerm, setSearchTerm] = useState(initialSearch);
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);
	const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(initialSubCategory);
	
	const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
	const [categories, setCategories] = useState<UICategory[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(1 < initialTotalPages);
	const [totalPages, setTotalPages] = useState(initialTotalPages);
	const observerTarget = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	const handleArticleClick = (id: number | string) => {
		router.push(`/news/${id}`);
	};

	// Update URL when filters change
	const updateUrl = useCallback((term: string, cat: string, subCat: string | null) => {
		const params = new URLSearchParams();
		if (term) params.set("q", term);
		
        // Simplification: Always use 'category' param for the active ID.
        // If it's a subcategory, we put that ID here.
        // The getCategoryStateFromUrl logic will resolve the parent/child relationship on load.
        const activeId = subCat || cat;
		if (activeId !== "all") params.set("category", activeId);
		
		router.push(`/news?${params.toString()}`, { scroll: false });
	}, [router]);

	// ... categories init ...

    const getCategoryStateFromUrl = useCallback((catParam: string | null, subCatParam: string | null) => {
        if (!catParam || catParam === "all") return { cat: "all", sub: null };
        if (subCatParam) return { cat: catParam, sub: subCatParam };

        // If only catParam is provided, check if it's actually a subcategory ID
        if (categories.length > 0) {
             // Check if it's a top-level category
             const topLevel = categories.find(c => c.id === catParam);
             if (topLevel) return { cat: catParam, sub: null };

             // Check if it's a subcategory
             for (const c of categories) {
                 if (c.subcategories?.find(s => s.id === catParam)) {
                     return { cat: c.id, sub: catParam };
                 }
             }
        }
        
        return { cat: catParam, sub: null };
    }, [categories]);

	// Atomic filter change handler
    const handleFilterChange = (updates: {
		term?: string;
		category?: string;
		subCategory?: string | null;
	}) => {
        const newTerm = updates.term !== undefined ? updates.term : searchTerm;
        // Logic: if category changes, subCategory usually resets to null unless specified
        let newCategory = updates.category !== undefined ? updates.category : selectedCategory;
        let newSubCategory = updates.subCategory !== undefined ? updates.subCategory : selectedSubCategory;

        // If category explicitly changed to something else, and subCategory wasn't specified, reset sub
        if (updates.category !== undefined && updates.category !== selectedCategory && updates.subCategory === undefined) {
            newSubCategory = null;
        }

        // Optimistic State Update (Optional/Redundant since URL effect will do it, but good for responsiveness)
        // Actually, let's let the URL effect drive the state to ensure single source of truth.
        // But we can update local state to generic instant feedback if needed. 
        // For now, relying on URL effect is safer for consistency.

		updateUrl(newTerm, newCategory, newSubCategory);
	};

    // React to URL changes and Categories loading
    useEffect(() => {
        const rawCat = searchParams.get("category");
        const rawSubCat = searchParams.get("subCategory");
        const q = searchParams.get("q") || "";

        const { cat, sub } = getCategoryStateFromUrl(rawCat, rawSubCat);

        setSelectedCategory(cat);
        setSelectedSubCategory(sub);
        setSearchTerm(q);
    }, [searchParams, categories, getCategoryStateFromUrl]);

	// Fetch data when filters change (triggered by state changes synced with URL)
	useEffect(() => {
		// Skip initial load if data matches
		// Note: removed standard equality check to rely on more robust logic if needed, 
        // but for now, we just want to ensure we fetch if the URL implies different data than initial.
        
		const resetPagination = async () => {
			setLoading(true);
			setPage(1);
			setPosts([]);
             // ... rest of logic ...
			
			const startTime = Date.now();

			const params: any = { 
				sort: "-publishedAt", 
				limit: POSTS_PER_PAGE, 
				page: 1 
			};
			
			if (searchTerm) {
				params.q = searchTerm;
			}
			
			if (selectedCategory !== "all") {
				// Use the specific ID if subcategory is selected, else main category
				params.categoryId = selectedSubCategory || selectedCategory;
			}

            console.log("Fetching posts with params:", params);
			const postRes = await listBlogsService(params);
			
			if (postRes.status_code === 200 && postRes.data?.data) {
				setPosts(postRes.data.data);
				setTotalPages(postRes.data.totalPages || 1);
				setHasMore((postRes.data.page || 1) < (postRes.data.totalPages || 1));
			} else {
                setPosts([]);
            }
			
			const elapsed = Date.now() - startTime;
			const remaining = Math.max(0, 500 - elapsed);
			setTimeout(() => {
				setLoading(false);
			}, remaining);
		};

		const timeoutId = setTimeout(() => {
			resetPagination();
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchTerm, selectedCategory, selectedSubCategory]);

	// Load more posts
	const loadMorePosts = useCallback(async () => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);
		const nextPage = page + 1;

		const params: any = { 
			sort: "-publishedAt", 
			limit: POSTS_PER_PAGE, 
			page: nextPage 
		};
		
		if (searchTerm) {
			params.q = searchTerm;
		}
		
		if (selectedCategory !== "all") {
			params.categoryId = selectedSubCategory || selectedCategory;
		}

		const postRes = await listBlogsService(params);

		if (postRes.status_code === 200 && postRes.data?.data) {
			setPosts((prev) => [...prev, ...postRes.data.data]);
			setPage(nextPage);
			setHasMore(nextPage < (postRes.data.totalPages || 1));
		}
		setLoadingMore(false);
	}, [loadingMore, hasMore, page, searchTerm, selectedCategory, selectedSubCategory]);

	// Intersection Observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
					loadMorePosts();
				}
			},
			{ threshold: 0.1 }
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [hasMore, loadingMore, loading, loadMorePosts]);

	const normalized = useMemo(() => {
		const items = posts.map((p) => ({
			id: p.id as unknown as number,
			title: p.title,
			title_en:
				typeof p.title === "string" ? p.title : (p.title as any)?.en || "",
			excerpt: p.excerpt,
			date: (p.publishedAt || p.createdAt) as any,
			image: p.coverImageUrl || p.media[0]?.url || "/placeholder.jpg",
			views: p.readCounts || 0,
			author: { name_en: p.author?.name || "" },
			category: {
				id: (p as any)?.category?.id || "all",
				name_en:
					typeof (p as any)?.category?.name === "string"
						? (p as any)?.category?.name
						: (p as any)?.category?.name?.en || "",
				subCategory: undefined as any,
			},
			featured: p.isFeatured,
			readTime: p.readTimes || 0,
			comments: p.commentsCount || 0,
			tags: [],
			gallery: (p.media || []).map((m) => ({
				url: m.url,
				caption: m.altText || "",
			})),
		}));

		const featured = items.filter((i) => i.featured);
		const recent = items
			.filter((i) => !i.featured)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 4);

		return {
			filteredNews: items,
			featuredNews: featured,
			recentNews: recent,
		};
	}, [posts]);

	const { filteredNews, featuredNews, recentNews } = normalized;

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero title={t("nav.news")} subtitle={t("events.heroDescription")} />

			{featuredNews.length > 0 && (
				<section className="section-padding bg-white">
					<div className="container">
						<AnimatedSection>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
								Featured News
							</h2>
						</AnimatedSection>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredNews.map((item) => (
								<AnimatedSection key={item.id}>
									<NewsCard
										item={item as any}
										onClick={(nid) => handleArticleClick(String(nid))}
									/>
								</AnimatedSection>
							))}
						</div>
					</div>
				</section>
			)}

			<section className="section-padding">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							<AnimatedSection>
								<NewsFilterSidebar
									searchTerm={searchTerm}
                                    // Adapter for backward compatibility or direct usage
									onSearchChange={(term) => handleFilterChange({ term })}
									categories={categories as any}
									selectedCategory={selectedCategory}
                                    // Pass standard handlers that use the new logic if the component still calls them, 
                                    // but we will update the component to use onFilterChange preferably.
                                    // For now, let's keep the props broadly compatible but backed by new logic
									onCategoryChange={(cat) => handleFilterChange({ category: cat })}
                                    // Special case: subcategory change logic is handled inside handleFilterChange (resetting logic)
									selectedSubCategory={selectedSubCategory}
									onSubCategoryChange={(sub) => handleFilterChange({ subCategory: sub })}
                                    onFilterChange={handleFilterChange}
									recentNews={recentNews as any}
									onRecentNewsClick={handleArticleClick}
								/>
							</AnimatedSection>
						</div>

						{/* News Grid */}
						<div className="lg:col-span-3">
							<AnimatedSection>
								<NewsGrid
									items={filteredNews as any}
									categories={categories as any}
									onCardClick={(nid) => handleArticleClick(String(nid))}
									loadingMore={loadingMore}
									hasMore={hasMore}
									loading={loading && page === 1}
								/>
							</AnimatedSection>
							{/* Intersection Observer Target */}
							<div ref={observerTarget} className="h-10" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
