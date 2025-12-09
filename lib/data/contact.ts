import {
	Phone,
	Mail,
	MapPin,
	Clock,
	Facebook,
	Youtube,
	Instagram,
} from "lucide-react";
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
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: Mail,
		title: "contactUs.email",
		details: ["mettyeung@gmail.com"],
		color: "from-blue-500 to-blue-500",
	},
	{
		icon: MapPin,
		title: "contactUs.address",
		details: [
			"ផ្ទះលេខ ៩C, ផ្លូវលេខ ៥៩៨, ភូមិទួលថ្ងាន់",
			"សង្កាត់ទួលសង្កែទី២, ខណ្ឌឫស្សីកែវ, រាជធានីភ្នំពេញ",
		],
		color: "from-red-500 to-red-500",
	},
	// {
	// 	icon: Clock,
	// 	title: "contactUs.workingHours",
	// 	details: ["Mon-Fri: 9:00 AM - 4:30 PM"],
	// 	color: "from-purple-500 to-indigo-600",
	// },
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
		color: "hover:text-red-600",
	},
	// {
	// 	name: "Instagram",
	// 	icon: Instagram,
	// 	href: "https://instagram.com",
	// 	color: "hover:text-pink-600",
	// },
];

export const departments: DepartmentOption[] = [
	{ value: "general", label: "General Inquiry" },
	{ value: "volunteer", label: "Volunteer" },
	{ value: "donation", label: "Donation" },
	{ value: "partnership", label: "Partnership" },
	{ value: "media", label: "Media" },
];
