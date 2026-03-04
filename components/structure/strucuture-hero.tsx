"use client";

import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "@/lib/i18n";

interface StructureHeroProps {
	departmentCount: number;
	totalMembers: number;
}

export function StructureHero({
	departmentCount,
	totalMembers,
}: StructureHeroProps) {
	const { t } = useTranslation();
	return (
		<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
			{/* Decorative background elements */}
			<div className="absolute inset-0 z-0 opacity-20">
				<div className="absolute top-0 right-[-10%] w-96 h-96 bg-khmer-gold/30 rounded-full blur-3xl mix-blend-screen" />
				<div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-khmer-red/30 rounded-full blur-3xl mix-blend-screen" />
			</div>

			<div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
				<AnimatedSection>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20"
					>
						<Users className="w-8 h-8 text-white" />
					</motion.div>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight text-white">
						{t("structure.hero.title")}
					</h1>
					<p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
						{t("structure.hero.description")}
					</p>
				</AnimatedSection>
			</div>

			{/* Bottom wave transition */}
			<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
				<svg
					className="relative block w-full h-[50px] md:h-[100px]"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
						className="fill-white dark:fill-gray-900"
					></path>
				</svg>
			</div>
		</section>
	);
}
