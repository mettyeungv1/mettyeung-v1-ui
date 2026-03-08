"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "@/components/about/glowing-card"; // Reusing GlowingCard
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getPartnersService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";

export function PartnersGrid({ initialPartners = [] }: { initialPartners?: Partner[] }) {
	const { t } = useTranslation();
	const [partners, setPartners] = useState<Partner[]>(initialPartners);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Sync state when initialPartners prop changes (e.g. RSC re-renders with fresh data)
	useEffect(() => {
		setPartners(initialPartners);
		setPage(1);
		setHasMore(true);
	}, [initialPartners]);
	
	// Pagination state
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	// Load more partners
	const loadMorePartners = async () => {
		if (loadingMore || !hasMore) return;

		setLoadingMore(true);
		const nextPage = page + 1;

		try {
			const res = await getPartnersService({ 
				page: nextPage, 
				limit: 24, 
				sort: "order", 
				isActive: true 
			});
			if (res.status_code === 200) {
				const newPartners = res.data?.data || [];
				if (newPartners.length > 0) {
					setPartners((prev) => [...prev, ...newPartners]);
					setPage(nextPage);
					const totalPages = res.data?.totalPages || 1;
					setHasMore(nextPage < totalPages);
				} else {
					setHasMore(false);
				}
			}
		} catch (error) {
			console.error("Failed to load more partners:", error);
		} finally {
			setLoadingMore(false);
		}
	};

	// Intersection Observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
					loadMorePartners();
				}
			},
			{ threshold: 0.1 }
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [hasMore, loadingMore, loading]);

	if (loading && partners.length === 0) {
		return (
			<section className="section-padding min-h-[50vh] flex flex-col justify-center items-center">
				<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				<p className="mt-4 text-gray-500">{t("common.loading")}</p>
			</section>
		);
	}

	if (error && partners.length === 0) {
		return (
			<section className="section-padding min-h-[50vh] flex justify-center items-center">
				<div className="text-center text-red-600">{error}</div>
			</section>
		);
	}

	if (partners.length === 0) {
		return (
			<section className="section-padding min-h-[50vh] flex flex-col justify-center items-center">
				<p className="text-xl text-gray-500">{t("partners.noPartners")}</p>
			</section>
		);
	}

	return (
		<section className="section-padding bg-gray-50/50">
			<div className="container relative z-10 max-w-7xl mx-auto">
				{/* Modern Header Section */}
				<AnimatedSection direction="up" className="text-center mb-16 lg:mb-20">
					<div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm mb-6 border border-gray-100">
						<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
						{t("partners.title")}
					</h2>
					<div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-8" />
					<p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
						{t("partners.description")}
					</p>
				</AnimatedSection>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
					{partners.map((partner, index) => {
						const cardContent = (
							<Card className={`group relative overflow-hidden aspect-square border-0 shadow-xl bg-white transition-all duration-500 rounded-2xl ${partner.websiteUrl ? "hover:shadow-2xl cursor-pointer hover:-translate-y-2" : "hover:shadow-2xl hover:-translate-y-1"}`}>
								<CardContent className="p-0 h-full flex items-center justify-center">
									{/* Large Logo display */}
									<div className="relative w-full h-full p-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-40 opacity-100">
										<Image
											src={partner.media?.url || "/my-cut.png"}
											alt={partner.name || partner.media?.altText || "Partner logo"}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
											className="object-contain p-8 md:p-12 drop-shadow-sm"
										/>
									</div>

									{/* Hover Overlay with info */}
									<div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-center items-center p-6 sm:p-8 text-center backdrop-blur-[2px]">
                                        <div className="transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 flex flex-col items-center h-full justify-center">
                                            {partner.name && (
                                                <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 mb-3 drop-shadow-md tracking-wide">
                                                    {partner.name}
                                                </h3>
                                            )}
                                            {partner.description && (
                                                <p className="text-sm md:text-base text-slate-200 line-clamp-3 mb-6 leading-relaxed">
                                                    {partner.description}
                                                </p>
                                            )}
                                            {partner.websiteUrl && (
                                                <span className="inline-flex items-center gap-2 px-6 py-2.5 mt-2 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 bg-white/10 rounded-full hover:bg-blue-600 border border-white/20 backdrop-blur-md shadow-lg hover:shadow-blue-500/30">
                                                    {t("partners.visitWebsite")} <ArrowRight className="w-4 h-4 ml-1" />
                                                </span>
                                            )}
                                        </div>
									</div>
								</CardContent>
							</Card>
						);

						return (
							<AnimatedSection key={partner.id} delay={(index % 10) * 0.1}>
								<GlowingCard>
									{partner.websiteUrl ? (
										<a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
											{cardContent}
										</a>
									) : (
										<div className="h-full">
											{cardContent}
										</div>
									)}
								</GlowingCard>
							</AnimatedSection>
						);
					})}
				</div>
				
				{/* Loading More Indicator */}
				{loadingMore && (
					<div className="flex justify-center items-center py-12">
						<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}
				
				{/* Intersection Observer Target */}
				<div ref={observerTarget} className="h-10" />
			</div>
		</section>
	);
}
