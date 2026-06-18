"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake } from "lucide-react";
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

/* ─── Desktop marquee card ────────────────────────────────────────────────── */
const MarqueeCard = ({ partner, cardKey }: { partner: Partner; cardKey: string }) => {
    const { t } = useTranslation();
    const colors = mapColors(partner.mouType);
    const partnerName = t(partner.name) || t("network.mou.partnerFallback");
    const partnerDescription = t(partner.description) || t("network.mou.descriptionFallback");
    return (
        <div
            key={cardKey}
            className="card-interactive w-[350px] md:w-[450px] shrink-0 group relative p-card-lg flex flex-col items-center text-center overflow-hidden cursor-pointer"
        >
            <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.accentLine}`} />
            <div className="mb-7 flex flex-col items-center w-full">
                <div className="relative mb-6">
                    <div className={`relative w-20 h-20 shrink-0 bg-surface-panel ${colors.iconColor} rounded-xl flex items-center justify-center transition-all duration-200 shadow-surface ring-1 ring-border-subtle ${colors.hoverRing}`}>
                        <Handshake className="w-9 h-9" />
                    </div>
                </div>
                <h3 className={`text-h5 font-semibold text-gray-900 ${colors.hoverText} transition-colors duration-300`}>
                    {partnerName}
                </h3>
            </div>
            <div className={`w-12 h-1 bg-gray-200 ${colors.hoverBg} rounded-full mb-7 transition-colors duration-500`} />
            <div className="text-body-sm text-gray-600 mt-auto w-full">
                {partnerDescription}
            </div>
        </div>
    );
};

/* ─── Mobile single-card auto-carousel ───────────────────────────────────── */
function MobileCarousel({ partners }: { partners: Partner[] }) {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = partners.length;

    const advance = () => {
        setAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
            setAnimating(false);
        }, 300);
    };

    useEffect(() => {
        if (total === 0) return;
        intervalRef.current = setInterval(advance, 2500);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total]);

    if (total === 0) return null;

    const partner = partners[current];
    const colors = mapColors(partner.mouType);
    const partnerName = t(partner.name) || t("network.mou.partnerFallback");
    const partnerDescription = t(partner.description) || t("network.mou.descriptionFallback");

    return (
        <div className="px-4 w-full">
            <div
                className={`card-base group relative p-card-lg flex flex-col items-center text-center overflow-hidden transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
            >
                <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accentLine}`} />

                <div className="mb-6 flex flex-col items-center w-full">
                    <div className="relative mb-5">
                        <div className={`relative w-16 h-16 bg-surface-panel ${colors.iconColor} rounded-xl flex items-center justify-center shadow-surface ring-1 ring-border-subtle`}>
                            <Handshake className="w-7 h-7" />
                        </div>
                    </div>
                    <h3 className="text-h5 font-semibold text-gray-900">
                        {partnerName}
                    </h3>
                </div>

                <div className="w-10 h-1 bg-gray-200 rounded-full mb-5" />

                <div className="text-body-sm text-gray-600 w-full">
                    {partnerDescription}
                </div>

                {/* Dot indicators */}
                <div className="flex gap-1.5 mt-6">
                    {partners.map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-interactive-primary" : "w-1.5 bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export function MouScrollerSection({ initialMous }: { initialMous: Partner[] }) {
    const { t } = useTranslation();
	if (!initialMous || initialMous.length === 0) return null;

    return (
        <section className="section-md surface-muted border-t border-border-subtle overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-heading-2">
                        <span className="text-primary-900">
                            {t("network.mou.title")}
                        </span>
                    </h2>
                    <p className="text-body-lg text-gray-600 max-w-2xl text-justify md:text-center">
                        {t("network.mou.description")}
                    </p>
                </div>
            </div>

            {/* ── Mobile: single-card auto-carousel ── */}
            <div className="md:hidden">
                <MobileCarousel partners={initialMous} />
            </div>

            {/* ── Desktop: infinite marquee ── */}
            <div className="hidden md:block">
                <div className="relative w-full flex flex-col group [--gap:2rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-[var(--gap)] min-w-full animate-marquee-fast hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
                        <div className="flex shrink-0 gap-[var(--gap)]">
                            {initialMous.map((partner, index) => (
                                <MarqueeCard key={`mou-a-${index}`} partner={partner} cardKey={`mou-a-${index}`} />
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-[var(--gap)]">
                            {initialMous.map((partner, index) => (
                                <MarqueeCard key={`mou-b-${index}`} partner={partner} cardKey={`mou-b-${index}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
