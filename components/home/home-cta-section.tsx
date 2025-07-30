"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Heart, Award } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CTAButton } from "@/components/ui/cta-button";

export function HomeCTASection() {
	const { t } = useTranslation();

	return (
		<section className="section-padding bg-gradient-to-br from-primary-900 to-accent-600 relative overflow-hidden">
			<div className="absolute inset-0 bg-black/40" />
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)",
					mixBlendMode: "overlay",
				}}
			/>
			<div className="container relative text-white">
				<AnimatedSection className="text-center">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
						{t("home.joinCommunity")}
					</h2>
					<p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
						{t("home.joinDesc")}
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<CTAButton
							href="/contact"
							size="lg"
							className="bg-white text-primary-900 hover:bg-neutral-100 text-lg px-8 py-4"
						>
							<Heart className="mr-2 w-6 h-6" />
							{t("home.becomeVolunteer")}
						</CTAButton>
						<CTAButton
							href="/projects"
							variant="outline"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4"
						>
							<Award className="mr-2 w-6 h-6" />
							{t("home.viewProjects")}
						</CTAButton>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}
