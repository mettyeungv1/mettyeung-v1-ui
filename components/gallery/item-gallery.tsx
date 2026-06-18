import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ItemCard, GalleryItem } from "./item-card";
import { useTranslation } from "@/lib/i18n";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";

interface ItemGalleryProps<T> {
	title: string;
	subtitle: string;
	items: T[];
	categories: { id: string; name_en: string }[];
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	onItemClick: (item: T) => void;
	loadingMore?: boolean;
	hasMore?: boolean;
	loading?: boolean;
}

export function ItemGallery<T extends GalleryItem>({
	title,
	subtitle,
	items,
	categories,
	selectedCategory,
	onCategoryChange,
	onItemClick,
	loadingMore = false,
	hasMore = true,
	loading = false,
}: ItemGalleryProps<T>) {
	const { t } = useTranslation();
	// Suggestion 2: Create a memoized lookup map for categories for O(1) access.
	const categoryMap = useMemo(() => {
		const map = new Map<string, string>();
		categories.forEach((cat) => map.set(cat.id, cat.name_en));
		return map;
	}, [categories]);
	const selectedCategoryName =
		categoryMap.get(selectedCategory) || selectedCategory;

	return (
		<section className="section-padding bg-gray-50">
			<div className="container">
				<AnimatedSection className="mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
						{t(title)}
						<span className="block text-xl md:text-2xl gradient-text mt-2">
							{t(subtitle)}
						</span>
					</h2>
				</AnimatedSection>

				<Tabs
					value={selectedCategory}
					onValueChange={onCategoryChange}
					className="w-full"
				>
					<TabsList className="flex flex-wrap justify-start md:grid md:grid-cols-5 gap-2 h-auto w-full mb-8 p-2 bg-gray-100">
						{categories.map((category) => (
							<TabsTrigger
								key={category.id}
								value={category.id}
								className="flex-shrink-0 px-4 py-2.5 md:px-6 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
							>
								{category.name_en}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value={selectedCategory} className="mt-0">
						<AnimatePresence mode="wait">
							{loading ? (
								<motion.div
									key="loader"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
								>
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="space-y-3">
											<Skeleton className="aspect-video w-full rounded-lg" />
											<Skeleton className="h-5 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
										</div>
									))}
								</motion.div>
							) : items.length > 0 ? (
								<motion.div
									key="content"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										<AnimatePresence mode="popLayout">
											{items.map((item, index) => (
												<motion.div
													layout
													key={item.id}
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.9 }}
													transition={{ duration: 0.3 }}
												>
													<ItemCard
														item={item}
														categoryName={categoryMap.get(item.category)}
														onCardClick={onItemClick}
													/>
												</motion.div>
											))}
										</AnimatePresence>
									</div>

									{/* Loading More Indicator */}
									{loadingMore && (
										<div className="flex justify-center items-center py-8">
											<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
										</div>
									)}

									{/* End of Items Message */}
									{!hasMore && !loadingMore && items.length > 0 && (
										<div className="text-center py-8">
											<p className="text-gray-500">
												{t("gallery.endOfList")}
											</p>
										</div>
									)}
								</motion.div>
							) : (
								<motion.div
									key="empty"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
								>
									<EmptyState
										title={t("gallery.noItemsFound")}
										description={t("gallery.noItemsInCategory").replace(
											"{{category}}",
											selectedCategoryName
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
