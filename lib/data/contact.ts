import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import {
	ContactInfoItem,
	DepartmentOption,
	SocialLinkItem,
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
