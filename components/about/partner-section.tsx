"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "./glowing-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Partner } from "@/lib/types/partner";

function resolvePartnerText(
	t: (key: string | Record<string, string> | null | undefined) => string,
	primary: Partner["name"] | Partner["description"],
	translations?: Partner["nameTranslations"] | Partner["descriptionTranslations"]
) {
	return t(primary) || t(translations);
}

export function PartnersSection({ initialPartners = [] }: { initialPartners?: Partner[] }) {
	const { t } = useTranslation();

	if (!initialPartners || initialPartners.length === 0) {
		return null;
	}

	return (
		<section
			className="section-md surface-muted flex flex-col items-center"
			id="network"
		>
			<div className="container">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-heading-1 text-primary-900">
						{t("about.partner.title")}
					</h2>
				</AnimatedSection>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
					{initialPartners.map((partner, index) => {
						const partnerName =
							resolvePartnerText(t, partner.name, partner.nameTranslations) ||
							partner.media?.altText ||
							"Partner";
						const partnerDescription = resolvePartnerText(
							t,
							partner.description,
							partner.descriptionTranslations
						);
						const cardContent = (
							<Card variant="interactive" className="group relative aspect-square overflow-hidden">
								<CardContent className="p-0 h-full flex items-center justify-center relative">
									{/* Large Logo display */}
									<div className="relative w-full h-full p-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 opacity-100">
										<Image
											src={partner.media?.url || "/my-cut.png"}
											alt={partnerName}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
											className="object-contain p-8 md:p-12 drop-shadow-sm"
										/>
									</div>

									{/* Hover Overlay with info */}
									<div className="absolute inset-0 bg-primary-950/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-6 sm:p-8 text-center backdrop-blur-[2px]">
										<div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 flex flex-col items-center h-full justify-center">
											{partnerName && (
												<h3 className="text-heading-4 text-white line-clamp-2 mb-3 drop-shadow-md">
													{partnerName}
												</h3>
											)}
											{partnerDescription && (
												<p className="text-body-sm text-primary-100 line-clamp-3 mb-6">
													{partnerDescription}
												</p>
											)}
											{partner.websiteUrl && (
												<a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 rounded-md border border-border-inverse bg-white/10 px-6 py-2.5 mt-2 text-button text-white transition-all duration-200 hover:bg-white/15 focus-ring">
													{t("partners.visitWebsite")} <ArrowRight className="w-4 h-4 ml-1" />
												</a>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						);

						return (
							<AnimatedSection key={partner.id} delay={(index % 8) * 0.1}>
								<GlowingCard>
									<div className="h-full">
										{cardContent}
									</div>
								</GlowingCard>
							</AnimatedSection>
						);
					})}
				</div>
                
				{/* Navigate to full network page */}
				<AnimatedSection className="mt-16 text-center flex justify-center w-full" delay={0.3}>
					<Link href="/network">
						<Button size="lg" className="w-full gap-2 sm:w-auto">
							{t("about.partner.view_all")}
							<ArrowRight className="w-5 h-5" />
						</Button>
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
