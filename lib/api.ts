import headerToken from "./header";

export async function fetchAPI<T>(
	url: string,
	options: RequestInit = {}
): Promise<APIResponse<T>> {
	const headers = await headerToken();
	console.log("🚀 Requesting API URL:", url);

	try {
		const response = await fetch(url, {
			...options,
			headers,
		});

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
	} catch (error) {
		// Handle network errors (e.g., user is offline)
		console.error("Network or Fetch Error:", error);

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
