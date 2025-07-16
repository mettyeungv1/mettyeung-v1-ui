"use client";

import { motion } from "framer-motion";
import {
	Users,
	Target,
	Eye,
	Heart,
	BookOpen,
	Lightbulb,
	Globe,
	Award,
	PanelsTopLeft,
	User,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";

const values = [
	{
		icon: Heart,
		key: "love",
		color: "from-red-500 to-pink-500",
	},
	{
		icon: BookOpen,
		key: "education",
		color: "from-blue-500 to-indigo-500",
	},
	{
		icon: Globe,
		key: "culture",
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: Users,
		key: "unity",
		color: "from-purple-500 to-violet-500",
	},
	{
		icon: Lightbulb,
		key: "innovation",
		color: "from-yellow-500 to-orange-500",
	},
	{
		icon: Award,
		key: "responsibility",
		color: "from-teal-500 to-cyan-500",
	},
];

const timelineKeys = [
	"founded",
	"education",
	"covid",
	"haircut",
	"expansion",
	"recognition",
	"newFuture",
];

export default function AboutPage() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-500/10 via-white to-red-500/10 overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />
				</div>
				<div className="container relative px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center max-w-5xl mx-auto">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="w-56 h-56 sm:w-60 sm:h-60 rounded-full flex items-center justify-center mx-auto"
						>
							<Image src="/logo.png" alt="logo" width={400} height={400} />
						</motion.div>
						<p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
							{t("about.subtitle")}
						</p>
						<div className="flex flex-wrap justify-center gap-2 sm:gap-4">
							<Badge
								variant="secondary"
								className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
							>
								{t("about.badge1")}
							</Badge>
							<Badge
								variant="secondary"
								className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
							>
								{t("about.badge2")}
							</Badge>
							<Badge
								variant="secondary"
								className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
							>
								{t("about.badge3")}
							</Badge>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Mission, Vision & Values */}
			<section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
				<div className="container px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
						<AnimatedSection direction="left">
							<Card className="p-6 sm:p-8 h-full border-l-4 border-l-yellow-500">
								<CardContent className="p-0">
									<div className="mb-6">
										<Target className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-4" />
										<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
											{t("about.mission.title")}
											<span className="block text-lg sm:text-xl bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent mt-2">
												{t("about.mission.title_en")}
											</span>
										</h2>
									</div>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
										{t("about.mission.desc1")}
									</p>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
										{t("about.mission.desc2")}
									</p>
								</CardContent>
							</Card>
						</AnimatedSection>
						<AnimatedSection direction="right">
							<Card className="p-6 sm:p-8 h-full border-l-4 border-l-blue-500">
								<CardContent className="p-0">
									<div className="mb-6">
										<User className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-4" />
										<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
											{t("about.values.title")}
											<span className="block text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent mt-2">
												{t("about.values.title_en")}
											</span>
										</h2>
									</div>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
										{t("about.values.love.description")}
									</p>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
										{t("about.values.education.description")}
									</p>
								</CardContent>
							</Card>
						</AnimatedSection>
						<AnimatedSection direction="left">
							<Card className="p-6 sm:p-8 h-full border-l-4 border-l-red-500">
								<CardContent className="p-0">
									<div className="mb-6">
										<Eye className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mb-4" />
										<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
											{t("about.vision.title")}
											<span className="block text-lg sm:text-xl bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent mt-2">
												{t("about.vision.title_en")}
											</span>
										</h2>
									</div>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
										{t("about.vision.desc1")}
									</p>
									<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
										{t("about.vision.desc2")}
									</p>
								</CardContent>
							</Card>
						</AnimatedSection>
					</div>
				</div>
			</section>

			{/* Values Section */}
			{/* <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
				<div className="container px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("about.values.title")}
							<span className="block text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent mt-2">
								{t("about.values.title_en")}
							</span>
						</h2>
						<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
							{t("about.values.description")}
						</p>
					</AnimatedSection>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
						{values.map((value, index) => (
							<AnimatedSection
								key={value.key}
								delay={index * 0.1}
								className="group"
							>
								<Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
									<CardContent className="p-4 sm:p-6">
										<div className="mb-4 sm:mb-6">
											<div
												className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
											>
												<value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
											</div>
											<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
												{t(`about.values.${value.key}.title_en`)}
											</h3>
											<p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
												{t(`about.values.${value.key}.title`)}
											</p>
										</div>
										<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
											{t(`about.values.${value.key}.description`)}
										</p>
									</CardContent>
								</Card>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section> */}

			{/* Timeline Section */}
			{/* <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
				<div className="container px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("about.timeline.title")}
							<span className="block text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent mt-2">
								{t("about.timeline.title_en")}
							</span>
						</h2>
						<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
							{t("about.timeline.description")}
						</p>
					</AnimatedSection>
					<div className="relative">
						<div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-red-500 to-blue-500"></div>
						<div className="space-y-8 sm:space-y-12">
							{timelineKeys.map((key, index) => (
								<AnimatedSection
									key={key}
									delay={index * 0.2}
									className={`flex items-center ${
										index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
									}`}
								>
									<div
										className={`w-full md:w-5/12 ${
											index % 2 === 0 ? "md:pr-6 lg:pr-8" : "md:pl-6 lg:pl-8"
										}`}
									>
										<Card className="p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ml-8 md:ml-0">
											<CardContent className="p-0">
												<div className="flex items-center mb-3 sm:mb-4">
													<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
														{(2018 + index).toString().slice(-2)}
													</div>
													<div className="ml-3 sm:ml-4">
														<h3 className="text-lg sm:text-xl font-bold text-gray-900">
															{t(`about.timeline.${key}.title_en`)}
														</h3>
														<p className="text-xs sm:text-sm text-gray-500">
															{t(`about.timeline.${key}.title`)}
														</p>
													</div>
												</div>
												<p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
													{t(`about.timeline.${key}.description`)}
												</p>
												<div className="flex flex-wrap gap-1 sm:gap-2">
													<Badge variant="secondary" className="text-xs">
														{t(`about.timeline.${key}.achievements.members`) ||
															t(
																`about.timeline.${key}.achievements.children`
															) ||
															t(
																`about.timeline.${key}.achievements.families`
															) ||
															t(`about.timeline.${key}.achievements.people`) ||
															t(
																`about.timeline.${key}.achievements.activeMembers`
															) ||
															t(
																`about.timeline.${key}.achievements.nationalAward`
															) ||
															t(
																`about.timeline.${key}.achievements.newWebsite`
															)}
													</Badge>
													<Badge variant="secondary" className="text-xs">
														{t(
															`about.timeline.${key}.achievements.firstProject`
														) ||
															t(
																`about.timeline.${key}.achievements.classrooms`
															) ||
															t(
																`about.timeline.${key}.achievements.medicalKits`
															) ||
															t(
																`about.timeline.${key}.achievements.monthlyService`
															) ||
															t(
																`about.timeline.${key}.achievements.provinces`
															) ||
															t(
																`about.timeline.${key}.achievements.acknowledgement`
															) ||
															t(
																`about.timeline.${key}.achievements.digitalSystem`
															)}
													</Badge>
												</div>
											</CardContent>
										</Card>
									</div>
									<div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
									<div className="w-full md:w-5/12"></div>
								</AnimatedSection>
							))}
						</div>
					</div>
				</div>
			</section> */}

			{/* Team Section */}
			<section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-yellow-500/10 to-red-500/10">
				<div className="container px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("about.partner.title")}
							<span className="block text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent mt-2">
								{t("about.partner.title_en")}
							</span>
						</h2>
						<p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
							{t("about.partner.description")}
						</p>
					</AnimatedSection>
					{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-3"> */}
					<div className="flex gap-4 items-center justify-center">
						{["/my-cut.png", "/wing.png"].map((partnerKey, index) => (
							<AnimatedSection key={partnerKey} delay={index * 0.1}>
								<Image
									src={partnerKey}
									alt="partner"
									width={200}
									height={200}
									className="w-44 h-44 rounded-md"
								/>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
