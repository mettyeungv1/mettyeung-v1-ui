"use client";

import { useTranslation } from "@/lib/i18n";
import { features } from "@/lib/data/home";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
	const { t } = useTranslation();

	return (
		<section className="py-20 lg:py-24 bg-gray-50">
			<div className="container">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-heading-2">
						{t("home.focusAreas")}
					</h2>
					<p className="mt-4 text-body-lg text-start md:text-justify text-gray-600 max-w-3xl mx-auto">
						{t("home.focusAreasDesc")}{" "}
						<span>
							&quot;<b>{t("home.focusAreas")}</b>&quot;
						</span>
					</p>
				</AnimatedSection>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<AnimatedSection
							key={feature.titleKey}
							delay={index * 0.08}
							className="h-full"
						>
							<FeatureCard feature={feature} />
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
