"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake } from "lucide-react";
import { mouPartners } from "@/lib/data/mou";

const mapColors = (iconColor: string) => {
    const colorMaps: Record<string, { hoverText: string, hoverRing: string, hoverGradient: string }> = {
        "text-blue-600": { hoverText: "group-hover:text-blue-600", hoverRing: "group-hover:ring-blue-200", hoverGradient: "bg-gradient-to-r from-blue-500 to-blue-600" },
        "text-amber-600": { hoverText: "group-hover:text-amber-600", hoverRing: "group-hover:ring-amber-200", hoverGradient: "bg-gradient-to-r from-amber-500 to-amber-600" },
        "text-emerald-600": { hoverText: "group-hover:text-emerald-600", hoverRing: "group-hover:ring-emerald-200", hoverGradient: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
        "text-indigo-600": { hoverText: "group-hover:text-indigo-600", hoverRing: "group-hover:ring-indigo-200", hoverGradient: "bg-gradient-to-r from-indigo-500 to-indigo-600" },
        "text-rose-600": { hoverText: "group-hover:text-rose-600", hoverRing: "group-hover:ring-rose-200", hoverGradient: "bg-gradient-to-r from-rose-500 to-rose-600" },
        "text-cyan-600": { hoverText: "group-hover:text-cyan-600", hoverRing: "group-hover:ring-cyan-200", hoverGradient: "bg-gradient-to-r from-cyan-500 to-cyan-600" },
        "text-violet-600": { hoverText: "group-hover:text-violet-600", hoverRing: "group-hover:ring-violet-200", hoverGradient: "bg-gradient-to-r from-violet-500 to-violet-600" },
        "text-teal-600": { hoverText: "group-hover:text-teal-600", hoverRing: "group-hover:ring-teal-200", hoverGradient: "bg-gradient-to-r from-teal-500 to-teal-600" },
        "text-pink-600": { hoverText: "group-hover:text-pink-600", hoverRing: "group-hover:ring-pink-200", hoverGradient: "bg-gradient-to-r from-pink-500 to-pink-600" },
        "text-orange-600": { hoverText: "group-hover:text-orange-600", hoverRing: "group-hover:ring-orange-200", hoverGradient: "bg-gradient-to-r from-orange-500 to-orange-600" },
        "text-fuchsia-600": { hoverText: "group-hover:text-fuchsia-600", hoverRing: "group-hover:ring-fuchsia-200", hoverGradient: "bg-gradient-to-r from-fuchsia-500 to-fuchsia-600" }
    };
    return colorMaps[iconColor] || colorMaps["text-blue-600"];
};

export function MouScrollerSection() {
    const { t } = useTranslation();

    const renderPartnerCard = (partner: any, key: string) => {
        const colors = mapColors(partner.iconColor);
        return (
            <div 
                key={key}
                className="w-[350px] md:w-[450px] shrink-0 group relative bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center overflow-hidden border border-gray-100/60 cursor-pointer"
            >
                {/* Top Gradient Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.hoverGradient}`} />
                
                <div className="mb-7 flex flex-col items-center w-full">
                    {/* Icon Container with subtle glow */}
                    <div className="relative mb-6">
                        <div className={`absolute inset-0 ${partner.bg} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                        <div className={`relative w-20 h-20 shrink-0 bg-white ${partner.iconColor} rounded-[2rem] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100 ${colors.hoverRing}`}>
                            <Handshake className="w-9 h-9" />
                        </div>
                    </div>
                    
                    {/* Company Name Title */}
                    <h3 className={`text-[17px] sm:text-[19px] font-bold tracking-tight text-gray-900 leading-snug ${colors.hoverText} transition-colors duration-300`}>
                        {partner.name}
                    </h3>
                </div>

                {/* Divider */}
                <div className={`w-12 h-1 bg-gray-200 ${partner.hoverBg} rounded-full mb-7 transition-colors duration-500`} />
                
                {/* Description */}
                <div className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-medium mt-auto w-full">
                    {t(`network.mou.list.${partner.key}` as any)}
                </div>
            </div>
        );
    };

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

            {/* Scrolling Marquee Container */}
            <div className="relative w-full flex flex-col group [--gap:2rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex gap-[var(--gap)] min-w-full animate-marquee-fast md:animate-marquee hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
                    
                    {/* First Loop Content */}
                    <div className="flex shrink-0 gap-[var(--gap)]">
                        {mouPartners.map((partner, index) => renderPartnerCard(partner, `mou-original-${index}`))}
                    </div>

                    {/* Second Loop Content (Clone for seamless scrolling) */}
                    <div className="flex shrink-0 gap-[var(--gap)]">
                        {mouPartners.map((partner, index) => renderPartnerCard(partner, `mou-clone-${index}`))}
                    </div>

                </div>
            </div>
        </section>
    );
}
