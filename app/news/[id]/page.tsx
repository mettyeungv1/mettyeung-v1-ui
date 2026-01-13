import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
	getBlogByIdService,
	getBlogRelatedPostService,
} from "@/service/blog/blog-service";
import { NewsDetailClient } from "@/components/news/detail/news-detail-client";

interface NewsDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({
	params,
}: NewsDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const res = await getBlogByIdService(id);

	if (res.status_code !== 200 || !res.data) {
		return {
			title: "Article Not Found",
		};
	}

	const post = res.data;
	const title = typeof post.title === "string" ? post.title : post.title?.en || "News Article";
	const description = typeof post.excerpt === "string" ? post.excerpt : post.excerpt?.en || "";
	const image = post.coverImageUrl || post.media?.[0]?.url || "/og-default.png";

	const publishedTime = post.publishedAt || post.createdAt;
	const publishedTimeStr = publishedTime instanceof Date ? publishedTime.toISOString() : publishedTime;

	return {
		title: `${title} | Mett Yeung Association`,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: [{ url: image }],
			type: "article",
			publishedTime: publishedTimeStr,
			authors: [post.author?.name || "Mett Yeung"],
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: [image],
		},
	};
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
	const { id } = await params;
	
	if (!id) return notFound();

	const res = await getBlogByIdService(id);
	const relatedPostRes = await getBlogRelatedPostService(id);

	if (res.status_code !== 200 || !res.data) {
		return notFound();
	}

	const post = res.data;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: typeof post.title === "string" ? post.title : post.title?.en,
		image: [post.coverImageUrl || post.media?.[0]?.url],
		datePublished: post.publishedAt || post.createdAt,
		dateModified: post.updatedAt,
		author: [{
			"@type": "Person",
			name: post.author?.name || "Mett Yeung",
		}],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<NewsDetailClient 
				post={res.data} 
				relatedPost={relatedPostRes.data} 
			/>
		</>
	);
}
