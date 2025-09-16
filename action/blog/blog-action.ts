"use server";

import {
	getBlogByIdService,
	getFeaturedBlogService,
	listBlogsService,
} from "@/service/blog/blog-service";

export const listBlogsAction = async (params: any) => {
	return await listBlogsService(params);
};

export const getBlogByIdAction = async (id: string) => {
	return await getBlogByIdService(id);
};

export const getFeaturedBlogAction = async () => {
	return await getFeaturedBlogService();
};

