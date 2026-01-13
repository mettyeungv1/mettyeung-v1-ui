"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "./glowing-card";
import { useEffect, useState, useRef } from "react";
import { getPartnersService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";

export function PartnersSection() {
	const { t } = useTranslation();
	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	// Pagination state
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	// Initial fetch
	useEffect(() => {
		(async () => {
			try {
				const res = await getPartnersService({ page: 1, limit: 12, sort: "order" });
				if (res.status_code === 200) {
					// Handle both paginated and non-paginated responses
					const newPartners = res.data?.data || (Array.isArray(res.data) ? res.data : []);
					setPartners(newPartners);
					
					const totalPages = res.data?.totalPages || 1;
					setHasMore(1 < totalPages);
				} else {
					setError("Failed to load partners");
				}
			} catch (e) {
				setError("Failed to load partners");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

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
								<Card className="p-6 sm:p-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500">
									<CardContent className="p-0 text-center">
										<Image
											src={partner.media?.url || "/my-cut.png"}
											alt={partner.media?.altText || partner.id}
											width={160}
											height={160}
											className="w-40 h-40 object-contain mx-auto"
										/>
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
