"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export function ContactHeroSection() {
	const { t } = useTranslation();
	return (
		<section className="relative py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
			<div className="container">
				<AnimatedSection className="text-center max-w-4xl mx-auto">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="w-20 h-20 bg-gradient-to-br from-khmer-gold to-khmer-red rounded-full flex items-center justify-center mx-auto mb-6"
					>
						<Mail className="w-10 h-10 text-white" />
					</motion.div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
						{t("contact.title")}
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
						{t("contact.subtitle")}
					</p>
				</AnimatedSection>
			</div>
		</section>
	);
}
