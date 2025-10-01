"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
	listVideosService,
	getVideoCategoriesService,
} from "@/service/video/video-service";
import { formatDate } from "@/lib/utils";
import type { Video } from "@/lib/types/video";
import type { Category } from "@/lib/types/category";
import { PageHero } from "@/components/gallery/page-hero";
import { ItemGallery } from "@/components/gallery/item-gallery";
import { ItemModal } from "@/components/gallery/item-modal";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";
import type { GalleryItem } from "@/components/gallery/item-card";
import { log } from "console";

// A loading skeleton for a better user experience
const GallerySkeleton = () => (
	<div className="container section-padding">
		<div className="mb-8">
			<Skeleton className="h-10 w-1/2" />
		</div>
		<Skeleton className="h-12 w-full mb-8" />
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="space-y-3">
					<Skeleton className="aspect-video w-full rounded-lg" />
					<Skeleton className="h-5 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			))}
		</div>
	</div>
);

export default function VideosPage() {
	// State for API data and loading
	const [videos, setVideos] = useState<Video[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

	const { t } = useTranslation();

	// Fetch data on component mount
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [videosRes, categoriesRes] = await Promise.all([
					listVideosService({ sort: "-createdAt", limit: 12 }),
					getVideoCategoriesService(),
				]);

				if (videosRes.data) {
					setVideos(videosRes.data);
				}

				// --- THIS IS THE CORRECTED PART ---
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
				setCategories([allCategory, ...categoriesRes]);
			} catch (error) {
				console.error("Failed to fetch video data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Transform API data into the format required by UI components
	const normalizedItems = useMemo((): (GalleryItem & {
		_original: Video;
	})[] => {
		return videos.map((video) => ({
			id: video.id,
			title_en: video.title_en,
			description: video.description,
			thumbnail: video.thumbnail,
			date: video.date,
			category: video.category,
			categoryName: video.categoryName,
			duration: video.duration,
			_original: video,
		}));
	}, [videos]);

	const filteredItems = useMemo(() => {
		if (selectedCategory === "all") {
			return normalizedItems;
		}
		return normalizedItems.filter((item) => item.category === selectedCategory);
	}, [normalizedItems, selectedCategory]);

	const handleVideoClick = (item: GalleryItem & { _original: Video }) => {
		setSelectedVideo(item._original);
	};

	const renderVideoModalContent = (video: Video) => (
		<div className="space-y-4">
			<div className="aspect-video bg-black rounded-lg overflow-hidden">
				<iframe
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
					title={video.title_en}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<div className="space-y-2">
				<div className="flex items-center space-x-4">
					<Badge className="bg-primary text-primary-foreground">
						{video.categoryName}
					</Badge>
					<div className="flex items-center text-sm text-muted-foreground">
						<Calendar className="w-4 h-4 mr-1" />
						{formatDate(video.date)}
					</div>
				</div>
				<p className="text-muted-foreground leading-relaxed">
					{video.description}
				</p>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero
				title={t("nav.videos")}
				subtitle="Explore our activities and programs through video"
			/>
			{loading ? (
				<GallerySkeleton />
			) : (
				<ItemGallery
					title="All Videos"
					subtitle="Video Gallery"
					items={filteredItems}
					categories={categories.map((c) => ({
						id: c.id,
						name_en: c.name.en || c.id,
					}))}
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					onItemClick={handleVideoClick}
				/>
			)}

			<ItemModal
				isOpen={!!selectedVideo}
				onOpenChange={(open) => !open && setSelectedVideo(null)}
				item={selectedVideo ? { title_en: selectedVideo.title_en } : null}
				renderContent={() => renderVideoModalContent(selectedVideo!)}
			/>
		</div>
	);
}
