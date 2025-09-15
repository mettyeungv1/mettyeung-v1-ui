// File: actions/auth-action.ts

"use server";

import {
	ForgotPasswordFormData,
	ResetPasswordFormData,
} from "@/lib/validations/auth";
import {
	forgotPasswordService,
	resetPasswordService,
} from "@/service/auth/password-service";

/**
 * Server action to handle the forgot password request.
 */
export const forgotPasswordAction = async (data: ForgotPasswordFormData) => {
	const result = await forgotPasswordService(data);
	return result;
};

/**
 * Server action to handle the actual password reset.
 */
export const resetPasswordAction = async (
	data: ResetPasswordFormData & { token: string }
) => {
	const result = await resetPasswordService(data);
	return result;
};
