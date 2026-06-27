"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Award,
	BookOpen,
	HeartHandshake,
	Play,
	ScrollText,
	UserCheck,
	Users,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { ItemModal } from "@/components/gallery/item-modal";
import { renderVideoModalContent } from "@/components/gallery/rendervideo";
import type { Video } from "@/lib/types/video";

const membershipTypes = [
	{ key: "founding", icon: Users },
	{ key: "honorary", icon: Award },
	{ key: "active", icon: UserCheck },
	{ key: "supporting", icon: HeartHandshake },
];

const defaultVideo: Video = {
	id: "home-history-video",
	videoId: "nPYt27aA7bM",
	title_en: "Mett Yeung Association",
	title_km: "",
	title: null,
	description: "",
	description_km: "",
	thumbnail: "https://i.ytimg.com/vi/nPYt27aA7bM/maxresdefault.jpg",
	date: "",
	category: "",
	categoryName: "",
	duration: "",
	viewCount: 0,
	isFeatured: false,
	publishedAt: "",
};

export function MissionSection() {
	const { t } = useTranslation();
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

	return (
		<section className="bg-white py-16 md:py-20">
			<div className="container">
				<AnimatedSection className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
					<div>
						{/* <p className="text-caption font-bold uppercase tracking-wide text-primary-700">
							{t("home.ourHistory")}
						</p> */}
						<h2 className="mt-3 max-w-3xl text-heading-1 text-primary-950">
							{t("home.focusAreas")}
						</h2>
					</div>
					{/* <p className="max-w-3xl text-body-lg leading-relaxed text-gray-600 lg:justify-self-end">
						{t("home.focusAreasDesc")}{" "}
						<span className="font-semibold text-primary-900">
							&quot;{t("home.focusAreas")}&quot;
						</span>
					</p> */}
				</AnimatedSection>

				<div className="overflow-hidden rounded-lg border border-border-subtle bg-surface-muted shadow-sm">
					<div className="grid lg:grid-cols-[0.95fr_1.05fr]">
						<AnimatedSection direction="none" className="h-full">
							<button
								type="button"
								onClick={() => setSelectedVideo(defaultVideo)}
								className="group relative block min-h-[280px] w-full overflow-hidden bg-primary-950 text-left sm:min-h-[380px] lg:h-full"
								aria-label={t("hero.watchVideo")}
							>
								<Image
									src={defaultVideo.thumbnail}
									alt={t("hero.videoDescription")}
									fill
									priority={false}
									sizes="(max-width: 1024px) 100vw, 48vw"
									className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/25 to-transparent" />
								<div className="absolute left-6 top-6">
									<Badge className="bg-white text-primary-950 hover:bg-white">
										{t("hero.watchVideo")}
									</Badge>
								</div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
										<span className="absolute inset-0 rounded-full border border-white/70 opacity-0 transition-all duration-500 group-hover:-inset-3 group-hover:opacity-100" />
										<Play className="ml-1 h-7 w-7 fill-current" />
									</div>
								</div>
								<div className="absolute inset-x-0 bottom-0 p-6 text-white">
									<h3 className="max-w-md text-heading-3 text-white">
										{t("hero.videoDescription")}
									</h3>
								</div>
							</button>
						</AnimatedSection>

					<AnimatedSection direction="up" className="h-full" delay={0.08}>
						<div className="flex h-full flex-col justify-center bg-white p-6 sm:p-8 lg:p-10">
							<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-900">
								<ScrollText className="h-6 w-6" />
							</div>
							<h3 className="text-heading-2 text-primary-950">
								{t("home.ourHistory")}
							</h3>
							<p className="mt-5 text-body-lg leading-relaxed text-gray-700">
								{t("home.ourHistoryDetail")}
							</p>

								<div className="mt-8 border-t border-border-subtle pt-7">
									<div className="mb-4 flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-900">
											<BookOpen className="h-5 w-5" />
										</div>
										<h4 className="text-heading-4 text-primary-950">
											{t("home.ourHistoryMembershipInfo.title")}
										</h4>
									</div>
									<p className="text-body leading-relaxed text-gray-600">
										{t("home.ourHistoryMembershipInfo.content")}
									</p>
								</div>
							</div>
						</AnimatedSection>
					</div>
				</div>

				<div id="membership" className="scroll-mt-24 pt-16">
					<AnimatedSection direction="up">
						<div className="mx-auto mb-10 max-w-3xl text-center">
							<p className="text-caption font-bold uppercase tracking-wide text-primary-700">
								{t("home.membership.eyebrow")}
							</p>
							<h3 className="mt-2 text-heading-2 text-primary-950">
								{t("home.membershipTypesTitle")}
							</h3>
							<p className="mt-4 text-body text-gray-600">
								{t("home.membership.subtitle")}
							</p>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{membershipTypes.map(({ key, icon: Icon }, index) => (
								<AnimatedSection key={key} delay={index * 0.08} className="h-full">
									<div className="group h-full rounded-lg border border-border-subtle bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md">
										<div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-900 transition-colors group-hover:bg-primary-900 group-hover:text-white">
											<Icon className="h-5 w-5" />
										</div>
										<h4 className="text-heading-4 text-primary-950">
											{t(`home.membershipTypes.${key}.title`)}
										</h4>
										<p className="mt-3 text-body-sm leading-relaxed text-gray-600">
											{t(`home.membershipTypes.${key}.description`)}
										</p>
									</div>
								</AnimatedSection>
							))}
						</div>
					</AnimatedSection>
				</div>

				<ItemModal
					isOpen={!!selectedVideo}
					onOpenChange={(open) => !open && setSelectedVideo(null)}
					item={selectedVideo ? { title_en: selectedVideo.title_en } : null}
					renderContent={() => renderVideoModalContent(selectedVideo!)}
				/>
			</div>
		</section>
	);
}
