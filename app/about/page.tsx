import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PartnersSection } from "@/components/about/partner-section";

import { getPartnersService } from "@/service/partner/partner-service";

import { normalizeUrl } from "@/lib/utils/image";

import type { Partner } from "@/lib/types/partner";



export default async function AboutPage() {
	const res = await getPartnersService({ page: 1, limit: 12, sort: "order" });
	const rawPartners = res.status_code === 200 ? (res.data?.data || (Array.isArray(res.data) ? res.data : [])) : [];
	
	const initialPartners = rawPartners.map((partner: Partner) => ({
		...partner,
		media: partner.media ? { ...partner.media, url: normalizeUrl(partner.media.url) } : null
	}));

	return (
		<div className="min-h-screen bg-white">
			<AboutHeroSection />
			<MissionVisionSection />
			<section id="network" className="scroll-mt-24">
				<PartnersSection initialPartners={initialPartners} />
			</section>
		</div>
	);
}
