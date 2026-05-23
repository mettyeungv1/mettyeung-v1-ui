"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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

type PersonMediaFields = Person &
	Partial<{
		avatarUrl: string;
		avatar_url: string;
		title_en: string;
	}>;

/* ── helpers ─────────────────────────────────────────────────────────── */

function resolveImage(person: PersonMediaFields): string {
	const raw = person.image || person.avatarUrl || person.avatar_url;
	if (!raw || raw === "/placeholder.svg") return "";
	if (raw.startsWith("http")) return normalizeUrl(raw);
	return normalizeUrl(`${MEDIA_ENDPOINT}/view/${raw}`);
}

function getInitials(name?: string): string {
	const normalizedName = name?.trim();
	if (!normalizedName) return "?";

	return normalizedName
		.split(/\s+/)
		.map((n) => n.charAt(0))
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

/* ── component ──────────────────────────────────────────────────────── */

function PersonCardComponent({ person, variant = "compact", index }: PersonCardProps) {
	const [errored, setErrored] = useState(false);

	const {
		displayName,
		displayTitle,
		imageSrc,
		initials,
	} = useMemo(() => {
		const typedPerson = person as PersonMediaFields;
		const name = typedPerson.name_en || typedPerson.name || "—";
		const rawTitle = typedPerson.title_en || typedPerson.position_en || "";

		return {
			displayName: name,
			displayTitle: rawTitle && rawTitle !== "Member" ? rawTitle : "",
			imageSrc: resolveImage(typedPerson),
			initials: getInitials(typedPerson.name_en || typedPerson.name),
		};
	}, [person]);

	useEffect(() => {
		setErrored(false);
	}, [imageSrc]);

	const handleImageError = useCallback(() => {
		setErrored(true);
	}, []);

	const isDetailed = variant === "detailed";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -4 }}
			transition={{
				duration: 0.45,
				delay: Math.min(index * 0.05, 0.4),
				ease: [0.22, 1, 0.36, 1],
			}}
			className="h-full"
		>
			<Link
				href={`/structure/${person.id}`}
				className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
				aria-label={`View ${displayName}'s profile`}
			>
				<Card
					className={cn(
						"h-full overflow-hidden rounded-2xl border border-transparent bg-white/70 shadow-none",
						"cursor-pointer transition-[background-color,border-color,box-shadow] duration-300 ease-out",
						"group-hover:border-primary-900/10 group-hover:bg-[#FAF7F0] group-hover:shadow-[0_18px_45px_rgba(0,77,140,0.10)]",
						"group-focus-visible:border-primary-900/20 group-focus-visible:bg-[#FAF7F0] group-focus-visible:shadow-[0_18px_45px_rgba(0,77,140,0.10)]",
					)}
				>
					<CardContent
						className={cn(
							"flex h-full flex-col items-center px-5 py-7 text-center sm:px-6 md:px-8",
							isDetailed ? "gap-5 sm:gap-6 md:py-9" : "gap-4",
						)}
					>

						{/* ── Arc + avatar ─────────────────────────────── */}
						<div
							className={cn(
								"relative aspect-square w-[clamp(8.75rem,42vw,12.5rem)] shrink-0",
								"transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]",
							)}
						>

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
									className="text-primary-900 transition-colors duration-500 ease-out group-hover:text-[#A87E5A] group-focus-visible:text-[#A87E5A]"
								/>
							</svg>

							<div className="absolute inset-[6%] overflow-hidden rounded-full bg-muted shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] ring-1 ring-black/5">
								{imageSrc && !errored ? (
									<Image
										src={imageSrc}
										alt={displayName}
										fill
										sizes="(max-width: 640px) 140px, (max-width: 1024px) 164px, 176px"
										className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
										onError={handleImageError}
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_32%),linear-gradient(135deg,#003B6D,#005A94)]">
										<span
											className="select-none text-[clamp(2rem,9vw,3rem)] font-bold text-white"
											aria-hidden="true"
										>
											{initials}
										</span>
									</div>
								)}
							</div>
						</div>

						{/* ── Text ─────────────────────────────────────── */}
						<div className="flex min-w-0 flex-1 flex-col items-center justify-start gap-2">
							<p
								title={displayName}
								className={cn(
									"max-w-full text-balance break-words text-lg font-bold leading-tight text-gray-950 sm:text-xl",
									"line-clamp-2 transition-colors duration-200 group-hover:text-primary-900 group-focus-visible:text-primary-900",
								)}
							>
								{displayName}
							</p>

							{displayTitle && (
								<p
									title={displayTitle}
									className="max-w-full text-pretty break-words text-sm leading-snug text-muted-foreground line-clamp-2 sm:text-base"
								>
									{displayTitle}
								</p>
							)}

							<p className="pt-1 text-sm font-semibold text-[#A87E5A] opacity-100 transition-all duration-300 ease-out sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
								View Profile <span aria-hidden="true">&rarr;</span>
							</p>
						</div>

					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
}

export const PersonCard = memo(PersonCardComponent);
PersonCard.displayName = "PersonCard";
