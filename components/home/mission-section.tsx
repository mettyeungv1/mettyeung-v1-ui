"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { ArrowRight, Heart, Play } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/ui/cta-button";
import Link from "next/link";

export function MissionSection() {
	const { t } = useTranslation();

	return (
		<section className="section-padding bg-white">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<AnimatedSection direction="left">
						<div className="space-y-6 text-center lg:text-left">
							<h2 className="text-3xl md:text-4xl font-bold text-text-primary">
								{t("home.missionTitle")}
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed">
								{t("home.missionDesc")}
							</p>
							<p className="text-lg text-gray-600 leading-relaxed">
								{t("home.missionText")}
							</p>
							<div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
								<CTAButton href="/about" size="lg">
									<ArrowRight className="ml-2 w-5 h-5" />
									{t("common.learnMore")}
								</CTAButton>
								<Button
									variant="outline"
									size="lg"
									asChild
									className="border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white"
								>
									<Link href="/contact" className="flex items-center">
										<Heart className="mr-2 w-5 h-5" />
										{t("home.becomeVolunteer")}
									</Link>
								</Button>
							</div>
						</div>
					</AnimatedSection>
					<AnimatedSection direction="right">
						<div className="relative">
							<div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
								<img
									src="https://images.pexels.com/photos/6646851/pexels-photo-6646851.jpeg?auto=compress&cs=tinysrgb&w=800"
									alt="Community gathering"
									className="w-full h-full object-cover"
								/>
								<motion.button
									className="absolute inset-0 flex items-center justify-center group"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
										<Play className="w-6 h-6 text-primary-900 ml-1" />
									</div>
								</motion.button>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</div>
		</section>
	);
}
