"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";

export function AboutHeroSection() {
	const { t } = useTranslation();
	const badges = [
		{ text: t("about.badge1") },
		{ text: t("about.badge2") },
		{ text: t("about.badge3") },
	];

	return (
		<section className="section-lg surface-page relative overflow-hidden">
			<div className="container relative">
				<AnimatedSection className="text-center max-w-4xl mx-auto">
					<motion.div
						initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="relative mb-8"
					>
						<div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto relative">
							<div className="absolute inset-2 rounded-full bg-surface-panel flex items-center justify-center shadow-surface border border-border-subtle">
								<Image
									src="/logo.png"
									alt="Mett Yeung Association logo"
									width={200}
									height={200}
									className="w-48 h-48 object-contain"
								/>
							</div>
							<Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-khmer-gold" />
							<Star className="absolute -bottom-2 -left-2 w-6 h-6 text-accent-400" />
						</div>
					</motion.div>
					<motion.h1
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="text-display-md mb-6 text-primary-900"
					>
						MettYeung
					</motion.h1>
					<motion.p
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-body-lg text-start md:text-justify text-gray-600 mb-8 max-w-3xl mx-auto"
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
								<Badge variant="secondary" className="px-6 py-2">
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
