"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import {
	listVideosService,
} from "@/service/video/video-service";
import type { Video } from "@/lib/types/video";
import type { Category } from "@/lib/types/category";
import { PageHero } from "@/components/gallery/page-hero";
import { ItemGallery } from "@/components/gallery/item-gallery";
import { ItemModal } from "@/components/gallery/item-modal";
import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryItem } from "@/components/gallery/item-card";
import { renderVideoModalContent } from "@/components/gallery/rendervideo";

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

interface VideosPageClientProps {
	initialVideos: Video[];
	initialCategories: Category[];
	initialTotalPages: number;
}

export function VideosPageClient({
	initialVideos,
	initialCategories,
	initialTotalPages,
}: VideosPageClientProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get("category") || "all";

	// State for API data and loading
	const [videos, setVideos] = useState<Video[]>(initialVideos);
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [loading, setLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

	// Pagination state
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(1 < initialTotalPages);
	const [loadingMore, setLoadingMore] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	const { t } = useTranslation();

	// Handle category change
	const handleCategoryChange = async (categoryId: string) => {
		setSelectedCategory(categoryId);
		
		// Update URL
		const params = new URLSearchParams();
		if (categoryId !== "all") params.set("category", categoryId);
		window.history.pushState(null, "", `/videos?${params.toString()}`);

		setLoading(true);
		setPage(1);
		setVideos([]); // Clear existing videos

		const startTime = Date.now();

		try {
			const params: any = {
				sort: "-createdAt",
				page: 1,
				limit: 12,
			};
			if (categoryId !== "all") {
				params.categoryId = categoryId;
			}

			const res = await listVideosService(params);
			if (res.data) {
				setVideos(res.data);
				const totalPages = res.meta_data?.totalPages || 1;
				setHasMore(1 < totalPages);
			}
		} catch (error) {
			console.error("Failed to fetch videos for category:", error);
		} finally {
			// Ensure loading state lasts at least 500ms for smooth animation
			const elapsed = Date.now() - startTime;
			const remaining = Math.max(0, 500 - elapsed);
			setTimeout(() => {
				setLoading(false);
			}, remaining);
		}
	};

	// Load more videos
	const loadMoreVideos = useCallback(async () => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);
		const nextPage = page + 1;

		try {
			const params: any = {
				sort: "-createdAt",
				page: nextPage,
				limit: 12,
			};
			if (selectedCategory !== "all") {
				params.categoryId = selectedCategory;
			}

			const res = await listVideosService(params);
			if (res.data) {
				setVideos((prev) => [...prev, ...res.data]);
				setPage(nextPage);
				const totalPages = res.meta_data?.totalPages || 1;
				setHasMore(nextPage < totalPages);
			}
		} catch (error) {
			console.error("Failed to load more videos:", error);
		} finally {
			setLoadingMore(false);
		}
	}, [loadingMore, hasMore, page, selectedCategory]);

	const loadMoreRef = useRef(loadMoreVideos);
	useEffect(() => {
		loadMoreRef.current = loadMoreVideos;
	}, [loadMoreVideos]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		const currentTarget = observerTarget.current;
		if (!currentTarget) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreRef.current();
				}
			},
			{ threshold: 0.1, rootMargin: "100px" }
		);

		observer.observe(currentTarget);

		return () => {
			observer.disconnect();
		};
	}, []);

	// Transform API data into the format required by UI components
	const normalizedItems = useMemo((): (GalleryItem & {
		_original: Video;
	})[] => {
		return videos.map((video) => ({
			id: video.id,
			title_en: video.title_en,
			title: video.title,
			description: video.description,
			thumbnail: video.thumbnail,
			date: video.date,
			category: video.category,
			categoryName: video.categoryName,
			duration: video.duration,
			_original: video,
		}));
	}, [videos]);

	const handleVideoClick = (item: GalleryItem & { _original: Video }) => {
		setSelectedVideo(item._original);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero title={t("nav.videos")} subtitle={t("hero.videoDescription")} />
			{loading && categories.length === 0 ? (
				<GallerySkeleton />
			) : (
				<>
					<ItemGallery
						title="gallery.allVideos"
						subtitle="gallery.videoGallery"
						items={normalizedItems}
						categories={categories.map((c) => ({
							id: c.id,
							name_en: c.name.en || c.id,
						}))}
						selectedCategory={selectedCategory}
						onCategoryChange={handleCategoryChange}
						onItemClick={handleVideoClick}
						loadingMore={loadingMore}
						hasMore={hasMore}
						loading={loading}
					/>
					{/* Intersection Observer Target */}
					<div ref={observerTarget} className="h-4" />
				</>
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
