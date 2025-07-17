"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
	images: Array<{
		url: string;
		caption: string;
	}>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);

	const openModal = (index: number) => {
		setSelectedImage(index);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	const nextImage = () => {
		if (selectedImage !== null) {
			setSelectedImage((selectedImage + 1) % images.length);
		}
	};

	const prevImage = () => {
		if (selectedImage !== null) {
			setSelectedImage(
				selectedImage === 0 ? images.length - 1 : selectedImage - 1
			);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") closeModal();
		if (e.key === "ArrowRight") nextImage();
		if (e.key === "ArrowLeft") prevImage();
	};

	if (images.length === 0) return null;

	return (
		<>
			<div className="mb-8">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					រូបភាពបន្ថែម ({images.length})
				</h3>

				{/* Grid layout based on number of images */}
				<div
					className={`grid gap-4 ${
						images.length === 1
							? "grid-cols-1"
							: images.length === 2
							? "grid-cols-1 md:grid-cols-2"
							: images.length === 3
							? "grid-cols-1 md:grid-cols-3"
							: images.length === 4
							? "grid-cols-2 md:grid-cols-2"
							: "grid-cols-2 md:grid-cols-3"
					}`}
				>
					{images.map((image, index) => (
						<motion.div
							key={index}
							className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${
								images.length === 1
									? "aspect-video"
									: images.length === 2
									? "aspect-video"
									: "aspect-square md:aspect-video"
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
								<p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

				{/* Show more indicator for many images */}
				{images.length > 6 && (
					<div className="mt-4 text-center">
						<Button
							variant="outline"
							size="sm"
							className="text-khmer-gold border-khmer-gold hover:bg-khmer-gold hover:text-white"
						>
							មើលរូបភាពទាំងអស់ ({images.length})
						</Button>
					</div>
				)}
			</div>

			{/* Modal */}
			<AnimatePresence>
				{selectedImage !== null && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
						onKeyDown={handleKeyDown}
						tabIndex={0}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className="relative max-w-7xl max-h-[90vh] mx-4"
						>
							{/* Close button */}
							<Button
								variant="ghost"
								size="sm"
								onClick={closeModal}
								className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
							>
								<X className="w-6 h-6" />
							</Button>

							{/* Navigation buttons */}
							{images.length > 1 && (
								<>
									<Button
										variant="ghost"
										size="sm"
										onClick={prevImage}
										className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
									>
										<ChevronLeft className="w-8 h-8" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={nextImage}
										className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
									>
										<ChevronRight className="w-8 h-8" />
									</Button>
								</>
							)}

							{/* Main image */}
							<div className="relative">
								<img
									src={images[selectedImage].url}
									alt={images[selectedImage].caption}
									className="max-w-full max-h-[80vh] object-contain rounded-lg"
								/>

								{/* Caption */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
									<p className="text-white text-lg font-medium mb-2">
										{images[selectedImage].caption}
									</p>
									<p className="text-gray-300 text-sm">
										រូបភាពទី {selectedImage + 1} ក្នុងចំណោម {images.length}
									</p>
								</div>
							</div>

							{/* Thumbnail navigation */}
							{images.length > 1 && (
								<div className="flex justify-center mt-4 space-x-2 max-w-full overflow-x-auto pb-2">
									{images.map((image, index) => (
										<button
											key={index}
											onClick={() => setSelectedImage(index)}
											className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
												index === selectedImage
													? "border-khmer-gold"
													: "border-transparent hover:border-white/50"
											}`}
										>
											<img
												src={image.url}
												alt={image.caption}
												className="w-full h-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</motion.div>

						{/* Click outside to close */}
						<div className="absolute inset-0 -z-10" onClick={closeModal} />
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
