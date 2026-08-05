"use server";

import { decode } from "@auth/core/jwt";
import { cookies } from "next/headers";

const cookieName =
	process.env.NODE_ENV === "production"
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
