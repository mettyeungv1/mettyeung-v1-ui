"use client";

import { useTranslation } from "@/lib/i18n";
import { partners } from "@/lib/data/about";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "./glowing-card";

export function PartnersSection() {
	const { t } = useTranslation();
	return (
		<section
			className="section-padding bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5"
			id="network"
		>
			<div className="container">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">
						{t("about.partner.title")}
					</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
						{t("about.partner.description")}
					</p>
				</AnimatedSection>
				<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
					{partners.map((partner, index) => (
						<AnimatedSection key={partner.name} delay={index * 0.2}>
							<GlowingCard>
								<Card className="p-6 sm:p-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
									<CardContent className="p-0 text-center">
										<Image
											src={partner.logoSrc}
											alt={partner.name}
											width={160}
											height={160}
											className="w-40 h-40 object-contain mx-auto"
										/>
										<h3 className="text-xl font-bold text-gray-900 mt-4">
											{partner.name}
										</h3>
									</CardContent>
								</Card>
							</GlowingCard>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
