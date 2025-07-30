import { FeatureItem, StatItem } from "../types/home";
import { Users, BookOpen, Heart, Award } from "lucide-react";

export const stats: StatItem[] = [
	{
		titleKey: "stats.members",
		value: 150,
		suffix: "+",
		icon: Users,
		descriptionKey: "home.activeMembers",
	},
	{
		titleKey: "stats.projects",
		value: 25,
		suffix: "+",
		icon: Award,
		descriptionKey: "home.successfulProjects",
	},
	{
		titleKey: "stats.beneficiaries",
		value: 500,
		suffix: "+",
		icon: BookOpen,
		descriptionKey: "home.educatedChildren",
	},
	{
		titleKey: "stats.volunteers",
		value: 1000,
		suffix: "+",
		icon: Heart,
		descriptionKey: "home.helpedFamilies",
	},
];

export const features: FeatureItem[] = [
	{
		titleKey: "home.education",
		descriptionKey: "home.educationDesc",
		image:
			"https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/about#education",
	},
	{
		titleKey: "home.culture",
		descriptionKey: "home.cultureDesc",
		image:
			"https://images.pexels.com/photos/3760631/pexels-photo-3760631.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/about#culture",
	},
	{
		titleKey: "home.social",
		descriptionKey: "home.socialDesc",
		image:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
		link: "/projects",
	},
];
