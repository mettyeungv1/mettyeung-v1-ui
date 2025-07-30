import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

// A generic type for any item the card can display
export interface GalleryItem {
	id: string | number;
	title_en: string;
	description: string;
	thumbnail: string;
	date: string;
	category: string;
	duration?: string; // Optional property
}

interface ItemCardProps<T extends GalleryItem> {
	item: T;
	categoryName?: string;
	onCardClick: (item: T) => void;
	isFeatured?: boolean; // To apply different styling for featured items
}

export function ItemCard<T extends GalleryItem>({
	item,
	categoryName,
	onCardClick,
	isFeatured = false,
}: ItemCardProps<T>) {
	return (
		<Card
			className={`overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer ${
				isFeatured ? "hover:shadow-2xl" : ""
			}`}
		>
			<div
				className="relative aspect-video overflow-hidden"
				onClick={() => onCardClick(item)}
			>
				<img
					src={item.thumbnail}
					alt={item.title_en}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<div
						className={`bg-white/90 rounded-full flex items-center justify-center shadow-md ${
							isFeatured ? "w-16 h-16" : "w-12 h-12"
						}`}
					>
						<Play
							className={`text-khmer-gold ml-1 ${
								isFeatured ? "w-6 h-6" : "w-5 h-5"
							}`}
						/>
					</div>
				</motion.div>

				{item.duration && (
					<div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
						{item.duration}
					</div>
				)}
			</div>

			<CardContent className="p-4">
				<div className="flex items-center space-x-2 mb-2">
					{categoryName && (
						<Badge
							variant={isFeatured ? "default" : "secondary"}
							className={isFeatured ? "bg-khmer-gold text-white" : ""}
						>
							{categoryName}
						</Badge>
					)}
				</div>
				<h3 className="text-lg font-bold mb-2 group-hover:text-khmer-gold transition-colors line-clamp-1">
					{item.title_en}
				</h3>
				<p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
					{item.description}
				</p>
				<div className="flex items-center text-xs text-gray-500">
					<Calendar className="w-3 h-3 mr-1" />
					{formatDate(item.date)}
				</div>
			</CardContent>
		</Card>
	);
}
