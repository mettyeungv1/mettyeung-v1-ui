import dynamic from "next/dynamic";
import { HeroCarousel } from "@/components/hero-carousel";
import { MissionSection } from "@/components/home/mission-section";
import { StatsSection } from "@/components/home/states-section";
import { FeaturesSection } from "@/components/home/feature-section";
import { HomeCTASection } from "@/components//home/home-cta-section";

export default function HomePage() {
	return (
		<>
			<div className="relative w-full overflow-hidden">
				<HeroCarousel />
			</div>
			<StatsSection />
			<MissionSection />
			<FeaturesSection />
			<HomeCTASection />
		</>
	);
}
