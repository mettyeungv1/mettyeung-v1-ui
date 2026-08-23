import { fetchAPI, getApiUrl } from "@/lib/api";

export const loginService = async ({
	credentials,
}: {
	credentials: { email: string; password: string };
}) => {
	const result = await fetchAPI<{ accessToken: string; refreshToken: string }>(
		`${getApiUrl()}/auth/login`,
		{ method: "POST", body: JSON.stringify(credentials), skipAuth: true, retries: 1 }
	);
	if (result.status_code !== 200 || !result.data) {
		throw new Error(result.message || "Login failed");
	}
	return result.data;
};
