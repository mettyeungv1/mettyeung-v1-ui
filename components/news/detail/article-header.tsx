"use client";

import Image from "next/image";
import { Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import { ShareButtons } from "@/components/news/detail/share-buttons";

interface ArticleHeaderProps {
	article: {
		title: string | Record<string, string>;
		excerpt: string | Record<string, string>;
		date: string | Date | null | undefined;
		image: string;
		views: number;
		readTime: number;
		category?: { name?: string | Record<string, string> } | null;
	};
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
	const { t } = useTranslation();
	const title = t(article.title);
	const excerpt = t(article.excerpt);
	return <header className="mb-8"><div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">{article.category?.name ? <Badge className="bg-khmer-gold px-3 py-1 text-white">{t(article.category.name)}</Badge> : null}<div className="flex items-center text-caption text-gray-500"><Calendar className="mr-1 h-4 w-4" />{article.date ? new Date(article.date).toLocaleDateString("en-GB") : ""}</div><div className="flex items-center text-caption text-gray-500"><Clock className="mr-1 h-4 w-4" />{article.readTime || 1} {t("common.minutesShort")}</div><div className="flex items-center text-caption text-gray-500"><Eye className="mr-1 h-4 w-4" />{article.views.toLocaleString()} {t("news.views")}</div></div><h1 className="text-heading-1 mb-6">{title}</h1>{excerpt ? <p className="text-body-lg mb-8 text-gray-600">{excerpt}</p> : null}{article.image ? <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl shadow-sm"><Image src={article.image} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div> : null}<ShareButtons title={title} excerpt={excerpt} image={article.image} /></header>;
}
