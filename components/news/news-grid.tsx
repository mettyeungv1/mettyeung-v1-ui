"use client";

import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { NewsCard } from "./news-card";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsGridProps {
	items: NewsArticle[];
	categories: NewsCategory[];
	onCardClick: (id: string) => void;
	loadingMore?: boolean;
	hasMore?: boolean;
	loading?: boolean;
}

export function NewsGrid({
	items,
	categories,
	onCardClick,
	loadingMore = false,
	hasMore = true,
	loading = false
}: NewsGridProps) {
	const getCategoryName = (id: string) =>
		categories.find((c) => c.id === id)?.name_en;

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-2xl font-bold text-gray-900">
					All News
					<span className="block text-sm text-gray-500 mt-1">
						Found {items.length} articles
					</span>
				</h2>
			</div>

			<AnimatePresence mode="wait">
				{loading ? (
					<motion.div
						key="loader"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
					>
						{[...Array(6)].map((_, i) => (
							<div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm h-[400px] animate-pulse">
								<div className="h-48 bg-gray-200" />
								<div className="p-6 space-y-4">
									<div className="h-4 bg-gray-200 rounded w-1/4" />
									<div className="h-6 bg-gray-200 rounded w-3/4" />
									<div className="h-4 bg-gray-200 rounded w-full" />
									<div className="h-4 bg-gray-200 rounded w-2/3" />
								</div>
							</div>
						))}
					</motion.div>
				) : items.length > 0 ? (
					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
					>
						<AnimatePresence mode="popLayout">
							{items.map((item) => (
								<motion.div
									layout
									key={item.id}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3 }}
								>
									<NewsCard item={item} onClick={onCardClick} />
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					<motion.div
						key="empty"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="text-center py-12 border rounded-lg bg-white"
					>
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-8 h-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No News Found
						</h3>
						<p className="text-gray-600">
							Please try searching with different keywords or categories.
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Loading More Indicator - Outside AnimatePresence to avoid layout jumps */}
			{items.length > 0 && (
				<>
					{loadingMore && (
						<div className="flex justify-center items-center py-8">
							<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
						</div>
					)}

					{!hasMore && !loadingMore && (
						<div className="text-center py-8">
							<p className="text-gray-500">You've reached the end of the news feed</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
