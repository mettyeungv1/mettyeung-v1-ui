"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "@/lib/i18n";
import { Phone, Mail, MapPin } from "lucide-react";
import type { IContactSettingsAPI } from "@/lib/types/contact";
import { createGoogleMapsLocationUrl } from "@/lib/security/url";

interface ContactInfoGridProps {
	settings: IContactSettingsAPI;
}

export function ContactInfoGrid({ settings }: ContactInfoGridProps) {
	const { t, language } = useTranslation();

	const addressText =
		settings.address?.[language] ??
		settings.address?.["km"] ??
		settings.address?.["en"] ??
		"";

	const mapsUrl = createGoogleMapsLocationUrl(
		settings.mapLat,
		settings.mapLng
	);

	const contactItems = [
		{
			icon: Phone,
			titleKey: "contactUs.phone",
			details: settings.phone ? [settings.phone] : ["015 220 320"],
			isAddress: false,
		},
		{
			icon: Mail,
			titleKey: "contactUs.email",
			details: settings.email ? [settings.email] : ["mettyeung@gmail.com"],
			isAddress: false,
		},
		{
			icon: MapPin,
			titleKey: "contactUs.address",
			details: addressText ? [addressText] : [t("contact.defaultAddress")],
			isAddress: true,
		},
	];

	const getHref = (titleKey: string, detail: string): string | null => {
		if (titleKey === "contactUs.phone") return `tel:${detail.replace(/\s/g, "")}`;
		if (titleKey === "contactUs.email") return `mailto:${detail}`;
		if (titleKey === "contactUs.address") return mapsUrl;
		return null;
	};

	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					{contactItems.map((info, index) => {
						const Icon = info.icon;

						return (
							<AnimatedSection key={info.titleKey} delay={index * 0.08} direction="up">
								<div className="group h-full rounded-2xl border border-border-subtle bg-surface-panel shadow-surface transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
									<div className="p-6 flex flex-col gap-4">
										{/* Icon */}
										<div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
											<Icon className="w-6 h-6 text-primary-900" />
										</div>

										{/* Label */}
										<h3 className="text-base font-bold text-gray-900 leading-tight">
											{t(info.titleKey as any)}
										</h3>

										{/* Details */}
										<div className="space-y-1.5">
											{info.details.map((detail, idx) => {
												const href = idx === 0 ? getHref(info.titleKey, detail) : null;
												return href ? (
													<a
														key={idx}
														href={href}
														target={info.isAddress ? "_blank" : undefined}
														rel={info.isAddress ? "noopener noreferrer" : undefined}
														className="block text-sm font-medium text-primary-900 hover:text-primary-600 underline-offset-2 hover:underline transition-colors"
													>
														{detail}
													</a>
												) : (
													<p key={idx} className="text-sm text-gray-500 leading-relaxed">
														{detail}
													</p>
												);
											})}
										</div>
									</div>
								</div>
							</AnimatedSection>
						);
					})}
				</div>
			</div>
		</section>
	);
}
