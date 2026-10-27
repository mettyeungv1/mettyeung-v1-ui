"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
	images: { url: string; caption: string }[];
	selectedIndex: number;
	onOpenChange: (open: boolean) => void;
}

export function ImageLightbox({
	images,
	selectedIndex,
	onOpenChange,
}: ImageLightboxProps) {
	const [index, setIndex] = useState(selectedIndex);

	useEffect(() => setIndex(selectedIndex), [selectedIndex]);

	const close = useCallback(() => onOpenChange(false), [onOpenChange]);

	const prev = useCallback(
		() => setIndex((v) => (v - 1 + images.length) % images.length),
		[images.length]
	);

	const next = useCallback(
		() => setIndex((v) => (v + 1) % images.length),
		[images.length]
	);

	// Keyboard navigation
	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") next();
			if (event.key === "ArrowLeft") prev();
			if (event.key === "Escape") close();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [next, prev, close]);

	// Lock body scroll
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const image = images[index];
	if (!image) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			aria-label="Image viewer"
		>
			{/* Top Bar */}
			<div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
				<span className="text-sm font-medium text-white/70">
					{images.length > 1
						? `${index + 1} / ${images.length}`
						: "Photo"}
				</span>
				<Button
					variant="ghost"
					size="icon"
					onClick={close}
					className="h-9 w-9 rounded-full text-white hover:bg-white/10 hover:text-white"
					aria-label="Close"
				>
					<X className="h-5 w-5" />
				</Button>
			</div>

			{/* Main Image Area */}
			<div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
				<Image
					src={image.url}
					alt={image.caption || ""}
					width={1600}
					height={1200}
					sizes="100vw"
					className="max-h-[75dvh] w-auto max-w-full rounded-lg object-contain"
					priority
				/>

				{/* Navigation Arrows */}
				{images.length > 1 ? (
					<>
						<Button
							variant="ghost"
							size="icon"
							onClick={prev}
							className="absolute left-2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-white/15 hover:text-white sm:left-4 sm:h-12 sm:w-12"
							aria-label="Previous image"
						>
							<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={next}
							className="absolute right-2 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-white/15 hover:text-white sm:right-4 sm:h-12 sm:w-12"
							aria-label="Next image"
						>
							<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
						</Button>
					</>
				) : null}
			</div>

			{/* Caption */}
			{image.caption ? (
				<div className="shrink-0 px-6 py-2 text-center text-sm text-white/80 sm:px-16">
					{image.caption}
				</div>
			) : null}

			{/* Thumbnail Strip */}
			{images.length > 1 ? (
				<div className="flex shrink-0 justify-center gap-2 overflow-x-auto px-6 py-3 sm:gap-2.5 sm:py-4">
					{images.map((item, itemIndex) => (
						<button
							key={`${item.url}-${itemIndex}`}
							type="button"
							onClick={() => setIndex(itemIndex)}
							className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:h-16 sm:w-16 ${
								index === itemIndex
									? "ring-2 ring-white ring-offset-2 ring-offset-black/95"
									: "opacity-50 hover:opacity-80"
							}`}
							aria-label={`Show image ${itemIndex + 1}`}
						>
							<Image
								src={item.url}
								alt=""
								fill
								sizes="64px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
