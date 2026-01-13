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
		if (cat !== "all") params.set("category", cat);
		if (subCat) params.set("subCategory", subCat);
		
		router.push(`/news?${params.toString()}`, { scroll: false });
	}, [router]);

	// Initialize UI categories
	useEffect(() => {
		if (Array.isArray(initialCategories)) {
			const uiCats = mapToUICategories(
				initialCategories,
				(initialPosts || []).map((p) => ({
					categoryId: (p as any)?.category?.id,
				}))
			);
			setCategories(uiCats);
		}
	}, [initialCategories, initialPosts]);

	// Handle filter changes
	const handleSearchChange = (term: string) => {
		setSearchTerm(term);
		updateUrl(term, selectedCategory, selectedSubCategory);
	};

	const handleCategoryChange = (cat: string) => {
		setSelectedCategory(cat);
		setSelectedSubCategory(null); // Reset subcategory when main category changes
		updateUrl(searchTerm, cat, null);
	};

	const handleSubCategoryChange = (subCat: string | null) => {
		setSelectedSubCategory(subCat);
		updateUrl(searchTerm, selectedCategory, subCat);
	};

	// Reset pagination when filters change (triggered by URL or state change)
	useEffect(() => {
		// Skip initial load if data matches
		if (searchTerm === initialSearch && selectedCategory === initialCategory && selectedSubCategory === initialSubCategory && page === 1) {
			return;
		}

		const resetPagination = async () => {
			setLoading(true);
			setPage(1);
			setPosts([]);
			
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
				params.categoryId = selectedSubCategory || selectedCategory;
			}

			const postRes = await listBlogsService(params);
			
			if (postRes.status_code === 200 && postRes.data?.data) {
				setPosts(postRes.data.data);
				setTotalPages(postRes.data.totalPages || 1);
				setHasMore((postRes.data.page || 1) < (postRes.data.totalPages || 1));
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
									onSearchChange={handleSearchChange}
									categories={categories as any}
									selectedCategory={selectedCategory}
									onCategoryChange={handleCategoryChange}
									selectedSubCategory={selectedSubCategory}
									onSubCategoryChange={handleSubCategoryChange}
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
