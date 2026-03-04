import {
	Heart,
	BookOpen,
	Globe,
	Users,
	Lightbulb,
	Award,
	Target,
	Eye,
	Handshake,
	Rocket,
} from "lucide-react";
import { Partner, ValueItem } from "../types/about";

export const missionVisionValues: ValueItem[] = [
	{
		icon: Target,
		titleKey: "about.goals.title",
		descriptionKey1: "about.goals.desc1",
		listKeys: [
			"about.goals.list1",
			"about.goals.list2",
			"about.goals.list3",
			"about.goals.list4"
		],
		borderColor: "border-l-blue-500",
		iconColor: "text-indigo-500",
	},
	{
		icon: Rocket,
		titleKey: "about.mission.title",
		descriptionKey1: "about.mission.desc1",
		borderColor: "border-l-blue-500",
		iconColor: "text-amber-500",
	},
];

export const partners: Partner[] = [
	{ name: "My Cut", logoSrc: "/my-cut.png" },
	{ name: "Wing", logoSrc: "/wing.png" },
];
