"use client";

import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, TrendingUp } from "lucide-react";

export function PartnerBenefits() {
	const { t } = useTranslation();

	const benefits = [
		{
			id: "access",
			icon: Globe,
			title: t("partners.cta.benefits.access.title"),
			desc: t("partners.cta.benefits.access.desc"),
			color: "text-interactive-primary",
			bg: "bg-interactive-primaryMuted",
		},
		{
			id: "brand",
			icon: ShieldCheck,
			title: t("partners.cta.benefits.brand.title"),
			desc: t("partners.cta.benefits.brand.desc"),
			color: "text-interactive-accent",
			bg: "bg-interactive-accentMuted",
		},
		{
			id: "growth",
			icon: TrendingUp,
			title: t("partners.cta.benefits.growth.title"),
			desc: t("partners.cta.benefits.growth.desc"),
			color: "text-primary-900",
			bg: "bg-primary-50",
		},
	];

	return (
		<section className="section-md surface-page border-t border-border-subtle relative overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
				<div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50" />
				<div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-interactive-accentMuted/50 rounded-full blur-3xl opacity-50" />
			</div>

			<div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
				<AnimatedSection direction="up" className="text-center mb-12 lg:mb-16">
					<h2 className="text-heading-2 mb-6">
						{t("partners.cta.benefitsTitle")}
					</h2>
					<div className="w-20 h-1.5 bg-interactive-primary rounded-full mx-auto" />
				</AnimatedSection>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<AnimatedSection key={benefit.id} delay={index * 0.1} direction="up">
								<Card className="h-full border-border-subtle bg-surface-panel/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
									<CardContent className="p-8 flex flex-col items-center text-center">
										<div className={`w-16 h-16 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-6 shadow-sm`}>
											<Icon className="w-8 h-8" />
										</div>
										<h3 className="text-heading-5 font-semibold text-text-primary mb-3">
											{benefit.title}
										</h3>
										<p className="text-body-sm text-text-secondary leading-relaxed">
											{benefit.desc}
										</p>
									</CardContent>
								</Card>
							</AnimatedSection>
						);
					})}
				</div>
			</div>
		</section>
	);
}
