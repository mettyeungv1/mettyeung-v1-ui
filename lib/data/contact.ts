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
		details: ["+855 12 345 678", "+855 10 987 654"],
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: Mail,
		title: "អ៊ីមែល",
		title_en: "Email",
		details: ["info@mettyerng.org", "contact@mettyerng.org"],
		color: "from-blue-500 to-indigo-500",
	},
	{
		icon: MapPin,
		title: "អាសយដ្ឋាន",
		title_en: "Address",
		details: ["Phnom Penh, Cambodia", "House #123, Street 456"],
		color: "from-red-500 to-pink-500",
	},
	{
		icon: Clock,
		title: "ម៉ោងបើកធ្វើការ",
		title_en: "Working Hours",
		details: ["Mon-Fri: 8:00 AM - 5:00 PM", "Saturday: 8:00 AM - 12:00 PM"],
		color: "from-purple-500 to-violet-500",
	},
];

export const socialLinks: SocialLinkItem[] = [
	{
		name: "Facebook",
		icon: Facebook,
		href: "https://facebook.com",
		color: "hover:text-blue-600",
	},
	{
		name: "Youtube",
		icon: Youtube,
		href: "https://youtube.com",
		color: "hover:text-red-600",
	},
	{
		name: "Instagram",
		icon: Instagram,
		href: "https://instagram.com",
		color: "hover:text-pink-600",
	},
];

export const departments: DepartmentOption[] = [
	{ value: "general", label: "General Inquiry" },
	{ value: "volunteer", label: "Volunteer" },
	{ value: "donation", label: "Donation" },
	{ value: "partnership", label: "Partnership" },
	{ value: "media", label: "Media" },
];
