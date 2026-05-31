"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";
import { PageHero } from "@/components/gallery/page-hero";

export function NewsHero() {
	const { t } = useTranslation();
	return <PageHero title={t("nav.news")} subtitle={t("events.heroDescription")} />;
}
