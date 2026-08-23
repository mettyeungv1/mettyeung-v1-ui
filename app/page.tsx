import { HeroCarousel } from "@/components/hero-carousel";
import { MissionSection } from "@/components/home/mission-section";
import { StatsSection } from "@/components/home/states-section";
import { FeaturesSection } from "@/components/home/feature-section";
import { SupportSection } from "@/components/home/support-section";
import { HomeCTASection } from "@/components//home/home-cta-section";
import { getBannersService } from "@/service/banner/banner-service";
import { toMediaUrl } from "@/lib/utils/image";

export const revalidate = 60;

export default async function HomePage() {
	const bannersRes = await getBannersService();
	const rawBanners = bannersRes.status_code === 200 && bannersRes.data ? bannersRes.data : [];
	const banners = rawBanners.map((b: any) => ({
		...b,
		media: b.media ? { ...b.media, url: toMediaUrl(b.media.url) } : b.media,
	}));

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
			<SupportSection />
			<HomeCTASection />
		</>
	);
}
