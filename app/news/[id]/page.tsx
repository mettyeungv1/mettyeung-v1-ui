"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/data/news";

// Import the new organized components
import { Breadcrumbs } from "@/components/news/detail/bread-crumbs";
import { ArticleHeader } from "@/components/news/detail/article-header";
import { ArticleAuthor } from "@/components/news/detail/article-author";
import { ArticleContent } from "@/components/news/detail/article-content";

// Import existing modular components
import { AnimatedSection } from "@/components/ui/animated-section";
import { ImageGallery } from "@/components/news/image-gallery";
import { ShareDialog } from "@/components/news/share-dialog";
import { CommentSection } from "@/components/news/comment-section";
import { RelatedArticles } from "@/components/news/related-articles";
// import { ArticleSidebar } from "@/components/news/detail/ArticleSidebar"; // A new component to hold sidebar items
import { NewsArticle } from "@/lib/types/news";
import { ArticleSidebar } from "@/components/news/detail/article-sidebar";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
	const [article, setArticle] = useState<NewsArticle | null>(null);
	const [showShareDialog, setShowShareDialog] = useState(false);

	useEffect(() => {
		// Fetch data dynamically based on the URL parameter
		const articleId = parseInt(params.id, 10);
		if (!isNaN(articleId)) {
			const foundArticle = getArticleById(articleId);
			if (foundArticle) {
				setArticle(foundArticle);
			} else {
				notFound(); // If article doesn't exist, show a 404 page
			}
		}
	}, [params.id]);

	const handleShare = async (platform: string) => {
		// Share logic remains the same
	};

	if (!article) {
		// Loading state or a skeleton screen can be shown here
		return <div>Loading article...</div>;
	}

	const breadcrumbItems = [
		{ href: "/", label: "Home" },
		{ href: "/news", label: "News" },
	];

	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbItems} currentPage={article.title_en} />

			<div className="container py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Main Content */}
					<main className="lg:col-span-8">
						<AnimatedSection>
							<article>
								<ArticleHeader
									article={article}
									onShareClick={() => setShowShareDialog(true)}
								/>
								<ImageGallery images={article.gallery} />
								<ArticleAuthor author={article.author} />
								<ArticleContent content={article.content} tags={article.tags} />
							</article>
						</AnimatedSection>
						<div className="mt-16">
							<CommentSection articleId={article.id} />
						</div>
					</main>

					{/* Sidebar */}
					<aside className="lg:col-span-4">
						<div className="sticky top-24">
							<ArticleSidebar article={article} />
						</div>
					</aside>
				</div>
			</div>

			<ShareDialog
				isOpen={showShareDialog}
				onClose={() => setShowShareDialog(false)}
				onShare={handleShare}
				article={article}
			/>
		</div>
	);
}
