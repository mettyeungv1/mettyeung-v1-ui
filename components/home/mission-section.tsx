"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { ArrowRight, Users, Award, UserCheck, HeartHandshake, Play, BookOpen } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ItemModal } from "../gallery/item-modal";
import { renderVideoModalContent } from "../gallery/rendervideo";
import type { Video } from "@/lib/types/video";

export function MissionSection() {
	const { t } = useTranslation();
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

	const defaultVideo: Video = {
		id: "",
		videoId: "nPYt27aA7bM",
		title_en: "",
		title_km: "",
		title: null,
		description: "",
		description_km: "",
		thumbnail: `https://i.ytimg.com/vi/nPYt27aA7bM/maxresdefault.jpg`,
		date: "",
		category: "",
		categoryName: "",
		duration: "",
		viewCount: 0,
		isFeatured: false,
		publishedAt: "",
	};

	const onItemClick = () => setSelectedVideo(defaultVideo);

    const membershipTypes = [
        {
            key: "founding",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            hoverBg: "group-hover:bg-blue-600"
        },
        {
            key: "honorary",
            icon: Award,
            color: "text-amber-500",
            bg: "bg-amber-50",
            hoverBg: "group-hover:bg-amber-500"
        },
        {
            key: "active",
            icon: UserCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            hoverBg: "group-hover:bg-emerald-600"
        },
        {
            key: "supporting",
            icon: HeartHandshake,
            color: "text-rose-500",
            bg: "bg-rose-50",
            hoverBg: "group-hover:bg-rose-500"
        }
    ];

	return (
		<section className="section-md surface-muted relative overflow-hidden">
			<div className="container relative z-10 max-w-7xl mx-auto">
                {/* 1. History & Video Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
					
                    {/* History Text & Info Callout */}
                    <AnimatedSection direction="left" className="order-2 lg:order-1">
						<div className="space-y-6">
							<h2 className="text-heading-1">
                                <span className="inline-block pt-2 pb-4 text-primary-900">
                                    {t("home.ourHistory")}
                                </span>
							</h2>
							
                            <p className="text-body-lg text-gray-700 text-justify">
								{t("home.ourHistoryDetail")}
							</p>
                            
                            {/* Premium Callout Box */}
                            <div className="card-base group mt-8 relative overflow-hidden transition-all duration-200 hover:shadow-popover">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-interactive-primary" />
                                <div className="p-card-md">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2.5 bg-interactive-primaryMuted rounded-xl shrink-0 text-primary-900 border border-border-subtle group-hover:bg-interactive-primary group-hover:text-white transition-all duration-200">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-heading-4 mt-1">
                                            {t("home.ourHistoryMembershipInfo.title")}
                                        </h3>
                                    </div>
                                    <p className="text-body text-gray-600 text-justify sm:pl-16">
                                        {t("home.ourHistoryMembershipInfo.content")}
                                    </p>
                                </div>
                            </div>

							<div className="pt-6 flex justify-center lg:justify-start">
								<Button asChild size="xl" className="bg-primary-900 text-white hover:bg-primary-950">
									<Link href="/about">
										{t("common.learnMore")}
										<ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
									</Link>
								</Button>
							</div>
						</div>
					</AnimatedSection>

					{/* Interactive Video/Gallery Card */}
                    <AnimatedSection direction="right" className="order-1 lg:order-2">
                        <div className="relative max-w-lg mx-auto lg:max-w-none group">
                            {/* Decorative offset pane */}
                            <div className="absolute -inset-4 md:-inset-6 rounded-xl border border-border-subtle bg-surface-panel z-0" />
                            
                            {/* Main Video Card */}
                            <div 
                                className="relative z-10 aspect-video cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-gray-900 shadow-surface transition-transform duration-300 group-hover:-translate-y-0.5"
                                onClick={onItemClick}
                            >
                                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src={defaultVideo.thumbnail} 
                                    alt="Video Thumbnail" 
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                                {/* Play Button Overlay — visible on hover only */}
                                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-popover transition-all duration-300 group-hover:scale-105 group-hover:bg-white text-primary-900">
                                        <Play className="w-8 h-8 ml-1 fill-current" />
                                    </div>
                                </div>
                                
                                {/* Subtle gradient overlay at bottom for depth */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                            </div>
                        </div>

						<ItemModal
							isOpen={!!selectedVideo}
							onOpenChange={(open) => !open && setSelectedVideo(null)}
							item={selectedVideo ? { title_en: selectedVideo.title_en } : null}
							renderContent={() => renderVideoModalContent(selectedVideo!)}
						/>
					</AnimatedSection>
				</div>

                {/* 2. Bento-Box Membership Types Grid */}
                <AnimatedSection direction="up" className="pt-16 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-heading-2 mb-6">
                            {t("home.membershipTypesTitle")}
                        </h3>
                        <div className="w-24 h-1.5 bg-interactive-primary rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {membershipTypes.map((type, index) => {
                            const Icon = type.icon;
                            return (
                                <AnimatedSection key={type.key} delay={index * 0.1}>
                                    <div className="card-interactive flex flex-col h-full p-card-lg group">
                                        {/* Sub-element icon transition */}
                                        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-8 transition-colors duration-400 ${type.bg} ${type.hoverBg}`}>
                                            <Icon className={`w-8 h-8 transition-colors duration-400 ${type.color} group-hover:text-white`} />
                                        </div>
                                        <h4 className="text-heading-4 mb-4 group-hover:text-primary-900 transition-colors duration-300">
                                            {t(`home.membershipTypes.${type.key}.title`)}
                                        </h4>
                                        <p className="text-body-sm text-gray-600">
                                            {t(`home.membershipTypes.${type.key}.description`)}
                                        </p>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </AnimatedSection>
			</div>
		</section>
	);
}
