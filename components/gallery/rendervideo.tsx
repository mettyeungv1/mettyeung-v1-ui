"use client";

import { Video } from "@/lib/types/video";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Eye } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

function VideoModalContent({ video }: { video: Video }) {
	const { t } = useTranslation();
	const hasDescription = Boolean(video.description || video.description_km);

	return (
		<div className="grid bg-white lg:max-h-[92vh] lg:overflow-hidden lg:grid-cols-[minmax(0,1fr)_380px]">
			<div className="bg-black lg:flex lg:min-h-[540px] lg:items-center">
				<div className="relative aspect-video w-full">
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
						title={video.title_en}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="absolute inset-0 h-full w-full"
					/>
				</div>
			</div>

			<aside className="border-t border-gray-100 bg-white p-5 pb-10 sm:p-6 lg:min-h-0 lg:overflow-y-auto lg:max-h-[92vh] lg:border-l lg:border-t-0 lg:p-7">
				<div className="mb-4 min-h-5">
					{video.categoryName && (
						<span className="text-caption font-semibold uppercase tracking-wide text-primary-700">
							{video.categoryName}
						</span>
					)}
				</div>

				<h2 className="text-heading-3 leading-tight text-primary-950">
					{video.title_en}
				</h2>
				{video.title_km && (
					<h3 className="mt-2 text-body-lg text-gray-500 font-khmer">
						{video.title_km}
					</h3>
				)}

				{(video.date || video.duration || video.viewCount > 0) && (
					<div className="mt-5 space-y-3 border-y border-gray-100 py-5 text-caption font-medium text-gray-500">
						{video.date && (
							<div className="flex items-center gap-2" title={t("video.publishedDate")}>
								<Calendar className="h-4 w-4 shrink-0 text-primary-700" />
								<span>{formatDate(video.date)}</span>
							</div>
						)}
						{video.duration && (
							<div className="flex items-center gap-2" title={t("video.duration")}>
								<Clock className="h-4 w-4 shrink-0 text-primary-700" />
								<span>{video.duration}</span>
							</div>
						)}
						{video.viewCount > 0 && (
							<div className="flex items-center gap-2" title={t("video.totalViews")}>
								<Eye className="h-4 w-4 shrink-0 text-primary-700" />
								<span>{video.viewCount.toLocaleString()}</span>
							</div>
						)}
					</div>
				)}

				{hasDescription && (
					<div className="mt-5">
						<h4 className="mb-3 text-caption font-semibold uppercase tracking-wide text-gray-400">
							{t("video.description")}
						</h4>
						<div className="space-y-4 rounded-lg bg-gray-50 p-4">
							{video.description && (
								<p className="whitespace-pre-line text-body-sm leading-relaxed text-gray-700">
									{video.description}
								</p>
							)}
							{video.description_km && (
								<p className="whitespace-pre-line text-body-sm leading-relaxed text-gray-700 font-khmer">
									{video.description_km}
								</p>
							)}
						</div>
					</div>
				)}
			</aside>
		</div>
	);
}

export const renderVideoModalContent = (video: Video) => {
	return <VideoModalContent video={video} />;
};
