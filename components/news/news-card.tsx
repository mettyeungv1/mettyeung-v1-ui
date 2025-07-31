import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Eye } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
	item: NewsArticle;
	onClick: (id: number) => void;
}

export function NewsCard({ item, onClick }: NewsCardProps) {
	const categoryName = item.category.name_en;
	const subCategoryName = item.category.subCategory?.name_en;

	return (
		<Card
			className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
			onClick={() => onClick(item.id)}
		>
			<div className="aspect-video overflow-hidden relative">
				<Image
					src={item.image}
					alt={item.title_en}
					fill
					style={{ objectFit: "cover" }}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<CardContent className="p-6 flex-grow flex flex-col">
				<div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-3">
					{/* Main Category Badge */}
					<Badge variant="secondary" className="text-xs capitalize">
						{categoryName}
					</Badge>

					{/* Subcategory Badge (if it exists) */}
					{subCategoryName && (
						<Badge variant="outline" className="text-xs capitalize">
							{subCategoryName}
						</Badge>
					)}

					<div className="flex items-center text-xs text-gray-500 ml-auto">
						<Calendar className="w-3 h-3 mr-1.5" />
						{new Date(item.date).toLocaleDateString("en-GB")}
					</div>
				</div>
				<h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-2">
					{item.title_en}
				</h3>
				<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
					{item.excerpt}
				</p>
				<div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t">
					<div className="flex items-center">
						<User className="w-3 h-3 mr-1.5" />
						{/* Corrected to use the English author name for consistency */}
						<span className="truncate">{item.author.name_en}</span>
					</div>
					<div className="flex items-center">
						<Eye className="w-3 h-3 mr-1.5" />
						{item.views.toLocaleString()}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
