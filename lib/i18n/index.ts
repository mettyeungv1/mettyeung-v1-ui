"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";

// Import the translation files
import en from "@/locales/en.json";
import km from "@/locales/km.json";

export type Language = "en" | "km";

// The translations object
const translations = { en, km };

// Function to get translation by key
export const getTranslation = (key: string, language: Language): string => {
	const keys = key.split(".");
	let value: any = translations[language];

	for (const k of keys) {
		if (value && typeof value === "object" && k in value) {
			value = value[k];
		} else {
			return key; // Return the key itself if no translation is found
		}
	}

	return typeof value === "string" ? value : key;
};

interface LanguageStore {
	language: Language;
	setLanguage: (language: Language) => void;
	t: (key: string) => string;
}

// Create the Zustand store
export const useLanguageStore = create<LanguageStore>()(
	persist(
		(set, get) => ({
			language: "km",
			setLanguage: (language) => set({ language }),
			t: (key: string) => {
				const { language } = get();
				return getTranslation(key, language);
			},
		}),
		{
			name: "language-storage",
		}
	)
);

// Hydration-aware useTranslation hook
export const useTranslation = () => {
	const store = useLanguageStore();
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		// This effect runs only on the client, after the initial render.
		setIsHydrated(true);
	}, []);

	const t = (key: string): string => {
		// Before hydration, always use the default language ('km') to match the server.
		// After hydration, use the real 't' function from the store, which might be 'en'.
		return isHydrated ? store.t(key) : getTranslation(key, "km");
	};

	return {
		language: store.language,
		setLanguage: store.setLanguage,
		t,
		isHydrated,
	};
};
