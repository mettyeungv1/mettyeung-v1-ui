"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { ArrowRight, Users, Award, UserCheck, HeartHandshake, Play, BookOpen } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CTAButton } from "@/components/ui/cta-button";
import { ItemModal } from "../gallery/item-modal";
import { renderVideoModalContent } from "../gallery/rendervideo";
import type { Video } from "@/lib/types/video";

export function MissionSection() {
	const { language, t } = useTranslation();
	const isKhmer = language === "km";
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
		<section className="section-padding bg-gray-50 relative overflow-hidden">
            {/* Embedded UI/UX Pro Max Decorative Orbs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
			<div className="container relative z-10 max-w-7xl mx-auto">
                {/* 1. History & Video Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
					
                    {/* History Text & Info Callout */}
                    <AnimatedSection direction="left" className="order-2 lg:order-1">
						<div className="space-y-6">
							<h2 className="text-4xl md:text-5xl font-bold leading-[1.55]">
                                <span className={isKhmer ? "inline-block pt-2 pb-4 text-blue-600" : "inline-block pt-2 pb-4 text-indigo-600"}>
                                    {t("home.ourHistory")}
                                </span>
							</h2>
							
                            <p className="text-lg text-gray-700 leading-relaxed font-medium text-justify">
								{t("home.ourHistoryDetail")}
							</p>
                            
                            {/* Premium Callout Box */}
                            <div className="mt-8 relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />
                                <div className="p-6 sm:p-7">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2.5 bg-blue-50 rounded-xl shrink-0 text-blue-600 shadow-sm border border-blue-100/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 leading-snug mt-1">
                                            {t("home.ourHistoryMembershipInfo.title")}
                                        </h3>
                                    </div>
                                    <p className="text-base text-gray-600 leading-relaxed text-justify sm:pl-16">
                                        {t("home.ourHistoryMembershipInfo.content")}
                                    </p>
                                </div>
                            </div>

							<div className="pt-6 flex justify-center lg:justify-start">
								<CTAButton href="/about" size="lg" className="shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700">
									{t("common.learnMore")}
                                    <ArrowRight className="ml-2 w-5 h-5" />
								</CTAButton>
							</div>
						</div>
					</AnimatedSection>

					{/* Interactive Video/Gallery Card */}
                    <AnimatedSection direction="right" className="order-1 lg:order-2">
                        <div className="relative max-w-lg mx-auto lg:max-w-none group">
                            {/* Decorative offset pane */}
                            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-blue-200/50 to-indigo-100/50 rounded-[2rem] transform rotate-3 scale-105 z-0 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 opacity-70" />
                            
                            {/* Main Video Card */}
                            <div 
                                className="relative z-10 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer bg-gray-900 transition-transform duration-500 group-hover:-translate-y-2"
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
                                    <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white text-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
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
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                            {t("home.membershipTypesTitle")}
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {membershipTypes.map((type, index) => {
                            const Icon = type.icon;
                            return (
                                <AnimatedSection key={type.key} delay={index * 0.1}>
                                    <div className="flex flex-col h-full p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 hover:-translate-y-1.5 transition-all duration-300 group">
                                        {/* Sub-element icon transition */}
                                        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-8 transition-colors duration-400 ${type.bg} ${type.hoverBg}`}>
                                            <Icon className={`w-8 h-8 transition-colors duration-400 ${type.color} group-hover:text-white`} />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                                            {t(`home.membershipTypes.${type.key}.title`)}
                                        </h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
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
