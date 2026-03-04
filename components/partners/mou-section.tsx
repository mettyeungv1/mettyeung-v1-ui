"use client";

import { useTranslation } from "@/lib/i18n";
import { Handshake, FileBadge, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export function MouSection() {
    const { t } = useTranslation();

    // Defined explicit list of partners in order of translation items
    const mouPartners = [
        { key: "item1", name: "Aspire Design Academy Company", type: "Private Company", iconColor: "text-blue-600", bg: "bg-blue-50/80", hoverBg: "group-hover:bg-blue-600" },
        { key: "item2", name: "Coffee Co., Ltd.", type: "Private Company", iconColor: "text-amber-600", bg: "bg-amber-50", hoverBg: "group-hover:bg-amber-600" },
        { key: "item3", name: "Young Entrepreneurs Association of Cambodia", type: "Association", iconColor: "text-emerald-600", bg: "bg-emerald-50", hoverBg: "group-hover:bg-emerald-600" },
        { key: "item4", name: "Dham Computer International Company", type: "Private Company", iconColor: "text-indigo-600", bg: "bg-indigo-50", hoverBg: "group-hover:bg-indigo-600" },
        { key: "item5", name: "RMA (Cambodia) Co., Ltd.", type: "Private Company", iconColor: "text-rose-600", bg: "bg-rose-50", hoverBg: "group-hover:bg-rose-600" },
        { key: "item6", name: "National Institute of Labor", type: "Institution", iconColor: "text-cyan-600", bg: "bg-cyan-50", hoverBg: "group-hover:bg-cyan-600" },
        { key: "item7", name: "Digi Academy", type: "Institution", iconColor: "text-violet-600", bg: "bg-violet-50", hoverBg: "group-hover:bg-violet-600" },
        { key: "item8", name: "HFC (Cambodia) Microfinance Company Limited", type: "Private Company", iconColor: "text-teal-600", bg: "bg-teal-50", hoverBg: "group-hover:bg-teal-600" },
        { key: "item9", name: "Center for Trauma Care and Research", type: "Institution", iconColor: "text-pink-600", bg: "bg-pink-50", hoverBg: "group-hover:bg-pink-600" },
        { key: "item10", name: "Institute of Industrial Technology", type: "Institution", iconColor: "text-orange-600", bg: "bg-orange-50", hoverBg: "group-hover:bg-orange-600" },
        { key: "item11", name: "Westline Education Group", type: "Institution", iconColor: "text-fuchsia-600", bg: "bg-fuchsia-50", hoverBg: "group-hover:bg-fuchsia-600" },
        { key: "item12", name: "Company of Oudong Express", type: "Private Company", iconColor: "text-blue-600", bg: "bg-blue-50/80", hoverBg: "group-hover:bg-blue-600" },
        { key: "item13", name: "Cambodia Electronics and Technology Association", type: "Association", iconColor: "text-amber-600", bg: "bg-amber-50", hoverBg: "group-hover:bg-amber-600" },
        { key: "item14", name: "Cambodia Institute of Technology and Agriculture", type: "Institution", iconColor: "text-emerald-600", bg: "bg-emerald-50", hoverBg: "group-hover:bg-emerald-600" },
        { key: "item15", name: "Akhlem (Cambodia) Co., Ltd.", type: "Private Company", iconColor: "text-indigo-600", bg: "bg-indigo-50", hoverBg: "group-hover:bg-indigo-600" },
        { key: "item16", name: "Cambodia Restaurant Association", type: "Association", iconColor: "text-rose-600", bg: "bg-rose-50", hoverBg: "group-hover:bg-rose-600" },
        { key: "item17", name: "Mycut Firm Co., Ltd.", type: "Private Company", iconColor: "text-cyan-600", bg: "bg-cyan-50", hoverBg: "group-hover:bg-cyan-600" }
    ];

    return (
        <section className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Premium background gradient orbs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-200/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
            
            <div className="container relative z-10 max-w-7xl mx-auto">
                <AnimatedSection direction="up" className="text-center mb-16 lg:mb-20">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                    {mouPartners.map((partner, index) => (
                        <AnimatedSection key={partner.key} delay={index * 0.05} direction="up" className="h-full">
                            <div className="group relative bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center overflow-hidden border border-gray-100/60">
                                
                                {/* Top Gradient Accent Line */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 to-indigo-600`} />
                                
                                <div className="mb-7 flex flex-col items-center w-full">
                                    {/* Icon Container with subtle glow */}
                                    <div className="relative mb-6">
                                        <div className={`absolute inset-0 ${partner.bg} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                                        <div className={`relative w-20 h-20 shrink-0 bg-white ${partner.iconColor} rounded-[2rem] flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 shadow-[0_4px_20px_rgb(0,0,0,0.05)] ring-1 ring-gray-100 group-hover:ring-blue-100`}>
                                            <Handshake className="w-9 h-9" />
                                        </div>
                                    </div>
                                    
                                    {/* Company Name Title */}
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                                        {partner.name}
                                    </h3>
                                </div>

                                {/* Divider */}
                                <div className="w-12 h-1 bg-gradient-to-r from-gray-200 to-gray-200 group-hover:from-blue-500 group-hover:to-indigo-500 rounded-full mb-7 transition-all duration-500" />
                                
                                {/* Description */}
                                <div className="text-[15px] sm:text-base text-gray-600 leading-relaxed font-medium mt-auto w-full">
                                    {t(`network.mou.list.${partner.key}`)}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
