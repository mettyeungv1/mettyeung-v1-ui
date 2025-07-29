import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ItemCard, GalleryItem } from "./item-card";

interface Category {
	id: string;
	name_en: string;
}

interface ItemGalleryProps<T extends GalleryItem> {
	title: string;
	subtitle: string;
	items: T[];
	categories: Category[];
	onItemClick: (item: T) => void;
}

export function ItemGallery<T extends GalleryItem>({
	title,
	subtitle,
	items,
	categories,
	onItemClick,
}: ItemGalleryProps<T>) {
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Suggestion 2: Create a memoized lookup map for categories for O(1) access.
	const categoryMap = useMemo(() => {
		const map = new Map<string, string>();
		categories.forEach((cat) => map.set(cat.id, cat.name_en));
		return map;
	}, [categories]);

	// Suggestion 2: Memoize the filtering logic for performance.
	const filteredItems = useMemo(() => {
		if (selectedCategory === "all") {
			return items;
		}
		return items.filter((item) => item.category === selectedCategory);
	}, [items, selectedCategory]);

	return (
		<section className="section-padding bg-gray-50">
			<div className="container">
				<AnimatedSection className="mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
						{title}
						<span className="block text-xl md:text-2xl gradient-text mt-2">
							{subtitle}
						</span>
					</h2>
				</AnimatedSection>

				<Tabs
					value={selectedCategory}
					onValueChange={setSelectedCategory}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
						{categories.map((category) => (
							<TabsTrigger key={category.id} value={category.id}>
								{category.name_en}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value={selectedCategory}>
						{/* Suggestion 1: Handle empty state */}
						{filteredItems.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredItems.map((item, index) => (
									<AnimatedSection key={item.id} delay={index * 0.1}>
										<ItemCard
											item={item}
											categoryName={categoryMap.get(item.category)}
											onCardClick={onItemClick}
										/>
									</AnimatedSection>
								))}
							</div>
						) : (
							<div className="text-center py-16 text-gray-500 bg-white rounded-lg border">
								<h3 className="text-xl font-semibold">No Items Found</h3>
								<p className="mt-2 text-sm">
									There are no items in the "
									{categoryMap.get(selectedCategory) || selectedCategory}"
									category.
								</p>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
