"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/lib/i18n";

export function AppInitializer() {
	const { language } = useLanguageStore();

	useEffect(() => {
		document.documentElement.lang = language;
		document.documentElement.dataset.language = language;
	}, [language]);

	return null;
}
