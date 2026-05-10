export interface ContactInfoItem {
	icon: React.ElementType;
	title: string;
	details: string[];
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

// API response types from /contact endpoints
export interface IContactSettingsAPI {
	id: string;
	phone: string | null;
	email: string | null;
	address: Record<string, string> | null;
	mapLat: string | null;
	mapLng: string | null;
	mapEmbedUrl: string | null;
	statsMembersCount: number;
	statsYearsCount: number;
	statsAssociationsCount: number;
	copyrightText: string | null;
	aboutShort: Record<string, string> | null;
	updatedAt: string;
}

export interface ISocialLinkAPI {
	id: string;
	platform: string;
	url: string;
	iconName: string | null;
	order: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IOfficeHourAPI {
	id: string;
	dayOfWeek: number;
	openTime: string | null;
	closeTime: string | null;
	isClosed: boolean;
	updatedAt: string;
}
