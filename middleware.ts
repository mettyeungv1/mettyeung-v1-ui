// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Only protect these (example)
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// Auth-related routes (login, register, forgot-password, etc.)
const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auth/forgot-password",
	"/auth/verify-otp-confirm",
	"/auth/verify-otp-update",
	"/auth/verify-otp-success",
];

const defaultRedirect = "/"; // where logged-in users get sent

export default auth((req) => {
	const isLoggedIn = !!req.auth?.user;
	const { pathname } = req.nextUrl;

	// --- Protect specific routes ---
	if (protectedRoutes.some((path) => pathname.startsWith(path))) {
		if (!isLoggedIn) {
			const loginUrl = new URL("/auth/login", req.nextUrl.origin);
			loginUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	// --- Prevent logged-in users from visiting auth pages ---
	if (isLoggedIn && authRoutes.some((path) => pathname.startsWith(path))) {
		return NextResponse.redirect(new URL(defaultRedirect, req.nextUrl.origin));
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
