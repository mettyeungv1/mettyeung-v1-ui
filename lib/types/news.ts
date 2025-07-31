export interface NewsArticle {
	id: number;
	title: string;
	title_en: string;
	excerpt: string;
	content: string;
	category: Omit<NewsCategory, "subcategories"> & {
		subCategory: SubCategory;
	};
	author: Author;
	date: string;
	readTime: string;
	image: string;
	gallery: GalleryImage[];
	featured: boolean;
	views: number;
	comments: number;
	tags: string[];
	publishedAt: string;
	updatedAt: string;
}

export interface SubCategory {
	id: string;
	name: string;
	name_en: string;
}

export interface NewsCategory {
	id: string;
	name: string;
	name_en: string;
	count: number;
	subcategories?: SubCategory[];
}

export interface Author {
	name: string;
	name_en: string;
	avatar: string;
	bio_en: string;
	email?: string;
	phone?: string;
	location?: string;
}

export interface GalleryImage {
	url: string;
	caption: string;
}
