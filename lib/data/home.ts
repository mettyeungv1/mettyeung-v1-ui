import { FeatureItem, StatItem } from "../types/home";
import {
	Users,
	BookOpen,
	Heart,
	Award,
	School,
	GraduationCap,
	Users2,
} from "lucide-react";

export const stats: StatItem[] = [
	{
		titleKey: "stats.upskilling",
		value: 15,
		suffix: "",
		icon: BookOpen,
		descriptionKey: "home.upskillingDesc",
	},
	{
		titleKey: "stats.projects",
		value: 70,
		suffix: "",
		icon: Heart,
		descriptionKey: "home.successfulProjects",
	},
	{
		titleKey: "stats.eci",
		value: 5,
		suffix: "",
		icon: GraduationCap,
		descriptionKey: "home.eciDesc",
	},
	{
		titleKey: "stats.beneficiaries",
		value: 20000,
		suffix: "+",
		icon: Users2,
		descriptionKey: "home.educatedChildren",
	},
];

export const features: FeatureItem[] = [
	{
		titleKey: "home.education",
		descriptionKey: "home.educationDesc",
		image: "/friendship.jpg",
		link: "/about#education",
	},
	{
		titleKey: "home.social",
		descriptionKey: "home.socialDesc",
		image: "/education.jpg",
		link: "/about",
	},
	{
		titleKey: "home.culture",
		descriptionKey: "home.cultureDesc",
		image: "/corevlaue.jpg",
		link: "/about#culture",
	},
];
