"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export function ContactHeroSection() {
	const { t } = useTranslation();
	return (
		<section className="relative pt-32 pb-48 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
            {/* Abstract Pattern Background */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            
			<div className="container relative z-10">
				<AnimatedSection className="text-center max-w-3xl mx-auto">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20"
					>
						<Mail className="w-8 h-8 text-white" />
					</motion.div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
						{t("contact.title")}
					</h1>
					<p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
						{t("contact.subtitle")}
					</p>
				</AnimatedSection>
			</div>
		</section>
	);
}
