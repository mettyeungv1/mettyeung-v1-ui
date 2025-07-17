"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function NewsProgress() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const documentHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrollTop / documentHeight) * 100;
			setScrollProgress(progress);
		};

		window.addEventListener("scroll", updateScrollProgress);
		return () => window.removeEventListener("scroll", updateScrollProgress);
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
			<motion.div
				className="h-full bg-gradient-to-r from-khmer-gold to-khmer-red"
				style={{ width: `${scrollProgress}%` }}
				initial={{ width: "0%" }}
				animate={{ width: `${scrollProgress}%` }}
				transition={{ duration: 0.1 }}
			/>
		</div>
	);
}
