"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import type { IContactSettingsAPI, ISocialLinkAPI } from "@/lib/types/contact";
import { createGoogleMapsEmbedUrl, safeExternalHttpsUrl } from "@/lib/security/url";
import { getSocialIcon } from "@/lib/utils/social-icon-map";

const socialColors: Record<string, string> = {
	facebook: "bg-[#1877F2] hover:bg-[#166FE5]",
	youtube: "bg-[#FF0000] hover:bg-[#cc0000]",
	telegram: "bg-[#229ED9] hover:bg-[#1a86bc]",
	instagram: "bg-[#E1306C] hover:bg-[#c2255c]",
	twitter: "bg-[#1DA1F2] hover:bg-[#0d8ecf]",
	tiktok: "bg-[#010101] hover:bg-[#333]",
	linkedin: "bg-[#0077B5] hover:bg-[#005582]",
};

interface ContactMapSectionProps {
	settings: IContactSettingsAPI;
	socialLinks: ISocialLinkAPI[];
}

export function ContactMapSection({ settings, socialLinks }: ContactMapSectionProps) {
	const { t } = useTranslation();
	const embedUrl = createGoogleMapsEmbedUrl(settings.mapLat, settings.mapLng);
	const activeLinks = useMemo(
		() => socialLinks
			.map((link) => ({ ...link, url: safeExternalHttpsUrl(link.url) }))
			.filter((link): link is ISocialLinkAPI => link.isActive && Boolean(link.url))
			.sort((a, b) => a.order - b.order),
		[socialLinks]
	);

	return (
		<section className="bg-gray-50 py-16 md:py-24">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-panel shadow-surface"
				>
					<div className="relative h-[320px] bg-gray-100 md:h-[480px]">
						<iframe
							src={embedUrl}
							width="100%"
							height="100%"
							style={{ border: 0 }}
							loading="lazy"
							referrerPolicy="no-referrer"
							sandbox="allow-scripts allow-same-origin allow-popups"
							className="absolute inset-0 h-full w-full"
							title={t("contact.mapTitle")}
						/>
					</div>
				</motion.div>

				{activeLinks.length > 0 && (
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						{activeLinks.map((social) => {
							const Icon = getSocialIcon(social.iconName ?? social.platform);
							const colorClass = socialColors[social.platform.toLowerCase()] ?? "bg-gray-900 hover:bg-gray-700";
							return (
								<a
									key={social.id}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									title={social.platform}
									aria-label={t("contact.sidebar.followOn").replace("{{platform}}", social.platform)}
									className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 ${colorClass}`}
								>
									<Icon className="h-5 w-5" />
								</a>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}
