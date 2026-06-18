"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake, FileBadge, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import type { Partner } from "@/lib/types/partner";

const mapColors = (type: string | undefined | null) => {
    switch (type) {
		case "Private Company":
			return { hoverText: "group-hover:text-primary-900", hoverBg: "group-hover:bg-interactive-primary", hoverRing: "group-hover:ring-primary-100", accentLine: "bg-interactive-primary", iconColor: "text-primary-900", bgClass: "bg-interactive-primaryMuted" };
		case "Association":
			return { hoverText: "group-hover:text-accent-700", hoverBg: "group-hover:bg-interactive-accent", hoverRing: "group-hover:ring-accent-100", accentLine: "bg-interactive-accent", iconColor: "text-accent-700", bgClass: "bg-interactive-accentMuted" };
		case "Institution":
			return { hoverText: "group-hover:text-primary-900", hoverBg: "group-hover:bg-interactive-primary", hoverRing: "group-hover:ring-primary-100", accentLine: "bg-primary-700", iconColor: "text-primary-900", bgClass: "bg-interactive-primaryMuted" };
		default:
			return { hoverText: "group-hover:text-text-primary", hoverBg: "group-hover:bg-neutral-700", hoverRing: "group-hover:ring-neutral-200", accentLine: "bg-neutral-500", iconColor: "text-text-muted", bgClass: "bg-surface-muted" };
	}
};

export function MouSection({ initialMous }: { initialMous: Partner[] }) {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
	
	if (!initialMous || initialMous.length === 0) return null;

    return (
        <section className="section-md surface-muted relative overflow-hidden">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <AnimatedSection direction="up" className="text-center mb-12 lg:mb-20">
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-surface-panel rounded-xl shadow-surface mb-6 border border-border-subtle">
                        <FileBadge className="w-8 h-8 text-primary-900" />
                    </div>
                    <h2 className="text-heading-1 mb-6">
                        {t("network.mou.title")}
                    </h2>
                    <div className="w-24 h-1.5 bg-interactive-primary rounded-full mx-auto mb-8" />
                    <p className="text-body-lg text-gray-600 max-w-4xl mx-auto">
                        {t("network.mou.description")}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
					{initialMous.map((partner, index) => {
						const colors = mapColors(partner.mouType);
						const partnerName = t(partner.name) || t("network.mou.partnerFallback");
						const partnerDescription =
							t(partner.description) || t("network.mou.descriptionFallback");
						return (
                            <AnimatedSection 
                                key={partner.id} 
                                delay={index * 0.05} 
                                direction="up" 
                                className={`h-full ${!showAll && index >= 4 ? 'hidden md:block' : 'block'}`}
                            >
                                <div className="card-interactive group relative h-full flex flex-col items-center overflow-hidden p-card-lg text-center cursor-pointer">
                                    
                                    {/* Top Gradient Accent Line */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.accentLine}`} />
                                    
                                    <div className="mb-6 md:mb-7 flex flex-col items-center w-full">
                                        {/* Icon Container with subtle glow */}
                                        <div className="relative mb-5 md:mb-6">
                                            <div className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-surface-panel ${colors.iconColor} rounded-xl flex items-center justify-center transition-all duration-200 shadow-surface ring-1 ring-border-subtle ${colors.hoverRing}`}>
                                                <Handshake className="w-7 h-7 md:w-9 md:h-9" />
                                            </div>
                                        </div>
                                        
                                        {/* Company Name Title */}
                                        <h3 className={`text-heading-5 ${colors.hoverText} transition-colors duration-300`}>
                                            {partnerName}
                                        </h3>
                                    </div>

                                    {/* Divider */}
                                    <div className={`w-10 md:w-12 h-1 bg-gray-200 ${colors.hoverBg} rounded-full mb-5 md:mb-7 transition-colors duration-500`} />
                                    
                                    {/* Description */}
                                    <div className="text-body-sm text-gray-600 mt-auto w-full">
                                        {partnerDescription}
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>

                {/* Mobile Show More / Show Less Toggle */}
                <div className="mt-8 flex justify-center md:hidden w-full">
                    <Button
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                        className="gap-2"
                    >
                        {showAll ? (
                            <>{t("network.mou.showLess")} <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>{t("network.mou.viewAllPartners")} ({initialMous.length}) <ChevronDown className="w-4 h-4" /></>
                        )}
                    </Button>
                </div>

            </div>
        </section>
    );
}
