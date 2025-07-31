import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { NewsCard } from "./news-card";
import { Search } from "lucide-react";

interface NewsGridProps {
	items: NewsArticle[];
	categories: NewsCategory[];
	onCardClick: (id: number) => void;
}

export function NewsGrid({ items, categories, onCardClick }: NewsGridProps) {
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
			{items.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{items.map((item) => (
						<NewsCard key={item.id} item={item} onClick={onCardClick} />
					))}
				</div>
			) : (
				<div className="text-center py-12 border rounded-lg bg-white">
					<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<Search className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						No News Found
					</h3>
					<p className="text-gray-600">
						Please try searching with different keywords or categories.
					</p>
				</div>
			)}
		</div>
	);
}
