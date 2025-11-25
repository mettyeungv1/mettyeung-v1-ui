"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

interface NewsFilterSidebarProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	categories: NewsCategory[];
	selectedCategory: string;
	onCategoryChange: (id: string) => void;
	selectedSubCategory: string | null;
	onSubCategoryChange: (id: string | null) => void;
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
	recentNews,
	onRecentNewsClick,
}: NewsFilterSidebarProps) {
	const { t } = useTranslation();
	// State to manage which categories are visually expanded
	const [expandedCategories, setExpandedCategories] = useState<string[]>(
		selectedCategory === "all" ? [] : [selectedCategory]
	);

	const handleCategoryClick = (categoryId: string) => {
		const isAlreadySelected = selectedCategory === categoryId;

		// Update parent state
		onCategoryChange(isAlreadySelected ? "all" : categoryId);
		onSubCategoryChange(null); // Always reset subcategory when a main category is clicked

		// Update local UI state
		setExpandedCategories(isAlreadySelected ? [] : [categoryId]);
	};

	const handleSubCategoryClick = (
		parentCategoryId: string,
		subCategoryId: string
	) => {
		// Update parent state
		onCategoryChange(parentCategoryId);
		onSubCategoryChange(subCategoryId);
	};

	return (
		<Card className="p-6 sticky top-24">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
			<div className="relative mb-6">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<Input
					placeholder="Search news..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-10"
				/>
			</div>

			<h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
			<div className="space-y-1">
				{categories.map((category) => (
					<div key={category.id}>
						<button
							onClick={() => handleCategoryClick(category.id)}
							className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
								selectedCategory === category.id && !selectedSubCategory
									? "bg-khmer-gold text-white"
									: "text-gray-600 hover:bg-gray-100"
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
							<span className="text-xs">({category.count})</span>
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
										<div className="space-y-1 border-l-2 border-gray-200 pl-4 py-1">
											{category.subcategories.map((sub) => (
												<button
													key={sub.id}
													onClick={() =>
														handleSubCategoryClick(category.id, sub.id)
													}
													className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
														selectedSubCategory === sub.id
															? "font-semibold text-khmer-gold"
															: "text-gray-500 hover:text-khmer-gold"
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
				<h4 className="text-sm font-semibold text-gray-900 mb-3">
					{t("events.recentNews")}
				</h4>
				<div className="space-y-4">
					{recentNews.map((item) => (
						<div
							key={item.id}
							className="flex space-x-3 cursor-pointer group"
							onClick={() => onRecentNewsClick(item.id)}
						>
							<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
								<img
									src={item.image}
									alt={item.title_en}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h5 className="text-sm font-medium text-gray-900 group-hover:text-khmer-gold line-clamp-2 mb-1">
									{t(item.title)}
								</h5>
								<p className="text-xs text-gray-500">
									{new Date(item.date).toLocaleDateString("en-GB")}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}
