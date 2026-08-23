import { fetchAPI, getApiUrl } from "@/lib/api";
import type { RawCategory } from "@/service/category/category-service";
import type { IContactSettingsAPI, ISocialLinkAPI } from "@/lib/types/contact";

export type LayoutData = {
	categories: RawCategory[];
	socialLinks: ISocialLinkAPI[];
	contactSettings: IContactSettingsAPI | null;
};

export function getLayoutDataService() {
	return fetchAPI<LayoutData>(`${getApiUrl()}/layout-data`, { retries: 1 });
}
