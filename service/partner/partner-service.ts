import { fetchAPI } from "@/lib/api";
import { MEDIA_ENDPOINT, PARTNER_ENDPOINT } from "@/lib/static";
import type { Partner } from "@/lib/types/partner";
import { normalizeUrl } from "@/lib/utils/image";

type PartnerParams = {
	page?: number;
	limit?: number;
	sort?: string;
	isActive?: boolean;
};

export const getPartnersService = async (
	params: PartnerParams = {}
): Promise<APIResponse<any>> => {
	const qsParams: Record<string, string> = {
		sort: params.sort || "order",
	};
	if (params.page !== undefined) qsParams.page = String(params.page);
	if (params.limit !== undefined) qsParams.limit = String(params.limit);
	if (params.isActive !== undefined) qsParams.isActive = String(params.isActive);

	const qs = new URLSearchParams(qsParams).toString();

	const res = await fetchAPI<any>(`${PARTNER_ENDPOINT}?${qs}`, {
		skipAuth: true,
		cache: 'no-store',
		next: { revalidate: 0 },
	});
	
	// Helper to normalize a single partner
	const normalizePartner = (p: Partner) => ({
		...p,
		media: p.media
			? { ...p.media, url: normalizeUrl(`${MEDIA_ENDPOINT}/view/${p.media.url}`) }
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
