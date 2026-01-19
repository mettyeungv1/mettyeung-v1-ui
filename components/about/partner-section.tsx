"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "./glowing-card";
import { useEffect, useState, useRef } from "react";
import { getPartnersService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";

export function PartnersSection({ initialPartners = [] }: { initialPartners?: Partner[] }) {
	const { t } = useTranslation();
	const [partners, setPartners] = useState<Partner[]>(initialPartners);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
			const res = await getPartnersService({ page: nextPage, limit: 12, sort: "order" });
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

	if (loading) {
		return (
			<section
				className="section-padding bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5"
				id="network"
			>
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">
							{t("about.partner.title")}
						</h2>
						<p className="mt-6 text-gray-500">{t("common.loading")}</p>
					</AnimatedSection>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="section-padding" id="network">
				<div className="container text-center text-red-600">{error}</div>
			</section>
		);
	}
	return (
		<section
			className="section-padding bg-gradient-to-br from-yellow-500/5 via-white to-red-500/5"
			id="network"
		>
			<div className="container">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 ">
						{t("about.partner.title")}
					</h2>
				</AnimatedSection>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
					{partners.map((partner, index) => (
						<AnimatedSection key={partner.id} delay={index * 0.1}>
							<GlowingCard>
								<Card className="relative p-6 sm:p-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm transition-all duration-500 overflow-hidden group">
									<CardContent className="p-0 text-center">
										{/* Logo Container */}
										<div className="relative z-10 transition-transform duration-500 group-hover:scale-95 group-hover:-translate-y-8">
											<Image
												src={partner.media?.url || "/my-cut.png"}
												alt={partner.media?.altText || partner.id}
												width={160}
												height={160}
												className="w-32 h-32 object-contain mx-auto mb-4"
											/>
											<p className="text-sm font-bold text-blue-900 line-clamp-1 transition-opacity group-hover:opacity-0">
												{partner.name}
											</p>
										</div>

										{/* Details Overlay (visible on hover) */}
										<div className="absolute inset-0 p-6 flex flex-col items-center justify-end bg-gradient-to-t from-white via-white/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-full group-hover:translate-y-0">
											<h4 className="text-sm font-bold text-blue-900 mb-2 line-clamp-1">{partner.name}</h4>

											{partner.location && (
												<div className="flex items-center text-[10px] text-gray-500 mb-2">
													<div className="w-1 h-1 rounded-full bg-blue-500 mr-1.5" />
													<span className="line-clamp-1">{partner.location}</span>
												</div>
											)}

											{partner.description && (
												<p className="text-[10px] text-gray-600 line-clamp-2 mb-3 px-2 italic">
													"{partner.description}"
												</p>
											)}

											{partner.website && (
												<a
													href={partner.website}
													target="_blank"
													rel="noopener noreferrer"
													className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 flex items-center group/link"
												>
													Visit Site
													<svg className="w-2.5 h-2.5 ml-1 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
													</svg>
												</a>
											)}
										</div>
									</CardContent>
								</Card>
							</GlowingCard>
						</AnimatedSection>
					))}
				</div>

				{/* Loading More Indicator */}
				{loadingMore && (
					<div className="flex justify-center items-center py-8">
						<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}

				{/* Intersection Observer Target */}
				<div ref={observerTarget} className="h-4" />
			</div>
		</section>
	);
}
