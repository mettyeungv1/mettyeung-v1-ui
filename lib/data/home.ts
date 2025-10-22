import { FeatureItem, StatItem } from "../types/home";
import { Users, BookOpen, Heart, Award } from "lucide-react";

export const stats: StatItem[] = [
	{
		titleKey: "stats.members",
		value: 250,
		suffix: "+",
		icon: Users,
		descriptionKey: "home.activeMembers",
	},
	{
		titleKey: "stats.projects",
		value: 10,
		suffix: "+",
		icon: Award,
		descriptionKey: "home.successfulProjects",
	},
	{
		titleKey: "stats.beneficiaries",
		value: 50000,
		suffix: "+",
		icon: BookOpen,
		descriptionKey: "home.educatedChildren",
	},
	{
		titleKey: "stats.volunteers",
		value: 500,
		suffix: "+",
		icon: Heart,
		descriptionKey: "home.helpedFamilies",
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
