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
function matchesRoute(pathname: string, route: string): boolean {
	return pathname === route || pathname.startsWith(`${route}/`);
}

function secureResponse(response: NextResponse): NextResponse {
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
	const isLoggedIn = Boolean(request.auth?.user);
	const { pathname } = request.nextUrl;

	if (pathname === "/Partners") {
		return secureResponse(
			NextResponse.redirect(new URL("/network", request.nextUrl.origin), 308)
		);
	}

	if (
		protectedRoutes.some((route) => matchesRoute(pathname, route)) &&
		!isLoggedIn
	) {
		const loginUrl = new URL("/auth/login", request.nextUrl.origin);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return secureResponse(NextResponse.redirect(loginUrl));
	}

	if (
		isLoggedIn &&
		authRoutes.some((route) => matchesRoute(pathname, route))
	) {
		return secureResponse(NextResponse.redirect(new URL("/", request.nextUrl.origin)));
	}

	return secureResponse(NextResponse.next());
});

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
