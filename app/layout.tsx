// FILE: app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { AppInitializer } from "@/components/providers/app-initializer";
import { googleSans, miSansKhmer } from "@/lib/fonts"; // Assuming your fonts are in lib/fonts
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
	title: {
		default: "Mettyerng - ក្រុមអ្នកស្រឡាញ់សង្គម",
		template: "%s | Mettyerng",
	},
	description:
		"ក្រុមអ្នកស្រឡាញ់សង្គម - Khmer community organization dedicated to education, culture, and social development",
	keywords: [
		"Khmer",
		"Cambodia",
		"Community",
		"Education",
		"Culture",
		"Social Development",
	],
	authors: [{ name: "Mettyerng Organization" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="km"
			suppressHydrationWarning
			className={`${googleSans.variable} ${miSansKhmer.variable}`}
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<LanguageProvider>
						<AppInitializer />
						<div className="min-h-screen flex flex-col">
							<SessionProvider>
								<Header />
								<main className="flex-1">{children}</main>
								<Footer />
							</SessionProvider>
						</div>
						<Toaster />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
