export type LocalizedField = Record<string, string>;

export interface Language {
	code: string;
	name: string;
	nativeName: string;
	flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
	{ code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
	{ code: "km", name: "Khmer", nativeName: "ខ្មែរ", flag: "🇰🇭" },
	{ code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
	{ code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
	{ code: "th", name: "Thai", nativeName: "ภาษาไทย", flag: "🇹🇭" },
];

export const DEFAULT_LANGUAGE_CODE: keyof LocalizedField = "en";

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];
