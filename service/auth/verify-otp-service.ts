import { AUTH_ENDPOINT } from "@/lib/static";

export const verifyOtpService = async (payload: {
	email: string;
	otp: string;
}) => {
	console.log(payload);
	try {
		const res = await fetch(`${AUTH_ENDPOINT}/verify-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		return await res.json();
	} catch (error) {
		console.error("Verify OTP service error:", error);
		throw new Error("Could not connect to the OTP verification service.");
	}
};
