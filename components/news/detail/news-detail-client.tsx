"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n";

import { normalizeUrl } from "@/lib/utils/image";
import { useToast } from "@/hooks/use-toast";

// Components
import { Breadcrumbs } from "@/components/news/detail/bread-crumbs";
import { ArticleHeader } from "@/components/news/detail/article-header";
import { ArticleAuthor } from "@/components/news/detail/article-author";
import { ArticleContent } from "@/components/news/detail/article-content";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ImageGallery } from "@/components/news/image-gallery";
import { ShareDialog } from "@/components/news/share-dialog";
import { ArticleSidebar } from "@/components/news/detail/article-sidebar";
import { SpinnerEmpty } from "@/components/common/spinner";
import { NewsProgress } from "@/components/news/news-progress";
import { addHeadingIds, extractTocItems } from "@/components/news/detail/article-toc";
import { incrementBlogView } from "@/service/blog/blog-service";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { BlogPost } from "@/lib/types/blog";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";

interface NewsDetailClientProps {
	post: BlogPost;
	relatedPost: any;
}

export function NewsDetailClient({ post, relatedPost }: NewsDetailClientProps) {
	const [showShareDialog, setShowShareDialog] = useState(false);
	const [showBackToTop, setShowBackToTop] = useState(false);
	const { t } = useTranslation();
	const { toast } = useToast();

	useEffect(() => {
		incrementBlogView(String(post.id)).catch(() => undefined);
	}, [post.id]);

	useEffect(() => {
		const onScroll = () => setShowBackToTop(window.scrollY > 500);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleShare = async (platform: string) => {
		const currentUrl = window.location.href;
		const title = article?.title_en || t("news.shareFallbackTitle");
		
		switch (platform) {
			case "facebook":
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, "share-dialog", "width=600,height=400");
				break;
			case "linkedin":
				window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "share-dialog", "width=600,height=400");
				break;
			case "whatsapp":
				window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " - " + currentUrl)}`, "_blank");
				break;
			case "telegram":
				window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, "share-dialog", "width=600,height=400");
				break;
			case "email":
				window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`;
				break;
			case "copy":
				try {
					await navigator.clipboard.writeText(currentUrl);
					toast({
						title: t("news.linkCopiedTitle"),
						description: t("news.linkCopiedDescription"),
					});
				} catch (err) {
					console.error("Failed to copy text: ", err);
				}
				break;
		}
	};

	const article = useMemo(() => {
		if (!post) return null;
		const rawContent = t(post.content);
		const tocItems = extractTocItems(rawContent);
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
			image: normalizeUrl(post.coverImageUrl || post.media[0]?.url || "/placeholder.jpg"),
			views: post.readCounts || 0,
			author: {
				name_en: post.author?.name || "",
				avatar: normalizeUrl(post.author?.avatarUrl || ""),
				bio_en: "",
			},
			content: addHeadingIds(rawContent, tocItems),
			tocItems,
			tags: [] as string[],
			gallery: (post.media || []).map((m) => ({
				url: normalizeUrl(m.url),
				caption: m.altText || "",
			})),
			readTime: post.readTimes || 0,
			comments: post.commentsCount || 0,
			category: {
				id: post.category?.id || "",
				name: typeof post.category?.name === "string" ? post.category.name : (post.category?.name as any)?.en || "",
				name_en: typeof post.category?.name === "string" ? post.category.name : (post.category?.name as any)?.en || "",
			},
		};
	}, [post, t]);

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
	if ((article.category as any)?.id && article.category.name_en) {
		breadcrumbItems.push({
			href: `/news?category=${(article.category as any).id}`,
			label: article.category.name_en,
		});
	}

	return (
		<div className="min-h-screen bg-white pt-16 lg:pt-20">
			<NewsProgress />
			<Breadcrumbs items={breadcrumbItems} currentPage={article.title_en} />
			<div className="container py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					<main className="lg:col-span-8">
						<AnimatedSection>
							<article>
								<ArticleHeader
									article={article as any}
									onShareClick={() => setShowShareDialog(true)}
								/>
								<ImageGallery images={article.gallery} />
								<ArticleAuthor author={article.author as any} />
								<ArticleContent
									content={article.content}
									tags={article.tags}
								/>
							</article>
						</AnimatedSection>
					</main>
					<aside className="lg:col-span-4">
						<div className="sticky top-24">
							<ArticleSidebar
								article={article as any}
								relatedPosts={relatedPost?.data || relatedPost || []}
								tocItems={(article as any).tocItems || []}
							/>
						</div>
					</aside>
				</div>
			</div>
			<ShareDialog
				isOpen={showShareDialog}
				onClose={() => setShowShareDialog(false)}
				onShare={handleShare}
				article={{
					title_en: article.title_en,
					excerpt: typeof article.excerpt === 'string' ? article.excerpt : (article.excerpt[DEFAULT_LANGUAGE_CODE] as string || ''),
					image: article.image,
				}}
			/>
			{showBackToTop && (
				<Button
					type="button"
					size="icon"
					className="fixed bottom-6 right-6 z-50 rounded-full bg-primary-900 text-white shadow-lg hover:bg-primary-950"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label={t("news.backToTop")}
				>
					<ArrowUp className="h-5 w-5" />
				</Button>
			)}
		</div>
	);
}
