"use server";

import { decode } from "@auth/core/jwt";
import { cookies } from "next/headers";

// Must match the cookie name logic in auth.ts exactly.
// When AUTH_URL is http:// (local Docker), secure cookies are disabled → no __Host- prefix.
const authUrl = process.env.AUTH_URL || "";
const useSecureCookies =
	process.env.NODE_ENV === "production" && !authUrl.startsWith("http://");
const cookieName = useSecureCookies
	? "__Host-authjs.session-token"
	: "authjs.session-token";

const headerToken = async () => {
	const secret = process.env.AUTH_SECRET;
	const encryptedToken = (await cookies()).get(cookieName)?.value;

	if (!secret || !encryptedToken) {
		return { accept: "*/*", "Content-Type": "application/json" };
	}

	const token = await decode({
		token: encryptedToken,
		secret,
		salt: cookieName,
	});
	const accessToken =
		typeof token?.accessToken === "string" ? token.accessToken : null;

	return {
		accept: "*/*",
		"Content-Type": "application/json",
		...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
	};
};

export default headerToken;
