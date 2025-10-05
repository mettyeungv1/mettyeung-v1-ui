import { fetchAPI } from "@/lib/api";
import { BLOG_ENDPOINT, MEDIA_ENDPOINT } from "@/lib/static";
import type { BlogMedia, BlogPost, Paginated } from "@/lib/types/blog";

type ListParams = {
	page?: number;
	limit?: number;
	q?: string;
	categoryId?: string;
	sort?: string; // e.g. "-createdAt"
	isFeatured?: boolean;
	lang?: string; // backend supports i18n on some endpoints
};

function normalizeMediaUrls(post: BlogPost): BlogPost {
	const normalizeUrl = (url?: string | null) =>
		url ? `${MEDIA_ENDPOINT}/view/${url}` : url;

	return {
		...post,
		coverImageUrl: normalizeUrl(post.coverImageUrl ?? undefined) ?? null,
		media: (post.media || []).map((m: BlogMedia) => ({
			...m,
			url: normalizeUrl(m.url)!,
		})),
	};
}

// List posts with filters/pagination
export const listBlogsService = async (
	params: ListParams = {}
): Promise<APIResponse<Paginated<BlogPost>>> => {
	const qs = new URLSearchParams(
		Object.entries(params).reduce((acc, [k, v]) => {
			if (v !== undefined && v !== null && v !== "") acc[k] = String(v);
			return acc;
		}, {} as Record<string, string>)
	).toString();

	const url = qs ? `${BLOG_ENDPOINT}?${qs}` : BLOG_ENDPOINT;
	const res = await fetchAPI<any>(url);

	// Backend returns data: BlogPost[] directly
	if (Array.isArray(res?.data)) {
		const items: BlogPost[] = res.data.map(normalizeMediaUrls);
		const wrapped: APIResponse<Paginated<BlogPost>> = {
			...res,
			data: { data: items },
		};
		return wrapped;
	}

	// Already in paginated form
	if (res?.data?.data) {
		res.data = {
			...res.data,
			data: res.data.data.map((p: BlogPost) => normalizeMediaUrls(p)),
		};
	}
	return res as APIResponse<Paginated<BlogPost>>;
};

// Single post
export const getBlogByIdService = async (
	id: string
): Promise<APIResponse<BlogPost>> => {
	const res = await fetchAPI<BlogPost>(`${BLOG_ENDPOINT}/${id}`);
	if (res?.data) res.data = normalizeMediaUrls(res.data);
	return res;
};

export const getBlogRelatedPostService = async (
	id: string
): Promise<APIResponse<any>> => {
	const res = await fetchAPI<any>(`${BLOG_ENDPOINT}/${id}/related`);
	if (res?.data) {
		res.data = {
			...res.data,
			data: res.data.map((p: BlogPost) => normalizeMediaUrls(p)),
		};
	}
	return res;
};

export const getFeaturedBlogService = async (): Promise<
	APIResponse<BlogPost>
> => {
	const res = await fetchAPI<BlogPost>(`${BLOG_ENDPOINT}/featured`);
	if (res?.data) res.data = normalizeMediaUrls(res.data);
	return res;
};
