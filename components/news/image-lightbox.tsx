"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps { images: { url: string; caption: string }[]; selectedIndex: number; onOpenChange: (open: boolean) => void; }
export function ImageLightbox({ images, selectedIndex, onOpenChange }: ImageLightboxProps) {
	const [index, setIndex] = useState(selectedIndex);
	useEffect(() => setIndex(selectedIndex), [selectedIndex]);
	useEffect(() => { const handleKey = (event: KeyboardEvent) => { if (event.key === "ArrowRight") setIndex((value) => (value + 1) % images.length); if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + images.length) % images.length); }; window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); }, [images.length]);
	const image = images[index];
	if (!image) return null;
	return <Dialog open onOpenChange={onOpenChange}><DialogContent className="h-[100dvh] max-w-none border-0 bg-black/95 p-2 sm:p-8"><div className="relative flex h-full w-full items-center justify-center"><Image src={image.url} alt={image.caption} width={1600} height={1200} sizes="100vw" className="max-h-[80dvh] w-auto max-w-full rounded-lg object-contain" priority />{images.length > 1 ? <><Button variant="ghost" size="icon" onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)} className="absolute left-0 text-white hover:bg-white/10 hover:text-white sm:left-4" aria-label="Previous image"><ChevronLeft /></Button><Button variant="ghost" size="icon" onClick={() => setIndex((value) => (value + 1) % images.length)} className="absolute right-0 text-white hover:bg-white/10 hover:text-white sm:right-4" aria-label="Next image"><ChevronRight /></Button><div className="absolute inset-x-0 bottom-2 flex justify-center gap-2 overflow-x-auto px-12 sm:bottom-4">{images.map((item, itemIndex) => <button key={`${item.url}-${itemIndex}`} type="button" onClick={() => setIndex(itemIndex)} className={`relative h-12 w-12 shrink-0 overflow-hidden rounded border-2 ${index === itemIndex ? "border-white" : "border-white/30 opacity-60"}`} aria-label={`Show image ${itemIndex + 1}`}><Image src={item.url} alt="" fill sizes="48px" className="object-cover" /></button>)}</div></> : null}<div className="absolute inset-x-0 bottom-16 px-16 text-center text-sm text-white/80 sm:bottom-20">{image.caption}{images.length > 1 ? <span className="ml-2 text-white/50">{index + 1} / {images.length}</span> : null}</div></div></DialogContent></Dialog>;
}
