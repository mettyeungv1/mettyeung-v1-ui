"use server";

import { toMediaUrl } from "@/lib/utils/image";
import type { BlogPost } from "@/lib/types/blog";
import { listBlogsService } from "@/service/blog/blog-service";

export type FetchNormalizedPostsParams = {
	page?: number;
	limit?: number;
	q?: string;
	categoryId?: string;
	sort?: string;
	isFeatured?: boolean;
	lang?: string;
};

function normalizePostImages(post: BlogPost): BlogPost {
	return {
		...post,
		coverImageUrl: toMediaUrl(post.coverImageUrl),
		media: post.media.map((media) => ({
			...media,
			url: toMediaUrl(media.url),
		})),
		author: post.author
			? {
				...post.author,
				avatarUrl: toMediaUrl(post.author.avatarUrl),
			}
			: post.author,
	};
}

/**
 * Fetch list data on the server so media URLs use the Docker-reachable API host
 * before they are passed to client-side pagination and filtering UI.
 */
export async function fetchNormalizedPosts(params: FetchNormalizedPostsParams) {
	const response = await listBlogsService(params);

	if (!response.data?.data) return response;

	return {
		...response,
		data: {
			...response.data,
			data: response.data.data.map(normalizePostImages),
		},
	};
}
