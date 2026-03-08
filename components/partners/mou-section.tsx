"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Handshake, FileBadge, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
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

export function MouSection() {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);

    return (
        <section className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Premium background gradient orbs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-200/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <AnimatedSection direction="up" className="text-center mb-12 lg:mb-20">
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm mb-6 border border-gray-100">
                        <FileBadge className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {t("network.mou.title")}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-8" />
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                        {t("network.mou.description")}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
                    {mouPartners.map((partner, index) => {
                        const colors = mapColors(partner.iconColor);
                        return (
                            <AnimatedSection 
                                key={partner.key} 
                                delay={index * 0.05} 
                                direction="up" 
                                className={`h-full ${!showAll && index >= 4 ? 'hidden md:block' : 'block'}`}
                            >
                                <div className="group relative bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center overflow-hidden border border-gray-100/60 cursor-pointer">
                                    
                                    {/* Top Gradient Accent Line */}
                                    <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.hoverGradient}`} />
                                    
                                    <div className="mb-6 md:mb-7 flex flex-col items-center w-full">
                                        {/* Icon Container with subtle glow */}
                                        <div className="relative mb-5 md:mb-6">
                                            <div className={`absolute inset-0 ${partner.bg} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                                            <div className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white ${partner.iconColor} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100 ${colors.hoverRing}`}>
                                                <Handshake className="w-7 h-7 md:w-9 md:h-9" />
                                            </div>
                                        </div>
                                        
                                        {/* Company Name Title */}
                                        <h3 className={`text-lg sm:text-xl font-bold tracking-tight text-gray-900 leading-snug ${colors.hoverText} transition-colors duration-300`}>
                                            {partner.name}
                                        </h3>
                                    </div>

                                    {/* Divider */}
                                    <div className={`w-10 md:w-12 h-1 bg-gray-200 ${partner.hoverBg} rounded-full mb-5 md:mb-7 transition-colors duration-500`} />
                                    
                                    {/* Description */}
                                    <div className="text-sm sm:text-[15px] md:text-base text-gray-600 leading-relaxed font-medium mt-auto w-full">
                                        {t(`network.mou.list.${partner.key}` as any)}
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>

                {/* Mobile Show More / Show Less Toggle */}
                <div className="mt-8 flex justify-center md:hidden w-full">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                        {showAll ? (
                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>View All Partners ({mouPartners.length}) <ChevronDown className="w-4 h-4" /></>
                        )}
                    </button>
                </div>

            </div>
        </section>
    );
}
