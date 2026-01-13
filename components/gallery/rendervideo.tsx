"use client";

import { Video } from "@/lib/types/video";
import { formatDate } from "@/lib/utils";
import { Badge, Calendar } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";


export const renderVideoModalContent = (video: Video) => {
	const { t } = useTranslation();
	
	return (
	<div className="space-y-4">
		{/* Video Player */}
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

		{/* Video Information */}
		<div className="space-y-5">
			{/* Title Section */}
			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-gray-900 leading-tight">
					{video.title_en}
				</h2>
				{video.title_km && (
					<h3 className="text-lg font-medium text-gray-600">
						{video.title_km}
					</h3>
				)}
			</div>

			{/* Metadata Bar */}
			<div className="flex flex-wrap items-center gap-3 py-3 border-y border-gray-200">
				{video.categoryName && (
					<Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
						{video.categoryName}
					</Badge>
				)}
				
				{video.date && (
					<div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
						<Calendar className="w-4 h-4" />
						<span className="font-medium">{formatDate(video.date)}</span>
					</div>
				)}

				{video.viewCount > 0 && (
					<div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
						<svg 
							className="w-4 h-4" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								strokeLinecap="round" 
								strokeLinejoin="round" 
								strokeWidth={2} 
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
							/>
							<path 
								strokeLinecap="round" 
								strokeLinejoin="round" 
								strokeWidth={2} 
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
							/>
						</svg>
						<span className="font-medium">{video.viewCount.toLocaleString()} views</span>
					</div>
				)}

				{video.duration && (
					<div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
						<svg 
							className="w-4 h-4" 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path 
								strokeLinecap="round" 
								strokeLinejoin="round" 
								strokeWidth={2} 
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
							/>
						</svg>
						<span className="font-medium">{video.duration}</span>
					</div>
				)}
			</div>

			{/* Description Section */}
			{video.description && (
				<div className="space-y-2">
					<h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
						Description
					</h4>
					<p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
						{video.description}
					</p>
				</div>
			)}

			{video.description_km && (
				<div className="space-y-2">
					<h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
						ការពិពណ៌នា
					</h4>
					<p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
						{video.description_km}
					</p>
				</div>
			)}
		</div>
	</div>
	);
};
