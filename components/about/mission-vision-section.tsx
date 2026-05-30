"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Rocket, Target, Users, Briefcase, Share2, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card } from "@/components/ui/card";

export function MissionVisionSection() {
	const { language, t } = useTranslation();
	const isKhmer = language === "km";

	const goalIcons = [
		{ icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
		{ icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-50" },
		{ icon: Share2, color: "text-amber-500", bg: "bg-amber-50" },
		{ icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-50" },
	];

	return (
		<section className="py-20 bg-gray-50 overflow-hidden relative">
			{/* Decorative background elements */}
			<div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

			<div className="container relative z-10">
				<div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
					{/* Left Column: Mission */}
					<div className="lg:w-5/12">
						<AnimatedSection direction="left" className="sticky top-32">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
								<Rocket className="w-4 h-4" />
								<span>{t("about.mission.title")}</span>
							</div>

							<h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.55]">
								<span className={isKhmer ? "inline-block py-2 text-blue-600" : "inline-block py-1 text-indigo-600"}>
									{t("about.values.desc1")}
								</span>
							</h2>

							<Card className="p-8 border-none shadow-xl bg-white/80 backdrop-blur-sm relative overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
								
								<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium relative z-10 border-l-4 border-blue-500 pl-6">
									{t("about.mission.desc1")}
								</p>
							</Card>
						</AnimatedSection>
					</div>

					{/* Right Column: Goals Grid */}
					<div className="lg:w-7/12">
						<AnimatedSection direction="right">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-6">
								<Target className="w-4 h-4" />
								<span>{t("about.goals.title")}</span>
							</div>

							<h3 className="text-2xl font-bold text-gray-900 mb-8">
								{t("about.goals.desc1")}
							</h3>

							<div className="grid sm:grid-cols-2 gap-6">
								{[1, 2, 3, 4].map((index) => {
									const Icon = goalIcons[index - 1].icon;
									return (
										<motion.div
											key={index}
											whileHover={{ y: -5 }}
											className="group"
										>
											<Card className="h-full p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white">
												<div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${goalIcons[index - 1].bg} group-hover:bg-blue-600`}>
													<Icon className={`w-6 h-6 transition-colors duration-300 ${goalIcons[index - 1].color} group-hover:text-white`} />
												</div>
												<p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
													{t(`about.goals.list${index}`)}
												</p>
											</Card>
										</motion.div>
									);
								})}
							</div>
						</AnimatedSection>
					</div>
				</div>
			</div>
		</section>
	);
}
