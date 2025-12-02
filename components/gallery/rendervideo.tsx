"use client";

import { Video } from "@/lib/types/video";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";

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
		<div className="space-y-4">
			{/* Metadata Card */}
			<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
				<div className="flex items-center justify-between flex-wrap gap-3">
					{/* Logo & Category */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center p-1.5">
							<Image 
								src="/logo.png" 
								alt="logo" 
								width={32} 
								height={32} 
								className="w-full h-full object-contain" 
							/>
						</div>
						<div>
							<p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
							<p className="text-sm font-semibold text-gray-900">{video.categoryName}</p>
						</div>
					</div>
					
					{/* Date */}
					<div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
						<Calendar className="w-4 h-4 text-gray-500" />
						<span className="text-sm font-medium text-gray-700">{formatDate(video.date)}</span>
					</div>
				</div>
			</div>
			
			{/* Description */}
			{video.description && <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
				<h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">About</h3>
				<p className="text-gray-700 leading-relaxed text-sm">
					{video.description}
				</p>
			</div>}
			
		</div>
	)}
	</div>
);
