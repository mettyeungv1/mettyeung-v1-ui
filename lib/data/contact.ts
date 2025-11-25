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

export const contactInfo: ContactInfoItem[] = [
	{
		icon: Phone,
		title: "ទូរសព្ទ",
		title_en: "Phone",
		details: ["015 220 320"],
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: Mail,
		title: "អ៊ីមែល",
		title_en: "Email",
		details: ["info@mettyerng.org"],
		color: "from-blue-500 to-blue-500",
	},
	{
		icon: MapPin,
		title: "អាសយដ្ឋាន",
		title_en: "Address",
		details: ["Phnom Penh, Cambodia"],
		color: "from-red-500 to-red-500",
	},
	{
		icon: Clock,
		title: "ម៉ោងបើកធ្វើការ",
		title_en: "Working Hours",
		details: ["Mon-Fri: 9:00 AM - 4:30 PM"],
		color: "from-purple-500 to-indigo-600",
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
