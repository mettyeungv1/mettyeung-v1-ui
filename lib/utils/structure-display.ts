export const STRUCTURE_EMPTY_VALUE = "N/A";

export function isBlankValue(value: unknown): boolean {
	if (value === null || value === undefined) return true;
	if (typeof value === "string") return value.trim().length === 0;
	return false;
}

export function displayStructureValue(value: unknown, fallback = STRUCTURE_EMPTY_VALUE): string {
	if (isBlankValue(value)) return fallback;
	return String(value).replace(/\s+/g, " ").trim();
}

export function optionalStructureValue(value: unknown): string {
	return isBlankValue(value) ? "" : String(value).replace(/\s+/g, " ").trim();
}
