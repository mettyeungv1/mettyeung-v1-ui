"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Person } from "@/lib/stores/person-store";
import { useTranslation } from "@/lib/i18n";
import { displayStructureValue, optionalStructureValue } from "@/lib/utils/structure-display";

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
	// Image URLs are pre-normalized server-side; use as-is.
	return raw;
}

function getInitials(name?: string): string {
	const normalizedName = name?.trim();
	if (!normalizedName) return "NA";

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
			? (typedPerson.name_km || typedPerson.name_en || typedPerson.name)
			: (typedPerson.name_en || typedPerson.name);
			
		const rawTitle = language === 'km'
			? (typedPerson.title_km || typedPerson.title_en || typedPerson.position_en || "")
			: (typedPerson.title_en || typedPerson.position_en || "");

		const primaryAssociation = typedPerson.associations?.[0];
		return {
			displayName: displayStructureValue(name),
			displayTitle: rawTitle === "Member" ? displayStructureValue("") : displayStructureValue(rawTitle),
			displayEmail: displayStructureValue(typedPerson.email),
			displayPhone: displayStructureValue(typedPerson.phone || typedPerson.phoneNumber),
			displayLocation: displayStructureValue(typedPerson.location || typedPerson.location_en),
			isHead: Boolean(primaryAssociation?.isHead),
			imageSrc: resolveImage(typedPerson),
			initials: getInitials(optionalStructureValue(typedPerson.name_en || typedPerson.name)),
		};
	}, [person, language]);

	useEffect(() => {
		setErrored(false);
	}, [imageSrc]);

	const handleImageError = useCallback(() => {
		setErrored(true);
	}, []);

	return (
		<div
			className="person-card-enter h-full"
			style={{ animationDelay: `${Math.min(index * 30, 180)}ms` }}
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

							<p
								title={displayTitle}
								className="mt-0.5 line-clamp-2 text-sm leading-5 text-gray-500"
							>
								{displayTitle}
							</p>

							<div className="mt-4 space-y-1">
								<p className="line-clamp-1 text-xs leading-5 text-gray-700">
									{displayPhone}
								</p>
								<p className="line-clamp-1 text-xs leading-5 text-gray-700">
									{displayEmail}
								</p>
							</div>

							<p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
								{displayLocation}
							</p>

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
		</div>
	);
}

export const PersonCard = memo(PersonCardComponent);
PersonCard.displayName = "PersonCard";
