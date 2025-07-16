import localFont from "next/font/local";

// Define the font for English
export const googleSans = localFont({
	src: "../public/fonts/GoogleSans-Regular.ttf",
	display: "swap",
	variable: "--font-google-sans",
});

// Define the font for Khmer
export const miSansKhmer = localFont({
	src: "../public/fonts/MiSansKhmer-Regular.ttf",
	display: "swap",
	variable: "--font-mi-sans-khmer",
});
