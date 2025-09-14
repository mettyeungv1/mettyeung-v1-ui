import { AUTH_ENDPOINT } from "@/lib/static";

export const registerService = async (credentials: any) => {
	try {
		const res = await fetch(`${AUTH_ENDPOINT}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		const result = await res.json();
		return result; // ✅ This is the corrected line
	} catch (error) {
		throw new Error("can't register the user");
	}
};
