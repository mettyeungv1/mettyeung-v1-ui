export interface BlogMedia {
	id: string;
	type: string;
	url: string;
	altText?: string | null;
	fileName?: string | null;
}

export interface BlogCategory {
	id: string;
	name: string | { [lang: string]: string };
}

export interface BlogPost {
	id: string;
	title: string | { [lang: string]: string };
	content: string | { [lang: string]: string };
	publishedAt?: string | Date | null;
	coverImageUrl?: string | null;
	readCounts?: number;
	readTimes?: number;
	commentsCount?: number;
	isFeatured: boolean;
	createdAt: string | Date;
	updatedAt: string | Date;
	category?: BlogCategory | null;
	media: BlogMedia[];
	author?: {
		id: string;
		name?: string;
		email?: string;
		role?: string;
		avatarUrl?: string | null;
	};
}

export interface Paginated<T> {
	data: T[];
	meta?: { page?: number; limit?: number; total?: number; pages?: number };
}