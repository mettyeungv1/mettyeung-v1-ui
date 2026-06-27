"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardCheck, Lightbulb, MessagesSquare, Rocket, Target } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";

const processSteps = [
	{ key: "discover", icon: MessagesSquare },
	{ key: "align", icon: Target },
	{ key: "design", icon: Lightbulb },
	{ key: "deliver", icon: Rocket },
	{ key: "report", icon: BarChart3 },
] as const;

export function PartnerProcess() {
	const { t } = useTranslation();

	return (
		<section className="section-md bg-surface-muted">
			<div className="container max-w-7xl">
				<div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
					<AnimatedSection direction="left">
						<p className="mb-3 text-caption font-bold uppercase tracking-wide text-khmer-gold">
							{t("partnerMarketing.process.eyebrow")}
						</p>
						<h2 className="text-heading-2 text-primary-900">
							{t("partnerMarketing.process.title")}
						</h2>
						<p className="mt-5 text-body-lg leading-relaxed text-text-secondary">
							{t("partnerMarketing.process.subtitle")}
						</p>
						<div className="mt-8">
							<Button asChild size="xl" className="bg-primary-900 text-white hover:bg-primary-950">
								<Link href="/contact?dept=Partnership">
									{t("partnerMarketing.cta.primary")}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
						</div>
					</AnimatedSection>

					<div className="grid gap-4">
						{processSteps.map(({ key, icon: Icon }, index) => (
							<AnimatedSection key={key} delay={index * 0.07} direction="right">
								<div className="flex gap-4 rounded-2xl border border-border-subtle bg-white p-5 shadow-surface">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-900 text-white">
										<Icon className="h-6 w-6" />
									</div>
									<div>
										<div className="mb-1 flex items-center gap-2">
											<span className="text-caption font-bold text-khmer-gold">
												{String(index + 1).padStart(2, "0")}
											</span>
											<h3 className="text-heading-5 text-text-primary">
												{t(`partnerMarketing.process.steps.${key}.title`)}
											</h3>
										</div>
										<p className="text-body-sm leading-relaxed text-text-secondary">
											{t(`partnerMarketing.process.steps.${key}.desc`)}
										</p>
									</div>
								</div>
							</AnimatedSection>
						))}
						<AnimatedSection delay={0.35} direction="right">
							<div className="rounded-2xl border border-khmer-gold/30 bg-khmer-gold/10 p-5 text-primary-950">
								<div className="mb-2 flex items-center gap-2 font-bold">
									<ClipboardCheck className="h-5 w-5" />
									{t("partnerMarketing.process.reportTitle")}
								</div>
								<p className="text-body-sm leading-relaxed">
									{t("partnerMarketing.process.reportDesc")}
								</p>
							</div>
						</AnimatedSection>
					</div>
				</div>
			</div>
		</section>
	);
}
