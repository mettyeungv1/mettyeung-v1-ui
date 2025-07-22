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
	ArrowRight,
	Sparkles,
	Star,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
			{/* <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-500/10 via-white to-red-500/10 overflow-hidden">
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
			</section> */}
			<section className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5 overflow-hidden">
				{/* Decorative Elements */}
				<div className="absolute inset-0">
					<FloatingElement delay={0}>
						<div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
					</FloatingElement>
					<FloatingElement delay={1}>
						<div className="absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full opacity-40"></div>
					</FloatingElement>
					<FloatingElement delay={2}>
						<div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
					</FloatingElement>
				</div>

				<div className="container relative px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center max-w-6xl mx-auto">
						<motion.div
							initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
							animate={{ scale: 1, opacity: 1, rotate: 0 }}
							transition={{ duration: 1, ease: "easeOut" }}
							className="relative mb-8"
						>
							<div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto relative">
								{/* Glowing ring effect */}
								<div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-400 to-blue-400 animate-spin-slow opacity-20"></div>
								<div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-2xl">
									<Image
										src="/logo.png"
										alt="logo"
										width={200}
										height={200}
										className="w-48 h-48 object-contain"
									/>
								</div>
								{/* Sparkle effects */}
								<Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
								<Star className="absolute -bottom-2 -left-2 w-6 h-6 text-red-400 animate-bounce" />
							</div>
						</motion.div>

						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
								<span className=" text-blue-800 bg-clip-text ">Mettyerng</span>
							</h1>
							<p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 px-4 sm:px-0 max-w-4xl mx-auto">
								{t("about.subtitle")}
							</p>
						</motion.div>

						<motion.div
							initial={{ y: 30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
						>
							{[
								{
									text: t("about.badge1"),
									color: "from-yellow-500 to-orange-500",
								},
								{ text: t("about.badge2"), color: "from-red-500 to-pink-500" },
								{
									text: t("about.badge3"),
									color: "from-blue-500 to-purple-500",
								},
							].map((badge, index) => (
								<motion.div
									key={index}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Badge
										className={`text-sm px-6 py-2   border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
										variant="secondary"
									>
										{badge.text}
									</Badge>
								</motion.div>
							))}
						</motion.div>
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
			{/* Team Section */}

			<section
				className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5 relative overflow-hidden"
				id="network"
			>
				{/* Background decoration */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
					<div className="absolute bottom-1/4 right-20 w-3 h-3 bg-red-400 rounded-full opacity-40 animate-pulse"></div>
				</div>

				<div className="container px-4 sm:px-6 lg:px-8 relative">
					<AnimatedSection className="text-center mb-16">
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								<span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
									{t("about.partner.title")}
								</span>
							</h2>
							<p className="text-lg bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent font-semibold mb-4">
								{t("about.partner.title_en")}
							</p>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
								{t("about.partner.description")}
							</p>
						</motion.div>
					</AnimatedSection>

					<div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
						{[
							{ src: "/my-cut.png", name: "My Cut" },
							{ src: "/wing.png", name: "Wing" },
						].map((partner, index) => (
							<AnimatedSection key={partner.name} delay={index * 0.2}>
								<motion.div
									whileHover={{ scale: 1.05, rotate: 2 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.3 }}
								>
									<GlowingCard>
										<Card className="p-8 border-0 shadow-2xl bg-white hover:shadow-3xl transition-all duration-500">
											<CardContent className="p-0 text-center">
												<div className="relative">
													<div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-400 rounded-2xl blur opacity-20"></div>
													<Image
														src={partner.src}
														alt={partner.name}
														width={200}
														height={200}
														className="w-48 h-48 rounded-2xl object-contain relative z-10 mx-auto"
													/>
												</div>
												<h3 className="text-xl font-bold text-gray-900 mt-4">
													{partner.name}
												</h3>
											</CardContent>
										</Card>
									</GlowingCard>
								</motion.div>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

const GlowingCard = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<motion.div
		whileHover={{ scale: 1.02 }}
		transition={{ duration: 0.3 }}
		className={`relative group ${className}`}
	>
		<div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
		<div className="relative">{children}</div>
	</motion.div>
);

const FloatingElement = ({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) => (
	<motion.div
		initial={{ y: 0 }}
		animate={{ y: [-10, 10, -10] }}
		transition={{
			duration: 4,
			repeat: Infinity,
			delay,
			ease: "easeInOut",
		}}
	>
		{children}
	</motion.div>
);
