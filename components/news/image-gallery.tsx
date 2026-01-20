"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
	images: Array<{
		url: string;
		caption: string;
	}>;
}

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

export function ImageGallery({ images }: ImageGalleryProps) {
	// [index, direction]
	const [[activeIndex, direction], setActiveTuple] = useState<[number | null, number]>([null, 0]);

	// Helper to extract the index (or null) safely
	const selectedImage = activeIndex;

	const openModal = (index: number) => {
		setActiveTuple([index, 0]);
	};

	const closeModal = () => {
		setActiveTuple([null, 0]);
	};
	
	const paginate = useCallback((newDirection: number) => {
		if (selectedImage === null) return;

		let nextIndex = selectedImage + newDirection;
		// Loop logic
		if (nextIndex < 0) nextIndex = images.length - 1;
		if (nextIndex >= images.length) nextIndex = 0;

		setActiveTuple([nextIndex, newDirection]);
	}, [selectedImage, images.length]);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") closeModal();
		if (e.key === "ArrowRight") paginate(1);
		if (e.key === "ArrowLeft") paginate(-1);
	}, [paginate]);

	useEffect(() => {
		if (selectedImage !== null) {
			window.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [selectedImage, handleKeyDown]);

	// Safety check: if selectedImage is set but invalid (e.g. data changed), close modal
	useEffect(() => {
		if (selectedImage !== null && !images[selectedImage]) {
			closeModal();
		}
	}, [selectedImage, images]);

	if (images.length === 0) return null;

	// Use selectedImage directly for rendering to avoid sync issues.
	// Fallback to 0 if null/invalid to prevent crash during exit animation or race conditions
	const SafeImage = images[selectedImage ?? 0] || images[0];

	return (
		<>
			<div className="mb-8">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Images ({images.length})
				</h3>

				{/* Grid layout - 2 columns on mobile, 3 on desktop */}
				<div
					className={`grid gap-4 ${
						images.length === 1
							? "grid-cols-1"
							: "grid-cols-2 md:grid-cols-3"
					}`}
				>
					{images.map((image, index) => (
						<motion.div
							key={index}
							className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
								images.length === 1
									? "aspect-video"
									: "aspect-square md:aspect-video" // Square on mobile grid for uniformity
							}`}
							onClick={() => openModal(index)}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<img
								src={image.url}
								alt={image.caption}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
								<ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>

							{/* Caption overlay */}
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
								<p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
									{image.caption}
								</p>
							</div>

							{/* Image counter for multiple images */}
							{images.length > 1 && (
								<div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
									{index + 1}/{images.length}
								</div>
							)}
						</motion.div>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			<AnimatePresence initial={false} custom={direction}>
				{selectedImage !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
					>
						{/* Close button */}
						<Button
							variant="ghost"
							size="icon"
							onClick={closeModal}
							className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 z-50 rounded-full w-12 h-12"
						>
							<X className="w-6 h-6" />
						</Button>

						{/* Main Swiper Container */}
						<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
							{/* Left Arrow (Desktop) */}
							{images.length > 1 && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => paginate(-1)}
									className="hidden md:flex absolute left-4 bg-black/20 text-white hover:bg-black/40 hover:text-white rounded-full z-20 w-12 h-12 border border-white/10"
								>
									<ChevronLeft className="w-8 h-8" />
								</Button>
							)}

							{/* Draggable Image */}
							<motion.div
								key={selectedImage} // Key changes trigger animation
								custom={direction}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									x: { type: "spring", stiffness: 300, damping: 30 },
									opacity: { duration: 0.2 },
								}}
								drag="x"
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={1}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = swipePower(offset.x, velocity.x);

									if (swipe < -swipeConfidenceThreshold) {
										paginate(1);
									} else if (swipe > swipeConfidenceThreshold) {
										paginate(-1);
									}
								}}
								className="absolute w-full h-full flex items-center justify-center p-4 md:p-12 cursor-grab active:cursor-grabbing"
							>
								<img
									src={SafeImage.url}
									alt={SafeImage.caption}
									className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
								/>
							</motion.div>

							{/* Right Arrow (Desktop) */}
							{images.length > 1 && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => paginate(1)}
									className="hidden md:flex absolute right-4 bg-black/20 text-white hover:bg-black/40 hover:text-white rounded-full z-20 w-12 h-12 border border-white/10"
								>
									<ChevronRight className="w-8 h-8" />
								</Button>
							)}
						</div>

						{/* Bottom Caption Bar */}
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pb-10 z-20 pointer-events-none">
							<div className="max-w-4xl mx-auto text-center">
								<p className="text-white text-lg font-medium mb-1 drop-shadow-md">
									{SafeImage.caption}
								</p>
								<p className="text-white/60 text-sm">
									{selectedImage + 1} / {images.length}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
