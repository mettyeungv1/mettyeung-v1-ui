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
	socials?: SocialLink[];
	associations?: Array<{
		associationId: string;
		role?: string;
		isHead: boolean;
		association?: any;
	}>;
	bio?: LocalizedText;
	dob?: string;
	gender?: string;
	nationality?: string;
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
	name_km: string;
	title_en: string;
	title_km: string;
	position_en: string;
	image: string;
	email: string;
	phone: string;
	phoneNumber: string;
	location: string;
	location_en: string;
	location_km?: string;
	joinDate: string;
	joinYear?: number;
	bio: string;
	bio_km?: string;
	department: string;
	skills: string[];
	socialLinks: SocialLink[];

	// API-specific fields
	educations: Education[];
	experiences: Experience[];
	socials: SocialLink[];
	associations: Array<{
		associationId: string;
		name?: string;
		role?: string;
		isHead: boolean;
		order?: number;
		association?: any;
	}>;
	dob?: string;
	gender?: string;
	nationality?: string;
	status?: string;
	memberCode?: string;
	languages?: string[];

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
