import { fetchAPI } from "@/lib/api";
import { AUTH_ENDPOINT } from "@/lib/static";

export const getUserProfileService = async () => {
	const res = await fetchAPI(`${AUTH_ENDPOINT}/profile`);

	console.log(res);
};
