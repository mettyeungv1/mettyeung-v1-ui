import { PartnersHeroSection } from "@/components/partners/partners-hero";
import { NetworkStats } from "@/components/partners/network-stats";
import { PartnersGrid } from "@/components/partners/partners-grid";
import { MouSection } from "@/components/partners/mou-section";
import { getPartnersService, getMousService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";
import { Metadata } from "next";
import { Suspense } from "react";
import NetworkLoading from "./loading";

export const metadata: Metadata = {
	title: "Our Partners | Mettyerng",
	description: "Discover the organizations and partners we collaborate with to achieve our mission.",
};

async function PartnerContent() {
	const [res, mouRes] = await Promise.all([
		getPartnersService({ page: 1, limit: 24, sort: "order", isActive: true }),
		getMousService({ page: 1, limit: 100, sort: "order", isActive: true }),
	]);
	const initialPartners: Partner[] = res.status_code === 200 ? (res.data?.data || (Array.isArray(res.data) ? res.data : [])) : [];
	const initialMous: Partner[] = mouRes.status_code === 200 ? (mouRes.data?.data || (Array.isArray(mouRes.data) ? mouRes.data : [])) : [];

	const mouCount = initialMous.length;
	const partnerCount = res.data?.total || initialPartners.length;
	const sectorCount = new Set(initialMous.map((m) => m.mouType).filter(Boolean)).size;

	return (
		<>
			<NetworkStats mouCount={mouCount} partnerCount={partnerCount} sectorCount={sectorCount} />
			<MouSection initialMous={initialMous} />
			<PartnersGrid initialPartners={initialPartners} />
		</>
	);
}

export default function PartnersPage() {
	return (
		<div className="min-h-screen bg-surface-page">
			<PartnersHeroSection />
			<Suspense fallback={<NetworkLoading />}>
				<PartnerContent />
			</Suspense>
		</div>
	);
}
