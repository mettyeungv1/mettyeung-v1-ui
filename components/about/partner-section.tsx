"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowRight, ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import type { Partner } from "@/lib/types/partner";
import { safeExternalHttpsUrl } from "@/lib/security/url";

function resolvePartnerText(
	t: (key: string | Record<string, string> | null | undefined) => string,
	primary: Partner["name"] | Partner["description"],
	translations?: Partner["nameTranslations"] | Partner["descriptionTranslations"]
) {
	return t(primary) || t(translations);
}

function getInitials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();
}

export function PartnersSection({ initialPartners = [] }: { initialPartners?: Partner[] }) {
	const { t } = useTranslation();

	if (!initialPartners || initialPartners.length === 0) {
		return null;
	}

	return (
		<section
			className="relative overflow-hidden py-20 lg:py-28"
			id="network"
		>
			<div className="absolute inset-0 bg-surface-muted" />
			<div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #004D8C 0.75px, transparent 0.75px)", backgroundSize: "24px 24px" }} />

			<div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
				{/* Section header */}
				<AnimatedSection direction="up" className="mb-16 lg:mb-20">
					<div className="flex flex-col items-center text-center">
						<span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/5 border border-primary-900/10 text-caption font-semibold text-primary-900 uppercase tracking-wider mb-6">
							<Users className="w-3.5 h-3.5" />
							{t("about.partner.title")}
						</span>
						<h2 className="text-display-sm font-bold text-text-primary mb-5 max-w-3xl">
							{t("about.partner.title")}
						</h2>
					</div>
				</AnimatedSection>

				{/* Logo showcase wall */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{initialPartners.map((partner, index) => {
						const partnerName =
							resolvePartnerText(t, partner.name, partner.nameTranslations) ||
							partner.media?.altText ||
							"Partner";
						const websiteUrl = safeExternalHttpsUrl(partner.websiteUrl);
						const hasLogo = !!partner.media?.url;

						const Wrapper = websiteUrl ? "a" : "div";
						const wrapperProps = websiteUrl
							? { href: websiteUrl, target: "_blank" as const, rel: "noopener noreferrer" }
							: {};

						return (
							<AnimatedSection key={partner.id} delay={(index % 10) * 0.04}>
								<Wrapper
									{...wrapperProps}
									className="group relative flex flex-col h-full bg-surface-panel rounded-xl border border-border-subtle overflow-hidden transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/8 hover:-translate-y-1"
								>
									{/* Logo area */}
									<div className="relative aspect-[4/3] flex items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-white to-neutral-50/80">
										{hasLogo ? (
											<Image
												src={partner.media!.url}
												alt={partnerName}
												width={140}
												height={100}
												className="object-contain max-w-full max-h-full transition-transform duration-500 ease-out group-hover:scale-110"
											/>
										) : (
											<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-50 border border-primary-200 flex items-center justify-center">
												<span className="text-xl sm:text-2xl font-bold text-primary-900">
													{getInitials(partnerName)}
												</span>
											</div>
										)}

										{websiteUrl && (
											<div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm border border-border-subtle flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
												<ArrowUpRight className="w-3.5 h-3.5 text-primary-900" />
											</div>
										)}
									</div>

									{/* Name strip */}
									<div className="mt-auto px-4 py-3 border-t border-border-subtle bg-white">
										<p className="text-caption font-semibold text-text-primary text-center line-clamp-2 min-h-[2.5rem] flex items-center justify-center group-hover:text-primary-900 transition-colors duration-200">
											{partnerName}
										</p>
									</div>
								</Wrapper>
							</AnimatedSection>
						);
					})}
				</div>

				{/* Navigate to full network page */}
				<AnimatedSection className="mt-16 text-center flex justify-center w-full" delay={0.3}>
					<Link href="/network">
						<Button size="lg" className="gap-2 rounded-full px-8">
							{t("about.partner.view_all")}
							<ArrowRight className="w-5 h-5" />
						</Button>
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
