import { fetchAPI } from "@/lib/api";
import { AUTH_ENDPOINT } from "@/lib/static";

export type UserProfile = {
	id: string;
	// Add other properties like name, email, etc., as they become available
};

type ProfileResponseData = {
	message: string;
	user: UserProfile;
};

export const getUserProfileService = async (): Promise<
	APIResponse<ProfileResponseData>
> => {
	return fetchAPI<ProfileResponseData>(`${AUTH_ENDPOINT}/profile`);
};
