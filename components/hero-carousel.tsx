"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const MotionImage = motion(Image);

const slides = [
	{ id: 1, image: "/slider-1.png" },
	{ id: 2, image: "/slider-2.jpg" },
	{ id: 3, image: "/slider-3.jpg" },
	{ id: 4, image: "/slider-4.jpg" },
];

// Simplified animation for "contain" style to prevent empty edges
const kenBurnsVariants = {
	active: { scale: 1.1 },
	inactive: { scale: 1 },
};

export function HeroCarousel() {
	return (
		// FIXED: Reduced the height of the carousel container.
		// It now calculates the screen height minus the header height (h-20 = 5rem).
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
				loop
				className="h-full w-full"
			>
				{slides.map((slide, index) => (
					<SwiperSlide
						key={slide.id}
						className="relative h-full w-full my-[50px]"
					>
						{({ isActive }) => (
							<MotionImage
								src={slide.image}
								alt={`Hero Carousel Slide ${slide.id}`}
								fill
								priority={index === 0}
								style={{ objectFit: "contain" }}
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
