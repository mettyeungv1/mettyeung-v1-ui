"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { FileBadge, Handshake, ChevronDown, ChevronUp, Building2, Landmark, Briefcase } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import type { Partner } from "@/lib/types/partner";

const typeConfig: Record<string, { icon: React.ElementType; accent: string; accentBg: string; accentBorder: string; badgeBg: string; badgeText: string }> = {
	"Private Company": {
		icon: Briefcase,
		accent: "text-primary-900",
		accentBg: "bg-primary-50",
		accentBorder: "border-primary-200",
		badgeBg: "bg-primary-900",
		badgeText: "text-white",
	},
	Association: {
		icon: Building2,
		accent: "text-accent-700",
		accentBg: "bg-accent-50",
		accentBorder: "border-accent-200",
		badgeBg: "bg-accent-700",
		badgeText: "text-white",
	},
	Institution: {
		icon: Landmark,
		accent: "text-khmer-blue-700",
		accentBg: "bg-khmer-blue-50",
		accentBorder: "border-khmer-blue-200",
		badgeBg: "bg-khmer-blue-700",
		badgeText: "text-white",
	},
};

const defaultConfig = {
	icon: FileBadge,
	accent: "text-neutral-600",
	accentBg: "bg-neutral-50",
	accentBorder: "border-neutral-200",
	badgeBg: "bg-neutral-600",
	badgeText: "text-white",
};

export function MouSection({ initialMous }: { initialMous: Partner[] }) {
	const { t } = useTranslation();
	const [showAll, setShowAll] = useState(false);

	const grouped = useMemo(() => {
		const groups: Record<string, Partner[]> = {};
		for (const mou of initialMous) {
			const type = mou.mouType || "Other";
			if (!groups[type]) groups[type] = [];
			groups[type].push(mou);
		}
		return groups;
	}, [initialMous]);

	if (!initialMous || initialMous.length === 0) return null;

	return (
		<section className="relative overflow-hidden py-20 lg:py-28">
			{/* Subtle background texture */}
			<div className="absolute inset-0 bg-surface-muted" />
			<div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004D8C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

			<div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
				{/* Section header */}
				<AnimatedSection direction="up" className="mb-16 lg:mb-20">
					<div className="flex flex-col items-center text-center">
						<span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/5 border border-primary-900/10 text-caption font-semibold text-primary-900 uppercase tracking-wider mb-6">
							<FileBadge className="w-3.5 h-3.5" />
							{t("network.mou.title")}
						</span>
						<h2 className="text-display-sm font-bold text-text-primary mb-5 max-w-3xl">
							{t("network.mou.title")}
						</h2>
						<p className="text-body-lg text-text-secondary max-w-2xl leading-relaxed">
							{t("network.mou.description")}
						</p>
					</div>
				</AnimatedSection>

				{/* Grouped MOU directory */}
				<div className="space-y-12">
					{Object.entries(grouped).map(([type, mous], groupIndex) => {
						const config = typeConfig[type] || defaultConfig;
						const TypeIcon = config.icon;

						return (
							<AnimatedSection key={type} delay={groupIndex * 0.08} direction="up">
								<div className="relative">
									{/* Group header */}
									<div className="flex items-center gap-4 mb-6">
										<div className={`w-10 h-10 rounded-xl ${config.accentBg} ${config.accentBorder} border flex items-center justify-center`}>
											<TypeIcon className={`w-5 h-5 ${config.accent}`} />
										</div>
										<div className="flex items-center gap-3">
											<h3 className="text-heading-4 text-text-primary font-bold">{type}</h3>
											<span className={`inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full text-xs font-bold ${config.badgeBg} ${config.badgeText}`}>
												{mous.length}
											</span>
										</div>
										<div className="flex-1 h-px bg-border-subtle ml-2" />
									</div>

									{/* MOU items */}
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
										{mous.map((partner, index) => {
											const partnerName = t(partner.name) || t("network.mou.partnerFallback");
											const partnerDescription = t(partner.description) || t("network.mou.descriptionFallback");
											const mobileHidden = !showAll && index >= 4 ? "hidden md:block" : "block";

											return (
												<div
													key={partner.id}
													className={`${mobileHidden} group relative bg-surface-panel rounded-xl border border-border-subtle hover:border-primary-200 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/5`}
												>
													{/* Left accent line */}
													<div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${config.badgeBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

													<div className="flex items-start gap-4 p-4 sm:p-5">
														{/* Logo */}
														<div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl ${config.accentBg} border ${config.accentBorder} flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
															{partner.media?.url ? (
																<Image
																	src={partner.media.url}
																	alt={partnerName}
																	width={56}
																	height={56}
																	className="object-contain w-full h-full p-2"
																/>
															) : (
																<Handshake className={`w-6 h-6 ${config.accent} opacity-60`} />
															)}
														</div>

														{/* Content */}
														<div className="flex-1 min-w-0 pt-0.5">
															<h4 className="text-body-sm sm:text-h6 font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary-900 transition-colors duration-200">
																{partnerName}
															</h4>
															<p className="text-caption text-text-muted line-clamp-2 leading-relaxed">
																{partnerDescription}
															</p>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</AnimatedSection>
						);
					})}
				</div>

				{/* Mobile Show More / Show Less Toggle */}
				{initialMous.length > 4 && (
					<div className="mt-10 flex justify-center md:hidden">
						<Button
							variant="outline"
							size="lg"
							onClick={() => setShowAll(!showAll)}
							className="gap-2 rounded-full px-8"
						>
							{showAll ? (
								<>{t("network.mou.showLess")} <ChevronUp className="w-4 h-4" /></>
							) : (
								<>{t("network.mou.viewAllPartners")} ({initialMous.length}) <ChevronDown className="w-4 h-4" /></>
							)}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
