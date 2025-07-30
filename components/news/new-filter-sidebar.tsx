import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NewsArticle, NewsCategory } from "@/lib/types/news";
import { Search } from "lucide-react";

interface NewsFilterSidebarProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	categories: NewsCategory[];
	selectedCategory: string;
	onCategoryChange: (id: string) => void;
	recentNews: NewsArticle[];
	onRecentNewsClick: (id: number) => void;
}

export function NewsFilterSidebar({
	searchTerm,
	onSearchChange,
	categories,
	selectedCategory,
	onCategoryChange,
	recentNews,
	onRecentNewsClick,
}: NewsFilterSidebarProps) {
	return (
		<Card className="p-6 sticky top-24">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
			<div className="relative mb-6">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
				<Input
					placeholder="Search news..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-10"
				/>
			</div>

			<h4 className="text-sm font-semibold text-gray-900 mb-3">Categories</h4>
			<div className="space-y-2">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => onCategoryChange(category.id)}
						className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
							selectedCategory === category.id
								? "bg-khmer-gold text-white"
								: "text-gray-600 hover:bg-gray-100"
						}`}
					>
						<div className="flex items-center justify-between">
							<span>{category.name_en}</span>
							<span className="text-xs">({category.count})</span>
						</div>
					</button>
				))}
			</div>

			<div className="mt-8">
				<h4 className="text-sm font-semibold text-gray-900 mb-3">
					Recent News
				</h4>
				<div className="space-y-4">
					{recentNews.map((item) => (
						<div
							key={item.id}
							className="flex space-x-3 cursor-pointer hover:opacity-80"
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
								<h5 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
									{item.title_en}
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
