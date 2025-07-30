export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

export interface Experience {
	title: string;
	company: string;
	period: string;
	description: string;
}

export interface Education {
	degree: string;
	institution: string;
	year: string;
}

export interface Language {
	language: string;
	level: string;
}

export interface Testimonial {
	text: string;
	author: string;
	role: string;
}

export interface Person {
	id: string;
	name: string;
	name_en: string;
	position: string;
	position_en: string;
	department: string;
	department_name: string;
	bio: string;
	email: string;
	phone: string;
	location: string;
	joinDate: string;
	image: string;
	skills: string[];
	experience: {
		title: string;
		company: string;
		period: string;
		description: string;
	}[];
	education: { degree: string; institution: string; year: string }[];
	socialLinks: { platform: string; url: string; icon: string }[];
	achievements: string[];
	languages: { language: string; level: string }[];
	projects: string[];
	testimonials: Testimonial[];
}

export interface Department {
	id: string;
	title: string;
	title_en: string;
	icon: React.ElementType;
	color: string;
	bgColor: string;
	description: string;
	members: Person[];
}
