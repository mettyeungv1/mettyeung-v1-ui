import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken?: string;
		refreshToken?: string;
		expiresAt?: number;
		error?: "RefreshTokenError";
	}

	interface User extends DefaultUser {
		accessToken?: string;
		refreshToken?: string;
		expiresAt?: number;
		error?: "RefreshTokenError";
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
	}
}
