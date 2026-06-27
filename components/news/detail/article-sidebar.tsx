import { NewsArticle } from "@/lib/types/news";
import { Card, CardContent } from "@/components/ui/card";
import { RelatedArticles } from "@/components/news/related-articles"; // Assuming this component exists
import { ArticleToc } from "@/components/news/detail/article-toc";
import { Calendar, Clock, Eye, Folder } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import { useTranslation } from "@/lib/i18n";

interface ArticleSidebarProps {
	article: NewsArticle;
	relatedPosts?: BlogPost[];
	tocItems?: Array<{ id: string; text: string; level: number }>;
}

export function ArticleSidebar({ article, relatedPosts = [], tocItems = [] }: ArticleSidebarProps) {
	const { t } = useTranslation();

	return (
		<div className="sticky top-24 space-y-6">
			<ArticleToc items={tocItems} />
			<Card className="border-l-4 border-l-khmer-gold">
				<CardContent className="p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{t("news.articleDetails")}
					</h3>
					<div className="space-y-3 text-sm text-gray-600">
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-2">
								<Calendar className="h-4 w-4 text-khmer-gold" />
								{t("news.published")}
							</span>
							<span className="font-medium">
								{new Date(article.date).toLocaleDateString("en-GB")}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-2">
								<Folder className="h-4 w-4 text-khmer-gold" />
								{t("news.category")}
							</span>
							<span className="font-medium">{article.category.name_en}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-2">
								<Clock className="h-4 w-4 text-khmer-gold" />
								{t("news.readTime")}
							</span>
							<span className="font-medium">{article.readTime} {t("common.minutesShort")}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-2">
								<Eye className="h-4 w-4 text-khmer-gold" />
								{t("news.views")}
							</span>
							<span className="font-medium">
								{article.views.toLocaleString()}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
			<RelatedArticles posts={relatedPosts} categoryId={(article.category as any)?.id} />
			{/* <Card className="bg-gradient-to-br from-khmer-gold/5 to-khmer-red/5 border-khmer-gold/20">
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
			</Card> */}
		</div>
	);
}
