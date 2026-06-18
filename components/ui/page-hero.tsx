"use client";

import type { LucideIcon } from "lucide-react";
import { Images } from "lucide-react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

interface PageHeroProps {
	title: string;
	subtitle?: string;
	icon?: LucideIcon;
	eyebrow?: string;
	className?: string;
}

export function PageHero({
	title,
	subtitle,
	icon: Icon = Images,
	eyebrow,
	className,
}: PageHeroProps) {
	return (
		<section
			className={cn(
				"relative overflow-hidden bg-primary-900 pt-28 pb-20 text-white md:pt-36 md:pb-24",
				className
			)}
		>
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,_#fff_1px,_transparent_1px)] [background-size:32px_32px]" />
				<div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
			</div>

			<div className="container relative z-10">
				<AnimatedSection className="mx-auto max-w-3xl text-center">
					<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border-inverse bg-white/10 text-white backdrop-blur-sm">
						<Icon className="h-7 w-7" aria-hidden="true" />
					</div>
					{eyebrow && (
						<p className="mb-3 text-caption font-semibold text-accent-200">
							{eyebrow}
						</p>
					)}
					<h1 className="text-balance text-display-md text-white">
						{title}
					</h1>
					{subtitle && (
						<p className="mx-auto mt-5 max-w-2xl text-body-lg text-primary-100">
							{subtitle}
						</p>
					)}
				</AnimatedSection>
			</div>
		</section>
	);
}
