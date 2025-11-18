import dynamic from "next/dynamic";
import { HeroCarousel } from "@/components/hero-carousel";
import { MissionSection } from "@/components/home/mission-section";
import { StatsSection } from "@/components/home/states-section";
import { FeaturesSection } from "@/components/home/feature-section";
import { HomeCTASection } from "@/components//home/home-cta-section";

export default function HomePage() {
	return (
		<>
			<div className="hidden md:block relative w-full overflow-hidden">
				<HeroCarousel />
			</div>
			<div className="mt-10 md:mt-0">
				<MissionSection />
			</div>
			<StatsSection />
			<FeaturesSection />
			<HomeCTASection />
		</>
	);
}
