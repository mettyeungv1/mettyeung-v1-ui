export interface PartnerMedia {
	id: string;
	url: string;
	altText?: string | null;
}

export interface Partner {
	id: string;
	name: string;
	description?: string;
	location?: string;
	website?: string;
	email?: string;
	phone?: string;
	order: number;
	isActive: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
	media: PartnerMedia | null;
}