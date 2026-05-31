"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { Member } from "@/lib/types/structure";
import { useTranslation } from "@/lib/i18n";
import { normalizeUrl } from "@/lib/utils/image";
import { MEDIA_ENDPOINT } from "@/lib/static";

// Reusable Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Icons
import {
	ArrowLeft,
	Star,
	Building2,
	Download,
	Loader2,
	GraduationCap,
	Briefcase,
	Languages,
	ChevronRight,
	CircleCheck,
	CircleMinus,
	Mail,
	Phone,
	MapPin,
	Calendar,
	User,
	Globe,
	Facebook,
	Linkedin,
	Twitter,
	Instagram,
	Youtube,
	Link as LinkIcon,
	Award,
	Hash,
	Quote,
	Sparkles,
	BadgeCheck,
} from "lucide-react";

interface PersonDetailClientProps {
	person: Member;
}

/* ============================================================== */
/*  Localized text helper                                          */
/* ============================================================== */
type Localized = string | { en?: string | null; km?: string | null } | null | undefined;

function pickLocalized(value: Localized, locale: string, fallback = ""): string {
	if (!value) return fallback;
	if (typeof value === "string") return value;
	if (locale === "km") return value.km || value.en || fallback;
	return value.en || value.km || fallback;
}

/* ============================================================== */
/*  Status Badge                                                   */
/* ============================================================== */
function StatusBadge({ status, variant = "light" }: { status?: string; variant?: "light" | "dark" }) {
	const lightConfig: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
		active: { label: "Active", icon: CircleCheck, classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
		alumni: { label: "Alumni", icon: GraduationCap, classes: "bg-blue-50 text-blue-700 border-blue-200" },
		inactive: { label: "Inactive", icon: CircleMinus, classes: "bg-gray-50 text-gray-600 border-gray-200" },
	};
	const darkConfig: Record<string, { label: string; icon: React.ElementType; classes: string }> = {
		active: { label: "Active", icon: CircleCheck, classes: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30 backdrop-blur" },
		alumni: { label: "Alumni", icon: GraduationCap, classes: "bg-blue-500/15 text-blue-300 border-blue-400/30 backdrop-blur" },
		inactive: { label: "Inactive", icon: CircleMinus, classes: "bg-white/10 text-gray-300 border-white/20 backdrop-blur" },
	};
	const config = variant === "dark" ? darkConfig : lightConfig;
	const c = status ? config[status] : null;
	if (!c) return null;
	const Icon = c.icon;
	return (
		<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.classes}`}>
			<Icon className="w-3.5 h-3.5" />
			{c.label}
		</span>
	);
}

/* ============================================================== */
/*  Social Icon resolver                                           */
/* ============================================================== */
function getSocialIcon(platform: string) {
	const p = platform.toLowerCase();
	switch (p) {
		case "facebook": return Facebook;
		case "linkedin": return Linkedin;
		case "twitter":
		case "x": return Twitter;
		case "instagram": return Instagram;
		case "youtube": return Youtube;
		case "website": return Globe;
		default: return LinkIcon;
	}
}

/* ============================================================== */
/*  Section wrapper                                                */
/* ============================================================== */
function Section({
	title,
	icon: Icon,
	children,
	count,
}: {
	title: string;
	icon: React.ElementType;
	children: React.ReactNode;
	count?: number;
}) {
	return (
		<section className="print:break-inside-avoid">
			<header className="flex items-center gap-2.5 mb-5">
				<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-900/10">
					<Icon className="w-4 h-4 text-primary-900" />
				</div>
				<h3 className="text-base font-bold text-gray-900 tracking-tight uppercase">{title}</h3>
				{count !== undefined && count > 0 && (
					<span className="text-xs font-semibold text-gray-400 ml-1">({count})</span>
				)}
				<div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-2" />
			</header>
			{children}
		</section>
	);
}

/* ============================================================== */
/*  Info Row                                                       */
/* ============================================================== */
function InfoRow({
	icon: Icon,
	label,
	value,
	href,
}: {
	icon: React.ElementType;
	label: string;
	value?: string | null;
	href?: string;
}) {
	if (!value) return null;
	const content = (
		<div className="flex items-start gap-3 group">
			<div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary-900/10 flex items-center justify-center transition-colors">
				<Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-900 transition-colors" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
				<p className="text-sm text-gray-800 font-medium break-words">{value}</p>
			</div>
		</div>
	);
	if (href) return <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>;
	return content;
}

/* ============================================================== */
/*  MAIN COMPONENT                                                 */
/* ============================================================== */
export function PersonDetailClient({ person }: PersonDetailClientProps) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { t, locale = "en" } = useTranslation() as any;

	const handleDownloadPDF = async () => {
		try {
			setIsGenerating(true);
			const { generateMemberPDF } = await import("@/lib/utils/generate-pdf");
			await generateMemberPDF(person);
		} catch (error) {
			console.error("Failed to generate PDF:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	/* ---------- Normalize data from API shape ---------- */
	const data = useMemo(() => {
		const p = person as any;

		const name = pickLocalized(p.name, locale, p.name_en || "Unknown Member");
		const title = pickLocalized(p.title, locale);
		const location = pickLocalized(p.location, locale);
		const bio = pickLocalized(p.bio, locale);

		const educations = (p.personalEducations || p.educations || [])
			.slice()
			.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
			.map((e: any) => ({
				id: e.id,
				school: pickLocalized(e.schoolName, locale, e.school_name || ""),
				degree: pickLocalized(e.degree, locale),
				startYear: e.start_year ?? e.startYear,
				endYear: e.end_year ?? e.endYear,
			}));

		const experiences = (p.personalExperiences || p.experiences || [])
			.slice()
			.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
			.map((x: any) => ({
				id: x.id,
				title: pickLocalized(x.title, locale),
				organization: pickLocalized(x.organization, locale),
				description: pickLocalized(x.description, locale),
				startYear: x.start_year ?? x.startYear,
				endYear: x.end_year ?? x.endYear,
			}));

		const skills = (p.memberSkills || p.skills || [])
			.slice()
			.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
			.map((s: any) =>
				typeof s === "string"
					? { id: s, name: s }
					: { id: s.skillId || s.id, name: pickLocalized(s.skillName || s.name || s.skill?.name, locale, s.skillId || s.id || "") }
			);

		const associations = (p.associationMembers || p.associations || []).map((a: any) => ({
			id: a.associationId || a.id,
			name: pickLocalized(a.name || a.association?.name, locale, "Organization"),
			role: pickLocalized(a.role, locale),
			isHead: a.isHead ?? a.is_head,
			order: a.order ?? 0,
		}));

		const socials = (p.socials || []).map((s: any) => ({
			id: s.id,
			platform: s.platform,
			url: s.url,
			displayText: s.display_text || s.displayText,
		}));

		const languages = (p.memberLanguages || p.languages || [])
			.map((lang: any) => pickLocalized(lang.name || lang.language?.name || lang.languageName || lang, locale))
			.filter(Boolean);

		const rawAvatar = p.image || p.avatarUrl || p.avatar_url || null;
		const fullAvatarUrl =
			rawAvatar && rawAvatar !== "/placeholder.svg"
				? rawAvatar.startsWith("http")
					? normalizeUrl(rawAvatar)
					: normalizeUrl(`${MEDIA_ENDPOINT}/view/${rawAvatar}`)
				: null;

		const dob = p.dob ? new Date(p.dob).toLocaleDateString(locale === "km" ? "km-KH" : "en-US", { year: "numeric", month: "long", day: "numeric" }) : null;
		const joinDate = p.join_date || p.joinDate;
		const formattedJoinDate = joinDate
			? new Date(joinDate).toLocaleDateString(locale === "km" ? "km-KH" : "en-US", { year: "numeric", month: "long" })
			: null;

		// Years of service
		const yearsOfService = p.joinYear || p.join_year
			? new Date().getFullYear() - (p.joinYear || p.join_year)
			: null;

		// Lead/head role
		const headRole = (p.associationMembers || []).find((a: any) => a.isHead ?? a.is_head);

		return {
			id: p.id,
			name,
			email: p.email,
			phone: p.phoneNumber || p.phone_number,
			gender: p.gender,
			nationality: p.nationality,
			dob,
			joinDate: formattedJoinDate,
			joinYear: p.joinYear || p.join_year,
			yearsOfService,
			memberCode: p.memberCode || p.member_code,
			status: p.status,
			avatarUrl: fullAvatarUrl,
			title,
			location,
			bio,
			educations,
			experiences,
			skills,
			associations,
			socials,
			languages,
			headRole,
		};
	}, [person, locale]);

	const displayName = data.name || t("member.detail.unknownMember") || "Unknown Member";
	const initials = displayName
		.split(" ")
		.map((n: string) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const hasContent =
		data.experiences.length > 0 ||
		data.educations.length > 0 ||
		data.skills.length > 0 ||
		data.associations.length > 0 ||
		data.languages.length > 0;

	/* ================================================================ */
	/*  RENDER                                                          */
	/* ================================================================ */
	return (
		<div className="min-h-screen bg-gradient-to-b from-[#F4EFE3]/30 via-[#FAF7F0]/50 to-white print:bg-white overflow-x-hidden pb-24 lg:pb-0">
			<div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-br from-primary-900/10 via-[#D4B49A]/15 to-transparent pointer-events-none print:hidden" />

			<div className="relative z-10 container max-w-6xl pt-24 lg:pt-28 pb-12 print:pt-4 print:pb-4">
				{/* Breadcrumb */}
				<nav className="mb-4 print:hidden" aria-label="Breadcrumb">
					<ol className="flex items-center gap-1.5 text-sm text-gray-500">
						<li>
							<Link href="/structure" className="hover:text-primary-900 transition-colors font-medium">
								{t("member.detail.backToOrg") || "Organization"}
							</Link>
						</li>
						<li><ChevronRight className="w-3.5 h-3.5" /></li>
						<li className="text-gray-900 font-medium truncate max-w-[240px]">{displayName}</li>
					</ol>
				</nav>

				{/* Top action bar */}
				<div className="flex items-center justify-between mb-6 print:hidden">
					<Button variant="ghost" asChild className="text-gray-600 hover:text-primary-900 gap-2 px-3 -ml-2">
						<Link href="/structure">
							<ArrowLeft className="w-4 h-4" />
							<span className="hidden sm:inline">{t("member.detail.back") || "Back"}</span>
						</Link>
					</Button>

					<div className="flex items-center gap-3">
						<Button
							onClick={handleDownloadPDF}
							disabled={isGenerating}
							className="bg-primary-900 hover:bg-primary-950 text-white shadow-lg shadow-primary-900/20 gap-2 px-5 rounded-xl transition-all duration-200 hover:shadow-xl"
						>
							{isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
							{isGenerating ? t("member.detail.generating") || "Generating..." : t("member.detail.downloadCV") || "Download CV"}
						</Button>
					</div>
				</div>

				{/* ============ CV CARD ============ */}
				<div
					id="cv-content"
					className="bg-white rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-100 overflow-hidden print:shadow-none print:border-0 print:rounded-none"
				>
					{/* ╔══════════════════════════════════════════════════════════╗
					    ║                   IMPROVED COVER                          ║
					    ╚══════════════════════════════════════════════════════════╝ */}
					<div className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 overflow-hidden print:bg-primary-900">
						{/* Layer 1: Subtle dot grid pattern */}
						<div
							className="absolute inset-0 opacity-[0.08] print:hidden"
							style={{
								backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
							}}
						/>

						{/* Layer 2: Glow orbs */}
						<div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-400/25 rounded-full blur-3xl pointer-events-none print:hidden" />
						<div className="absolute -bottom-40 -left-20 w-96 h-96 bg-[#A87E5A]/20 rounded-full blur-3xl pointer-events-none print:hidden" />

						{/* Layer 3: Light accent line (top) */}
						<div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent print:hidden" />
						<div className="absolute top-1.5 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-300/20 to-transparent print:hidden" />

						{/* Layer 4: Corner ornaments (top-left & top-right) */}
						<div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary-300/30 rounded-tl-lg print:hidden" />
						<div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-primary-300/30 rounded-tr-lg print:hidden" />

						{/* ── Cover content ── */}
						<div className="relative px-6 sm:px-10 lg:px-12 py-12 lg:py-14">
							<div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
								{/* LEFT: Avatar */}
								<div className="relative flex-shrink-0 mx-auto lg:mx-0">
									{/* Ring accent */}
									<div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary-300/40 via-primary-300/10 to-transparent blur-md print:hidden" />
									<div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-primary-300/30 to-primary-300/10 p-[3px] shadow-2xl shadow-black/30">
										<div className="w-full h-full rounded-[20px] bg-primary-950 p-1">
											{data.avatarUrl ? (
												<img
													src={data.avatarUrl}
													alt={displayName}
													className="w-full h-full object-cover rounded-2xl"
												/>
											) : (
												<div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-300/30 to-primary-300/10 flex items-center justify-center">
													<span className="text-4xl sm:text-5xl font-bold text-primary-200">{initials}</span>
												</div>
											)}
										</div>
									</div>
									{/* Status indicator */}
									{data.status === "active" && (
										<div className="absolute -bottom-1 -right-1 flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 ring-4 ring-primary-950 print:hidden">
											<BadgeCheck className="w-5 h-5 text-white" />
										</div>
									)}
								</div>

								{/* RIGHT: Info */}
								<div className="flex-1 min-w-0 text-center lg:text-left">
									{/* Top pills row: code + status + head role */}
									<div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
										{data.memberCode && (
											<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-[#D4B49A]/15 text-[#E8D5B5] border border-[#D4B49A]/30 backdrop-blur">
												<Hash className="w-3 h-3" />
												{data.memberCode}
											</span>
										)}
										<StatusBadge status={data.status} variant="dark" />
										{data.headRole && (
											<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-accent-400/15 text-accent-300 border border-accent-400/30 backdrop-blur">
												<Sparkles className="w-3 h-3" />
												Head Member
											</span>
										)}
									</div>

									{/* Name */}
									<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
										{displayName}
									</h1>

									{/* Title with accent underline */}
									{data.title && (
										<div className="mt-3 inline-block">
											<p className="text-lg sm:text-xl text-[#E8D5B5] font-medium tracking-wide">{data.title}</p>
											<div className="mt-2 h-px w-20 bg-gradient-to-r from-[#D4B49A] via-[#D4B49A]/50 to-transparent mx-auto lg:mx-0" />
										</div>
									)}

									{/* Meta row: location + join + years */}
									<div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-primary-100/80">
										{data.location && (
											<span className="inline-flex items-center gap-1.5">
												<MapPin className="w-3.5 h-3.5 text-primary-300/80" />
												{data.location}
											</span>
										)}
										{data.joinDate && (
											<span className="inline-flex items-center gap-1.5">
												<Calendar className="w-3.5 h-3.5 text-primary-300/80" />
												Since {data.joinDate}
											</span>
										)}
										{data.yearsOfService !== null && data.yearsOfService > 0 && (
											<span className="inline-flex items-center gap-1.5">
												<Award className="w-3.5 h-3.5 text-primary-300/80" />
												{data.yearsOfService} {data.yearsOfService === 1 ? "year" : "years"} of service
											</span>
										)}
									</div>

									{/* Socials */}
									{data.socials.length > 0 && (
										<div className="mt-6 flex items-center justify-center lg:justify-start gap-2 print:hidden">
											{data.socials.map((s: any) => {
												const Icon = getSocialIcon(s.platform);
												return (
													<a
														key={s.id || s.platform}
														href={s.url}
														target="_blank"
														rel="noopener noreferrer"
														className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary-300 hover:text-primary-950 text-primary-100 border border-white/10 hover:border-primary-300 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 backdrop-blur"
														aria-label={s.platform}
														title={s.displayText || s.platform}
													>
														<Icon className="w-4 h-4" />
													</a>
												);
											})}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Bottom accent divider */}
						<div className="relative h-px bg-gradient-to-r from-transparent via-[#D4B49A] to-transparent print:hidden" />
					</div>

					{/* ── BODY ── */}
					<div className="relative px-6 sm:px-10 pt-10 pb-10">
						{/* Bio quote */}
						{data.bio && (
							<div className="mb-10 relative pl-6 border-l border-[#D4B49A]">
								<Quote className="absolute -left-3 top-0 w-5 h-5 text-[#A87E5A] bg-white" />
								<p className="text-base text-gray-700 leading-relaxed italic font-light">{data.bio}</p>
							</div>
						)}

						{/* ── 2-COLUMN GRID ── */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
							{/* LEFT — Sidebar */}
							<aside className="lg:col-span-4 space-y-8 print:space-y-5">
								<Section title={t("member.detail.contact") || "Contact"} icon={User}>
									<div className="space-y-4">
										<InfoRow icon={Mail} label="Email" value={data.email} href={data.email ? `mailto:${data.email}` : undefined} />
										<InfoRow icon={Phone} label="Phone" value={data.phone} href={data.phone ? `tel:${data.phone}` : undefined} />
										<InfoRow icon={MapPin} label="Location" value={data.location} />
									</div>
								</Section>

								{(data.dob || data.nationality || data.gender || data.joinDate) && (
									<Section title={t("member.detail.personal") || "Personal"} icon={Award}>
										<div className="space-y-4">
											<InfoRow icon={Calendar} label="Date of Birth" value={data.dob} />
											<InfoRow icon={Globe} label="Nationality" value={data.nationality} />
											<InfoRow icon={User} label="Gender" value={data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : null} />
											<InfoRow icon={Briefcase} label="Joined" value={data.joinDate} />
										</div>
									</Section>
								)}

								{data.skills.length > 0 && (
									<Section title={t("member.detail.skills") || "Skills"} icon={Star} count={data.skills.length}>
										<div className="flex flex-wrap gap-2">
											{data.skills.map((s: any) => (
												<Badge
													key={s.id}
													variant="secondary"
													className="bg-primary-50 text-primary-800 border border-primary-100 hover:bg-primary-100 hover:border-primary-200 px-3 py-1.5 text-xs font-semibold rounded-md tracking-wide transition-colors"
												>
													{s.name}
												</Badge>
											))}
										</div>
									</Section>
								)}

								{data.languages.length > 0 && (
									<Section title={t("member.detail.languages") || "Languages"} icon={Languages} count={data.languages.length}>
										<div className="flex flex-wrap gap-2">
											{data.languages.map((lang: string, idx: number) => (
												<Badge
													key={idx}
													variant="secondary"
													className="bg-[#FAF7F0] text-[#8C6749] border border-[#D4B49A]/40 hover:border-[#D4B49A] px-3 py-1.5 text-xs font-semibold rounded-md tracking-wide transition-colors"
												>
													{lang}
												</Badge>
											))}
										</div>
									</Section>
								)}
							</aside>

							{/* RIGHT — Main */}
							<main className="lg:col-span-8 space-y-10 print:space-y-6">
								{data.experiences.length > 0 && (
									<Section title={t("member.detail.experience") || "Professional Experience"} icon={Briefcase} count={data.experiences.length}>
										<div className="space-y-6">
											{data.experiences.map((exp: any, index: number) => (
												<article
													key={exp.id || index}
													className="relative pl-6 border-l-2 border-gray-100 hover:border-primary-900 transition-colors duration-300 group print:break-inside-avoid"
												>
													<span className="absolute left-0 top-1.5 -translate-x-[5px] w-2 h-2 rounded-full bg-gray-300 group-hover:bg-primary-900 transition-colors ring-4 ring-white" />
													<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1.5">
														<div className="flex-1 min-w-0">
															<h4 className="font-bold text-base text-gray-900 leading-snug">
																{exp.title || t("member.detail.role") || "Role"}
															</h4>
															<p className="text-sm font-semibold text-primary-900 mt-0.5">
																{exp.organization || t("member.detail.organization") || "Organization"}
															</p>
														</div>
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-md border-0 flex-shrink-0 whitespace-nowrap"
														>
															{exp.startYear || "—"} – {exp.endYear || t("member.detail.present") || "Present"}
														</Badge>
													</div>
													{exp.description && (
														<p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
													)}
												</article>
											))}
										</div>
									</Section>
								)}

								{data.educations.length > 0 && (
									<Section title={t("member.detail.education") || "Education"} icon={GraduationCap} count={data.educations.length}>
										<div className="space-y-5">
											{data.educations.map((edu: any, index: number) => (
												<article
													key={edu.id || index}
													className="relative pl-6 border-l-2 border-gray-100 hover:border-primary-900 transition-colors duration-300 group print:break-inside-avoid"
												>
													<span className="absolute left-0 top-1.5 -translate-x-[5px] w-2 h-2 rounded-full bg-gray-300 group-hover:bg-primary-900 transition-colors ring-4 ring-white" />
													<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
														<div className="flex-1 min-w-0">
															<h4 className="font-bold text-base text-gray-900 leading-snug">
																{edu.degree || t("member.detail.education") || "Degree"}
															</h4>
															<p className="text-sm font-semibold text-primary-900 mt-0.5">{edu.school}</p>
														</div>
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-md border-0 flex-shrink-0 whitespace-nowrap"
														>
															{edu.startYear || "—"} – {edu.endYear || t("member.detail.present") || "Present"}
														</Badge>
													</div>
												</article>
											))}
										</div>
									</Section>
								)}

								{data.associations.length > 0 && (
									<Section title={t("member.detail.organizations") || "Organizations"} icon={Building2} count={data.associations.length}>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											{data.associations.map((assoc: any, idx: number) => (
												<div
													key={assoc.id || idx}
													className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-900/30 hover:bg-primary-900/5 transition-all duration-200 print:break-inside-avoid"
												>
													<div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-900/10 flex items-center justify-center">
														<Building2 className="w-4 h-4 text-primary-900" />
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-semibold text-gray-900 truncate">
															{assoc.name || t("member.detail.organization") || "Organization"}
														</p>
														{assoc.role && (
															<p className="text-xs text-gray-500 truncate mt-0.5">{assoc.role}</p>
														)}
													</div>
													{assoc.isHead && (
														<Badge className="bg-primary-900 text-white border-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex-shrink-0">
															Head
														</Badge>
													)}
												</div>
											))}
										</div>
									</Section>
								)}

								{!hasContent && (
									<div className="text-center py-12 text-gray-400">
										<FileTextEmpty />
										<p className="mt-3 text-sm">
											{t("member.detail.noContent") || "No additional information available."}
										</p>
									</div>
								)}
							</main>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile bottom action bar */}
			<div className="fixed bottom-0 inset-x-0 z-40 lg:hidden print:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
				<Button variant="outline" asChild className="flex-1 gap-2 border-gray-200 text-gray-600">
					<Link href="/structure">
						<ArrowLeft className="w-4 h-4" />
						{t("member.detail.back") || "Back"}
					</Link>
				</Button>
				<Button
					onClick={handleDownloadPDF}
					disabled={isGenerating}
					className="flex-1 gap-2 bg-primary-900 hover:bg-primary-950 text-white rounded-xl"
				>
					{isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
					{isGenerating ? t("member.detail.generating") || "Generating..." : t("member.detail.downloadCV") || "Download CV"}
				</Button>
			</div>
		</div>
	);
}

function FileTextEmpty() {
	return (
		<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100">
			<User className="w-6 h-6 text-gray-300" />
		</div>
	);
}
