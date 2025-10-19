"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

import { getBannersService } from "@/service/banner/banner-service";
import { Banner } from "@/lib/types/banner";
import { API_BASE_URL } from "@/lib/static";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { SpinnerEmpty } from "./common/spinner";

const MotionImage = motion(Image);

const kenBurnsVariants = {
	active: { scale: 1.1 },
	inactive: { scale: 1 },
};

export function HeroCarousel() {
	const [banners, setBanners] = useState<Banner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBanners = async () => {
			try {
				setLoading(true);
				const response = await getBannersService();

				if (response.status_code === 200 && response.data) {
					setBanners(response.data);
				} else {
					setError("Failed to load banners");
				}
			} catch (err) {
				console.error("Error fetching banners:", err);
				setError("Failed to load banners");
			} finally {
				setLoading(false);
			}
		};

		fetchBanners();
	}, []);

	// Show loading state
	if (loading) {
		return (
			<div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden group bg-gray-100 flex items-center justify-center">
				<SpinnerEmpty />
			</div>
		);
	}

	// Show error state
	if (error || banners.length === 0) {
		return (
			<div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden group bg-gray-100 flex items-center justify-center">
				<div className="text-lg text-gray-600">
					{error || "No banners available"}
				</div>
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
