import React, { Suspense } from "react";
import { listBlogsService } from "@/service/blog/blog-service";
import { getFeaturedBlogService } from "@/service/blog/blog-service";
import { listCategoriesService } from "@/service/category/category-service";
import { NewsPageClient } from "@/components/news/news-page-client";
import { NewsHero } from "@/components/news/news-hero";
import { NewsSkeleton } from "@/components/news/news-skeleton";
import { normalizeUrl } from "@/lib/utils/image";

export const revalidate = 60;
const POSTS_PER_PAGE = 12;

async function NewsContentServer({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const apiParams: any = { sort: "-publishedAt", limit: POSTS_PER_PAGE, page: 1 };
	if (searchParams?.q) apiParams.q = searchParams.q;
	if (searchParams?.category && searchParams.category !== "all") {
		apiParams.categoryId = searchParams.subCategory || searchParams.category;
	}

	const [postRes, catRes] = await Promise.all([
		listBlogsService(apiParams),
		listCategoriesService(),
	]);

	const rawPosts = postRes.status_code === 200 && postRes.data?.data ? postRes.data.data : [];
	const initialPosts = rawPosts.map((post: any) => ({
		...post,
		coverImageUrl: normalizeUrl(post.coverImageUrl),
		media: post.media?.map((m: any) => ({ ...m, url: normalizeUrl(m.url) })) || []
	}));

	const initialTotalPages = postRes.data?.totalPages || 1;
	const initialCategories = catRes.status_code === 200 && Array.isArray(catRes.data) ? catRes.data : [];

	return (
		<NewsPageClient
			initialPosts={initialPosts}
			initialCategories={initialCategories}
			initialTotalPages={initialTotalPages}
		/>
	);
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const featuredRes = await getFeaturedBlogService();
	const featuredPost =
		featuredRes.status_code === 200 && featuredRes.data
			? {
				...featuredRes.data,
				coverImageUrl: normalizeUrl(featuredRes.data.coverImageUrl),
				media: featuredRes.data.media?.map((m: any) => ({ ...m, url: normalizeUrl(m.url) })) || [],
			}
			: null;

	return (
		<div className="min-h-screen bg-gray-50">
			<NewsHero featuredPost={featuredPost} />
			<Suspense fallback={<NewsSkeleton />}>
				<NewsContentServer searchParams={params} />
			</Suspense>
		</div>
	);
}
