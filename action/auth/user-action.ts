"use server";

import { getUserProfileService } from "@/service/auth/user-service";

export const getUserProfileAction = async () => {
	return await getUserProfileService();
};
