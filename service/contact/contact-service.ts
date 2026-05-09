import { CONTACT_ENDPOINT } from "@/lib/static";
import { fetchAPI } from "@/lib/api";
import {
	FALLBACK_CONTACT_SETTINGS,
	FALLBACK_SOCIAL_LINKS,
	FALLBACK_OFFICE_HOURS,
} from "@/lib/data/contact";
import type {
	IContactSettingsAPI,
	ISocialLinkAPI,
	IOfficeHourAPI,
} from "@/lib/types/contact";

export async function getContactSettingsService(): Promise<IContactSettingsAPI> {
	try {
		const response = await fetchAPI<IContactSettingsAPI>(
			`${CONTACT_ENDPOINT}/settings`,
			{ next: { revalidate: 300 }, skipAuth: true }
		);
		return response.data ?? FALLBACK_CONTACT_SETTINGS;
	} catch {
		return FALLBACK_CONTACT_SETTINGS;
	}
}

export async function getSocialLinksService(): Promise<ISocialLinkAPI[]> {
	try {
		const response = await fetchAPI<ISocialLinkAPI[]>(
			`${CONTACT_ENDPOINT}/social-links`,
			{ next: { revalidate: 300 }, skipAuth: true }
		);
		return Array.isArray(response.data) ? response.data : FALLBACK_SOCIAL_LINKS;
	} catch {
		return FALLBACK_SOCIAL_LINKS;
	}
}

export async function getOfficeHoursService(): Promise<IOfficeHourAPI[]> {
	try {
		const response = await fetchAPI<IOfficeHourAPI[]>(
			`${CONTACT_ENDPOINT}/office-hours`,
			{ next: { revalidate: 300 }, skipAuth: true }
		);
		return Array.isArray(response.data) ? response.data : FALLBACK_OFFICE_HOURS;
	} catch {
		return FALLBACK_OFFICE_HOURS;
	}
}
