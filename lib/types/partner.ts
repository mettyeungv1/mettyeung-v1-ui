export interface PartnerMedia {
	id: string;
	url: string;
	altText?: string | null;
}

export interface Partner {
	id: string;
	name: string | null;
	websiteUrl: string | null;
	description: string | null;
	order: number;
	isActive: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
	media: PartnerMedia | null;
	category?: string;
	mouType?: string;
}