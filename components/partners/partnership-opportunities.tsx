"use client";

import { Building2, GraduationCap, Handshake, Landmark, Megaphone, Sprout } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";

const opportunities = [
	{ key: "corporate", icon: Building2 },
	{ key: "ngo", icon: Sprout },
	{ key: "government", icon: Landmark },
	{ key: "training", icon: GraduationCap },
	{ key: "media", icon: Megaphone },
	{ key: "donor", icon: Handshake },
] as const;

export function PartnershipOpportunities() {
	const { t } = useTranslation();

	return (
		<section className="section-md bg-white">
			<div className="container max-w-7xl">
				<AnimatedSection direction="up" className="mx-auto mb-12 max-w-3xl text-center">
					<p className="mb-3 text-caption font-bold uppercase tracking-wide text-khmer-gold">
						{t("partnerMarketing.opportunities.eyebrow")}
					</p>
					<h2 className="text-heading-2 text-primary-900">
						{t("partnerMarketing.opportunities.title")}
					</h2>
					<p className="mt-4 text-body-lg text-text-secondary">
						{t("partnerMarketing.opportunities.subtitle")}
					</p>
				</AnimatedSection>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{opportunities.map(({ key, icon: Icon }, index) => (
						<AnimatedSection key={key} delay={index * 0.06} direction="up">
							<Card className="group h-full border-border-subtle bg-surface-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary-900/25 hover:shadow-popover">
								<CardContent className="flex h-full flex-col p-7">
									<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-interactive-primaryMuted text-primary-900 transition-colors group-hover:bg-primary-900 group-hover:text-white">
										<Icon className="h-7 w-7" />
									</div>
									<h3 className="text-heading-5 text-text-primary">
										{t(`partnerMarketing.opportunities.items.${key}.title`)}
									</h3>
									<p className="mt-3 flex-1 text-body-sm leading-relaxed text-text-secondary">
										{t(`partnerMarketing.opportunities.items.${key}.desc`)}
									</p>
									<p className="mt-5 rounded-xl bg-surface-muted px-4 py-3 text-caption font-semibold text-primary-900">
										{t(`partnerMarketing.opportunities.items.${key}.outcome`)}
									</p>
								</CardContent>
							</Card>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
