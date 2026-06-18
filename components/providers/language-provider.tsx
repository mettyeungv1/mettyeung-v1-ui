// FILE: components/providers/language-provider.tsx

"use client";

import React, { useEffect } from "react";
import { useLanguageStore } from "@/lib/i18n";

interface LanguageProviderProps {
	children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
	const { language } = useLanguageStore();

	useEffect(() => {
		// Set the data-language attribute on the document element
		document.documentElement.setAttribute("data-language", language);

		// Update the lang attribute
		document.documentElement.lang = language;

	}, [language]);

	return <>{children}</>;
}
