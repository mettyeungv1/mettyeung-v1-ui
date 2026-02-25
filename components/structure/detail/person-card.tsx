"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { normalizeUrl } from "@/lib/utils/image";
import { Person } from "@/lib/stores/person-store";
import { MEDIA_ENDPOINT } from "@/lib/static";

interface PersonCardProps {
	person: Person;
	variant?: "compact" | "detailed";
	index: number;
}

/* ------------------------------------------------------------------ */
/*  Helper: resolve image source                                      */
/* ------------------------------------------------------------------ */
function resolveImage(person: Person): string {
	const raw =
		person.image ||
		(person as any).avatarUrl ||
		(person as any).avatar_url;

	if (!raw || raw === "/placeholder.svg") return "/placeholder.svg";
	if (raw.startsWith("http")) return normalizeUrl(raw);
	return normalizeUrl(`${MEDIA_ENDPOINT}/view/${raw}`);
}

/* ------------------------------------------------------------------ */
/*  Helper: initials                                                  */
/* ------------------------------------------------------------------ */
function getInitials(name: string | undefined): string {
	if (!name) return "?";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

/* ================================================================== */
/*  PERSON CARD COMPONENT — Vertical Single-Column Layout             */
/* ================================================================== */
export function PersonCard({
	person,
	variant = "compact",
	index,
}: PersonCardProps) {
	const imageSrc = resolveImage(person);
	const initials = getInitials(person.name_en);

	const department = (person as any).department || "";
	const email = person.email || "";
	const locationText = person.location || (person as any).location_en || "";
	const positionText = person.position_en || (person as any).title_en || "";

	/* ────────────────────────────────────────────────────────────── */
	/*  COMPACT VARIANT — Portrait-focused vertical card             */
	/* ────────────────────────────────────────────────────────────── */
	if (variant === "compact") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.45,
					delay: index * 0.04,
					ease: [0.25, 0.1, 0.25, 1],
				}}
				className="group h-full"
			>
				<Link href={`/structure/${person.id}`} className="block h-full outline-none">
					<Card className="h-full flex flex-col items-center bg-white border-0 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-1.5 ring-1 ring-gray-100/80 hover:ring-khmer-gold/20">
						{/* Top accent line */}
						<div className="w-full h-1 bg-gradient-to-r from-transparent via-khmer-gold/40 to-transparent group-hover:via-khmer-gold transition-all duration-500" />

						<CardContent className="flex flex-col items-center text-center w-full px-6 pt-8 pb-7">
							{/* ── Big rounded portrait ── */}
							<div className="relative mb-5">
								<div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-khmer-gold/20 shadow-lg group-hover:shadow-xl transition-all duration-500">
									<img
										src={imageSrc}
										alt={person.name_en || "Member"}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
										onError={(e) => {
											(e.target as HTMLImageElement).style.display = "none";
											const fallback = (e.target as HTMLImageElement).nextElementSibling;
											if (fallback) (fallback as HTMLElement).style.display = "flex";
										}}
									/>
									<div
										className="w-full h-full bg-gradient-to-br from-khmer-gold to-amber-500 items-center justify-center text-white text-3xl font-bold tracking-wider hidden"
									>
										{initials}
									</div>
								</div>
								{/* Online dot */}
								<span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full shadow-sm" />
							</div>

							{/* ── Name ── */}
							<h3 className="font-bold text-gray-900 text-lg md:text-xl tracking-tight mb-1 group-hover:text-khmer-gold transition-colors duration-200 line-clamp-1">
								{person.name_en || person.name || "Unknown"}
							</h3>

							{/* ── Position ── */}
							{positionText && positionText !== "Member" && (
								<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900/90 text-white rounded-md text-[10px] font-semibold tracking-wider uppercase mt-1 mb-3">
									<Briefcase className="w-2.5 h-2.5 opacity-70" />
									<span className="truncate max-w-[180px]">{positionText}</span>
								</div>
							)}

							{/* ── Department ── */}
							{department && (
								<p className="text-xs text-gray-500 font-medium mb-3 line-clamp-1">
									{department}
								</p>
							)}

							{/* ── Bio excerpt ── */}
							{person.bio && (
								<p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 px-2 max-w-[260px]">
									{person.bio}
								</p>
							)}

							{/* ── Contact hints ── */}
							<div className="flex flex-col items-center gap-1.5 mt-auto w-full">
								{email && (
									<div className="flex items-center gap-1.5 text-[11px] text-gray-400">
										<Mail className="w-3 h-3" />
										<span className="truncate max-w-[200px]">{email}</span>
									</div>
								)}
								{locationText && (
									<div className="flex items-center gap-1.5 text-[11px] text-gray-400">
										<MapPin className="w-3 h-3" />
										<span className="truncate max-w-[200px]">{locationText}</span>
									</div>
								)}
							</div>

							{/* ── View Profile indicator ── */}
							<div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-gray-400 group-hover:text-khmer-gold transition-colors duration-200">
								<span>View Profile</span>
								<ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
							</div>
						</CardContent>
					</Card>
				</Link>
			</motion.div>
		);
	}

	/* ────────────────────────────────────────────────────────────── */
	/*  DETAILED VARIANT — Also vertical, with more data displayed   */
	/* ────────────────────────────────────────────────────────────── */
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay: index * 0.04,
				ease: [0.25, 0.1, 0.25, 1],
			}}
			className="group h-full"
		>
			<Link href={`/structure/${person.id}`} className="block h-full">
				<Card className="h-full flex flex-col items-center relative overflow-hidden bg-white hover:bg-white/95 transition-all duration-400 border border-gray-100 hover:border-khmer-gold/20 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 rounded-2xl cursor-pointer hover:-translate-y-1">
					{/* Top gradient accent */}
					<div className="w-full h-[3px] bg-gradient-to-r from-transparent via-khmer-gold/30 to-transparent group-hover:via-khmer-gold transition-all duration-500" />

					<CardContent className="flex flex-col items-center text-center w-full px-6 pt-7 pb-6">
						{/* ── Round portrait ── */}
						<div className="relative mb-4">
							<div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-[3px] ring-gray-100 group-hover:ring-khmer-gold/20 shadow-md group-hover:shadow-lg transition-all duration-400">
								<img
									src={imageSrc}
									alt={person.name_en || "Member"}
									className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-600 ease-out"
									onError={(e) => {
										(e.target as HTMLImageElement).style.display = "none";
										const fallback = (e.target as HTMLImageElement).nextElementSibling;
										if (fallback) (fallback as HTMLElement).style.display = "flex";
									}}
								/>
								<div
									className="w-full h-full bg-gradient-to-br from-khmer-gold to-amber-500 items-center justify-center text-white text-2xl font-bold tracking-wider hidden"
								>
									{initials}
								</div>
							</div>
						</div>

						{/* ── Name ── */}
						<h3 className="font-bold text-gray-900 text-base md:text-lg mb-0.5 group-hover:text-khmer-gold transition-colors duration-200 truncate max-w-full">
							{person.name_en || person.name || "Unknown"}
						</h3>

						{/* ── Position ── */}
						{positionText && positionText !== "Member" && (
							<p className="text-xs font-semibold text-khmer-gold uppercase tracking-wider mb-2 truncate max-w-full">
								{positionText}
							</p>
						)}

						{/* ── Department ── */}
						{department && (
							<p className="text-[11px] text-gray-500 font-medium mb-3 truncate max-w-full">
								{department}
							</p>
						)}

						{/* ── Bio ── */}
						{person.bio && (
							<p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 px-1">
								{person.bio}
							</p>
						)}

						{/* ── Skills ── */}
						{person?.skills && person.skills.length > 0 && (
							<div className="flex flex-wrap justify-center gap-1.5 mb-3">
								{person.skills.slice(0, 3).map((skill, idx) => (
									<Badge
										key={idx}
										variant="secondary"
										className="bg-gray-100/80 text-gray-600 hover:bg-gray-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border-0 transition-colors"
									>
										{skill}
									</Badge>
								))}
								{person.skills.length > 3 && (
									<Badge
										variant="secondary"
										className="bg-gray-100/80 text-gray-500 text-[10px] font-semibold px-2 py-0.5 rounded-md border-0"
									>
										+{person.skills.length - 3}
									</Badge>
								)}
							</div>
						)}

						{/* ── Contact row ── */}
						{(email || locationText) && (
							<div className="flex flex-col items-center gap-1 mt-auto pt-2 w-full border-t border-gray-50">
								{email && (
									<div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1.5">
										<Mail className="w-3 h-3 flex-shrink-0" />
										<span className="truncate max-w-[200px]">{email}</span>
									</div>
								)}
								{locationText && (
									<div className="flex items-center gap-1.5 text-[10px] text-gray-400">
										<MapPin className="w-3 h-3 flex-shrink-0" />
										<span className="truncate max-w-[200px]">{locationText}</span>
									</div>
								)}
							</div>
						)}

						{/* ── CTA ── */}
						<div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-gray-400 group-hover:text-khmer-gold transition-colors duration-200">
							<span>View Profile</span>
							<ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
						</div>
					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
}
