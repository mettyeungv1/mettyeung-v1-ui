// File: service/auth/password-service.ts

import { AUTH_ENDPOINT } from "@/lib/static";
import {
	ResetPasswordFormData,
	ForgotPasswordFormData,
} from "@/lib/validations/auth";

/**
 * Service to request a password reset link from the backend.
 * It sends the user's email to the /forgot-password endpoint.
 */
export const forgotPasswordService = async (data: ForgotPasswordFormData) => {
	try {
		const res = await fetch(`${AUTH_ENDPOINT}/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await res.json();
	} catch (error) {
		console.error("Forgot password service error:", error);
		throw new Error("Could not connect to the forgot password service.");
	}
};

/**
 * Service to send the new password and reset token to the backend.
 */
export const resetPasswordService = async (
	data: ResetPasswordFormData & { token: string }
) => {
	try {
		const res = await fetch(`${AUTH_ENDPOINT}/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return await res.json();
	} catch (error) {
		console.error("Reset password service error:", error);
		throw new Error("Could not connect to the reset password service.");
	}
};
