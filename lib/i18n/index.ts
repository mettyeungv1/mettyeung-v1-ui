"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";

// Import the translation files
import en from "@/locales/en.json";
import km from "@/locales/km.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import th from "@/locales/th.json";

export type Language = "en" | "km" | "ko" | "ja" | "th";

// The translations object
const translations = { en, km, ko, ja, th };

// Function to get translation by key
export function getTranslation(
	keyOrObject: string | Record<string, string> | null | undefined,
	language: Language,
	translationsMap: Record<string, any>,
	fallbackLang: Language = "en"
): string {
	// 🟩 CASE 1: Dynamic content from API
	if (keyOrObject && typeof keyOrObject === "object") {
		return keyOrObject[language] || keyOrObject[fallbackLang] || "";
	}

	// 🟩 CASE 2: Static key from JSON files
	if (typeof keyOrObject === "string") {
		const keys = keyOrObject.split(".");
		let value: any = translationsMap[language];

		for (const k of keys) {
			if (value && typeof value === "object" && k in value) {
				value = value[k];
			} else {
				return keyOrObject; // fallback to key name if missing
			}
		}

		return typeof value === "string" ? value : keyOrObject;
	}

	// Default fallback
	return "";
}

interface LanguageStore {
	language: Language;
	setLanguage: (language: Language) => void;
	t: (key: string | Record<string, string> | null | undefined) => string;
}

// Create the Zustand store
export const useLanguageStore = create<LanguageStore>()(
	persist(
		(set, get) => ({
			language: "km",
			setLanguage: (language) => set({ language }),
			t: (keyOrObject) => {
				const { language } = get();
				return getTranslation(keyOrObject, language, translations);
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
		setIsHydrated(true);
	}, []);

	const t = (
		key: string | Record<string, string> | null | undefined
	): string => {
		return isHydrated ? store.t(key) : getTranslation(key, "km", translations);
	};

	return {
		language: store.language,
		setLanguage: store.setLanguage,
		t,
		isHydrated,
	};
};
