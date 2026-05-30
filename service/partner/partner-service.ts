import { fetchAPI } from "@/lib/api";
import { MEDIA_ENDPOINT, PARTNER_ENDPOINT } from "@/lib/static";
import type { Partner } from "@/lib/types/partner";
import { normalizeUrl } from "@/lib/utils/image";

type LocalizedValue = Record<string, string> | string | null | undefined;

type PartnerParams = {
	page?: number;
	limit?: number;
	sort?: string;
	isActive?: boolean;
};

function normalizeLocalizedValue(value: LocalizedValue) {
	if (!value) return null;
	if (typeof value === "string") return { en: value };
	return value;
}

function normalizePartner(p: Partner) {
	const nameTranslations =
		p.name && typeof p.name === "object" ? p.name : p.nameTranslations || null;
	const descriptionTranslations =
		p.description && typeof p.description === "object"
			? p.description
			: p.descriptionTranslations || null;

	return {
		...p,
		name: nameTranslations ?? normalizeLocalizedValue(p.name),
		nameTranslations,
		description: descriptionTranslations ?? normalizeLocalizedValue(p.description),
		descriptionTranslations,
		media: p.media
			? { ...p.media, url: normalizeUrl(`${MEDIA_ENDPOINT}/view/${p.media.url}`) }
			: null,
	};
}

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
		next: { revalidate: 600, tags: ["partners"] },
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

export const getMousService = async (
	params: PartnerParams = {}
): Promise<APIResponse<any>> => {
	const qsParams: Record<string, string> = {
		sort: params.sort || "order",
	};
	if (params.page !== undefined) qsParams.page = String(params.page);
	if (params.limit !== undefined) qsParams.limit = String(params.limit);
	if (params.isActive !== undefined) qsParams.isActive = String(params.isActive);

	const qs = new URLSearchParams(qsParams).toString();

	const res = await fetchAPI<any>(`${PARTNER_ENDPOINT}/mou?${qs}`, {
		skipAuth: true,
		next: { revalidate: 600, tags: ["partners", "mous"] },
	});
	
	// Handle paginated response
	if (res?.data?.data && Array.isArray(res.data.data)) {
		res.data.data = res.data.data.map(normalizePartner);
		return res;
	}

	if (Array.isArray(res?.data)) {
		res.data = res.data.map(normalizePartner);
	}

	return res;
};
