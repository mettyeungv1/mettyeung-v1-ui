import { NewsArticle } from "@/lib/types/news";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
	article: NewsArticle;
	onShareClick: () => void;
}

export function ArticleHeader({ article, onShareClick }: ArticleHeaderProps) {
	return (
		<header className="mb-8">
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
				<Badge className="bg-khmer-gold text-white px-3 py-1 text-sm capitalize">
					{article.category.name}
				</Badge>
				<div className="flex items-center text-sm text-gray-500">
					<Calendar className="w-4 h-4 mr-1" />
					{new Date(article.date).toLocaleDateString("en-GB")}
				</div>
				<div className="flex items-center text-sm text-gray-500">
					<Clock className="w-4 h-4 mr-1" />
					{/* {article.readTime} */}
					20
				</div>
				<div className="flex items-center text-sm text-gray-500">
					<Eye className="w-4 h-4 mr-1" />
					{article.views.toLocaleString()} views
				</div>
			</div>
			<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
				{article.title_en}
			</h1>
			<p className="text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>
			<div className="flex items-center justify-between py-4 border-t border-b mt-8">
				<div className="flex items-center text-sm text-gray-500">
					<MessageCircle className="w-4 h-4 mr-2" />
					{/* {article.comments} */}
					10 Comments
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={onShareClick}
					className="text-khmer-gold border-khmer-gold hover:bg-khmer-gold hover:text-white"
				>
					<Share2 className="w-4 h-4 mr-2" />
					Share Article
				</Button>
			</div>
		</header>
	);
}
