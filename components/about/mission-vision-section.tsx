"use client";

import { missionVisionValues } from "@/lib/data/about";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ValueCard } from "./value-card";

export function MissionVisionSection() {
	return (
		<section className="section-padding bg-white">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
					{missionVisionValues.map((item, index) => (
						<AnimatedSection
							key={item.titleKey}
							direction={index % 2 === 0 ? "left" : "right"}
						>
							<ValueCard item={item} />
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
