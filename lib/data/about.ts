import {
	Heart,
	BookOpen,
	Globe,
	Users,
	Lightbulb,
	Award,
	Target,
	Eye,
} from "lucide-react";
import { Partner, ValueItem } from "../types/about";

export const missionVisionValues: ValueItem[] = [
	{
		icon: Target,
		titleKey: "about.mission.title",
		subtitleKey: "about.mission.title_en",
		descriptionKey1: "about.mission.desc1",
		descriptionKey2: "about.mission.desc2",
		borderColor: "border-l-yellow-500",
	},
	{
		icon: Eye,
		titleKey: "about.vision.title",
		subtitleKey: "about.vision.title_en",
		descriptionKey1: "about.vision.desc1",
		descriptionKey2: "about.vision.desc2",
		borderColor: "border-l-red-500",
	},
	{
		icon: Users,
		titleKey: "about.values.title",
		subtitleKey: "about.values.title_en",
		descriptionKey1: "about.values.love.description",
		descriptionKey2: "about.values.education.description",
		borderColor: "border-l-blue-500",
	},
];

export const partners: Partner[] = [
	{ name: "My Cut", logoSrc: "/my-cut.png" },
	{ name: "Wing", logoSrc: "/wing.png" },
];
