"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { videosData } from "@/lib/data/video";
import { formatDate } from "@/lib/utils";
import { Video } from "@/lib/types";

// Reusable Components
import { PageHero } from "@/components/gallery/page-hero";
import { ItemGallery } from "@/components/gallery/item-gallery";
import { ItemModal } from "@/components/gallery/item-modal";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const categories = [
	{ id: "all", name: "ទាំងអស់", name_en: "All" },
	{ id: "community", name: "សហគមន៍", name_en: "Community" },
	{ id: "education", name: "ការអប់រំ", name_en: "Education" },
	{ id: "culture", name: "វប្បធម៌", name_en: "Culture" },
	{ id: "sports", name: "កីឡា", name_en: "Sports" },
];

export default function VideosPage() {
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { t } = useTranslation();

	const handleVideoClick = (video: Video) => {
		setSelectedVideo(video);
		setIsModalOpen(true);
	};

	// This function is specific to rendering video content in the modal.
	// It's kept here because it's a concern of the Videos page.
	const renderVideoModalContent = (video: Video) => (
		<div className="space-y-4">
			<div className="aspect-video bg-black rounded-lg overflow-hidden">
				<iframe
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/$${video.videoId}`}
					title={video.title_en}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<div className="space-y-2">
				<div className="flex items-center space-x-4">
					<Badge className="bg-khmer-gold text-white">
						{categories.find((c) => c.id === video.category)?.name_en}
					</Badge>
					<div className="flex items-center text-sm text-gray-500">
						<Calendar className="w-4 h-4 mr-1" />
						{formatDate(video.date)}
					</div>
				</div>
				<p className="text-gray-600 leading-relaxed">{video.description}</p>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen">
			<PageHero
				title={t("nav.videos")}
				subtitle="ស្វែងយល់ពីសកម្មភាព និងកម្មវិធីរបស់យើងតាមរយៈវីដេអូ"
			/>

			{/* We can skip the separate "Featured" component for simplicity, 
                or create one following the same pattern if needed. 
                The ItemGallery is the main reusable part. */}

			<ItemGallery
				title="វីដេអូទាំងអស់"
				subtitle="Video Gallery"
				items={videosData}
				categories={categories}
				onItemClick={handleVideoClick}
			/>

			<ItemModal
				isOpen={isModalOpen}
				onOpenChange={setIsModalOpen}
				item={selectedVideo}
				renderContent={renderVideoModalContent}
			/>
		</div>
	);
}
