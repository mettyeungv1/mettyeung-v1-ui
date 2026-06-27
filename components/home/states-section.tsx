"use client";

import { BadgeCheck, Building2, Scale, Users } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { stats } from "@/lib/data/home";
import { AnimatedSection } from "@/components/ui/animated-section";

const trustSignals = [
	{ key: "recognition", value: "2026", icon: BadgeCheck },
	{ key: "board", value: "17", icon: Users },
	{ key: "founders", value: "3", icon: Building2 },
	{ key: "neutral", value: "100%", icon: Scale },
];

export function StatsSection() {
	const { t } = useTranslation();

	return (
		<section className="section-md bg-white">
			<div className="container">
				<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<AnimatedSection direction="up">
						<div className="rounded-xl border border-border-subtle bg-surface-panel p-6 shadow-sm sm:p-8 lg:p-10">
							<div className="mb-5 h-1.5 w-20 rounded-full bg-primary-900" />
							<h2 className="text-heading-1 text-primary-950">
								{t("home.achievements")}
							</h2>
							<p className="mt-5 text-body-lg leading-relaxed text-gray-700">
								{t("home.achievementsDesc")}
							</p>
						</div>
					</AnimatedSection>

					<div className="grid gap-4 sm:grid-cols-2">
						{stats.map((stat, index) => {
							const Icon = stat.icon;
							return (
								<AnimatedSection key={stat.titleKey} delay={index * 0.08} className="h-full">
									<div className="h-full rounded-xl border border-border-subtle bg-surface-panel p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
										<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-900">
											<Icon className="h-6 w-6" />
										</div>
										<div className="flex items-baseline gap-1 text-primary-950">
											<span className="text-display-sm font-bold">
												{stat.value.toLocaleString()}
											</span>
											{stat.suffix && (
												<span className="text-heading-3 font-bold text-primary-900">
													{stat.suffix}
												</span>
											)}
										</div>
										<h3 className="mt-3 text-heading-4 text-primary-950">
											{t(stat.titleKey)}
										</h3>
									</div>
								</AnimatedSection>
							);
						})}
					</div>
				</div>

				<div className="mt-16 border-t border-border-subtle pt-14">
					<AnimatedSection className="mx-auto mb-10 max-w-3xl text-center">
						<p className="text-caption font-bold uppercase tracking-wide text-primary-700">
							{t("home.trust.eyebrow")}
						</p>
						<h2 className="mt-2 text-heading-2 text-primary-950">
							{t("home.trust.title")}
						</h2>
						<p className="mt-4 text-body text-gray-600">
							{t("home.trust.subtitle")}
						</p>
					</AnimatedSection>

					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{trustSignals.map(({ key, value, icon: Icon }, index) => (
							<AnimatedSection key={key} delay={index * 0.08} className="h-full">
								<div className="h-full rounded-xl border border-border-subtle bg-surface-panel p-6 shadow-sm">
									<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-900">
										<Icon className="h-6 w-6" />
									</div>
									<div className="text-display-sm font-bold text-primary-950">
										{value}
									</div>
									<h3 className="mt-3 text-heading-4 text-primary-950">
										{t(`home.trust.items.${key}.title`)}
									</h3>
									<p className="mt-2 text-body-sm leading-relaxed text-gray-600">
										{t(`home.trust.items.${key}.description`)}
									</p>
								</div>
							</AnimatedSection>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
