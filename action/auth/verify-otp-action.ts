"use server";

import { verifyOtpService } from "@/service/auth/verify-otp-service";

export const verifyOtpAction = async (payload: {
	email: string;
	otp: string;
}) => {
	const result = await verifyOtpService(payload);
	return result;
};
