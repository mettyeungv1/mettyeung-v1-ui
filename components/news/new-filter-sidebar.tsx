"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

interface NewsFilterSidebarProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	categories: NewsCategory[];
	selectedCategory: string;
	onCategoryChange: (id: string) => void;
	selectedSubCategory: string | null;
	onSubCategoryChange: (id: string | null) => void;
    onFilterChange?: (updates: { category?: string; subCategory?: string | null }) => void;
	recentNews: NewsArticle[];
	onRecentNewsClick: (id: string) => void;
}

export function NewsFilterSidebar({
	searchTerm,
	onSearchChange,
	categories,
	selectedCategory,
	onCategoryChange,
	selectedSubCategory,
	onSubCategoryChange,
    onFilterChange,
	recentNews,
	onRecentNewsClick,
}: NewsFilterSidebarProps) {
	const { t } = useTranslation();
	// State to manage which categories are visually expanded
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Sync expanded state with selected category
    React.useEffect(() => {
        if (selectedCategory && selectedCategory !== "all") {
             setExpandedCategories(prev => prev.includes(selectedCategory) ? prev : [...prev, selectedCategory]);
        }
    }, [selectedCategory]);

	const handleCategoryClick = (categoryId: string) => {
		const isAlreadySelected = selectedCategory === categoryId;

        if (onFilterChange) {
            onFilterChange({
                category: isAlreadySelected ? "all" : categoryId,
                subCategory: null // Reset sub
            });
        } else {
    		// Fallback
            onCategoryChange(isAlreadySelected ? "all" : categoryId);
    		onSubCategoryChange(null);
        }

		// Update local UI state
		setExpandedCategories(isAlreadySelected ? [] : [categoryId]);
	};

	const handleSubCategoryClick = (
		parentCategoryId: string,
		subCategoryId: string
	) => {
        if (onFilterChange) {
            // Atomic update!
            onFilterChange({
                category: parentCategoryId,
                subCategory: subCategoryId
            });
        } else {
    		// Update parent state
    		onCategoryChange(parentCategoryId);
    		onSubCategoryChange(subCategoryId);
        }
	};

	return (
		<Card className="sticky top-24 p-6">
			<h3 className="mb-4 text-heading-5 text-text-primary">{t("news.search")}</h3>
			<div className="relative mb-6">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<Input
					placeholder={t("news.searchPlaceholder")}
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-10"
				/>
			</div>

			<h4 className="mb-3 text-label text-text-primary">{t("news.categories")}</h4>
			<div className="space-y-1">
                <button
                    onClick={() => handleCategoryClick("all")}
                    className={`focus-ring flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-body-sm font-medium transition-all duration-200 ${
                        selectedCategory === "all"
                            ? "bg-interactive-primaryMuted text-primary-900 shadow-sm ring-1 ring-border-focus/20"
                            : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                    }`}
                >
                    <div className="flex items-center">
                        <span>{t("nav.allNews")}</span>
                    </div>
                </button>

				{categories.filter(c => c.id !== "all").map((category) => (
					<div key={category.id}>
						<button
							onClick={() => handleCategoryClick(category.id)}
							className={`focus-ring flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-body-sm font-medium transition-all duration-200 ${
								selectedCategory === category.id
									? "bg-interactive-primaryMuted text-primary-900 shadow-sm ring-1 ring-border-focus/20"
									: "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
							}`}
						>
							<div className="flex items-center">
								<span>{category.name_en}</span>
								{category.subcategories &&
									category.subcategories.length > 0 && (
										<motion.div
											animate={{
												rotate: expandedCategories.includes(category.id)
													? 180
													: 0,
											}}
											transition={{ duration: 0.2 }}
											className="ml-2"
										>
											<ChevronDown className="w-4 h-4" />
										</motion.div>
									)}
							</div>
						</button>

						<AnimatePresence>
							{expandedCategories.includes(category.id) &&
								category.subcategories && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="overflow-hidden pl-4 pt-1"
									>
										<div className="space-y-1 border-l-2 border-border-subtle py-1 pl-4">
											{category.subcategories.map((sub) => (
												<button
													key={sub.id}
													onClick={() =>
														handleSubCategoryClick(category.id, sub.id)
													}
													className={`focus-ring w-full rounded-md px-3 py-2 text-left text-body-sm transition-all duration-200 ${
														selectedSubCategory === sub.id
															? "bg-interactive-primaryMuted font-semibold text-primary-900"
															: "text-text-secondary hover:bg-surface-muted hover:text-primary-900"
													}`}
												>
													{sub.name_en}
												</button>
											))}
										</div>
									</motion.div>
								)}
						</AnimatePresence>
					</div>
				))}
			</div>

			<div className="mt-8">
				<h4 className="mb-3 text-heading-6 text-text-primary">
					{t("events.recentNews")}
				</h4>
				<div className="space-y-4">
					{recentNews.map((item) => (
						<button
							type="button"
							key={item.id}
							className="focus-ring group flex w-full space-x-3 text-left"
							onClick={() => onRecentNewsClick(item.id)}
						>
							<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
								<Image
									src={item.image}
									alt={item.title_en}
									fill
									sizes="64px"
									className="object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h5 className="mb-1 line-clamp-2 text-body-sm font-medium text-text-primary transition-colors group-hover:text-primary-900">
									{t(item.title)}
								</h5>
								<p className="text-caption text-text-secondary">
									{new Date(item.date).toLocaleDateString("en-GB")}
								</p>
							</div>
						</button>
					))}
				</div>
			</div>
		</Card>
	);
}
