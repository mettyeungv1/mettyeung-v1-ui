// FILE: app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { googleSans, miSansKhmer } from "@/lib/fonts";
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

import type { RawCategory } from "@/service/category/category-service";
import { getLayoutDataService } from "@/service/layout/layout-service";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FALLBACK_CONTACT_SETTINGS } from "@/lib/data/contact";
import type { IContactSettingsAPI, ISocialLinkAPI } from "@/lib/types/contact";

// Docker builds run before the API service is available. Revalidate shared CMS
// data immediately at runtime so a build-time fallback is replaced promptly.
export const revalidate = 1;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let categories: RawCategory[] = [];
	let socialLinks: ISocialLinkAPI[] = [];
	let contactSettings: IContactSettingsAPI = FALLBACK_CONTACT_SETTINGS;

	try {
		const response = await getLayoutDataService();
		if (response.status_code === 200 && response.data) {
			categories = Array.isArray(response.data.categories) ? response.data.categories : [];
			socialLinks = Array.isArray(response.data.socialLinks) ? response.data.socialLinks : [];
			contactSettings = response.data.contactSettings || FALLBACK_CONTACT_SETTINGS;
		}
	} catch (error) {
		console.error("[RootLayout] Failed to load shared SSR data", error);
	}

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
						<div className="min-h-screen flex flex-col">
							<SessionProvider>
								<Header categories={categories} />
								<main className="flex-1">{children}</main>
								<Footer socialLinks={socialLinks} contactSettings={contactSettings} />
							</SessionProvider>
						</div>
						<ScrollToTop />
						<LanguageSwitcher variant="floating" />
						<Toaster />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
