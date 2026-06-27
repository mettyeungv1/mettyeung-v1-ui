"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import type { Partner } from "@/lib/types/partner";

const MarqueeLogo = ({ partner, cardKey }: { partner: Partner; cardKey: string }) => {
    const { t } = useTranslation();
    const partnerName = t(partner.name) || t("network.mou.partnerFallback");

    return (
        <div
            key={cardKey}
            className="flex-shrink-0 w-40 md:w-48 h-24 md:h-28 relative group bg-surface-panel/30 border border-border-subtle rounded-xl flex items-center justify-center p-4 hover:bg-surface-panel transition-colors duration-300 cursor-pointer hover:shadow-lg"
            title={partnerName}
        >
            {partner.media?.url ? (
                <Image
                    src={partner.media.url}
                    alt={partnerName}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-contain p-4 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
            ) : (
                <span className="text-body-sm font-medium text-text-secondary text-center group-hover:text-primary-900 transition-colors">
                    {partnerName}
                </span>
            )}
            
            {/* Tooltip for desktop */}
            <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 bg-surface-panel shadow-lg border border-border-subtle px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                {partnerName}
            </div>
        </div>
    );
};

export function MouScrollerSection({ initialMous }: { initialMous: Partner[] }) {
    const { t } = useTranslation();
	if (!initialMous || initialMous.length === 0) return null;

    return (
        <section className="section-md surface-muted border-t border-border-subtle overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-heading-2">
                        <span className="text-primary-900">
                            {t("network.mou.title")}
                        </span>
                    </h2>
                    <p className="text-body-lg text-gray-600 max-w-2xl text-center">
                        {t("network.mou.description")}
                    </p>
                </div>
            </div>

            {/* Continuous Marquee for Desktop & Mobile */}
            <div className="relative flex w-full overflow-hidden gap-[var(--gap)] group [--gap:1.5rem] md:[--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max shrink-0 gap-[var(--gap)] min-w-full animate-marquee group-hover:[animation-play-state:paused]">
                    {initialMous.map((partner, index) => (
                        <MarqueeLogo key={`mou-a-${index}`} partner={partner} cardKey={`mou-a-${index}`} />
                    ))}
                </div>
                {/* Duplicate for infinite scroll effect */}
                <div className="flex w-max shrink-0 gap-[var(--gap)] min-w-full animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
                    {initialMous.map((partner, index) => (
                        <MarqueeLogo key={`mou-b-${index}`} partner={partner} cardKey={`mou-b-${index}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}
