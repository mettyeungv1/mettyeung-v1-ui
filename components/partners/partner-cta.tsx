"use client";

import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";
import Link from "next/link";

export function PartnerCTA() {
	const { t } = useTranslation();

	return (
		<section className="relative overflow-hidden py-20 lg:py-28 bg-primary-900 text-white">
			{/* Decorative background elements */}
			<div className="absolute inset-0 z-0">
				{/* Modern gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 opacity-90" />
				
				{/* Abstract shapes */}
				<div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/5 rounded-full blur-3xl transform rotate-12 pointer-events-none" />
				<div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[120%] bg-interactive-accent/10 rounded-full blur-3xl transform -rotate-12 pointer-events-none" />
			</div>

			<div className="container relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
				<AnimatedSection direction="up" className="text-center flex flex-col items-center">
					<div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
						<Handshake className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
					</div>
					
					<h2 className="text-display-sm md:text-display-md font-bold mb-6 text-white leading-tight">
						{t("partners.cta.title")}
					</h2>
					
					<p className="text-body-lg md:text-h5 text-primary-100 mb-10 max-w-2xl font-light">
						{t("partners.cta.subtitle")}
					</p>
					
					<Link href="/contact?dept=Partnership" passHref>
						<Button 
							size="lg" 
							className="bg-white text-primary-900 hover:bg-surface-muted border-none shadow-lg hover:shadow-xl transition-all duration-300 gap-2 h-14 px-8 rounded-full text-button font-bold"
						>
							{t("partners.cta.button")}
							<ArrowRight className="w-5 h-5 ml-1" />
						</Button>
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
