import { NewsArticle } from "@/lib/types/news";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Copy, Eye, Facebook, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface ArticleHeaderProps {
	article: NewsArticle;
	onShareClick: () => void;
}

export function ArticleHeader({ article, onShareClick }: ArticleHeaderProps) {
	const { t } = useTranslation();
	const shareCurrent = (type: "facebook" | "whatsapp" | "copy") => {
		const url = window.location.href;
		if (type === "facebook") {
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "share-dialog", "width=600,height=400");
		} else if (type === "whatsapp") {
			window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title_en} - ${url}`)}`, "_blank");
		} else {
			navigator.clipboard?.writeText(url);
		}
	};

	return (
		<header className="mb-8">
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
				{article.category?.name && (
					<Badge className="bg-khmer-gold text-white px-3 py-1 capitalize">
						{article.category.name}
					</Badge>
				)}
				<div className="flex items-center text-caption text-gray-500">
					<Calendar className="w-4 h-4 mr-1" />
					{new Date(article.date).toLocaleDateString("en-GB")}
				</div>
				<div className="flex items-center text-caption text-gray-500">
					<Clock className="w-4 h-4 mr-1" />
					{article.readTime} {t("common.minutesShort")}
				</div>
				<div className="flex items-center text-caption text-gray-500">
					<Eye className="w-4 h-4 mr-1" />
					{article.views.toLocaleString()} {t("news.views")}
				</div>
			</div>
			<h1 className="text-heading-1 mb-6">
				{t(article.title)}
			</h1>
			<p className="text-body-lg text-gray-600 mb-8">
				{t(article.excerpt)}
			</p>

			{/* Cover Image Feature */}
			{article.image && (
				<div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-sm">
					<img
						src={article.image}
						alt={t(article.title)}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
					/>
				</div>
			)}
			<div className="flex items-center justify-between py-4 border-t border-b mt-8">
				<div className="flex items-center gap-2">
					<Button type="button" variant="ghost" size="sm" onClick={() => shareCurrent("facebook")} aria-label="Share on Facebook">
						<Facebook className="h-4 w-4" />
					</Button>
					<Button type="button" variant="ghost" size="sm" onClick={() => shareCurrent("whatsapp")} aria-label="Share on WhatsApp">
						<Send className="h-4 w-4" />
					</Button>
					<Button type="button" variant="ghost" size="sm" onClick={() => shareCurrent("copy")} aria-label="Copy link">
						<Copy className="h-4 w-4" />
					</Button>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={onShareClick}
					className="text-primary border-primary hover:bg-primary hover:text-white"
				>
					<Share2 className="w-4 h-4 mr-2" />
					{t("news.shareArticle")}
				</Button>
			</div>
		</header>
	);
}
