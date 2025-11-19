import { FeatureItem, StatItem } from "../types/home";
import { Users, BookOpen, Heart, Award, School } from "lucide-react";

export const stats: StatItem[] = [
	{
		titleKey: "stats.members",
		value: 430,
		suffix: "",
		icon: Users,
		descriptionKey: "home.activeMembers",
	},
	{
		titleKey: "stats.projects",
		value: 72,
		suffix: "",
		icon: Heart,
		descriptionKey: "home.successfulProjects",
	},
	{
		titleKey: "stats.training",
		value: 12,
		suffix: "",
		icon: School,
		descriptionKey: "home.helpedFamilies",
	},
	{
		titleKey: "stats.beneficiaries",
		value: 10000,
		suffix: "+",
		icon: BookOpen,
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
		link: "/s",
	},
	{
		titleKey: "home.culture",
		descriptionKey: "home.cultureDesc",
		image: "/corevlaue.jpg",
		link: "/about#culture",
	},
];
