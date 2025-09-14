"use server";

import { resendOtpService } from "@/service/auth/resent-otp-service";

export const resendOtpAction = async (payload: { email: string }) => {
	const result = await resendOtpService(payload);
	return result;
};
