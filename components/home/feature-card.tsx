"use client";

import { useTranslation } from "@/lib/i18n";
import { FeatureItem } from "@/lib/types/home";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
	feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
	const { t } = useTranslation();

	return (
		<Card className="h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gray-50 border-gray-200">
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
				<h3 className="text-xl font-bold text-gray-800 mb-3">
					{t(feature.titleKey)}
				</h3>
				<p className="text-gray-600 leading-relaxed mb-6 flex-grow">
					{t(feature.descriptionKey)}
				</p>

				<Link
					href={feature.link}
					className="
                        group/link 
                        inline-flex items-center 
                        text-blue-600 font-semibold 
                        relative self-start
                    "
				>
					<span>{t("common.learnMore")}</span>
					<ArrowRight
						className="
                            ml-2 w-4 h-4 
                            transition-transform duration-300 
                            group-hover/link:translate-x-1
                        "
					/>
					{/* Animated Underline */}
					<span
						className="
                            absolute bottom-0 left-0 
                            h-[2px] w-0 
                            bg-blue-600 
                            transition-all duration-300 ease-in-out
                            group-hover/link:w-full
                        "
					></span>
				</Link>
			</CardContent>
		</Card>
	);
}
