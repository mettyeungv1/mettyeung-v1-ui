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
		icon: Rocket,
		titleKey: "about.mission.title",
		descriptionKey1: "about.mission.desc1",
		borderColor: "border-l-blue-500",
		iconColor: "text-indigo-500",
	},
	{
		icon: Eye,
		titleKey: "about.vision.title",
		descriptionKey1: "about.vision.desc1",
		borderColor: "border-l-blue-500",
		iconColor: "text-amber-500",
	},
	{
		icon: Handshake,
		titleKey: "about.values.title",
		descriptionKey1: "about.values.desc1",
		borderColor: "border-l-blue-500",
		iconColor: "text-emerald-500",
	},
];

export const partners: Partner[] = [
	{ name: "My Cut", logoSrc: "/my-cut.png" },
	{ name: "Wing", logoSrc: "/wing.png" },
];
