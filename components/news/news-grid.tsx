"use client";

import { useState } from "react";
import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { NewsCard } from "./news-card";
import { Grid2X2, List, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

interface NewsGridProps {
	items: NewsArticle[];
	categories: NewsCategory[];
	onCardClick: (id: string) => void;
	onCardPrefetch?: (id: string) => void;
	loadingMore?: boolean;
	hasMore?: boolean;
	loading?: boolean;
}

export function NewsGrid({
	items,
	categories,
	onCardClick,
	onCardPrefetch,
	loadingMore = false,
	hasMore = true,
	loading = false
}: NewsGridProps) {
	const { t } = useTranslation();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const getCategoryName = (id: string) =>
		categories.find((c) => c.id === id)?.name_en;

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-2xl font-bold text-gray-900">
					{t("events.allNewsGrid")}
					<span className="block text-sm text-gray-500 mt-1">
						{t("events.foundArticles").replace("{{count}}", String(items.length))}
					</span>
				</h2>
				<div className="hidden items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm sm:flex">
					<Button
						type="button"
						size="sm"
						variant={viewMode === "grid" ? "default" : "ghost"}
						className="h-8 px-3"
						onClick={() => setViewMode("grid")}
						aria-label="Grid view"
					>
						<Grid2X2 className={`h-4 w-4 ${viewMode === "grid" ? "text-white" : ""}`} />
					</Button>
					<Button
						type="button"
						size="sm"
						variant={viewMode === "list" ? "default" : "ghost"}
						className="h-8 px-3"
						onClick={() => setViewMode("list")}
						aria-label="List view"
					>
						<List className={`h-4 w-4 ${viewMode === "list" ? "text-white" : ""}`} />
					</Button>
				</div>
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
						className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid grid-cols-1 gap-5"}
					>
						<AnimatePresence mode="popLayout">
							{items.map((item, index) => (
								<motion.div
									layout
									key={item.id}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 16 }}
									transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.25) }}
								>
									<NewsCard
										item={item}
										onClick={onCardClick}
										onPrefetch={onCardPrefetch}
										variant={viewMode}
									/>
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
					>
						<EmptyState
							title={t("events.noNewsFound")}
							description={t("events.trySearching")}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Loading More Indicator - Outside AnimatePresence to avoid layout jumps */}
			{items.length > 0 && (
				<>
					{loadingMore && (
						<div className="flex justify-center items-center py-8">
							<Loader2 className="h-8 w-8 animate-spin text-primary-900" />
						</div>
					)}

					{!hasMore && !loadingMore && (
						<div className="text-center py-8">
							<p className="text-body-sm text-text-secondary">{t("events.endOfFeed")}</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
