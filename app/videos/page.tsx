import React from "react";
import {
	listVideosService,
	getVideoCategoriesService,
} from "@/service/video/video-service";
import type { Video } from "@/lib/types/video";




import type { Category } from "@/lib/types/category";
import { VideosPageClient } from "@/components/gallery/videos-page-client";
import { normalizeUrl } from "@/lib/utils/image";
import Loading from "@/app/loading";

export default async function VideosPage() {
	const [videosRes, categoriesRes] = await Promise.all([
		listVideosService({ sort: "-createdAt", page: 1, limit: 12 }),
		getVideoCategoriesService(),
	]);

	const rawVideos = videosRes.data ? videosRes.data : [];
	const initialVideos = rawVideos.map((video: Video) => ({
		...video,
		thumbnail: normalizeUrl(video.thumbnail),
	}));

	const initialTotalPages = videosRes.meta_data?.totalPages || 1;

	// Create a complete "All" category object that satisfies the Category type.
	const allCategory: Category = {
		id: "all",
		name: { en: "All", km: "ទាំងអស់" },
		parentId: null,
		description: {},
		createdAt: new Date(),
		updatedAt: new Date(),
		isActive: true,
	};

	// Prepend the valid "All" category to the list from the API.
	const initialCategories = [allCategory, ...categoriesRes];

	return (
		<React.Suspense fallback={<Loading />}>
			<VideosPageClient
				initialVideos={initialVideos}
				initialCategories={initialCategories}
				initialTotalPages={initialTotalPages}
			/>
		</React.Suspense>
	);
}
