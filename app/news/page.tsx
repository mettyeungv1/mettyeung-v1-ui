"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

import { newsData, categories } from "@/lib/data/news";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageHero } from "@/components/gallery/page-hero";
import { NewsFilterSidebar } from "@/components/news/new-filter-sidebar";
import { NewsGrid } from "@/components/news/news-grid";
import { NewsCard } from "@/components/news/news-card";
// import { FeaturedNewsSection } from "@/components/news/FeaturedNewsSection"; // Assume this is created similarly

export default function NewsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const { t } = useTranslation();
	const router = useRouter();

	const handleArticleClick = (id: number) => {
		// Correctly navigate to the detail page
		router.push(`/news/${id}`);
	};

	// Memoize all derived data for better performance
	const { filteredNews, featuredNews, recentNews } = useMemo(() => {
		let filtered = newsData.filter(
			(item) =>
				item.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(item) => item.category.name === selectedCategory
			);
		}

		const featured = newsData.filter((item) => item.featured);
		const recent = newsData
			.filter((item) => !item.featured)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 4);

		return {
			filteredNews: filtered,
			featuredNews: featured,
			recentNews: recent,
		};
	}, [searchTerm, selectedCategory]);

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero
				title={t("nav.news")}
				subtitle="ស្វែងយល់ពីសកម្មភាព និងព្រឹត្តិការណ៍ចុងក្រោយរបស់យើង"
			/>

			{/* Render the dedicated Featured News Section */}
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
									<NewsCard item={item} onClick={handleArticleClick} />
								</AnimatedSection>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Main Content Area */}
			<section className="section-padding">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							<AnimatedSection>
								<NewsFilterSidebar
									searchTerm={searchTerm}
									onSearchChange={setSearchTerm}
									categories={categories}
									selectedCategory={selectedCategory}
									onCategoryChange={setSelectedCategory}
									recentNews={recentNews}
									onRecentNewsClick={handleArticleClick}
								/>
							</AnimatedSection>
						</div>

						{/* News Grid */}
						<div className="lg:col-span-3">
							<AnimatedSection>
								<NewsGrid
									items={filteredNews}
									categories={categories}
									onCardClick={handleArticleClick}
								/>
							</AnimatedSection>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
