"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Heart, Award, ArrowRight, Play } from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MetricCard } from "@/components/ui/metric-card";
import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";

const stats = [
	{
		titleKey: "stats.members",
		value: 150,
		suffix: "+",
		icon: Users,
		descriptionKey: "home.activeMembers",
	},
	{
		titleKey: "stats.projects",
		value: 25,
		suffix: "+",
		icon: Award,
		descriptionKey: "home.successfulProjects",
	},
	{
		titleKey: "stats.beneficiaries",
		value: 500,
		suffix: "+",
		icon: BookOpen,
		descriptionKey: "home.educatedChildren",
	},
	{
		titleKey: "stats.volunteers",
		value: 1000,
		suffix: "+",
		icon: Heart,
		descriptionKey: "home.helpedFamilies",
	},
];

const features = [
	{
		titleKey: "home.education",
		descriptionKey: "home.educationDesc",
		image:
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/about#education",
	},
	{
		titleKey: "home.culture",
		descriptionKey: "home.cultureDesc",
		image:
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/about#culture",
	},
	{
		titleKey: "home.social",
		descriptionKey: "home.socialDesc",
		image:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/projects",
	},
];

export default function HomePage() {
	const { t } = useTranslation();

	return (
		<>
			{/* Hero Section */}
			<HeroCarousel />

			{/* Stats Section */}
			<section className="section-padding bg-neutral-100">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
							{t("home.achievements")}
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							{t("home.achievementsDesc")}
						</p>
					</AnimatedSection>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{stats.map((stat, index) => (
							<MetricCard
								key={stat.titleKey}
								title={t(stat.titleKey)}
								description={t(stat.descriptionKey)}
								value={stat.value}
								suffix={stat.suffix}
								icon={stat.icon}
								delay={index * 0.1}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="section-padding bg-white">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<AnimatedSection direction="left">
							<div className="space-y-6">
								<h2 className="text-3xl md:text-4xl font-bold text-text-primary">
									{t("home.missionTitle")}
								</h2>

								<p className="text-lg text-gray-600 leading-relaxed">
									{t("home.missionDesc")}
								</p>

								<p className="text-lg text-gray-600 leading-relaxed">
									{t("home.missionText")}
								</p>

								<div className="flex flex-col sm:flex-row gap-4">
									<CTAButton href="/about" size="lg">
										{t("common.learnMore")}
										<ArrowRight className="ml-2 w-5 h-5" />
									</CTAButton>

									<Button
										variant="outline"
										size="lg"
										asChild
										className="border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white"
									>
										<a href="/contact" className="flex items-center">
											<Heart className="mr-2 w-5 h-5" />
											{t("home.becomeVolunteer")}
										</a>
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
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

									{/* Play button overlay */}
									<motion.button
										className="absolute inset-0 flex items-center justify-center group"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
											<Play className="w-6 h-6 text-primary-900 ml-1" />
										</div>
									</motion.button>
								</div>

								{/* Floating elements */}
								<motion.div
									className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl"
									animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
									transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
								/>

								<motion.div
									className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl"
									animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
									transition={{
										duration: 10,
										repeat: Infinity,
										ease: "linear",
									}}
								/>
							</div>
						</AnimatedSection>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 lg:py-24 bg-white">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900">
							{t("home.focusAreas")}
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
							{t("home.focusAreasDesc")}
						</p>
					</AnimatedSection>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<AnimatedSection
								key={feature.titleKey}
								delay={index * 0.1}
								className="group"
							>
								<Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gray-50 border-gray-200">
									<div className="aspect-video overflow-hidden relative">
										<Image
											src={feature.image}
											alt={t(feature.titleKey)}
											fill
											style={{ objectFit: "cover" }}
											className="group-hover:scale-105 transition-transform duration-500"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
									<CardContent className="p-6">
										<h3 className="text-xl font-bold text-gray-800 mb-3">
											{t(feature.titleKey)}
										</h3>
										<p className="text-gray-600 leading-relaxed mb-6">
											{t(feature.descriptionKey)}
										</p>
										<Button
											variant="ghost"
											asChild
											className=" h-auto text-blue-600 hover:text-blue-700 font-semibold"
										>
											<a
												href={feature.link}
												className="flex items-center group/link"
											>
												{t("common.learnMore")}
												<ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
											</a>
										</Button>
									</CardContent>
								</Card>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-black/40" />
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage:
								"url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)",
							mixBlendMode: "overlay",
						}}
					/>
				</div>

				<div className="container relative text-white rounded-xl">
					<AnimatedSection className="text-center text-white">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
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

				{/* Floating particles */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-white/30 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -20, 0],
							opacity: [0.3, 0.8, 0.3],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</section>
		</>
	);
}
