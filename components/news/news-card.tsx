import { useState } from "react";
import { NewsArticle } from "@/lib/types/news";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { MediaFallback } from "@/components/ui/media-fallback";

interface NewsCardProps {
	item: NewsArticle;
	onClick: (id: string) => void;
}

export function NewsCard({ item, onClick }: NewsCardProps) {
	const { t } = useTranslation();
	const [imageFailed, setImageFailed] = useState(false);

	const categoryName = item.category.name_en;
	const subCategoryName = item.category.subCategory?.name_en;

	return (
		<button
			type="button"
			className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white text-left text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2"
			onClick={() => onClick(item.id)}
		>
			<div className="aspect-video overflow-hidden relative">
				{imageFailed ? (
					<MediaFallback label={t("common.mediaUnavailable")} className="h-full min-h-0" />
				) : (
					<Image
						src={item.image}
						alt={item.title_en}
						fill
						style={{ objectFit: "cover" }}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
				<h3 className="text-heading-5 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-2">
					{t(item.title)}
				</h3>
				<p className="text-body-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
					{t(item.excerpt)}
				</p>
				<div className="flex items-center justify-between text-caption text-gray-500 mt-auto pt-4 border-t">
					<div className="flex items-center">
						<User className="w-3.5 h-3.5 mr-1.5" />
						<span className="truncate">Mettyeung27</span>
					</div>
					{item.views > 0 && (
						<div className="flex items-center">
							<Eye className="w-3.5 h-3.5 mr-1.5" />
							{item.views.toLocaleString()}
						</div>
					)}
				</div>
			</div>
		</button>
	);
}
