import headerToken from "./header";

export function getApiUrl(): string {
	// Server-side: prefer explicit internal Docker URL, then fall back to
	// the build-time-baked NEXT_PUBLIC_ value (set via build-arg in CI/CD)
	if (typeof window === "undefined") {
		return (
			process.env.AUTH_BASE_URL ||
			process.env.INTERNAL_API_URL ||
			process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
			"https://api.mettyeung27.org/api/v1"
		);
	}
	// Client-side: use public URL
	return (
		process.env.NEXT_PUBLIC_AUTH_BASE_URL || "https://api.mettyeung27.org/api/v1"
	);
}

type FetchAPIOptions = RequestInit & {
	skipAuth?: boolean;
};

export async function fetchAPI<T>(
	url: string,
	options: FetchAPIOptions = {}
): Promise<APIResponse<T>> {
	let headers: any = {
		accept: "*/*",
		"Content-Type": "application/json",
	};

	if (!options.skipAuth) {
		const tokenHeaders = await headerToken();
		headers = { ...headers, ...tokenHeaders };
	} else {
		console.log("🚀 Skipping Auth Token for:", url);
	}
	console.log("🚀 Requesting API URL:", url);

	// Default timeout of 30 seconds
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30000);
	
	// Default: no caching (Next.js 15 default is no-store).
	// Callers can opt into caching by passing next: { revalidate: N }.
	const defaultOptions: RequestInit = {
		signal: controller.signal,
	};

	try {
		const response = await fetch(url, {
			...defaultOptions,
			...options,
			headers: {
				...headers,
				...options.headers,
			},
		});

		clearTimeout(timeoutId);

		// Check for non-successful HTTP status codes (e.g., 404, 500)
		if (!response.ok) {
			const errorData = await response.json().catch(() => null); // Try to parse error JSON
			console.error(
				`API Error: ${response.status} ${response.statusText}`,
				errorData
			);

			// Return a standardized error object that matches your APIResponse type
			return {
				status_code: errorData?.status_code || response.status,
				message: errorData?.message || "An error occurred.",
				dev_message: errorData?.dev_message || response.statusText,
				data: errorData?.data || null, // Or an empty object/array: {} / []
			} as APIResponse<T>;
		}

		// Handle '204 No Content' success case where there's no body
		if (response.status === 204) {
			return {
				status_code: 204,
				message: "Success",
				dev_message: "No content",
				data: null,
			} as APIResponse<T>;
		}

		// Parse the successful JSON response
		const data: APIResponse<T> = await response.json();
		return data;
	} catch (error: any) {
		clearTimeout(timeoutId);
		
		// Handle network errors (e.g., user is offline)
		console.error("Network or Fetch Error:", error);

		if (error.name === 'AbortError') {
			return {
				status_code: 408, // Request Timeout
				message: "Request timed out. Please try again.",
				dev_message: "Fetch aborted due to timeout",
				data: null,
			} as APIResponse<T>;
		}

		// Return a standardized network error object
		return {
			status_code: 503, // Service Unavailable
			message: "Network error. Please check your connection.",
			dev_message:
				error instanceof Error ? error.message : "Unknown fetch error",
			data: null,
		} as APIResponse<T>;
	}
}
