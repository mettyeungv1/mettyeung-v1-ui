"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake } from "lucide-react";
import { mouPartners } from "@/lib/data/mou";

const mapColors = (iconColor: string) => {
    const colorMaps: Record<string, { hoverText: string, hoverRing: string, hoverGradient: string }> = {
        "text-blue-600":    { hoverText: "group-hover:text-blue-600",    hoverRing: "group-hover:ring-blue-200",    hoverGradient: "bg-gradient-to-r from-blue-500 to-blue-600" },
        "text-amber-600":   { hoverText: "group-hover:text-amber-600",   hoverRing: "group-hover:ring-amber-200",   hoverGradient: "bg-gradient-to-r from-amber-500 to-amber-600" },
        "text-emerald-600": { hoverText: "group-hover:text-emerald-600", hoverRing: "group-hover:ring-emerald-200", hoverGradient: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
        "text-indigo-600":  { hoverText: "group-hover:text-indigo-600",  hoverRing: "group-hover:ring-indigo-200",  hoverGradient: "bg-gradient-to-r from-indigo-500 to-indigo-600" },
        "text-rose-600":    { hoverText: "group-hover:text-rose-600",    hoverRing: "group-hover:ring-rose-200",    hoverGradient: "bg-gradient-to-r from-rose-500 to-rose-600" },
        "text-cyan-600":    { hoverText: "group-hover:text-cyan-600",    hoverRing: "group-hover:ring-cyan-200",    hoverGradient: "bg-gradient-to-r from-cyan-500 to-cyan-600" },
        "text-violet-600":  { hoverText: "group-hover:text-violet-600",  hoverRing: "group-hover:ring-violet-200",  hoverGradient: "bg-gradient-to-r from-violet-500 to-violet-600" },
        "text-teal-600":    { hoverText: "group-hover:text-teal-600",    hoverRing: "group-hover:ring-teal-200",    hoverGradient: "bg-gradient-to-r from-teal-500 to-teal-600" },
        "text-pink-600":    { hoverText: "group-hover:text-pink-600",    hoverRing: "group-hover:ring-pink-200",    hoverGradient: "bg-gradient-to-r from-pink-500 to-pink-600" },
        "text-orange-600":  { hoverText: "group-hover:text-orange-600",  hoverRing: "group-hover:ring-orange-200",  hoverGradient: "bg-gradient-to-r from-orange-500 to-orange-600" },
        "text-fuchsia-600": { hoverText: "group-hover:text-fuchsia-600", hoverRing: "group-hover:ring-fuchsia-200", hoverGradient: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600" },
    };
    return colorMaps[iconColor] || colorMaps["text-blue-600"];
};

/* ─── Desktop marquee card ────────────────────────────────────────────────── */
const MarqueeCard = ({ partner, cardKey }: { partner: any; cardKey: string }) => {
    const { t } = useTranslation();
    const colors = mapColors(partner.iconColor);
    return (
        <div
            key={cardKey}
            className="w-[350px] md:w-[450px] shrink-0 group relative bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden border border-gray-100/60 cursor-pointer"
        >
            <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.hoverGradient}`} />
            <div className="mb-7 flex flex-col items-center w-full">
                <div className="relative mb-6">
                    <div className={`absolute inset-0 ${partner.bg} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className={`relative w-20 h-20 shrink-0 bg-white ${partner.iconColor} rounded-[2rem] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100 ${colors.hoverRing}`}>
                        <Handshake className="w-9 h-9" />
                    </div>
                </div>
                <h3 className={`text-[17px] sm:text-[19px] font-bold tracking-tight text-gray-900 leading-snug ${colors.hoverText} transition-colors duration-300`}>
                    {partner.name}
                </h3>
            </div>
            <div className={`w-12 h-1 bg-gray-200 ${partner.hoverBg} rounded-full mb-7 transition-colors duration-500`} />
            <div className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-medium mt-auto w-full">
                {t(`network.mou.list.${partner.key}` as any)}
            </div>
        </div>
    );
};

/* ─── Mobile single-card auto-carousel ───────────────────────────────────── */
function MobileCarousel() {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = mouPartners.length;

    const advance = () => {
        setAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
            setAnimating(false);
        }, 300);
    };

    useEffect(() => {
        intervalRef.current = setInterval(advance, 2500);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const partner = mouPartners[current];
    const colors = mapColors(partner.iconColor);

    return (
        <div className="px-4 w-full">
            <div
                className={`group relative bg-white p-8 rounded-[2rem] shadow-[0_2px_12px_rgb(0,0,0,0.06)] flex flex-col items-center text-center overflow-hidden border border-gray-100/60 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
            >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${colors.hoverGradient}`} />

                <div className="mb-6 flex flex-col items-center w-full">
                    <div className="relative mb-5">
                        <div className={`relative w-16 h-16 bg-white ${partner.iconColor} rounded-[1.5rem] flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100`}>
                            <Handshake className="w-7 h-7" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-gray-900 leading-snug">
                        {partner.name}
                    </h3>
                </div>

                <div className="w-10 h-1 bg-gray-200 rounded-full mb-5" />

                <div className="text-sm text-gray-600 leading-relaxed font-medium w-full">
                    {t(`network.mou.list.${partner.key}` as any)}
                </div>

                {/* Dot indicators */}
                <div className="flex gap-1.5 mt-6">
                    {mouPartners.map((_, i) => (
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
export function MouScrollerSection() {
    const { t } = useTranslation();

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
                <MobileCarousel />
            </div>

            {/* ── Desktop: infinite marquee ── */}
            <div className="hidden md:block">
                <div className="relative w-full flex flex-col group [--gap:2rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-[var(--gap)] min-w-full animate-marquee-fast hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
                        <div className="flex shrink-0 gap-[var(--gap)]">
                            {mouPartners.map((partner, index) => (
                                <MarqueeCard key={`mou-a-${index}`} partner={partner} cardKey={`mou-a-${index}`} />
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-[var(--gap)]">
                            {mouPartners.map((partner, index) => (
                                <MarqueeCard key={`mou-b-${index}`} partner={partner} cardKey={`mou-b-${index}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
