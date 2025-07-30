import { NewsArticle } from "@/lib/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedArticles } from "@/components/news/related-articles"; // Assuming this component exists

interface ArticleSidebarProps {
	article: NewsArticle;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
	return (
		<div className="sticky top-24 space-y-6">
			{/* Quick Info Card */}
			<Card className="border-l-4 border-l-khmer-gold">
				<CardContent className="p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Article Details
					</h3>
					<div className="space-y-3 text-sm">
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Published:</span>
							<span className="font-medium">
								{new Date(article.date).toLocaleDateString("en-GB")}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Category:</span>
							<span className="font-medium">{article.category.name_en}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Read Time:</span>
							<span className="font-medium">{article.readTime}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Views:</span>
							<span className="font-medium">
								{article.views.toLocaleString()}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-gray-600">Comments:</span>
							<span className="font-medium">{article.comments}</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Related Articles Component */}
			<RelatedArticles currentArticleId={article.id} />

			{/* Newsletter Signup Card */}
			<Card className="bg-gradient-to-br from-khmer-gold/5 to-khmer-red/5 border-khmer-gold/20">
				<CardContent className="p-6 text-center">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						Stay Updated
					</h3>
					<p className="text-sm text-gray-600 mb-4">
						Subscribe to our newsletter for the latest news and events.
					</p>
					<div className="space-y-3">
						<input
							type="email"
							placeholder="Your email address"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-khmer-gold text-sm"
						/>
						<Button className="w-full bg-khmer-gold hover:bg-khmer-gold-dark text-white py-3">
							Subscribe
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
