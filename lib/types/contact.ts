export interface ContactInfoItem {
	icon: React.ElementType;
	title: string;
	title_en: string;
	details: string[];
	color: string;
}

export interface SocialLinkItem {
	name: string;
	icon: React.ElementType;
	href: string;
	color: string;
}

export interface DepartmentOption {
	value: string;
	label: string;
}
