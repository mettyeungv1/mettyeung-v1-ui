import { LocalizedField } from "./api";

// Raw API Response Types
export interface APIVideoTranslation {
	id: string;
	videoId: string;
	languageCode: string;
	title: string;
	description: string;
}

export interface APICategoryTranslation {
	id: string;
	categoryId: string;
	languageCode: string;
	name: string;
}

export interface APICategory {
	id: string;
	slug: string;
	parentId?: string | null;
	categoryTranslations: APICategoryTranslation[];
	name?: LocalizedField;
}

export interface APIVideoPost {
	id: string;
	videoId: string;
	thumbnailUrl?: string;
	duration?: string;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
	isFeatured: boolean;
	viewCount: number;
	categoryId: string;
	category: APICategory;
	translations: APIVideoTranslation[];
	title?: LocalizedField;
	description?: LocalizedField;
}

// Normalized Types for Frontend
export interface VideoCategory {
	id: string;
	name: string;
	name_en: string;
	slug: string;
}

export interface Video {
	id: string;
	videoId: string;
	title_en: string;
	title_km?: string;
	title: any;
	description: string;
	description_km?: string;
	thumbnail: string;
	date: string;
	category: string;
	categoryName?: string;
	duration?: string;
	viewCount: number;
	isFeatured: boolean;
	publishedAt: string;
}

// Service Parameters
export interface VideoListParams {
	page?: number;
	limit?: number;
	q?: string;
	categoryId?: string;
	sort?: string;
	isFeatured?: boolean;
	lang?: string;
	isActive?: boolean;
}

// DTO Types
export interface CreateVideoDto {
	videoId: string;
	categoryId: string;
	thumbnailUrl?: string;
	duration?: string;
	publishedAt?: string;
	isFeatured?: boolean;
	isActive?: boolean;
	translations: {
		languageCode: string;
		title: string;
		description: string;
	}[];
}

export interface UpdateVideoDto extends Partial<CreateVideoDto> {
	id?: string;
}
