"use client";

import { useTranslation } from "@/lib/i18n";
import { FeatureItem } from "@/lib/types/home";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
	feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
	const { t } = useTranslation();

	return (
		<Card variant="interactive" className="h-full flex flex-col overflow-hidden">
			<div className="aspect-video overflow-hidden relative">
				<Image
					src={feature.image}
					alt={t(feature.titleKey)}
					fill
					style={{ objectFit: "cover" }}
					className="group-hover:scale-105 transition-transform duration-500"
					sizes="(max-width: 768px) 100vw, 50vw, 33vw"
				/>
			</div>
			<CardContent className="p-6 flex flex-col flex-grow">
				<h3 className="text-heading-4 mb-3">
					{t(feature.titleKey)}
				</h3>
				<p className="text-body-sm text-gray-600 mb-6 flex-grow">
					{t(feature.descriptionKey)}
				</p>

				<Button asChild size="sm" className="self-start bg-primary-900 text-white hover:bg-primary-950">
					<Link href={feature.link}>
						{t("common.learnMore")}
						<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
