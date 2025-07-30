"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FloatingElement } from "../ui/floating-element";
import { Badge } from "@/components/ui/badge";

export function AboutHeroSection() {
	const { t } = useTranslation();
	const badges = [
		{ text: t("about.badge1") },
		{ text: t("about.badge2") },
		{ text: t("about.badge3") },
	];

	return (
		<section className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5 overflow-hidden">
			<div className="absolute inset-0">
				<FloatingElement delay={0}>
					<div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
				</FloatingElement>
				<FloatingElement delay={1}>
					<div className="absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full opacity-40"></div>
				</FloatingElement>
				<FloatingElement delay={2}>
					<div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
				</FloatingElement>
			</div>
			<div className="container relative">
				<AnimatedSection className="text-center max-w-4xl mx-auto">
					<motion.div
						initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="relative mb-8"
					>
						<div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto relative">
							<div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-2xl">
								<Image
									src="/logo.png"
									alt="logo"
									width={200}
									height={200}
									className="w-48 h-48 object-contain"
								/>
							</div>
							<Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
							<Star className="absolute -bottom-2 -left-2 w-6 h-6 text-red-400 animate-bounce" />
						</div>
					</motion.div>
					<motion.h1
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-blue-800"
					>
						Mettyerng
					</motion.h1>
					<motion.p
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto"
					>
						{t("about.subtitle")}
					</motion.p>
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="flex flex-wrap justify-center gap-3 sm:gap-4"
					>
						{badges.map((badge, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Badge className="text-sm px-6 py-2 border-0 shadow-md hover:shadow-lg transition-shadow">
									{badge.text}
								</Badge>
							</motion.div>
						))}
					</motion.div>
				</AnimatedSection>
			</div>
		</section>
	);
}
