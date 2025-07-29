export type VideoCategory = "community" | "education" | "culture" | "sports";

export interface Video {
	id: number;
	title: string;
	title_en: string;
	description: string;
	category: VideoCategory;
	duration: string;
	views: number;
	date: string;
	thumbnail: string;
	videoId: string;
	featured: boolean;
}
