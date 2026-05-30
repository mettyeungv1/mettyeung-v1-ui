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
	requireAuth?: boolean;
	retries?: number;
	retryDelayMs?: number;
};

const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY_MS = 250;

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown) {
	const code = (error as any)?.cause?.code || (error as any)?.code;
	const name = (error as any)?.name;
	return (
		name === "AbortError" ||
		code === "EPIPE" ||
		code === "ECONNRESET" ||
		code === "ECONNREFUSED" ||
		code === "ETIMEDOUT" ||
		code === "UND_ERR_SOCKET" ||
		error instanceof TypeError
	);
}

function isNextRenderSignal(error: unknown) {
	const digest = (error as any)?.digest;
	return (
		digest === "DYNAMIC_SERVER_USAGE" ||
		digest === "NEXT_REDIRECT" ||
		digest === "NEXT_NOT_FOUND"
	);
}

function networkErrorResponse<T>(error: unknown): APIResponse<T> {
	const isTimeout = (error as any)?.name === "AbortError";
	return {
		status_code: isTimeout ? 408 : 503,
		message: isTimeout
			? "Request timed out. Please try again."
			: "Network error. Please check your connection.",
		dev_message: error instanceof Error ? error.message : "Unknown fetch error",
		data: null,
	} as APIResponse<T>;
}

export async function fetchAPI<T>(
	url: string,
	options: FetchAPIOptions = {}
): Promise<APIResponse<T>> {
	let headers: any = {
		accept: "*/*",
		"Content-Type": "application/json",
	};
	const method = (options.method || "GET").toUpperCase();
	const isReadRequest = method === "GET" || method === "HEAD";
	const shouldAttachAuth = options.requireAuth || (!options.skipAuth && !isReadRequest);

	if (shouldAttachAuth) {
		const tokenHeaders = await headerToken();
		headers = { ...headers, ...tokenHeaders };
	}

	const { retries, retryDelayMs, skipAuth, requireAuth, ...fetchOptions } = options;
	const maxRetries = retries ?? DEFAULT_RETRIES;
	const baseDelayMs = retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000);

		try {
			const response = await fetch(url, {
				...fetchOptions,
				signal: fetchOptions.signal ?? controller.signal,
				headers: {
					...headers,
					...fetchOptions.headers,
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

			if (isNextRenderSignal(error)) {
				throw error;
			}

			if (attempt < maxRetries && isRetryableError(error)) {
				const delayMs = baseDelayMs * 2 ** attempt;
				console.warn(
					`Fetch failed for ${url}; retrying in ${delayMs}ms (${attempt + 1}/${maxRetries})`,
					error
				);
				await sleep(delayMs);
				continue;
			}

			// Handle network errors (e.g., user is offline)
			console.error("Network or Fetch Error:", error);
			return networkErrorResponse<T>(error);
		}
	}

	return networkErrorResponse<T>(new Error("Fetch failed after retries"));
}
