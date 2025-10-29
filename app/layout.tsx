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
	title: "មិត្តយើង | Mett Yeung Association",
	description:
		"មិត្តយើង (M.Y.A.) — សមាគមមិត្តភាព និងគាំទ្រការងារ និងអាជីវកម្ម នៅកម្ពុជា។",
	applicationName: "Mett Yeung Association (MYA)",
	metadataBase: new URL("https://mettyeung27.org"),
	alternates: {
		canonical: "https://mettyeung27.org",
		languages: {
			km: "https://mettyeung27.org/",
			en: "https://mettyeung27.org/en",
		},
	},
	openGraph: {
		title: "មិត្តយើង | Mett Yeung Association",
		description:
			"Community association supporting jobs, training, and local events in Phnom Penh.",
		url: "https://mettyeung27.org",
		siteName: "Mett Yeung Association",
		images: [{ url: "/og-default.png", alt: "Mett Yeung Association" }],
	},
	icons: {
		icon: "/icon.png",
		apple: "/apple-icon.png",
	},
	twitter: {
		card: "summary_large_image",
	},
	other: {
		keywords: "សមាគម, ការងារ, វគ្គបណ្តុះបណ្តាល, Phnom Penh, Mett Yeung",
	},
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
