import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PartnersSection } from "@/components/about/partner-section";

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white">
			<AboutHeroSection />
			<MissionVisionSection />
			<section id="network" className="scroll-mt-24">
				<PartnersSection />
			</section>
		</div>
	);
}
