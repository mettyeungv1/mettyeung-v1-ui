"use client";

import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";

export function PartnersHeroSection() {
	const { t } = useTranslation();

	return (
		<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
			{/* Decorative background elements */}
			<div className="absolute inset-0 z-0 opacity-20">
				<div className="absolute top-0 right-[-10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl mix-blend-screen" />
				<div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl mix-blend-screen" />
			</div>

			<div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
				<AnimatedSection>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight pt-10 text-white">
						{t("partners.title")}
					</h1>
					<p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
						{t("partners.description")}
					</p>
				</AnimatedSection>
			</div>

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
