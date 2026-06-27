"use client";

import Link from "next/link";
import { Award, CheckCircle2, Heart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

const benefitKeys = ["joinDesc1", "joinDesc2", "joinDesc3"];

export function HomeCTASection() {
	const { t } = useTranslation();

	return (
		<section className="section-padding bg-gradient-to-br from-primary-900 to-accent-600 relative overflow-hidden">
			<div className="absolute inset-0 bg-black/40" />
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)",
					mixBlendMode: "overlay",
				}}
			/>
			<div className="container relative text-white">
				<AnimatedSection className="text-center">
					<h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
						{t("home.joinCommunity")}
					</h2>
					<ul className="mx-auto mb-8 max-w-3xl space-y-4 text-left text-body-lg leading-relaxed text-gray-100 md:text-xl">
						{benefitKeys.map((key) => (
							<li key={key} className="flex gap-3">
								<CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-khmer-gold" />
								<span>{t(`home.${key}`)}</span>
							</li>
						))}
					</ul>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="xl"
							variant="outline"
							className="bg-white text-primary-900 hover:bg-neutral-100"
						>
							<Link href="/contact">
								<Heart className="mr-2 h-6 w-6" aria-hidden="true" />
								{t("home.becomeOurMember")}
							</Link>
						</Button>
						<Button
							asChild
							size="xl"
							variant="outline"
							className="border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
						>
							<Link href="/news">
								<Award className="mr-2 h-6 w-6" aria-hidden="true" />
								{t("home.viewOurActivity")}
							</Link>
						</Button>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
}
