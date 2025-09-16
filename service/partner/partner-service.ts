import { fetchAPI } from "@/lib/api";
import { MEDIA_ENDPOINT, PARTNER_ENDPOINT } from "@/lib/static";
import type { Partner } from "@/lib/types/partner";

export const getPartnersService = async (): Promise<APIResponse<Partner[]>> => {
	const res = await fetchAPI<Partner[]>(PARTNER_ENDPOINT);
	// Normalize media URL for direct display
	if (res?.data) {
		res.data = res.data.map((p) => ({
			...p,
			media: p.media
				? { ...p.media, url: `${MEDIA_ENDPOINT}/view/${p.media.url}` }
				: null,
		}));
	}
	return res;
};