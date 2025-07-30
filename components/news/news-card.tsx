import { NewsArticle } from "@/lib/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Eye } from "lucide-react";

interface NewsCardProps {
	item: NewsArticle;
	categoryName?: string;
	onClick: (id: number) => void;
}

export function NewsCard({ item, categoryName, onClick }: NewsCardProps) {
	return (
		<Card
			className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
			onClick={() => onClick(item.id)}
		>
			<div className="aspect-video overflow-hidden">
				<img
					src={item.image}
					alt={item.title_en}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>
			<CardContent className="p-6 flex-grow flex flex-col">
				<div className="flex items-center space-x-4 mb-3">
					{categoryName && (
						<Badge variant="secondary" className="text-xs">
							{categoryName}
						</Badge>
					)}
					<div className="flex items-center text-xs text-gray-500">
						<Calendar className="w-3 h-3 mr-1" />
						{new Date(item.date).toLocaleDateString("en-GB")}
					</div>
				</div>
				<h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-2">
					{item.title_en}
				</h3>
				<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
					{item.excerpt}
				</p>
				<div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
					<div className="flex items-center">
						<User className="w-3 h-3 mr-1" />
						<span className="truncate">{item.author.name}</span>
					</div>
					<div className="flex items-center">
						<Eye className="w-3 h-3 mr-1" />
						{item.views}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
