"use client";

import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlowingCard } from "./glowing-card";
import { useEffect, useState } from "react";
import { getPartnersService } from "@/service/partner/partner-service";
import type { Partner } from "@/lib/types/partner";

export function PartnersSection() {
	const { t } = useTranslation();
	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await getPartnersService();
				if (res.status_code === 200 && res.data) {
					setPartners(res.data);
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
					<h2 className="text-3xl​ sm:text-4xl md:text-5xl font-bold​​ text-blue-800 ">
						{t("about.partner.title")}
					</h2>
				</AnimatedSection>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
					{partners.map((partner, index) => (
						<AnimatedSection key={partner.id} delay={index * 0.2}>
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
			</div>
		</section>
	);
}
