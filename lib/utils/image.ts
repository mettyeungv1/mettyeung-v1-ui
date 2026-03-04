/**
 * Normalizes image URLs from the API.
 * Replaces internal Docker URLs with the resolved API base URL.
 * In development, this keeps localhost URLs; in production, it uses the public domain.
 *
 * @param url - The URL to normalize
 * @returns The normalized URL
 */

function getResolvedApiHost(): string {
	// Client-side
	if (typeof window !== "undefined") {
		const clientUrl = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
		if (clientUrl) {
			try {
				const u = new URL(clientUrl);
				return `${u.protocol}//${u.host}`;
			} catch { /* fall through */ }
		}
	}

	// Server-side
	const serverUrl =
		process.env.AUTH_BASE_URL ||
		process.env.INTERNAL_API_URL ||
		process.env.NEXT_PUBLIC_AUTH_BASE_URL;
	if (serverUrl) {
		try {
			const u = new URL(serverUrl);
			return `${u.protocol}//${u.host}`;
		} catch { /* fall through */ }
	}

	// Ultimate fallback (production)
	return "https://api.mettyeung27.org";
}

export function normalizeUrl(url: string | null | undefined): string {
	if (!url) return "";

	const targetHost = getResolvedApiHost();

	// If it's already pointing to the correct host, return as-is
	if (url.startsWith(targetHost)) {
		return url;
	}

	// Replace internal Docker URLs or mismatched hosts with the resolved host
	return url
		.replace("http://backend:8000", targetHost)
		.replace("http://localhost:8000", targetHost)
		.replace("https://api.mettyeung27.org", targetHost);
}
