"use client";

import React, { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";

// Components
import { Breadcrumbs } from "@/components/news/detail/bread-crumbs";
import { ArticleHeader } from "@/components/news/detail/article-header";
import { ArticleAuthor } from "@/components/news/detail/article-author";
import { ArticleContent } from "@/components/news/detail/article-content";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ImageGallery } from "@/components/news/image-gallery";
import { ShareDialog } from "@/components/news/share-dialog";
import { CommentSection } from "@/components/news/comment-section";
import { ArticleSidebar } from "@/components/news/detail/article-sidebar";

import {
	getBlogByIdService,
	getBlogRelatedPostService,
} from "@/service/blog/blog-service";
import type { BlogPost } from "@/lib/types/blog";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";
import { SpinnerEmpty } from "@/components/common/spinner";

export default function NewsDetailPage() {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [relatedPost, setRelatedPost] = useState<any>(null);
	const [showShareDialog, setShowShareDialog] = useState(false);
	const params = useParams<{ id: string }>();

	useEffect(() => {
		(async () => {
			const id = params?.id;
			if (!id) return;
			const res = await getBlogByIdService(id);
			const relatedPost = await getBlogRelatedPostService(id);
			if (res.status_code === 200 && res.data) {
				setPost(res.data);
				setRelatedPost(relatedPost.data);
			} else notFound();
		})();
	}, [params?.id]);

	const article = useMemo(() => {
		if (!post) return null;
		return {
			id: post.id as unknown as number,
			title: post.title,
			title_en:
				typeof post.title === "string"
					? post.title
					: (post.title as any)?.en || "",
			excerpt: post.excerpt as {
				[lang: string]: string;
			},
			date: (post.publishedAt || post.createdAt) as any,
			image: post.coverImageUrl || post.media[0]?.url || "/placeholder.jpg",
			views: post.readCounts || 0,
			author: {
				name_en: post.author?.name || "",
				avatar: post.author?.avatarUrl || "",
				bio_en: "",
			},
			content: post.content,
			tags: [] as string[],
			gallery: (post.media || []).map((m) => ({
				url: m.url,
				caption: m.altText || "",
			})),
			readTime: post.readTimes || 0,
			comments: post.commentsCount || 0,
			category: { name: "", name_en: "" },
		};
	}, [post]);

	if (!article)
		return (
			<div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden group bg-gray-100 flex items-center justify-center">
				<SpinnerEmpty />
			</div>
		);

	const breadcrumbItems = [
		{ href: "/", label: "Home" },
		{ href: "/news", label: "News" },
	];

	return (
		<div className="min-h-screen bg-white">
			<Breadcrumbs items={breadcrumbItems} currentPage={article.title_en} />
			<div className="container py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					<main className="lg:col-span-8">
						{!article ? (
							<SpinnerEmpty />
						) : (
							<>
								<AnimatedSection>
									<article>
										<ArticleHeader
											article={article as any}
											onShareClick={() => setShowShareDialog(true)}
										/>
										<ImageGallery images={article.gallery} />
										<ArticleAuthor author={article.author as any} />
										<ArticleContent
											content={article.content as { [lang: string]: string }}
											tags={article.tags}
										/>
									</article>
								</AnimatedSection>
								<div className="mt-16">
									<CommentSection articleId={article.id} />
								</div>
							</>
						)}
					</main>
					<aside className="lg:col-span-4">
						<div className="sticky top-24">
							<ArticleSidebar article={article as any} />
						</div>
					</aside>
				</div>
			</div>
			{/* <ShareDialog
				isOpen={showShareDialog}
				onClose={() => setShowShareDialog(false)}
				onShare={handleShare}
				article={{
					title_en: article.title_en,
					excerpt: article.excerpt[DEFAULT_LANGUAGE_CODE] as string,
					image: article.image,
				}}
			/> */}
		</div>
	);
}
