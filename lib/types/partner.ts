import type { LocalizedField } from "./languages";

export interface PartnerMedia {
	id: string;
	url: string;
	altText?: string | null;
}

export interface Partner {
	id: string;
	name: LocalizedField | string | null;
	nameTranslations?: LocalizedField | null;
	websiteUrl: string | null;
	description: LocalizedField | string | null;
	descriptionTranslations?: LocalizedField | null;
	order: number;
	isActive: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
	media: PartnerMedia | null;
	category?: string;
	mouType?: string;
}
