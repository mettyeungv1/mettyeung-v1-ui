"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { ArrowRight, Heart, Play } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import Link from "next/link";
import { ItemCard } from "../gallery/item-card";
import { ItemModal } from "../gallery/item-modal";
import { renderVideoModalContent } from "../gallery/rendervideo";
import type { Video } from "@/lib/types/video";
import { GalleryItem } from "@/lib/types";

export function MissionSection() {
	const { t } = useTranslation();
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
	const [open, setOpen] = useState(false);
	const emptyGalleryItem: any = {
		title_en: "",
		description: "",
		thumbnail: `https://i.ytimg.com/vi/nPYt27aA7bM/hqdefault.jpg`,
		date: "",
		category: "",
		duration: "",
	};

	const defaultVideo: Video = {
		id: "",
		videoId: "nPYt27aA7bM",
		title_en: "",
		title_km: "",
		title: null,
		description: "",
		description_km: "",
		thumbnail: `https://i.ytimg.com/vi/nPYt27aA7bM/hqdefault.jpg`,
		date: "",
		category: "",
		categoryName: "",
		duration: "",
		viewCount: 0,
		isFeatured: false,
		publishedAt: "",
	};

	const onItemClick = () => setSelectedVideo(defaultVideo);
	return (
		<section className="section-padding bg-white">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<AnimatedSection direction="left" className="order-2 md:order-1">
						<div className="space-y-6 text-center lg:text-left">
							<h2 className="text-3xl md:text-4xl font-bold text-text-primary">
								{t("home.missionTitle")}
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed">
								{t("home.missionDesc")}
							</p>

							<div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
								<CTAButton href="/about" size="lg">
									<ArrowRight className="ml-2 w-5 h-5" />
									{t("common.learnMore")}
								</CTAButton>
								{/* <Button
									variant="outline"
									size="lg"
									asChild
									className="border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white"
								>
									<Link href="/contact" className="flex items-center">
										<Heart className="mr-2 w-5 h-5" />
										{t("home.becomeVolunteer")}
									</Link>
								</Button> */}
							</div>
						</div>
					</AnimatedSection>
					<AnimatedSection direction="right" className="order-1 lg:order-2">
						<ItemCard
							item={emptyGalleryItem}
							categoryName={""}
							onCardClick={onItemClick}
						/>
						<ItemModal
							isOpen={!!selectedVideo}
							onOpenChange={(open) => !open && setSelectedVideo(null)}
							item={selectedVideo ? { title_en: selectedVideo.title_en } : null}
							renderContent={() => renderVideoModalContent(selectedVideo!)}
						/>
					</AnimatedSection>
				</div>
			</div>
		</section>
	);
}
