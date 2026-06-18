"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Rocket, Target, Users, Briefcase, Share2, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card } from "@/components/ui/card";

export function MissionVisionSection() {
	const { t } = useTranslation();

	const goalIcons = [
		{ icon: Users, color: "text-primary-900", bg: "bg-interactive-primaryMuted" },
		{ icon: Briefcase, color: "text-accent-700", bg: "bg-interactive-accentMuted" },
		{ icon: Share2, color: "text-primary-900", bg: "bg-interactive-primaryMuted" },
		{ icon: ShieldCheck, color: "text-accent-700", bg: "bg-interactive-accentMuted" },
	];

	return (
		<section className="section-md surface-muted overflow-hidden relative">
			<div className="container relative z-10">
				<div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
					{/* Left Column: Mission */}
					<div className="lg:w-5/12">
						<AnimatedSection direction="left" className="sticky top-32">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-interactive-primaryMuted text-primary-900 text-caption font-medium mb-6">
								<Rocket className="w-4 h-4" />
								<span>{t("about.mission.title")}</span>
							</div>

							<h2 className="text-heading-1 mb-6">
								<span className="inline-block py-2 text-primary-900">
									{t("about.values.desc1")}
								</span>
							</h2>

							<Card className="p-card-lg relative overflow-hidden">
								<p className="text-body-lg text-gray-700 relative z-10 border-l-4 border-primary-900 pl-6">
									{t("about.mission.desc1")}
								</p>
							</Card>
						</AnimatedSection>
					</div>

					{/* Right Column: Goals Grid */}
					<div className="lg:w-7/12">
						<AnimatedSection direction="right">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-interactive-primaryMuted text-primary-900 text-caption font-medium mb-6">
								<Target className="w-4 h-4" />
								<span>{t("about.goals.title")}</span>
							</div>

							<h3 className="text-heading-3 mb-8">
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
											<Card variant="interactive" className="h-full p-card-md">
												<div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-200 ${goalIcons[index - 1].bg} group-hover:bg-interactive-primary`}>
													<Icon className={`w-6 h-6 transition-colors duration-300 ${goalIcons[index - 1].color} group-hover:text-white`} />
												</div>
												<p className="text-body text-gray-700 group-hover:text-gray-900 transition-colors">
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
