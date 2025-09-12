import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PartnersSection } from "@/components/about/partmer-section";

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white">
			<AboutHeroSection />
			<MissionVisionSection />
			<PartnersSection />
		</div>
	);
}
