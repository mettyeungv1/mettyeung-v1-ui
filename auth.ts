import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AUTH_ENDPOINT } from "./lib/static";
import { getApiUrl } from "./lib/api";
import { loginService } from "./service/auth/login-service";

const isProduction = process.env.NODE_ENV === "production";
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
const authSecret = process.env.AUTH_SECRET;
// Disable secure cookies when AUTH_URL is HTTP (e.g. local Docker testing over localhost)
const authUrl = process.env.AUTH_URL || "";
const useSecureCookies = isProduction && !authUrl.startsWith("http://");

if (isProduction && !isProductionBuild && (!authSecret || authSecret.length < 32)) {
	throw new Error("AUTH_SECRET must be set to at least 32 characters in production");
}

class CustomError extends CredentialsSignin {
	constructor(code: string) {
		super();
		this.code = code;
		this.message = code;
		this.stack = undefined;
	}
}

type RefreshedTokens = { accessToken: string; refreshToken: string };
const refreshPromises = new Map<string, Promise<RefreshedTokens>>();

async function refreshAccessToken(refreshToken: string): Promise<RefreshedTokens> {
	const existing = refreshPromises.get(refreshToken);
	if (existing) return existing;

	const request = (async () => {
		const response = await fetch(`${getApiUrl()}/auth/refresh-token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken }),
		});
		const result = await response.json();
		if (!response.ok || !result.data?.accessToken || !result.data?.refreshToken) {
			throw new Error("Token refresh failed");
		}
		return result.data as RefreshedTokens;
	})();
	refreshPromises.set(refreshToken, request);
	try {
		return await request;
	} finally {
		refreshPromises.delete(refreshToken);
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const result = await loginService({
					credentials: {
						email: credentials.email as string,
						password: credentials.password as string,
					},
				});

				if (!result) {
					throw new CustomError("Invalid Credential");
				}

				return {
					id: "token-only-user",
					accessToken: result.accessToken,
					refreshToken: result.refreshToken,
				};
			},
		}),
	],
	secret: authSecret,
	useSecureCookies: useSecureCookies,
	cookies: {
		sessionToken: {
			name: useSecureCookies
				? "__Host-authjs.session-token"
				: "authjs.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: useSecureCookies,
			},
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.expiresAt = Date.now() + 14 * 60 * 1000;
			}
			const expiresAt = token.expiresAt as number | undefined;
			if (expiresAt && Date.now() >= expiresAt) {
				try {
					const refreshToken = token.refreshToken as string | undefined;
					if (!refreshToken) throw new Error("Missing refresh token");
					const refreshed = await refreshAccessToken(refreshToken);
					token.accessToken = refreshed.accessToken;
					token.refreshToken = refreshed.refreshToken;
					token.expiresAt = Date.now() + 14 * 60 * 1000;
				} catch {
					token.error = "RefreshTokenError";
				}
			}

			return token;
		},
	},
});
