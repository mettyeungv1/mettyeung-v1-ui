const DEFAULT_MAP_LATITUDE = 11.595197;
const DEFAULT_MAP_LONGITUDE = 104.901852;

function parseCoordinate(
	value: string | number | null | undefined,
	minimum: number,
	maximum: number
): number | null {
	if (value === null || value === undefined || value === "") return null;

	const parsed = typeof value === "number" ? value : Number(value);
	return Number.isFinite(parsed) && parsed >= minimum && parsed <= maximum
		? parsed
		: null;
}

export function createGoogleMapsEmbedUrl(
	latitude: string | number | null | undefined,
	longitude: string | number | null | undefined
): string {
	const safeLatitude =
		parseCoordinate(latitude, -90, 90) ?? DEFAULT_MAP_LATITUDE;
	const safeLongitude =
		parseCoordinate(longitude, -180, 180) ?? DEFAULT_MAP_LONGITUDE;
	const url = new URL("https://www.google.com/maps");

	url.searchParams.set("q", `${safeLatitude},${safeLongitude}`);
	url.searchParams.set("output", "embed");
	return url.toString();
}

export function createGoogleMapsLocationUrl(
	latitude: string | number | null | undefined,
	longitude: string | number | null | undefined
): string {
	const safeLatitude =
		parseCoordinate(latitude, -90, 90) ?? DEFAULT_MAP_LATITUDE;
	const safeLongitude =
		parseCoordinate(longitude, -180, 180) ?? DEFAULT_MAP_LONGITUDE;
	const url = new URL("https://www.google.com/maps/search/");

	url.searchParams.set("api", "1");
	url.searchParams.set("query", `${safeLatitude},${safeLongitude}`);
	return url.toString();
}

export function safeExternalHttpsUrl(
	value: string | null | undefined
): string | null {
	if (!value) return null;

	try {
		const url = new URL(value.trim());
		return url.protocol === "https:" ? url.toString() : null;
	} catch {
		return null;
	}
}

export function safeNavigationHref(
	value: string | null | undefined
): string | null {
	if (!value) return null;

	const candidate = value.trim();
	if (/^\/(?!\/)/.test(candidate)) return candidate;
	return safeExternalHttpsUrl(candidate);
}
