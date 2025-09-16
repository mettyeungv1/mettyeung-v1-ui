export interface PartnerMedia {
	id: string;
	url: string;
	altText?: string | null;
}

export interface Partner {
	id: string;
	order: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	media: PartnerMedia | null;
}