"use client";

import { Video } from "@/lib/types/video";
import { formatDate } from "@/lib/utils";
import { Calendar, Eye, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";


export const renderVideoModalContent = (video: Video) => {
	
	return (
		<div className="flex flex-col h-full sm:h-auto overflow-y-auto bg-white">
			{/* Video Player - Full width on mobile */}
			<div className="shrink-0 w-full aspect-video bg-black sticky top-0 z-10 sm:relative sm:rounded-t-lg overflow-hidden">
				<iframe
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
					title={video.title_en}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="absolute inset-0 w-full h-full"
				></iframe>
			</div>

			{/* Video Information - Scrollable Content */}
			<div className="flex-1 p-5 sm:p-8 space-y-8 pb-20 sm:pb-8">
				{/* Title Section */}
				<div className="space-y-3">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug tracking-tight">
						{video.title_en}
					</h2>
					{video.title_km && (
						<h3 className="text-lg font-medium text-gray-500 leading-relaxed font-khmer">
							{video.title_km}
						</h3>
					)}
				</div>

				{/* Metadata Bar */}
				{(video.categoryName || video.date || video.viewCount >= 0 || video.duration) && (
					<div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 border-y border-gray-100">
						{video.categoryName && (
							<Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-1.5 text-sm font-medium border-transparent shrink-0">
								{video.categoryName} 
							</Badge>
						)}
						
						<div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 font-medium">
							{video.date && (
								<div className="flex items-center gap-2" title="Published Date">
									<Calendar className="w-4 h-4 text-gray-400" />
									<span>{formatDate(video.date)}</span>
								</div>
							)}

							{video.viewCount >= 0 && (
								<div className="flex items-center gap-2" title="Total Views">
									<Eye className="w-4 h-4 text-gray-400" />
									<span>{video.viewCount.toLocaleString()}</span>
								</div>
							)}

							{video.duration && (
								<div className="flex items-center gap-2" title="Duration">
									<Clock className="w-4 h-4 text-gray-400" />
									<span>{video.duration}</span>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Description Section */}
				{(video.description || video.description_km) && (
					<div className="space-y-6 pt-2">
						{video.description && (
							<div className="space-y-2">
								<h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
									Description
								</h4>
								<p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
									{video.description}
								</p>
							</div>
						)}

						{video.description_km && (
							<div className="space-y-2">
								<h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
									ការពិពណ៌នា
								</h4>
								<p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line font-khmer">
									{video.description_km}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
