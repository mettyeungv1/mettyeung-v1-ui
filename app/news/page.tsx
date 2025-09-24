"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

import { AnimatedSection } from "@/components/ui/animated-section";
import { PageHero } from "@/components/gallery/page-hero";
import { NewsFilterSidebar } from "@/components/news/new-filter-sidebar";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsCard } from "@/components/news/news-card";
import { listBlogsService } from "@/service/blog/blog-service";
import type { BlogPost } from "@/lib/types/blog";

export default function NewsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
		null
	);
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const router = useRouter();

	const handleArticleClick = (id: number | string) => {
		router.push(`/news/${id}`);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			const res = await listBlogsService({ sort: "-createdAt", limit: 24 });
			if (res.status_code === 200 && res.data?.data) {
				setPosts(res.data.data);
			}
			setLoading(false);
		})();
	}, []);

	const normalized = useMemo(() => {
		const items = posts.map((p) => ({
			id: p.id as unknown as number,
			title_en:
				typeof p.title === "string" ? p.title : (p.title as any)?.en || "",
			excerpt: "",
			date: (p.publishedAt || p.createdAt) as any,
			image: p.coverImageUrl || p.media[0]?.url || "/placeholder.jpg",
			views: p.readCounts || 0,
			author: { name_en: p.author?.name || "" },
			category: { id: "all", name_en: "", subCategory: undefined },
			featured: p.isFeatured,
			readTime: p.readTimes || 0,
			comments: p.commentsCount || 0,
			tags: [],
			gallery: (p.media || []).map((m) => ({
				url: m.url,
				caption: m.altText || "",
			})),
		}));

		let filtered = items;
		if (selectedCategory !== "all") {
			filtered = filtered.filter((_) => true);
			if (selectedSubCategory) filtered = filtered.filter((_) => true);
		}

		if (searchTerm) {
			const q = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(i) =>
					i.title_en.toLowerCase().includes(q) ||
					i.excerpt.toLowerCase().includes(q)
			);
		}

		const featured = items.filter((i) => i.featured);
		const recent = items
			.filter((i) => !i.featured)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 4);

		return {
			filteredNews: filtered,
			featuredNews: featured,
			recentNews: recent,
		};
	}, [posts, searchTerm, selectedCategory, selectedSubCategory]);

	if (loading) {
		return <div className="min-h-screen bg-gray-50" />;
	}

	const { filteredNews, featuredNews, recentNews } = normalized;

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero
				title={t("nav.news")}
				subtitle="ស្វែងយល់ពីសកម្មភាព និងព្រឹត្តិការណ៍ចុងក្រោយរបស់យើង"
			/>

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
									onSearchChange={setSearchTerm}
									categories={[]}
									selectedCategory={selectedCategory}
									onCategoryChange={setSelectedCategory}
									selectedSubCategory={selectedSubCategory}
									onSubCategoryChange={setSelectedSubCategory}
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
									categories={[]}
									onCardClick={(nid) => handleArticleClick(String(nid))}
								/>
							</AnimatedSection>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
