/**
 * Normalizes image URLs from the API.
 * Replaces internal Docker URLs with the public API URL.
 * 
 * @param url - The URL to normalize
 * @returns The normalized URL
 */
export function normalizeUrl(url: string | null | undefined): string {
	if (!url) return "";

	// If it's already a full URL with the correct domain, return it
	if (url.startsWith("https://api.mettyeung27.org")) {
		return url;
	}

	// Replace internal Docker URLs or localhost with the public API URL
	const publicApiUrl = "https://api.mettyeung27.org";
	
	// Handle various internal URL formats
	return url
		.replace("http://backend:8000", publicApiUrl)
		.replace("http://localhost:8000", publicApiUrl);
}
