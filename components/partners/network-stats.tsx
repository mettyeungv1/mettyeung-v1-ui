"use client";

import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";

interface NetworkStatsProps {
	mouCount: number;
	partnerCount: number;
	sectorCount: number;
}

export function NetworkStats({ mouCount, partnerCount, sectorCount }: NetworkStatsProps) {
	const { t } = useTranslation();

	const stats = [
		{ value: mouCount, label: t("network.stats.mousSigned") },
		{ value: partnerCount, label: t("network.stats.partners") },
		{ value: sectorCount, label: t("network.stats.sectors") },
	];

	return (
		<div className="-mt-8 relative z-20 px-4 sm:px-6">
			<AnimatedSection direction="up">
				<div className="max-w-3xl mx-auto bg-surface-panel border border-border-subtle rounded-xl shadow-surface">
					<div className="grid grid-cols-3">
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`flex flex-col items-center justify-center py-5 px-3 sm:py-6 sm:px-6 ${
									index > 0 ? "border-l border-border-subtle" : ""
								}`}
							>
								<span className="text-heading-3 text-primary-900 font-bold">
									{stat.value}
								</span>
								<span className="text-body-sm text-text-secondary text-center">
									{stat.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</AnimatedSection>
		</div>
	);
}
