import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import {
	ContactInfoItem,
	DepartmentOption,
	SocialLinkItem,
	IContactSettingsAPI,
	ISocialLinkAPI,
	IOfficeHourAPI,
} from "../types/contact";
import { FaTelegram } from "react-icons/fa";

export const contactInfo: ContactInfoItem[] = [
	{
		icon: Phone,
		title: "contactUs.phone",
		details: ["015 220 320"],
	},
	{
		icon: Mail,
		title: "contactUs.email",
		details: ["mettyeung@gmail.com"],
	},
	{
		icon: MapPin,
		title: "contactUs.address",
		details: [
			"ផ្ទះលេខ ៣AF, ផ្លូវលេខ ៥៩៨, ភូមិទួលថ្ងាន់",
			"សង្កាត់ទួលសង្កែទី២, ខណ្ឌឫស្សីកែវ, រាជធានីភ្នំពេញ",
		],
	},
];

export const socialLinks: SocialLinkItem[] = [
	{
		name: "Facebook",
		icon: Facebook,
		href: "https://web.facebook.com/profile.php?id=100091461679738",
		color: "hover:text-blue-600",
	},
	{
		name: "Youtube",
		icon: Youtube,
		href: "https://youtube.com",
		color: "hover:text-red-600",
	},
	{
		name: "Telegram",
		icon: FaTelegram,
		href: "https://t.me/mettyeung",
		color: "hover:text-sky-500",
	},
];

export const departments: DepartmentOption[] = [
	{ value: "general", label: "General Inquiry" },
	{ value: "volunteer", label: "Volunteer" },
	{ value: "donation", label: "Donation" },
	{ value: "partnership", label: "Partnership" },
	{ value: "media", label: "Media" },
];

// ─── Fallback values used when the API is unavailable ─────────────────────

export const FALLBACK_CONTACT_SETTINGS: IContactSettingsAPI = {
	id: "00000000-0000-0000-0000-000000000001",
	phone: "015 220 320",
	email: "mettyeung@gmail.com",
	address: {
		en: "House #3AF, Street 598, Toul Thnang Village, Sangkat Toul Sangke 2, Khan Russey Keo, Phnom Penh",
		km: "ផ្ទះលេខ ៣AF, ផ្លូវលេខ ៥៩៨, ភូមិទួលថ្ងាន់, សង្កាត់ទួលសង្កែទី២, ខណ្ឌឫស្សីកែវ, រាជធានីភ្នំពេញ",
	},
	mapLat: "11.59519720",
	mapLng: "104.90185200",
	mapEmbedUrl:
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.287265969562!2d104.89966301136453!3d11.595197200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109539297965083%3A0x7d11e2074597e98c!2sMett%20Yeung%20Association!5e0!3m2!1sen!2skh!4v1707378900000!5m2!1sen!2skh",
	statsMembersCount: 200,
	statsYearsCount: 4,
	statsAssociationsCount: 10,
	updatedAt: new Date().toISOString(),
};

export const FALLBACK_SOCIAL_LINKS: ISocialLinkAPI[] = [
	{
		id: "fallback-fb",
		platform: "facebook",
		url: "https://web.facebook.com/profile.php?id=100091461679738",
		iconName: "Facebook",
		order: 0,
		isActive: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "fallback-yt",
		platform: "youtube",
		url: "https://youtube.com/@_mettyeung8858",
		iconName: "Youtube",
		order: 1,
		isActive: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "fallback-tg",
		platform: "telegram",
		url: "https://t.me/mettyeung",
		iconName: "FaTelegram",
		order: 2,
		isActive: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

export const FALLBACK_OFFICE_HOURS: IOfficeHourAPI[] = [
	{ id: "oh-0", dayOfWeek: 0, openTime: null,    closeTime: null,    isClosed: true,  updatedAt: new Date().toISOString() },
	{ id: "oh-1", dayOfWeek: 1, openTime: "08:00", closeTime: "17:00", isClosed: false, updatedAt: new Date().toISOString() },
	{ id: "oh-2", dayOfWeek: 2, openTime: "08:00", closeTime: "17:00", isClosed: false, updatedAt: new Date().toISOString() },
	{ id: "oh-3", dayOfWeek: 3, openTime: "08:00", closeTime: "17:00", isClosed: false, updatedAt: new Date().toISOString() },
	{ id: "oh-4", dayOfWeek: 4, openTime: "08:00", closeTime: "17:00", isClosed: false, updatedAt: new Date().toISOString() },
	{ id: "oh-5", dayOfWeek: 5, openTime: "08:00", closeTime: "17:00", isClosed: false, updatedAt: new Date().toISOString() },
	{ id: "oh-6", dayOfWeek: 6, openTime: "08:00", closeTime: "12:00", isClosed: false, updatedAt: new Date().toISOString() },
];
