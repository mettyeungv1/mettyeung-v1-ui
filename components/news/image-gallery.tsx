"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { Camera, Expand } from "lucide-react";

const ImageLightbox = dynamic(
	() =>
		import("@/components/news/image-lightbox").then(
			(module) => module.ImageLightbox
		),
	{ ssr: false }
);

interface ImageGalleryProps {
	images: { url: string; caption: string }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	if (!images.length) return null;

	return (
		<section aria-label="Article images">
			{/* Section Header */}
			<div className="mb-6 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
					<Camera className="h-5 w-5 text-primary" />
				</div>
				<div>
					<h3 className="text-lg font-semibold text-gray-900">
						Photo Gallery
					</h3>
					<p className="text-sm text-gray-500">
						{images.length} {images.length === 1 ? "photo" : "photos"} from this
						article
					</p>
				</div>
			</div>

			{/* Gallery Grid */}
			<div className={getGridClasses(images.length)}>
				{images.map((image, index) => (
					<button
						key={`${image.url}-${index}`}
						type="button"
						onClick={() => setSelectedIndex(index)}
						className={`group relative block w-full overflow-hidden rounded-xl bg-gray-100 text-left ring-1 ring-black/5 transition-all duration-300 hover:ring-primary/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getItemClasses(images.length, index)}`}
					>
						<Image
							src={image.url}
							alt={image.caption || `Article image ${index + 1}`}
							fill
							sizes={getImageSizes(images.length, index)}
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>

						{/* Hover Overlay */}
						<span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

						{/* Expand Icon */}
						<span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
							<Expand className="h-4 w-4" />
						</span>

						{/* Caption */}
						{image.caption ? (
							<span className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
								{image.caption}
							</span>
						) : null}
					</button>
				))}
			</div>

			{/* Lightbox */}
			{selectedIndex !== null ? (
				<ImageLightbox
					images={images}
					selectedIndex={selectedIndex}
					onOpenChange={(open) => {
						if (!open) setSelectedIndex(null);
					}}
				/>
			) : null}
		</section>
	);
}

/** Returns grid container classes based on the number of images. */
function getGridClasses(count: number): string {
	switch (count) {
		case 1:
			return "mx-auto max-w-4xl";
		case 2:
			return "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4";
		case 3:
			return "grid grid-cols-2 gap-3 sm:gap-4";
		case 4:
			return "grid grid-cols-2 gap-3 sm:gap-4";
		default:
			return "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-4";
	}
}

/** Returns per-item classes for featured/span layouts. */
function getItemClasses(count: number, index: number): string {
	if (count === 1) return "aspect-[16/9]";
	if (count === 2) return "aspect-[4/3]";
	if (count === 3 && index === 0) return "col-span-2 aspect-[21/9]";
	if (count === 3) return "aspect-[4/3]";
	if (count === 4) return "aspect-[4/3]";
	return "aspect-[4/3]";
}

/** Returns `sizes` attribute for responsive image loading. */
function getImageSizes(count: number, index: number): string {
	if (count === 1) return "(max-width: 1024px) 100vw, 896px";
	if (count === 2) return "(max-width: 640px) 100vw, 50vw";
	if (count === 3 && index === 0) return "100vw";
	if (count === 3) return "(max-width: 640px) 50vw, 50vw";
	if (count === 4) return "(max-width: 640px) 50vw, 50vw";
	return "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw";
}
