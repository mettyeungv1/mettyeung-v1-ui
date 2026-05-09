import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PartnersSection } from "@/components/about/partner-section";
import { MouScrollerSection } from "@/components/about/mou-scroller-section";

import { getPartnersService, getMousService } from "@/service/partner/partner-service";

import { normalizeUrl } from "@/lib/utils/image";

import type { Partner } from "@/lib/types/partner";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
	const res = await getPartnersService({ page: 1, limit: 12, sort: "order", isActive: true });
	const initialPartners: Partner[] = res.status_code === 200 ? (res.data?.data || (Array.isArray(res.data) ? res.data : [])) : [];

	const mouRes = await getMousService({ page: 1, limit: 100, sort: "order", isActive: true });
	const initialMous: Partner[] = mouRes.status_code === 200 ? (mouRes.data?.data || (Array.isArray(mouRes.data) ? mouRes.data : [])) : [];

	return (
		<div className="min-h-screen bg-white">
			<AboutHeroSection />
			<MissionVisionSection />
			<MouScrollerSection initialMous={initialMous} />
			<section id="network" className="scroll-mt-24">
				<PartnersSection initialPartners={initialPartners} />
			</section>
		</div>
	);
}
