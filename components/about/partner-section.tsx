"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
			className="section-padding bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5 flex flex-col items-center"
			id="network"
		>
			<div className="container">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 ">
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
							<Card className={`group relative overflow-hidden aspect-square border-0 shadow-xl bg-white transition-all duration-500 rounded-2xl hover:shadow-2xl hover:-translate-y-2`}>
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
									<div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-center items-center p-6 sm:p-8 text-center backdrop-blur-[2px]">
										<div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 flex flex-col items-center h-full justify-center">
											{partnerName && (
												<h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 mb-3 drop-shadow-md tracking-wide">
													{partnerName}
												</h3>
											)}
											{partnerDescription && (
												<p className="text-sm md:text-base text-slate-200 line-clamp-3 mb-6 leading-relaxed">
													{partnerDescription}
												</p>
											)}
											{partner.websiteUrl && (
												<a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 mt-2 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 bg-white/10 rounded-full hover:bg-blue-600 border border-white/20 backdrop-blur-md shadow-lg hover:shadow-blue-500/30 relative z-10 cursor-pointer">
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
						<button className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 transform rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl hover:-translate-y-1 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto overflow-hidden group">
							<span className="relative z-10">{t("about.partner.view_all")}</span>
							<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</button>
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
