import { AUTH_ENDPOINT } from "@/lib/static";

export const resendOtpService = async (payload: { email: string }) => {
	try {
		// Assuming a similar endpoint for resending the OTP
		const res = await fetch(`${AUTH_ENDPOINT}/resend-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return await res.json();
	} catch (error) {
		console.error("Resend OTP service error:", error);
		throw new Error("Could not connect to the resend OTP service.");
	}
};
