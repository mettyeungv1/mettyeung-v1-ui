"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";

const ImageLightbox = dynamic(() => import("@/components/news/image-lightbox").then((module) => module.ImageLightbox), { ssr: false });
interface ImageGalleryProps { images: { url: string; caption: string }[]; }

export function ImageGallery({ images }: ImageGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	if (!images.length) return null;
	return <section aria-label="Article images" className="mb-8"><h3 className="mb-4 text-lg font-semibold text-gray-900">Images ({images.length})</h3><div className={`grid gap-4 ${images.length === 1 ? "mx-auto max-w-5xl grid-cols-1" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`}>{images.map((image, index) => <button key={`${image.url}-${index}`} type="button" onClick={() => setSelectedIndex(index)} className={`group relative block w-full overflow-hidden rounded-lg bg-muted text-left shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${images.length === 1 ? "aspect-video" : "aspect-[4/3] md:aspect-video"}`}><Image src={image.url} alt={image.caption || `Article image ${index + 1}`} fill sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /><span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20"><ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" /></span>{image.caption ? <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{image.caption}</span> : null}{images.length > 1 ? <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">{index + 1}/{images.length}</span> : null}</button>)}</div>{selectedIndex !== null ? <ImageLightbox images={images} selectedIndex={selectedIndex} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }} /> : null}</section>;
}
