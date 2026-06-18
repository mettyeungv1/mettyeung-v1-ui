// FILE: app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { AppInitializer } from "@/components/providers/app-initializer";
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

import {
	listCategoriesService,
	type RawCategory,
} from "@/service/category/category-service";
import { getContactSettingsService, getSocialLinksService } from "@/service/contact/contact-service";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FALLBACK_CONTACT_SETTINGS } from "@/lib/data/contact";
import type { IContactSettingsAPI, ISocialLinkAPI } from "@/lib/types/contact";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let categories: RawCategory[] = [];
	let socialLinks: ISocialLinkAPI[] = [];
	let contactSettings: IContactSettingsAPI = FALLBACK_CONTACT_SETTINGS;

	try {
		const [categoriesRes, fetchedSocialLinks, fetchedContactSettings] =
			await Promise.all([
				listCategoriesService(),
				getSocialLinksService(),
				getContactSettingsService(),
			]);

		categories =
			categoriesRes.status_code === 200 && Array.isArray(categoriesRes.data)
				? categoriesRes.data
				: [];
		socialLinks = fetchedSocialLinks;
		contactSettings = fetchedContactSettings;
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
						<AppInitializer />
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
