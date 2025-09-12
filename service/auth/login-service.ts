import { AUTH_ENDPOINT } from "@/lib/static";

export const loginService = async ({
	credentials,
}: {
	credentials: { email: string; password: string };
}) => {
	try {
		const res = await fetch(`${AUTH_ENDPOINT}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		const result = await res.json();
		return result.data;
	} catch (error) {
		throw new Error("can't fetch user");
	}
};
