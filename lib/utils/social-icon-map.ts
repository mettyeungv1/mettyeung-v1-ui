import { Facebook, Youtube, Instagram, Twitter, Linkedin } from "lucide-react";
import { FaTelegram, FaTiktok } from "react-icons/fa";
import type { ElementType } from "react";

export const SOCIAL_ICON_MAP: Record<string, ElementType> = {
	Facebook,
	Youtube,
	Instagram,
	Twitter,
	Linkedin,
	FaTelegram,
	FaTiktok,
	// lowercase aliases
	facebook: Facebook,
	youtube: Youtube,
	instagram: Instagram,
	twitter: Twitter,
	linkedin: Linkedin,
	telegram: FaTelegram,
	tiktok: FaTiktok,
};

export function getSocialIcon(iconName: string | null | undefined): ElementType {
	if (!iconName) return Facebook;
	return SOCIAL_ICON_MAP[iconName] ?? SOCIAL_ICON_MAP[iconName.toLowerCase()] ?? Facebook;
}
