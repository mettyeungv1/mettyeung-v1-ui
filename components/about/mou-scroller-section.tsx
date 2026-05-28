"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake } from "lucide-react";
import type { Partner } from "@/lib/types/partner";

const mapColors = (type: string | undefined | null) => {
    switch (type) {
		case "Private Company":
			return { text: "text-blue-600", hoverText: "group-hover:text-blue-600", bg: "bg-blue-50/80", hoverBg: "group-hover:bg-blue-600", hoverRing: "group-hover:ring-blue-200", hoverGradient: "bg-gradient-to-r from-blue-500 to-blue-600", iconColor: "text-blue-600", bgClass: "bg-blue-50/80" };
		case "Association":
			return { text: "text-emerald-600", hoverText: "group-hover:text-emerald-600", bg: "bg-emerald-50", hoverBg: "group-hover:bg-emerald-600", hoverRing: "group-hover:ring-emerald-200", hoverGradient: "bg-gradient-to-r from-emerald-500 to-emerald-600", iconColor: "text-emerald-600", bgClass: "bg-emerald-50" };
		case "Institution":
			return { text: "text-violet-600", hoverText: "group-hover:text-violet-600", bg: "bg-violet-50", hoverBg: "group-hover:bg-violet-600", hoverRing: "group-hover:ring-violet-200", hoverGradient: "bg-gradient-to-r from-violet-500 to-violet-600", iconColor: "text-violet-600", bgClass: "bg-violet-50" };
		default:
			return { text: "text-slate-600", hoverText: "group-hover:text-slate-600", bg: "bg-slate-50", hoverBg: "group-hover:bg-slate-600", hoverRing: "group-hover:ring-slate-200", hoverGradient: "bg-gradient-to-r from-slate-500 to-slate-600", iconColor: "text-slate-600", bgClass: "bg-slate-50" };
	}
};

/* ─── Desktop marquee card ────────────────────────────────────────────────── */
const MarqueeCard = ({ partner, cardKey }: { partner: Partner; cardKey: string }) => {
    const { t } = useTranslation();
    const colors = mapColors(partner.mouType);
    const partnerName = t(partner.name) || "MOU Partner";
    const partnerDescription = t(partner.description) || "Memorandum of Understanding";
    return (
        <div
            key={cardKey}
            className="w-[350px] md:w-[450px] shrink-0 group relative bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden border border-gray-100/60 cursor-pointer"
        >
            <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.hoverGradient}`} />
            <div className="mb-7 flex flex-col items-center w-full">
                <div className="relative mb-6">
                    <div className={`absolute inset-0 ${colors.bgClass} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className={`relative w-20 h-20 shrink-0 bg-white ${colors.iconColor} rounded-[2rem] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100 ${colors.hoverRing}`}>
                        <Handshake className="w-9 h-9" />
                    </div>
                </div>
                <h3 className={`text-[17px] sm:text-[19px] font-bold tracking-tight text-gray-900 leading-snug ${colors.hoverText} transition-colors duration-300`}>
                    {partnerName}
                </h3>
            </div>
            <div className={`w-12 h-1 bg-gray-200 ${colors.hoverBg} rounded-full mb-7 transition-colors duration-500`} />
            <div className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-medium mt-auto w-full">
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
    const partnerName = t(partner.name) || "MOU Partner";
    const partnerDescription = t(partner.description) || "Memorandum of Understanding";

    return (
        <div className="px-4 w-full">
            <div
                className={`group relative bg-white p-8 rounded-[2rem] shadow-[0_2px_12px_rgb(0,0,0,0.06)] flex flex-col items-center text-center overflow-hidden border border-gray-100/60 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
            >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${colors.hoverGradient}`} />

                <div className="mb-6 flex flex-col items-center w-full">
                    <div className="relative mb-5">
                        <div className={`relative w-16 h-16 bg-white ${colors.iconColor} rounded-[1.5rem] flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100`}>
                            <Handshake className="w-7 h-7" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-gray-900 leading-snug">
                        {partnerName}
                    </h3>
                </div>

                <div className="w-10 h-1 bg-gray-200 rounded-full mb-5" />

                <div className="text-sm text-gray-600 leading-relaxed font-medium w-full">
                    {partnerDescription}
                </div>

                {/* Dot indicators */}
                <div className="flex gap-1.5 mt-6">
                    {partners.map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-blue-600" : "w-1.5 bg-gray-300"}`}
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
        <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                            {t("network.mou.title")}
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl text-justify md:text-center">
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
