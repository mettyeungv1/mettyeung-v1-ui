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
import { useTranslation } from "@/lib/i18n";

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
		title_km: string;
		name_en: string;
		name_km: string;
		position_en: string;
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
	const { language } = useTranslation();

	const {
		displayName,
		displayTitle,
		imageSrc,
		initials,
	} = useMemo(() => {
		const typedPerson = person as PersonMediaFields;
		const name = language === 'km' 
			? (typedPerson.name_km || typedPerson.name_en || typedPerson.name || "—")
			: (typedPerson.name_en || typedPerson.name || "—");
			
		const rawTitle = language === 'km'
			? (typedPerson.title_km || typedPerson.title_en || typedPerson.position_en || "")
			: (typedPerson.title_en || typedPerson.position_en || "");

		return {
			displayName: name,
			displayTitle: rawTitle && rawTitle !== "Member" ? rawTitle : "",
			imageSrc: resolveImage(typedPerson),
			initials: getInitials(typedPerson.name_en || typedPerson.name),
		};
	}, [person, language]);

	useEffect(() => {
		setErrored(false);
	}, [imageSrc]);

	const handleImageError = useCallback(() => {
		setErrored(true);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay: Math.min(index * 0.05, 0.3),
				ease: "easeOut",
			}}
			className="h-full"
		>
			<Link
				href={`/structure/${person.id}`}
				className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary-900 rounded-xl"
				aria-label={`View ${displayName}'s profile`}
			>
				<Card
					className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary-200"
				>
					<div className="flex flex-col h-full">
						{/* Image Section - Professional Portrait Style */}
						<div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
							{imageSrc && !errored ? (
								<Image
									src={imageSrc}
									alt={displayName}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
									onError={handleImageError}
								/>
							) : (
								<div className="absolute inset-0 flex items-center justify-center bg-gray-200">
									<span
										className="text-4xl font-semibold text-gray-400"
										aria-hidden="true"
									>
										{initials}
									</span>
								</div>
							)}
							{/* Subtle gradient overlay at bottom of image for blending */}
							<div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</div>

						{/* Info Section - Formal and Clean */}
						<div className="flex flex-col flex-1 p-5 text-center bg-white border-t-4 border-primary-900">
							<h4
								title={displayName}
								className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 uppercase tracking-wide group-hover:text-primary-900 transition-colors"
							>
								{displayName}
							</h4>

							{displayTitle && (
								<p
									title={displayTitle}
									className="text-sm font-medium text-gray-600 line-clamp-2 uppercase tracking-wider"
								>
									{displayTitle}
								</p>
							)}

							<div className="mt-auto pt-4">
								<span className="inline-block px-4 py-1.5 border border-primary-900 text-primary-900 text-xs font-semibold rounded uppercase tracking-widest opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
									View Profile
								</span>
							</div>
						</div>
					</div>
				</Card>
			</Link>
		</motion.div>
	);
}

export const PersonCard = memo(PersonCardComponent);
PersonCard.displayName = "PersonCard";
