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

		const text = await response.text();
		if (!text.trim()) {
			return {
				message: "",
				status: "OK",
				data: [],
				success: false,
				timestamps: "",
			} as APIResponse<T>;
		}
		const data: APIResponse<T> = JSON.parse(text);
		return data;
	} catch (error) {
		console.error("API Fetch Error:", error);
		throw error;
	}
}
