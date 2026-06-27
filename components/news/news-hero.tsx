"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { PageHero } from "@/components/gallery/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

interface NewsHeroProps {
	featuredPost?: BlogPost | null;
}

export function NewsHero({ featuredPost }: NewsHeroProps) {
	const { t } = useTranslation();

	if (!featuredPost) {
		return <PageHero title={t("nav.news")} subtitle={t("events.heroDescription")} />;
	}

	const title = t(featuredPost.title);
	const excerpt = t(featuredPost.excerpt);
	const image = featuredPost.coverImageUrl || featuredPost.media?.[0]?.url || "/og-default.png";
	const categoryName = featuredPost.category?.name ? t(featuredPost.category.name) : t("events.featuredNews");
	const date = featuredPost.publishedAt || featuredPost.createdAt;

	return (
		<section className="bg-white pt-28 md:pt-32">
			<div className="container pb-10">
				<div className="mb-7 flex flex-col gap-3 border-b border-border-subtle pb-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-caption font-bold uppercase tracking-wide text-primary-700">
							{t("events.featuredNews")}
						</p>
						<h1 className="mt-2 text-display-sm text-primary-950 md:text-display-md">
							{t("nav.news")}
						</h1>
					</div>
					<p className="max-w-xl text-body text-text-secondary md:text-right">
						{t("events.heroDescription")}
					</p>
				</div>

				<article className="group overflow-hidden rounded-lg border border-border-subtle bg-surface-panel shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
					<div className="grid lg:grid-cols-[0.92fr_1.08fr]">
						<Link
							href={`/news/${featuredPost.id}`}
							className="relative block min-h-[260px] overflow-hidden bg-primary-950 sm:min-h-[340px] lg:min-h-full"
						>
							<Image
								src={image}
								alt={title}
								fill
								priority
								className="object-cover transition-transform duration-700 group-hover:scale-105"
								sizes="(min-width: 1024px) 45vw, 100vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-primary-950/65 via-primary-950/10 to-transparent" />
							<div className="absolute left-5 top-5">
								<Badge className="bg-white text-primary-950 hover:bg-white">
									{categoryName}
								</Badge>
							</div>
						</Link>

						<div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
							<div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption font-medium text-text-secondary">
								<span className="inline-flex items-center">
									<Calendar className="mr-1.5 h-4 w-4 text-primary-700" />
									{new Date(date as any).toLocaleDateString("en-GB")}
								</span>
								<span className="inline-flex items-center">
									<Clock className="mr-1.5 h-4 w-4 text-primary-700" />
									{featuredPost.readTimes || 1} {t("common.minutesShort")}
								</span>
							</div>

							<h2 className="line-clamp-3 text-heading-2 text-primary-950 transition-colors group-hover:text-primary-800">
								{title}
							</h2>

							{excerpt && (
								<p className="mt-4 line-clamp-3 max-w-2xl text-body leading-relaxed text-text-secondary">
									{excerpt}
								</p>
							)}

							<div className="mt-7">
								<Button asChild size="lg" className="bg-primary-900 text-white hover:bg-primary-800">
									<Link href={`/news/${featuredPost.id}`}>
										{t("common.readMore")}
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
}
