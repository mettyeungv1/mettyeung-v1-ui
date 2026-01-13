import { fetchAPI } from "@/lib/api";
import { MEDIA_ENDPOINT, PARTNER_ENDPOINT } from "@/lib/static";
import type { Partner } from "@/lib/types/partner";

type PartnerParams = {
	page?: number;
	limit?: number;
	sort?: string;
};

export const getPartnersService = async (
	params: PartnerParams = {}
): Promise<APIResponse<any>> => {
	const qs = new URLSearchParams({
		sort: params.sort || "order",
		...(params.page && { page: String(params.page) }),
		...(params.limit && { limit: String(params.limit) }),
	}).toString();

	const res = await fetchAPI<any>(`${PARTNER_ENDPOINT}?${qs}`);
	
	// Helper to normalize a single partner
	const normalizePartner = (p: Partner) => ({
		...p,
		media: p.media
			? { ...p.media, url: `${MEDIA_ENDPOINT}/view/${p.media.url}` }
			: null,
	});

	// Handle paginated response
	if (res?.data?.data && Array.isArray(res.data.data)) {
		res.data.data = res.data.data.map(normalizePartner);
		return res;
	}

	// Handle flat array response (backward compatibility or if backend doesn't paginate yet)
	if (Array.isArray(res?.data)) {
		res.data = res.data.map(normalizePartner);
	}
	
	return res;
};
