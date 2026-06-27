"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types/blog";
import { formatDate } from "@/lib/utils";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";
import { useTranslation } from "@/lib/i18n";

interface RelatedArticlesProps {
	posts?: BlogPost[];
	categoryId?: string;
}

export function RelatedArticles({ posts = [], categoryId }: RelatedArticlesProps) {
	const { t } = useTranslation();
	const relatedPosts = posts.slice(0, 3);

	// Don't render the component if there are no related articles
	if (relatedPosts.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">{t("news.relatedArticles")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{relatedPosts.map((post: any) => (
					<Link
						key={post.id}
						href={`/news/${post.id}`}
						className="group cursor-pointer block"
					>
						<div className="flex space-x-4">
							<div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 relative bg-gray-100">
								<img
									src={post.coverImageUrl}
									alt={typeof post.title === "string" ? post.title : post.title?.[DEFAULT_LANGUAGE_CODE]}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex-1 min-w-0">
								{post.category?.name && (
									<Badge variant="secondary" className="text-xs mb-1">
										{t(post.category.name)}
									</Badge>
								)}
								<h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
									{t(post.title)}
								</h4>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
									<div className="flex items-center">
										<Calendar className="w-3.5 h-3.5 mr-1" />
										{formatDate(post.publishedAt)}
									</div>
									<div className="flex items-center">
										<Clock className="w-3.5 h-3.5 mr-1" />
										{post.readTimes || 1} {t("common.minutesShort")}
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}

				<div className="pt-4 border-t">
					<Button
						variant="outline"
						className="w-full text-primary border-primary hover:bg-primary hover:text-white"
						asChild
					>
						<Link href={categoryId ? `/news?category=${categoryId}` : "/news"}>
							{categoryId ? t("news.moreFromCategory") : t("news.viewAllArticles")}
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
