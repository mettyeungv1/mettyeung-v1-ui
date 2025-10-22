"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogRelatedPostService } from "@/service/blog/blog-service";
import type { BlogPost } from "@/lib/types/blog";
import { formatDate } from "@/lib/utils";
import { MEDIA_ENDPOINT } from "@/lib/static";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";

interface RelatedArticlesProps {
	currentArticleId: string;
}

// A dedicated skeleton loader for a better UX while data is fetching
const RelatedArticlesSkeleton = () => (
	<Card>
		<CardHeader>
			<Skeleton className="h-6 w-32" />
		</CardHeader>
		<CardContent className="space-y-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="flex space-x-4">
					<Skeleton className="w-20 h-20 rounded-lg" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-5 w-full" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
	// 1. Use strong typing, not 'any'
	const [relatedPosts, setRelatedPosts] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!currentArticleId) {
			setLoading(false);
			return;
		}

		const fetchRelated = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await getBlogRelatedPostService(currentArticleId);
				console.log("This is the related data", res);
				if (res.data) {
					setRelatedPosts(res.data.data.slice(0, 3));
				} else {
					throw new Error(res.message || "Failed to fetch related posts.");
				}
			} catch (err) {
				console.error(err);
				setError("Could not load related articles.");
			} finally {
				setLoading(false);
			}
		};

		fetchRelated();
	}, [currentArticleId]);

	if (loading) {
		return <RelatedArticlesSkeleton />;
	}

	if (error) {
		return (
			<Card>
				<CardContent className="pt-6 text-center text-sm text-destructive">
					{error}
				</CardContent>
			</Card>
		);
	}

	// Don't render the component if there are no related articles
	if (relatedPosts.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Related Articles</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{relatedPosts.map((post: any) => (
					<Link
						key={post.id}
						href={`/news/${post.id}`}
						className="group cursor-pointer block"
					>
						<div className="flex space-x-4">
							<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
								<img
									src={post.coverImageUrl}
									alt={post.title[DEFAULT_LANGUAGE_CODE]}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex-1 min-w-0">
								{/* <Badge variant="secondary" className="text-xs mb-1">
									{post.categoryName}
								</Badge> */}
								<h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
									{post.title[DEFAULT_LANGUAGE_CODE]}{" "}
									{/* 3. This now works perfectly */}
								</h4>
								<div className="flex items-center text-xs text-gray-500 space-x-3">
									<div className="flex items-center">
										<Calendar className="w-3 h-3 mr-1" />
										{formatDate(post.publishedAt)}
									</div>
									{/* <div className="flex items-center">
										<Eye className="w-3 h-3 mr-1" />
										{post.readCounts.toLocaleString()}
									</div> */}
								</div>
							</div>
						</div>
					</Link>
				))}

				<div className="pt-4 border-t">
					<Button
						variant="outline"
						className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground"
						asChild
					>
						<Link href="/news">
							View All Articles
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
