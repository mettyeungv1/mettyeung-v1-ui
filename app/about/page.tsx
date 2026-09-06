export const revalidate = 600;

import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionVisionSection } from "@/components/about/mission-vision-section";
import { PartnersSection } from "@/components/about/partner-section";
import { MouScrollerSection } from "@/components/about/mou-scroller-section";

import { getPartnersService, getMousService } from "@/service/partner/partner-service";

import { normalizeUrl } from "@/lib/utils/image";

import type { Partner } from "@/lib/types/partner";
import { Suspense } from "react";

async function AboutPartnerContent() {
	const [res, mouRes] = await Promise.all([
		getPartnersService({ page: 1, limit: 12, sort: "order", isActive: true }),
		getMousService({ page: 1, limit: 100, sort: "order", isActive: true }),
	]);
	const initialPartners: Partner[] = res.status_code === 200 ? (res.data?.data || (Array.isArray(res.data) ? res.data : [])) : [];
	const initialMous: Partner[] = mouRes.status_code === 200 ? (mouRes.data?.data || (Array.isArray(mouRes.data) ? mouRes.data : [])) : [];

	return (
		<>
			<MouScrollerSection initialMous={initialMous} />
			<section id="network" className="scroll-mt-24">
				<PartnersSection initialPartners={initialPartners} />
			</section>
		</>
	);
}

function AboutContentFallback() {
	return <div className="animate-pulse space-y-8 px-4 py-16"><div className="mx-auto h-48 max-w-6xl rounded-2xl bg-gray-100" /><div className="mx-auto h-64 max-w-6xl rounded-2xl bg-gray-100" /></div>;
}

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white">
			<AboutHeroSection />
			<MissionVisionSection />
			<Suspense fallback={<AboutContentFallback />}>
				<AboutPartnerContent />
			</Suspense>
		</div>
	);
}
