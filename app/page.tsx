import nextDynamic from "next/dynamic";
import { HeroCarousel } from "@/components/hero-carousel";
import { MissionSection } from "@/components/home/mission-section";
import { StatsSection } from "@/components/home/states-section";
import { FeaturesSection } from "@/components/home/feature-section";
import { HomeCTASection } from "@/components//home/home-cta-section";
import { getBannersService } from "@/service/banner/banner-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const bannersRes = await getBannersService();
	const banners = bannersRes.status_code === 200 && bannersRes.data ? bannersRes.data : [];

	return (
		<>
			<div className="hidden md:block relative w-full overflow-hidden">
				<HeroCarousel banners={banners} />
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
