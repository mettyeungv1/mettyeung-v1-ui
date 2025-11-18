// Type definitions for Structure/Member system

export interface LocalizedText {
	en?: string;
	km?: string;
}

export interface Education {
	schoolName: LocalizedText;
	degree: LocalizedText;
	startYear?: number;
	endYear?: number;
	order: number;
}

export interface Experience {
	title: LocalizedText;
	organization: LocalizedText;
	description: LocalizedText;
	startYear?: number;
	endYear?: number;
	order: number;
}

export interface Skill {
	skillId: string;
	order: number;
}

export interface SocialLink {
	platform: string;
	url: string;
}

/**
 * Raw API response structure for a member
 */
export interface APIMemberResponse {
	id: string;
	name: string;
	title: LocalizedText;
	email?: string;
	phoneNumber?: string;
	joinYear?: number;
	avatarUrl?: string;
	location?: LocalizedText;
	educations?: Education[];
	experiences?: Experience[];
	skills?: Skill[];
	associationIds?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

/**
 * Normalized member structure for frontend use
 * Compatible with existing Person interface
 */
export interface Member {
	id: string;
	name: string;
	name_en: string;
	title_en: string;
	position_en: string;
	image: string;
	email: string;
	phone: string;
	phoneNumber: string;
	location: string;
	location_en: string;
	joinDate: string;
	joinYear?: number;
	bio: string;
	department: string;
	skills: string[];
	socialLinks: SocialLink[];

	// API-specific fields
	educations: Education[];
	experiences: Experience[];
	associationIds: string[];

	// Legacy compatibility fields
	education: Array<{
		degree: string;
		institution: string;
		year: string;
	}>;
	experience: Array<{
		title: string;
		company: string;
		period: string;
		description: string;
	}>;
	projects: string[];
	testimonials: Array<{
		text: string;
		author: string;
		role: string;
	}>;
}

/**
 * Department/Section structure
 */
export interface Department {
	id: string;
	title: string;
	title_en: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	bgColor: string;
	image: string;
	members: Member[];
}
