const APPROVED_API_BASE_URLS = new Set([
	"https://api.mettyeung27.org/api/v1",
	"https://api.uat.mettyeung27.org/api/v1",
]);

function getResolvedApiBaseUrl(): URL {
	try {
		const url = new URL(process.env.NEXT_PUBLIC_AUTH_BASE_URL || "");
		const normalized = `${url.origin}${url.pathname.replace(/\/$/, "")}`;
		if (APPROVED_API_BASE_URLS.has(normalized)) return new URL(normalized);
	} catch {
		// Use the production public API fallback below.
	}

	return new URL("https://api.mettyeung27.org/api/v1");
}

function isApprovedExternalImage(url: URL, apiBaseUrl: URL): boolean {
	if (url.protocol !== "https:") return false;

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
