// Redesigned: arc avatar card
"use client";

/*
 * SVG arc math (200 px container):
 *   r = 96  →  circumference = 2π × 96 ≈ 603 px
 *   strokeDasharray = "480 123"  →  480 px arc (≈ 286°) + 123 px gap (≈ 74°)
 *   rotate(186, 100, 100)  →  arc starts at ~9 o'clock, ends at ~7:30,
 *                              gap sits at the bottom-left quadrant
 *   stroke="currentColor" + Tailwind text-* lets hover shift the color.
 */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { normalizeUrl } from "@/lib/utils/image";
import { Person } from "@/lib/stores/person-store";
import { MEDIA_ENDPOINT } from "@/lib/static";

/* ── props ──────────────────────────────────────────────────────────── */

interface PersonCardProps {
	person: Person;
	variant?: "compact" | "detailed";
	index: number;
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function resolveImage(person: Person): string {
	const raw =
		person.image ||
		(person as any).avatarUrl ||
		(person as any).avatar_url;
	if (!raw || raw === "/placeholder.svg") return "";
	if (raw.startsWith("http")) return normalizeUrl(raw);
	return normalizeUrl(`${MEDIA_ENDPOINT}/view/${raw}`);
}

function getInitials(name?: string): string {
	if (!name) return "?";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

/* ── component ──────────────────────────────────────────────────────── */

export function PersonCard({ person, variant = "compact", index }: PersonCardProps) {
	const [errored, setErrored] = useState(false);

	const imageSrc     = resolveImage(person);
	const initials     = getInitials(person.name_en || person.name);
	const displayName  = person.name_en || person.name || "—";
	const rawTitle     = (person as any).title_en || person.position_en || "";
	const displayTitle = rawTitle && rawTitle !== "Member" ? rawTitle : "";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.45,
				delay: Math.min(index * 0.05, 0.4),
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			<Link
				href={`/structure/${person.id}`}
				className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
				aria-label={`View ${displayName}'s profile`}
			>
				<Card
					className={cn(
						"group border-0 shadow-none bg-transparent rounded-2xl",
						"transition-all duration-300 ease-out cursor-pointer",
						"hover:bg-white hover:shadow-md hover:-translate-y-1",
					)}
				>
					<CardContent className="flex flex-col items-center text-center px-8 py-10 gap-6">

						{/* ── Arc + avatar ─────────────────────────────── */}
						<div className="relative w-[200px] h-[200px]">

							{/* SVG arc — 480 px dash (≈ 286°), gap at bottom-left */}
							<svg
								className="absolute inset-0 w-full h-full"
								viewBox="0 0 200 200"
								aria-hidden="true"
							>
								<circle
									cx="100"
									cy="100"
									r="96"
									fill="none"
									strokeWidth="3.5"
									strokeLinecap="round"
									strokeDasharray="480 123"
									transform="rotate(186, 100, 100)"
									stroke="currentColor"
									className="text-primary-900 group-hover:text-khmer-gold transition-colors duration-300"
								/>
							</svg>

							{/* Photo — inset 12 px inside the arc stroke */}
							<div className="absolute inset-[12px] rounded-full overflow-hidden bg-muted">
								{imageSrc && !errored ? (
									<Image
										src={imageSrc}
										alt={displayName}
										fill
										sizes="176px"
										className="object-cover object-top"
										onError={() => setErrored(true)}
									/>
								) : (
									/* Initials fallback */
									<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-800">
										<span className="text-4xl font-bold text-white tracking-wide select-none">
											{initials}
										</span>
									</div>
								)}
							</div>
						</div>

						{/* ── Text ─────────────────────────────────────── */}
						<div className="space-y-2">
							<p
								className={cn(
									"text-xl font-bold text-gray-900 leading-tight line-clamp-2",
									"transition-colors duration-200 group-hover:text-primary-900",
								)}
							>
								{displayName}
							</p>

							{displayTitle && (
								<p className="text-base text-muted-foreground leading-snug line-clamp-2">
									{displayTitle}
								</p>
							)}

							{/* C6: View Profile affordance */}
							<p className="text-sm font-medium text-khmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-1">
								View Profile &rarr;
							</p>
						</div>

					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
}
