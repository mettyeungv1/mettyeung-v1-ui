import { useState } from "react";
import { NewsArticle } from "@/lib/types/news";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Clock, User, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { MediaFallback } from "@/components/ui/media-fallback";

interface NewsCardProps {
	item: NewsArticle;
	onClick: (id: string) => void;
	onPrefetch?: (id: string) => void;
	variant?: "grid" | "list";
}

export function NewsCard({ item, onClick, onPrefetch, variant = "grid" }: NewsCardProps) {
	const { t } = useTranslation();
	const [imageFailed, setImageFailed] = useState(false);

	const categoryName = item.category.name_en;
	const subCategoryName = item.category.subCategory?.name_en;

	return (
		<button
			type="button"
			className={`group flex h-full w-full overflow-hidden rounded-lg border border-neutral-200 bg-white text-left text-text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 ${
				variant === "list" ? "flex-col md:flex-row" : "flex-col"
			}`}
			onClick={() => onClick(item.id)}
			onMouseEnter={() => onPrefetch?.(item.id)}
			onFocus={() => onPrefetch?.(item.id)}
		>
			<div className={`${variant === "list" ? "aspect-video md:w-72 md:shrink-0 md:aspect-[4/3]" : "aspect-video"} overflow-hidden relative`}>
				{imageFailed ? (
					<MediaFallback label={t("common.mediaUnavailable")} className="h-full min-h-0" />
				) : (
					<Image
						src={item.image}
						alt={item.title_en}
						fill
						style={{ objectFit: "cover" }}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						onError={() => setImageFailed(true)}
					/>
				)}
			</div>
			<div className="p-6 flex-grow flex flex-col">
				<div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-3">
					{/* Main Category Badge */}
					<Badge variant="secondary" className="capitalize">
						{categoryName}
					</Badge>

					{/* Subcategory Badge (if it exists) */}
					{subCategoryName && (
						<Badge variant="outline" className="capitalize">
							{subCategoryName}
						</Badge>
					)}

					<div className="flex items-center text-caption text-gray-500 ml-auto">
						<Calendar className="w-3.5 h-3.5 mr-1.5" />
						{new Date(item.date).toLocaleDateString("en-GB")}
					</div>
				</div>
				<h3 className={variant === "list" ? "text-heading-4 mb-3 group-hover:text-khmer-gold transition-colors line-clamp-2" : "text-heading-5 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-2"}>
					{t(item.title)}
				</h3>
				<p className="text-body-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
					{t(item.excerpt)}
				</p>
				<div className="flex flex-wrap items-center justify-between gap-3 text-caption text-gray-500 mt-auto pt-4 border-t">
					<div className="flex min-w-0 items-center gap-4">
						<div className="flex min-w-0 items-center">
							<User className="w-3.5 h-3.5 mr-1.5 shrink-0" />
							<span className="truncate">{item.author?.name_en || item.author?.name || "Mett Yeung"}</span>
						</div>
						<div className="flex items-center">
							<Clock className="w-3.5 h-3.5 mr-1.5" />
							{item.readTime || 1} {t("common.minutesShort")}
						</div>
					</div>
					<div className="flex items-center gap-3">
						{item.views > 0 && (
							<div className="flex items-center">
								<Eye className="w-3.5 h-3.5 mr-1.5" />
								{item.views.toLocaleString()}
							</div>
						)}
						<span
							className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors group-hover:border-khmer-gold group-hover:text-khmer-gold"
							aria-hidden="true"
						>
							<Bookmark className="h-4 w-4" />
						</span>
					</div>
				</div>
			</div>
		</button>
	);
}
