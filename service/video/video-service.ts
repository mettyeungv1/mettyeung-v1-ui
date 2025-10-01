import { fetchAPI } from "@/lib/api";
import {
	VIDEO_ENDPOINT,
	CATEGORY_ENDPOINT,
	MEDIA_ENDPOINT,
} from "@/lib/static";
import type { Video, APIVideoPost } from "@/lib/types/video";
import type { Category } from "@/lib/types/category";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";

/**
 * Normalizes a raw video post from the API into a clean, consistent Video type for the frontend.
 */
function normalizeVideoData(video: APIVideoPost): Video {
	const title_en = video.title?.[DEFAULT_LANGUAGE_CODE] || "Untitled Video";
	const description = video.description?.[DEFAULT_LANGUAGE_CODE] || "";
	const categoryName =
		video.category?.name?.[DEFAULT_LANGUAGE_CODE] || "Uncategorized";

	return {
		...video,
		title_en,
		description,
		thumbnail: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
		date: video.publishedAt || video.createdAt,
		category: video.categoryId,
		categoryName,
	};
}

/**
 * Fetches a paginated list of videos from the API.
 */
export const listVideosService = async (
	params: { [key: string]: any } = {}
): Promise<any> => {
	// Clean up params to remove null/undefined/empty values and the "all" category
	const cleanParams: Record<string, string> = {};
	for (const key in params) {
		if (params[key] != null && params[key] !== "" && params[key] !== "all") {
			cleanParams[key] = String(params[key]);
		}
	}
	const queryParams = new URLSearchParams(cleanParams).toString();

	const url = queryParams ? `${VIDEO_ENDPOINT}?${queryParams}` : VIDEO_ENDPOINT;
	const response = await fetchAPI<{ data: APIVideoPost[]; meta_data: any }>(
		url
	);

	const paginatedData = response.data as any;
	const normalizedVideos = paginatedData.map((d: any) => normalizeVideoData(d));

	return {
		data: normalizedVideos,
		meta_data: paginatedData.meta_data,
	};
};

/**
 * Fetches all available video categories for filtering.
 */
export const getVideoCategoriesService = async (): Promise<Category[]> => {
	// Assuming a general category endpoint that can be filtered by type
	const response = await fetchAPI<{ data: Category[] }>(
		`${CATEGORY_ENDPOINT}?type=video`
	);
	return Array.isArray(response.data) ? response.data : [];
};
