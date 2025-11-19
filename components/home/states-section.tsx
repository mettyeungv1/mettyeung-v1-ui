"use client";

import { useTranslation } from "@/lib/i18n";
import { stats } from "@/lib/data/home";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MetricCard } from "@/components/ui/metric-card";

export function StatsSection() {
	const { t } = useTranslation();

	return (
		<section className="section-padding bg-neutral-100">
			<div className="container">
				<AnimatedSection className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
						{t("home.achievements")}
					</h2>
					<p className="text-lg text-start md:text-justify  text-gray-600 max-w-3xl mx-auto">
						{t("home.achievementsDesc")}
					</p>
				</AnimatedSection>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
	);
}
