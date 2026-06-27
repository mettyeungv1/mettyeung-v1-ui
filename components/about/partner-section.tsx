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
							<Card className="group relative flex flex-col h-full bg-surface-page hover:shadow-xl transition-all duration-300 border-border-subtle hover:border-interactive-primary/30 overflow-hidden rounded-2xl">
								{/* Logo Area */}
								<div className="relative w-full aspect-[3/2] flex items-center justify-center p-8 bg-surface-panel/30 group-hover:bg-surface-panel/80 transition-colors duration-500">
									<Image
										src={partner.media?.url || "/my-cut.png"}
										alt={partnerName}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
										className="object-contain p-6 md:p-8 drop-shadow-sm group-hover:scale-110 transition-transform duration-700 ease-out"
									/>
								</div>

								{/* Content Area */}
								<CardContent className="p-6 flex flex-col flex-1 border-t border-border-subtle/50 text-left">
									<h3 className="text-heading-5 font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-900 transition-colors">
										{partnerName}
									</h3>
									{partnerDescription && (
										<p className="text-body-sm text-text-secondary line-clamp-3 mb-6 flex-1">
											{partnerDescription}
										</p>
									)}
									{partner.websiteUrl && (
										<a
											href={partner.websiteUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="mt-auto inline-flex items-center text-button font-medium text-interactive-primary group-hover:text-primary-800 transition-colors"
										>
											{t("partners.visitWebsite")} <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
										</a>
									)}
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
