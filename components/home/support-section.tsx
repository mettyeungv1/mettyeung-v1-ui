"use client";

import { useTranslation } from "@/lib/i18n";
import {
	BookOpenCheck,
	BriefcaseBusiness,
	Handshake,
	Megaphone,
	MessagesSquare,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

const supportAreas = [
	{ key: "training", icon: BookOpenCheck },
	{ key: "market", icon: BriefcaseBusiness },
	{ key: "consulting", icon: MessagesSquare },
	{ key: "networking", icon: Handshake },
	{ key: "advocacy", icon: Megaphone },
];

export function SupportSection() {
	const { t } = useTranslation();

	return (
		<section className="section-md bg-gray-50">
			<div className="container">
				<AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
					<p className="text-caption font-bold uppercase tracking-wide text-primary-700">
						{t("home.support.eyebrow")}
					</p>
					<h2 className="mt-2 text-heading-2 text-primary-950">
						{t("home.support.title")}
					</h2>
					<p className="mt-4 text-body-lg text-gray-600">
						{t("home.support.subtitle")}
					</p>
				</AnimatedSection>

				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
					{supportAreas.map(({ key, icon: Icon }, index) => (
						<AnimatedSection key={key} delay={index * 0.08} className="h-full">
							<div className="h-full rounded-xl border border-border-subtle bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
								<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-interactive-primaryMuted text-primary-900">
									<Icon className="h-6 w-6" />
								</div>
								<h3 className="text-heading-4 text-primary-950">
									{t(`home.support.items.${key}.title`)}
								</h3>
								<p className="mt-3 text-body-sm leading-relaxed text-gray-600">
									{t(`home.support.items.${key}.description`)}
								</p>
							</div>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
