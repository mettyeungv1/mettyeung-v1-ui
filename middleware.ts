import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auth/forgot-password",
	"/auth/verify-otp-confirm",
	"/auth/verify-otp-update",
	"/auth/verify-otp-success",
];
const approvedApiOrigins = new Set([
	"https://api.mettyeung27.org",
	"https://api.uat.mettyeung27.org",
]);

function matchesRoute(pathname: string, route: string): boolean {
	return pathname === route || pathname.startsWith(`${route}/`);
}

function configuredApiOrigin(): string {
	try {
		const origin = new URL(
			process.env.NEXT_PUBLIC_AUTH_BASE_URL ||
				"https://api.mettyeung27.org/api/v1"
		).origin;
		return approvedApiOrigins.has(origin)
			? origin
			: "https://api.mettyeung27.org";
	} catch {
		return "https://api.mettyeung27.org";
	}
}

function createContentSecurityPolicy(nonce: string): string {
	const apiOrigin = configuredApiOrigin();
	const isDevelopment = process.env.NODE_ENV === "development";
	const scriptPolicy = isDevelopment
		? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
		: `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

	return [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self'",
		scriptPolicy,
		"style-src 'self' 'unsafe-inline'",
		`connect-src 'self' ${apiOrigin}`,
		`img-src 'self' data: blob: ${apiOrigin} https://i.ytimg.com https://img.youtube.com https://images.pexels.com https://randomuser.me`,
		"frame-src https://www.google.com https://www.youtube.com",
		"font-src 'self' data:",
		"worker-src 'self' blob:",
		...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
	].join("; ");
}

function secureResponse(response: NextResponse, csp: string): NextResponse {
	response.headers.set("Content-Security-Policy", csp);
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set(
		"Permissions-Policy",
		"camera=(), microphone=(), geolocation=(), clipboard-write=(self)"
	);
	response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
	if (process.env.NODE_ENV === "production") {
		response.headers.set("Strict-Transport-Security", "max-age=31536000");
	}
	return response;
}

export default auth((request) => {
	const nonce = crypto.randomUUID().replaceAll("-", "");
	const csp = createContentSecurityPolicy(nonce);
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", csp);

	const isLoggedIn = Boolean(request.auth?.user);
	const { pathname } = request.nextUrl;

	if (
		protectedRoutes.some((route) => matchesRoute(pathname, route)) &&
		!isLoggedIn
	) {
		const loginUrl = new URL("/auth/login", request.nextUrl.origin);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return secureResponse(NextResponse.redirect(loginUrl), csp);
	}

	if (
		isLoggedIn &&
		authRoutes.some((route) => matchesRoute(pathname, route))
	) {
		return secureResponse(
			NextResponse.redirect(new URL("/", request.nextUrl.origin)),
			csp
		);
	}

	return secureResponse(
		NextResponse.next({ request: { headers: requestHeaders } }),
		csp
	);
});

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
