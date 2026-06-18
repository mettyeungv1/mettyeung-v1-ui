"use client";

import { Users } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { useTranslation } from "@/lib/i18n";

interface StructureHeroProps {
	departmentCount: number;
	totalMembers: number;
}

export function StructureHero({
	departmentCount,
	totalMembers,
}: StructureHeroProps) {
	const { t } = useTranslation();
	return (
		<PageHero
			title={t("structure.hero.title")}
			subtitle={t("structure.hero.description")}
			icon={Users}
		/>
	);
}
