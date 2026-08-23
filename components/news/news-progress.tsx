"use client";

import { useEffect, useRef } from "react";

export function NewsProgress() {
	const barRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const height = document.documentElement.scrollHeight - window.innerHeight;
			const progress = height > 0 ? Math.min(window.scrollY / height, 1) : 0;
			barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
		};
		const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
		update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
		return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
	}, []);
	return <div className="fixed inset-x-0 top-0 z-50 h-1 bg-black/5"><div ref={barRef} className="h-full origin-left bg-gradient-to-r from-khmer-gold to-khmer-red transition-transform duration-100" /></div>;
}
