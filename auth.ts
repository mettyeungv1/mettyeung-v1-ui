import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AUTH_ENDPOINT } from "./lib/static";
import { loginService } from "./service/auth/login-service";

const isProduction = process.env.NODE_ENV === "production";
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";
const authSecret = process.env.AUTH_SECRET;

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
	useSecureCookies: isProduction,
	cookies: {
		sessionToken: {
			name: isProduction
				? "__Host-authjs.session-token"
				: "authjs.session-token",
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: isProduction,
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
			}

			return token;
		},
	},
});
