"use client";

import { Video } from "@/lib/types/video";
import { formatDate } from "@/lib/utils";
import { Badge, Calendar } from "lucide-react";

export const renderVideoModalContent = (video: Video) => (
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
		{video.categoryName && video.date && (
			<div className="space-y-2">
				<div className="flex items-center space-x-4">
					<Badge className="bg-blue-500 text-white">{video.categoryName}</Badge>
					<div className="flex items-center text-sm text-muted-foreground">
						<Calendar className="w-4 h-4 mr-1" />
						{formatDate(video.date)}
					</div>
				</div>
				<p className="text-muted-foreground leading-relaxed">
					{video.description}
				</p>
			</div>
		)}
	</div>
);
