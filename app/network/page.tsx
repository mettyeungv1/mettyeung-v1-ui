import { PartnersHeroSection } from "@/components/partners/partners-hero";
import { PartnersGrid } from "@/components/partners/partners-grid";
import { MouSection } from "@/components/partners/mou-section";
import { getPartnersService, getMousService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Our Partners | Mettyerng",
	description: "Discover the organizations and partners we collaborate with to achieve our mission.",
};

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
	const res = await getPartnersService({ page: 1, limit: 24, sort: "order", isActive: true });
	const initialPartners: Partner[] = res.status_code === 200 ? (res.data?.data || (Array.isArray(res.data) ? res.data : [])) : [];

	const mouRes = await getMousService({ page: 1, limit: 100, sort: "order", isActive: true });
	const initialMous: Partner[] = mouRes.status_code === 200 ? (mouRes.data?.data || (Array.isArray(mouRes.data) ? mouRes.data : [])) : [];

	return (
		<div className="min-h-screen bg-gray-50/50">
			<PartnersHeroSection />
			<MouSection initialMous={initialMous} />
			<PartnersGrid initialPartners={initialPartners} />
		</div>
	);
}
