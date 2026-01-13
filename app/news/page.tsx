import React from "react";
import { listBlogsService } from "@/service/blog/blog-service";
import { listCategoriesService } from "@/service/category/category-service";
import { NewsPageClient } from "@/components/news/news-page-client";

import { normalizeUrl } from "@/lib/utils/image";

const POSTS_PER_PAGE = 12;

export default async function NewsPage() {
	const [postRes, catRes] = await Promise.all([
		listBlogsService({ sort: "-publishedAt", limit: POSTS_PER_PAGE, page: 1 }),
		listCategoriesService(),
	]);

	const rawPosts = postRes.status_code === 200 && postRes.data?.data ? postRes.data.data : [];
	const initialPosts = rawPosts.map(post => ({
		...post,
		coverImageUrl: normalizeUrl(post.coverImageUrl),
		media: post.media?.map(m => ({ ...m, url: normalizeUrl(m.url) })) || []
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
