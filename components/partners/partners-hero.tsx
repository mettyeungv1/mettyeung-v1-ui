"use client";

import { useTranslation } from "@/lib/i18n";
import { PageHero } from "@/components/ui/page-hero";
import { Handshake } from "lucide-react";

export function PartnersHeroSection() {
	const { t } = useTranslation();

	return (
		<PageHero
			title={t("partners.title")}
			subtitle={t("partners.description")}
			icon={Handshake}
		/>
	);
}
