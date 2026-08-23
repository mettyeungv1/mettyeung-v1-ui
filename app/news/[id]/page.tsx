import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogByIdService, getBlogRelatedPostService } from "@/service/blog/blog-service";
import { serializeJsonForScript } from "@/lib/security/json";
import { toMediaUrl } from "@/lib/utils/image";
import { Breadcrumbs } from "@/components/news/detail/bread-crumbs";
import { ArticleHeader } from "@/components/news/detail/article-header";
import { ArticleAuthor } from "@/components/news/detail/article-author";
import { ArticleContent } from "@/components/news/detail/article-content";
import { ArticleToc } from "@/components/news/detail/article-toc";
import { addHeadingIds, extractTocItems, type TocItem } from "@/components/news/detail/article-content-utils";
import { ViewCounter } from "@/components/news/detail/view-counter";
import { NewsProgress } from "@/components/news/news-progress";
import { ImageGallery } from "@/components/news/image-gallery";
import { RelatedArticles } from "@/components/news/related-articles";
import type { BlogPost } from "@/lib/types/blog";

export const revalidate = 3600;
interface NewsDetailPageProps { params: Promise<{ id: string }>; }
type LocalizedText = string | Record<string, string>;

function textForMetadata(value: LocalizedText | null | undefined) { return typeof value === "string" ? value : value?.en || value?.km || ""; }
function prepareContent(content: LocalizedText): { content: Record<string, string>; tocItems: Record<string, TocItem[]> } {
	const values = typeof content === "string" ? { en: content } : content || {};
	return Object.entries(values).reduce((prepared, [language, html]) => {
		const sanitized = DOMPurify.sanitize(html || "");
		const toc = extractTocItems(sanitized);
		prepared.content[language] = addHeadingIds(sanitized, toc);
		prepared.tocItems[language] = toc;
		return prepared;
	}, { content: {} as Record<string, string>, tocItems: {} as Record<string, TocItem[]> });
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const res = await getBlogByIdService(id);
	if (res.status_code !== 200 || !res.data) return { title: "Article Not Found" };
	const post = res.data;
	const title = textForMetadata(post.title) || "News Article";
	const description = textForMetadata(post.excerpt);
	const image = toMediaUrl(post.coverImageUrl) || toMediaUrl(post.media?.[0]?.url) || "/og-default.png";
	const publishedTime = post.publishedAt || post.createdAt;
	return { title: `${title} | Mett Yeung Association`, description, openGraph: { title, description, images: [{ url: image }], type: "article", publishedTime: publishedTime instanceof Date ? publishedTime.toISOString() : publishedTime, authors: [post.author?.name || "Mett Yeung"] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
	const { id } = await params;
	if (!id) notFound();
	const [res, relatedRes] = await Promise.all([getBlogByIdService(id), getBlogRelatedPostService(id)]);
	if (res.status_code !== 200 || !res.data) notFound();
	const post = res.data;
	const media = (post.media || []).map((item) => ({ ...item, url: toMediaUrl(item.url) })).filter((item) => item.url);
	const coverImageUrl = toMediaUrl(post.coverImageUrl) || media[0]?.url || "";
	const prepared = prepareContent(post.content);
	const gallery = media.filter((item) => item.url !== coverImageUrl).map((item) => ({ url: item.url, caption: item.altText || item.fileName || "" }));
	const relatedPayload = relatedRes.data as { data?: BlogPost[] } | BlogPost[] | undefined;
	const relatedPosts = (Array.isArray(relatedPayload) ? relatedPayload : relatedPayload?.data || []).map((item) => ({ ...item, coverImageUrl: toMediaUrl(item.coverImageUrl), media: (item.media || []).map((mediaItem) => ({ ...mediaItem, url: toMediaUrl(mediaItem.url) })) }));
	const image = coverImageUrl;
	const title = textForMetadata(post.title);
	const jsonLd = { "@context": "https://schema.org", "@type": "NewsArticle", headline: title, image: image ? [image] : [], datePublished: post.publishedAt || post.createdAt, dateModified: post.updatedAt, author: [{ "@type": "Organization", name: post.author?.name || "Mett Yeung" }] };
	const breadcrumbItems = [{ href: "/", label: "Home" }, { href: "/news", label: "News" }, ...(post.category?.id && post.category.name ? [{ href: `/news?category=${post.category.id}`, label: textForMetadata(post.category.name) }] : [])];

	return <div className="min-h-screen bg-white pt-16 lg:pt-20"><NewsProgress /><ViewCounter postId={String(post.id)} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonForScript(jsonLd) }} /><Breadcrumbs items={breadcrumbItems} currentPage={title} /><div className="container py-12"><div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"><main className="lg:col-span-8"><article><ArticleHeader article={{ title: post.title, excerpt: post.excerpt, date: post.publishedAt || post.createdAt, image, views: post.readCounts || 0, readTime: post.readTimes || 1, category: post.category }} /><ArticleAuthor /><ArticleContent content={prepared.content} tags={[]} /></article></main><aside className="lg:col-span-4"><div className="sticky top-24 space-y-6"><ArticleToc itemsByLanguage={prepared.tocItems} /><RelatedArticles posts={relatedPosts} categoryId={post.category?.id} /></div></aside></div></div>{gallery.length ? <section className="border-y border-gray-100 bg-gray-50/70 py-10 md:py-14"><div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16"><ImageGallery images={gallery} /></div></section> : null}</div>;
}
