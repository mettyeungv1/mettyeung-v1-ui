"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";

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
import { BookOpen } from "lucide-react";

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

	// Initialize categories from server data
	useEffect(() => {
		if (initialCategories && initialCategories.length > 0) {
			const uiCats = mapToUICategories(initialCategories, initialPosts as any);
			setCategories(uiCats);
		}
	}, [initialCategories]);

	// Update URL when filters change
	const updateUrl = useCallback((term: string, cat: string, subCat: string | null) => {
		const params = new URLSearchParams();
		if (term) params.set("q", term);

        const activeId = subCat || cat;
		if (activeId !== "all") params.set("category", activeId);

		router.push(`/news?${params.toString()}`, { scroll: false });
	}, [router]);

    const getCategoryStateFromUrl = useCallback((catParam: string | null, subCatParam: string | null) => {
        if (!catParam || catParam === "all") return { cat: "all", sub: null };
        if (subCatParam) return { cat: catParam, sub: subCatParam };

        if (categories.length > 0) {
             const topLevel = categories.find(c => c.id === catParam);
             if (topLevel) return { cat: catParam, sub: null };

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
        let newCategory = updates.category !== undefined ? updates.category : selectedCategory;
        let newSubCategory = updates.subCategory !== undefined ? updates.subCategory : selectedSubCategory;

        if (updates.category !== undefined && updates.category !== selectedCategory && updates.subCategory === undefined) {
            newSubCategory = null;
        }

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

	// Fetch data when filters change
	useEffect(() => {
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

	// Derive the active category for the description banner
	const activeCategoryForBanner = useMemo(() => {
		if (selectedCategory === "all") return null;
		const cat = categories.find((c) => c.id === selectedCategory);
		if (!cat?.description_en) return null;
		return cat;
	}, [selectedCategory, categories]);

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
									onSearchChange={(term) => handleFilterChange({ term })}
									categories={categories as any}
									selectedCategory={selectedCategory}
									onCategoryChange={(cat) => handleFilterChange({ category: cat })}
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
							{/* ── Category Description Banner ── */}
							<AnimatePresence mode="wait">
								{activeCategoryForBanner && (
									<motion.div
										key={activeCategoryForBanner.id}
										initial={{ opacity: 0, y: -12 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -12 }}
										transition={{ duration: 0.35, ease: "easeOut" }}
										className="mb-8"
									>
										<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-600/15">
											{/* Decorative blurs */}
											<div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
											<div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

											<div className="relative z-10 p-6 md:p-8 lg:p-10">
												{/* Header row */}
												<div className="flex items-start gap-4 mb-5">
													<div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/10">
														<BookOpen className="w-5 h-5 text-white" />
													</div>
													<div>
														<h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
															{activeCategoryForBanner.name_en}
														</h3>
														<p className="text-sm text-blue-200/80 mt-0.5">
															Category Overview
														</p>
													</div>
												</div>

												{/* Divider */}
												<div className="h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent mb-5" />

												{/* Rich-text HTML content — styled without @tailwindcss/typography */}
												<div
													className="max-w-none text-blue-50/90 text-sm md:text-base leading-relaxed
													[&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3
													[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-2
													[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2
													[&_p]:mb-3 [&_p]:leading-relaxed
													[&_strong]:text-white [&_strong]:font-semibold
													[&_em]:italic
													[&_a]:text-blue-200 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white
													[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ul]:marker:text-blue-300/60
													[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_ol]:marker:text-blue-300/60
													[&_li]:mb-1.5 [&_li]:leading-relaxed
													[&_blockquote]:border-l-4 [&_blockquote]:border-blue-300/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-blue-100/80 [&_blockquote]:my-4
													[&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full
													[&_pre]:bg-black/20 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4
													[&_code]:bg-black/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
													[&_table]:w-full [&_table]:my-4 [&_th]:text-left [&_th]:text-white [&_th]:pb-2 [&_th]:border-b [&_th]:border-white/20 [&_td]:py-2 [&_td]:border-b [&_td]:border-white/10
													[&_hr]:border-white/20 [&_hr]:my-6"
													dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeCategoryForBanner.description_en!) }}
												/>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

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
