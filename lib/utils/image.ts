const APPROVED_API_BASE_URLS = new Set([
	"https://api.mettyeung27.org/api/v1",
	"https://api.uat.mettyeung27.org/api/v1",
	"http://localhost:8000/api/v1", // local Docker testing
	"http://api:8000/api/v1", // Docker-internal hostname
]);

function getResolvedApiBaseUrl(): URL {
	// Prefer AUTH_BASE_URL (server-side, Docker-internal) so next/image can
	// actually reach the API from inside the container.  Fall back to the
	// browser-visible NEXT_PUBLIC_ variant.
	const candidates = [
		process.env.AUTH_BASE_URL,
		process.env.NEXT_PUBLIC_AUTH_BASE_URL,
	];
	for (const candidate of candidates) {
		try {
			const url = new URL(candidate || "");
			const normalized = `${url.origin}${url.pathname.replace(/\/$/, "")}`;
			if (APPROVED_API_BASE_URLS.has(normalized)) return new URL(normalized);
		} catch {
			// try next candidate
		}
	}

	return new URL("https://api.mettyeung27.org/api/v1");
}

function isApprovedExternalImage(url: URL, apiBaseUrl: URL): boolean {
	// Allow http only when the configured API is also http (local Docker testing)
	const allowHttp = apiBaseUrl.protocol === "http:";
	if (url.protocol !== "https:" && !allowHttp) return false;

	if (url.origin === apiBaseUrl.origin) {
		return url.pathname.startsWith(`${apiBaseUrl.pathname}/media/view/`);
	}

	if (url.hostname === "i.ytimg.com" || url.hostname === "img.youtube.com") {
		return url.pathname.startsWith("/vi/");
	}

	return (
		url.hostname === "images.pexels.com" || url.hostname === "randomuser.me"
	);
}

export function normalizeUrl(value: string | null | undefined): string {
	if (!value) return "";

	const candidate = value.trim();
	if (/^\/(?!\/)/.test(candidate)) return candidate;

	const apiBaseUrl = getResolvedApiBaseUrl();
	const apiHost = apiBaseUrl.origin;
	const rewritten = candidate
		.replace("http://api:8000", apiHost)
		.replace("http://backend:8000", apiHost)
		.replace("http://localhost:8000", apiHost)
		.replace("https://api.mettyeung27.org", apiHost)
		.replace("https://api.uat.mettyeung27.org", apiHost);

	try {
		const url = new URL(rewritten);
		return isApprovedExternalImage(url, apiBaseUrl) ? url.toString() : "";
	} catch {
		return "";
	}
}

/**
 * Converts API media filenames to normalized, server-reachable image URLs.
 * Full URLs and site-relative paths continue through the existing allowlist.
 */
export function toMediaUrl(filenameOrUrl: string | null | undefined): string {
	if (!filenameOrUrl) return "";

	const value = filenameOrUrl.trim();
	if (value.startsWith("http") || value.startsWith("/")) {
		return normalizeUrl(value);
	}

	const apiBase =
		process.env.AUTH_BASE_URL ||
		process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
		"https://api.mettyeung27.org/api/v1";

	return normalizeUrl(`${apiBase}/media/view/${value}`);
}
