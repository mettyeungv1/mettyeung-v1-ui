"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

import { Banner } from "@/lib/types/banner";
import { API_BASE_URL } from "@/lib/static";
import { useTranslation } from "@/lib/i18n";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const MotionImage = motion(Image);

const kenBurnsVariants = {
	active: { scale: 1.1 },
	inactive: { scale: 1 },
};

export function HeroCarousel({ banners }: { banners: Banner[] }) {
	const { t } = useTranslation();

	if (banners.length === 0) {
		return (
			<div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden group bg-gray-100 flex items-center justify-center">
				<div className="text-lg text-gray-600">{t("hero.noBanners")}</div>
			</div>
		);
	}

	return (
		<div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden group bg-gray-100">
			<Swiper
				modules={[Navigation, Autoplay, EffectFade]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				slidesPerView={1}
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				}}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				loop={banners.length > 1}
				className="h-full w-full"
			>
				{banners.map((banner, index) => (
					<SwiperSlide
						key={banner.id}
						className="relative h-full w-full my-[50px]"
					>
						{({ isActive }) => (
							<MotionImage
								src={`${API_BASE_URL}/media/view/${banner.media.url}`}
								alt={banner.media.altText || `Banner ${banner.order}`}
								fill
								priority={index === 0}
								className="object-cover sm:object-contain"
								sizes="100vw"
								variants={kenBurnsVariants}
							/>
						)}
					</SwiperSlide>
				))}

				{/* Navigation controls */}
				<div className="swiper-button-prev !left-4 sm:!left-6 !w-12 !h-12 !text-white !bg-black/20 hover:!bg-black/40 !rounded-full transition-colors after:!text-lg"></div>
				<div className="swiper-button-next !right-4 sm:!right-6 !w-12 !h-12 !text-white !bg-black/20 hover:!bg-black/40 !rounded-full transition-colors after:!text-lg"></div>
			</Swiper>
		</div>
	);
}
