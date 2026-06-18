"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";

import { AnimatedSection } from "@/components/ui/animated-section";
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

		window.history.pushState(null, "", `/news?${params.toString()}`);
	}, []);

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

        setSearchTerm(newTerm);
        setSelectedCategory(newCategory);
        setSelectedSubCategory(newSubCategory);

		updateUrl(newTerm, newCategory, newSubCategory);
	};

    // React to URL changes and Categories loading
    useEffect(() => {
        const rawCat = searchParams.get("category");
        const rawSubCat = searchParams.get("subCategory");
        const q = searchParams.get("q") || "";

        const { cat, sub } = getCategoryStateFromUrl(rawCat, rawSubCat);

        setSelectedCategory(prev => prev !== cat ? cat : prev);
        setSelectedSubCategory(prev => prev !== sub ? sub : prev);
        setSearchTerm(prev => prev !== q ? q : prev);
    }, [searchParams, categories, getCategoryStateFromUrl]);

	const isMounted = useRef(false);

	// Fetch data when filters change
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		setLoading(true);
		const resetPagination = async () => {
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

	const loadMoreRef = useRef(loadMorePosts);
	useEffect(() => {
		loadMoreRef.current = loadMorePosts;
	}, [loadMorePosts]);

	// Intersection Observer
	useEffect(() => {
		const currentTarget = observerTarget.current;
		if (!currentTarget) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreRef.current();
				}
			},
			{ threshold: 0.1, rootMargin: "100px" }
		);

		observer.observe(currentTarget);

		return () => {
			observer.disconnect();
		};
	}, []);

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

	// Parse the category description to extract stats from the first <ul>
	const categoryContent = useMemo(() => {
		const html = activeCategoryForBanner?.description_en || "";
		if (!html) return { html: "", stats: [] };
		
		const ulMatch = html.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
		const stats: Array<{ label: string; value: string }> = [];
		let modifiedHtml = html;
		
		if (ulMatch) {
			const liMatches = ulMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
			if (liMatches) {
				liMatches.forEach(li => {
					// Strip HTML tags and decode basic entities manually
					const text = li.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
					if (!text) return;

					if (text.includes(':')) {
						const [label, ...valParts] = text.split(':');
						stats.push({ label: label.trim(), value: valParts.join(':').trim() });
					} else {
						// Try to extract the first number as the value
						const numMatch = text.match(/(\d+[\d,.]*[kKmMbB]?)/);
						if (numMatch) {
							const val = numMatch[1];
							const label = text.replace(val, '').trim();
							stats.push({ label, value: val });
						} else {
							stats.push({ label: text, value: '' });
						}
					}
				});
				// Remove the matched ul from HTML
				modifiedHtml = html.replace(ulMatch[0], '');
			}
		}
		
		return { html: modifiedHtml, stats };
	}, [activeCategoryForBanner]);

	return (
		<>

			{featuredNews.length > 0 && (
				<section className="section-padding bg-white">
					<div className="container">
							<AnimatedSection>
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
									{t("events.featuredNews")}
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
										<div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
											<div className="relative z-10 p-6 md:p-8 lg:p-10">
												{/* Header row */}
												<div className="flex items-start gap-4 mb-6">
													<div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
														<BookOpen className="w-6 h-6" />
													</div>
													<div>
														<h3 className="text-heading-4">
															{activeCategoryForBanner.name_en}
														</h3>
														<p className="text-body-sm text-gray-500 mt-1">
															{t("events.categoryOverview")}
														</p>
													</div>
												</div>

												{/* Dynamic Stats Row (Extracted from Description) */}
												{categoryContent.stats.length > 0 && (
												  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
												    {categoryContent.stats.map((stat, i) => (
												      <div
												        key={i}
												        className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col items-center justify-center text-center
												          relative overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
												          before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-500 before:to-blue-400 before:rounded-t-2xl"
												      >
												        <span className="text-heading-3 mb-1">
												          {stat.value}
												        </span>
												        <span className="text-caption font-semibold text-gray-400">
												          {stat.label}
												        </span>
												      </div>
												    ))}
												  </div>
												)}

												<hr className="border-gray-100 mb-6" />

												<div
												  className="max-w-none text-gray-600 text-sm md:text-base leading-relaxed
												  [&_h1]:font-serif [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3
												  [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:pl-3 [&_h2]:border-l-[3px] [&_h2]:border-blue-500
												  [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-4 [&_h3]:mb-2
												  [&_p]:mb-3 [&_p]:leading-relaxed
												  [&_strong]:text-gray-900 [&_strong]:font-semibold
												  [&_em]:italic [&_em]:text-gray-500
												  [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-800
												  [&_ul]:list-none [&_ul]:pl-4 [&_ul]:my-3
												  [&_ul_li]:relative [&_ul_li]:pl-4 [&_ul_li]:mb-2 [&_ul_li]:before:content-[''] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-[0.6em] [&_ul_li]:before:w-1.5 [&_ul_li]:before:h-1.5 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-blue-400
												  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_ol]:marker:text-blue-400
												  [&_li]:mb-1.5 [&_li]:leading-relaxed
												  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:bg-blue-50/50 [&_blockquote]:py-2 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-4
												  [&_img]:rounded-xl [&_img]:my-4 [&_img]:max-w-full [&_img]:shadow-sm
												  [&_pre]:bg-gray-50 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4
												  [&_code]:bg-gray-100 [&_code]:text-gray-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm
												  [&_table]:w-full [&_table]:my-4 [&_th]:text-left [&_th]:text-gray-900 [&_th]:font-semibold [&_th]:pb-2 [&_th]:px-3 [&_th]:border-b-2 [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-gray-100
												  [&_hr]:border-gray-100 [&_hr]:my-6"
												  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(categoryContent.html) }}
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
		</>
	);
}
