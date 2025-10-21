import { Language } from "../i18n";

export function getDynamicTranslation<T extends Record<string, string>>(
	translations: T | null | undefined,
	lang: Language,
	fallbackLang: Language = "en"
): string {
	if (!translations) return "";
	return translations[lang] || translations[fallbackLang] || "";
}
