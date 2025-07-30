import { LucideIcon } from "lucide-react";

export interface StatItem {
	titleKey: string;
	value: number;
	suffix: string;
	icon: LucideIcon;
	descriptionKey: string;
}

export interface FeatureItem {
	titleKey: string;
	descriptionKey: string;
	image: string;
	link: string;
}
