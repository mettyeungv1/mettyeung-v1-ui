"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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
		phoneNumber: string;
		location_en: string;
		associations: Array<{
			name?: string;
			role?: string;
			isHead?: boolean;
		}>;
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
	const isDetailed = variant === "detailed";

	const {
		displayName,
		displayTitle,
		displayEmail,
		displayPhone,
		displayLocation,
		isHead,
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

		const primaryAssociation = typedPerson.associations?.[0];
		return {
			displayName: name,
			displayTitle: rawTitle && rawTitle !== "Member" ? rawTitle : "",
			displayEmail: typedPerson.email || "",
			displayPhone: typedPerson.phone || typedPerson.phoneNumber || "",
			displayLocation: typedPerson.location || typedPerson.location_en || "",
			isHead: Boolean(primaryAssociation?.isHead),
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
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.25,
				delay: Math.min(index * 0.03, 0.18),
				ease: "easeOut",
			}}
			className="h-full"
		>
			<Link
				href={`/structure/${person.id}`}
				className="group block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2"
				aria-label={`View ${displayName}'s profile`}
			>
				<Card
					className="h-full rounded-lg border border-gray-200 bg-white shadow-none transition-colors duration-150 group-hover:border-gray-300 group-hover:bg-gray-50"
				>
					<div className="flex h-full items-start gap-4 p-4 sm:p-5">
						<div
							className={`relative shrink-0 overflow-hidden rounded-xl bg-gray-100 ${
								isDetailed ? "h-20 w-20" : "h-16 w-16"
							}`}
						>
							{imageSrc && !errored ? (
								<Image
									src={imageSrc}
									alt={displayName}
									fill
									sizes={isDetailed ? "80px" : "64px"}
									className="object-cover object-top"
									onError={handleImageError}
								/>
							) : (
								<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
									<span
										className="text-base font-semibold text-gray-500"
										aria-hidden="true"
									>
										{initials}
									</span>
								</div>
							)}
						</div>

						<div className="min-w-0 flex-1">
							<h4
								title={displayName}
								className="line-clamp-1 text-sm font-semibold leading-6 text-gray-900 transition-colors group-hover:text-primary-900"
							>
								{displayName}
							</h4>

							{displayTitle && (
								<p
									title={displayTitle}
									className="mt-0.5 line-clamp-2 text-sm leading-5 text-gray-500"
								>
									{displayTitle}
								</p>
							)}

							{(displayPhone || displayEmail) && (
								<div className="mt-4 space-y-1">
									{displayPhone && (
										<p className="line-clamp-1 text-xs leading-5 text-gray-700">
											{displayPhone}
										</p>
									)}
									{displayEmail && (
										<p className="line-clamp-1 text-xs leading-5 text-gray-700">
											{displayEmail}
										</p>
									)}
								</div>
							)}

							{displayLocation && (
								<p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
									{displayLocation}
								</p>
							)}

							{isHead && (
								<div className="mt-3">
									<span className="inline-flex rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-800">
										Head
									</span>
								</div>
							)}
						</div>
					</div>
				</Card>
			</Link>
		</motion.div>
	);
}

export const PersonCard = memo(PersonCardComponent);
PersonCard.displayName = "PersonCard";
