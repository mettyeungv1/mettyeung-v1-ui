"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Member } from "@/lib/types/structure";
import { useTranslation } from "@/lib/i18n";
import { normalizeUrl } from "@/lib/utils/image";
import { displayStructureValue, optionalStructureValue } from "@/lib/utils/structure-display";
import { MEDIA_ENDPOINT } from "@/lib/static";
import {
	ArrowLeft,
	BadgeCheck,
	BriefcaseBusiness,
	Building2,
	CalendarDays,
	ChevronRight,
	Download,
	Facebook,
	Globe,
	Instagram,
	Link as LinkIcon,
	Linkedin,
	Loader2,
	Mail,
	MapPin,
	Phone,
	School,
	Twitter,
	Youtube,
} from "lucide-react";

interface PersonDetailClientProps {
	person: Member;
}

type Localized = string | { en?: string | null; km?: string | null } | null | undefined;

function pickLocalized(value: Localized, locale: string, fallback = ""): string {
	if (!value) return fallback;
	if (typeof value === "string") return optionalStructureValue(value) || fallback;
	if (locale === "km") return value.km || value.en || fallback;
	return value.en || value.km || fallback;
}

function formatDisplayDate(value: unknown, locale: string, options: Intl.DateTimeFormatOptions): string | null {
	const raw = optionalStructureValue(value);
	if (!raw) return null;

	const date = new Date(raw);
	if (Number.isNaN(date.getTime())) return raw;

	return date.toLocaleDateString(locale === "km" ? "km-KH" : "en-US", options);
}

function getSocialIcon(platform: string) {
	const p = platform.toLowerCase();
	switch (p) {
		case "facebook":
			return Facebook;
		case "linkedin":
			return Linkedin;
		case "twitter":
		case "x":
			return Twitter;
		case "instagram":
			return Instagram;
		case "youtube":
			return Youtube;
		case "website":
			return Globe;
		default:
			return LinkIcon;
	}
}

function Section({
	title,
	children,
	count,
}: {
	title: string;
	children: React.ReactNode;
	count?: number;
}) {
	return (
		<section className="print:break-inside-avoid">
			<header className="mb-5 flex items-center gap-3">
				<div className="h-px flex-1 bg-gray-200" />
				<h3 className="text-xs font-bold uppercase tracking-[0.16em] text-primary-900">{title}</h3>
				{count !== undefined && count > 0 && (
					<span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-800">{count}</span>
				)}
				<div className="h-px flex-1 bg-gray-200" />
			</header>
			{children}
		</section>
	);
}

function InfoRow({
	label,
	value,
	href,
}: {
	label: string;
	value?: string | null;
	href?: string;
}) {
	const displayValue = displayStructureValue(value);

	const content = (
		<div>
			<p className="text-xs font-medium uppercase tracking-normal text-gray-500">{label}</p>
			<p className="mt-1 break-words text-sm font-medium leading-5 text-gray-900">{displayValue}</p>
		</div>
	);

	if (href) {
		return (
			<a href={href} className="block rounded-md hover:text-primary-900">
				{content}
			</a>
		);
	}

	return content;
}

function DetailTile({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value?: string | null;
}) {
	return (
		<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm shadow-gray-100/60">
			<div className="flex items-start gap-3">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-900">
					<Icon className="h-4 w-4" />
				</div>
				<div className="min-w-0">
					<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
					<p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-900">{displayStructureValue(value)}</p>
				</div>
			</div>
		</div>
	);
}

function SoftPill({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
			{children}
		</span>
	);
}

const emptySkillItems = [{ id: "empty-skill", name: "N/A" }];
const emptyLanguageItems = ["N/A"];
const emptyExperienceItems = [
	{
		id: "empty-experience",
		title: "N/A",
		organization: "N/A",
		description: "N/A",
		startYear: "N/A",
		endYear: "N/A",
	},
];
const emptyEducationItems = [
	{
		id: "empty-education",
		degree: "N/A",
		school: "N/A",
		startYear: "N/A",
		endYear: "N/A",
	},
];
const emptyAssociationItems = [
	{
		id: "empty-association",
		name: "N/A",
		role: "N/A",
		isHead: false,
	},
];

export function PersonDetailClient({ person }: PersonDetailClientProps) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { t, language } = useTranslation();
	const locale = language;

	const handleDownloadPDF = async () => {
		try {
			setIsGenerating(true);
			const { generateMemberPDF } = await import("@/lib/utils/generate-pdf");
			await generateMemberPDF(person, language);
		} catch (error) {
			console.error("Failed to generate PDF:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	const data = useMemo(() => {
		const p = person as any;

		const name = pickLocalized(p.name, locale, p.name_en || "");
		const title = pickLocalized(p.title, locale);
		const location = locale === "km"
			? pickLocalized(p.location, locale, p.location_km || p.location_en || "")
			: pickLocalized(p.location, locale, p.location_en || "");
		const bio = locale === "km"
			? pickLocalized(p.bio, locale, p.bio_km || "")
			: pickLocalized(p.bio, locale);

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
					: {
							id: s.skillId || s.id,
							name: pickLocalized(
								s.skillName || s.name || s.skill?.name,
								locale,
								s.skillId || s.id || ""
							),
						}
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
			.map((lang: any) => pickLocalized(lang.name || lang.language?.name || lang.languageName || lang, locale));

		const rawAvatar = p.image || p.avatarUrl || p.avatar_url || null;
		const fullAvatarUrl =
			rawAvatar && rawAvatar !== "/placeholder.svg"
				? rawAvatar.startsWith("http")
					? normalizeUrl(rawAvatar)
					: normalizeUrl(`${MEDIA_ENDPOINT}/view/${rawAvatar}`)
				: null;

		const dob = formatDisplayDate(p.dob, locale, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const joinDate = p.join_date || p.joinDate;
		const formattedJoinDate = formatDisplayDate(joinDate, locale, {
			year: "numeric",
			month: "long",
		});

		const yearsOfService = p.joinYear || p.join_year
			? new Date().getFullYear() - (p.joinYear || p.join_year)
			: null;

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

	const displayName = displayStructureValue(data.name);
	const initials = displayName
		.split(" ")
		.map((n: string) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const displaySkills = data.skills.length > 0 ? data.skills : emptySkillItems;
	const displayLanguages = data.languages.length > 0 ? data.languages : emptyLanguageItems;
	const displayExperiences = data.experiences.length > 0 ? data.experiences : emptyExperienceItems;
	const displayEducations = data.educations.length > 0 ? data.educations : emptyEducationItems;
	const displayAssociations = data.associations.length > 0 ? data.associations : emptyAssociationItems;

	return (
		<div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_42%,#f8fafc_100%)] pb-24 print:bg-white lg:pb-0">
			<div className="container max-w-6xl pt-24 pb-12 print:pt-4 print:pb-4 lg:pt-28">
				<nav className="mb-5 print:hidden" aria-label={t("common.breadcrumb")}>
					<ol className="flex items-center gap-1.5 text-sm text-gray-500">
						<li>
							<Link href="/structure" className="font-medium transition-colors hover:text-primary-900">
								{t("member.detail.backToOrg")}
							</Link>
						</li>
						<li>
							<ChevronRight className="h-3.5 w-3.5" />
						</li>
						<li className="max-w-[240px] truncate font-medium text-gray-900">{displayName}</li>
					</ol>
				</nav>

				<div className="mb-6 flex items-center justify-between print:hidden">
					<Button variant="ghost" asChild className="-ml-2 gap-2 rounded-full px-3 text-gray-600 hover:bg-white hover:text-primary-900">
						<Link href="/structure">
							<ArrowLeft className="h-4 w-4" />
							<span className="hidden sm:inline">{t("member.detail.back")}</span>
						</Link>
					</Button>

					<Button
						onClick={handleDownloadPDF}
						disabled={isGenerating}
						className="gap-2 rounded-full bg-primary-900 px-5 text-white shadow-sm shadow-primary-900/20 hover:bg-primary-950"
					>
						{isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
						{isGenerating ? t("member.detail.generating") : t("member.detail.downloadCV")}
					</Button>
				</div>

				<div
					id="cv-content"
					className="space-y-6 print:space-y-0"
				>
					<header className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-200/70 print:rounded-none print:border-0 print:shadow-none">
						<div className="h-2 bg-gradient-to-r from-primary-900 via-primary-700 to-khmer-gold" />
						<div className="px-6 py-8 sm:px-8 lg:px-10">
							<div className="flex flex-col gap-7 md:flex-row md:items-start">
							<div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100 ring-4 ring-white shadow-lg shadow-gray-200 sm:h-36 sm:w-36">
								{data.avatarUrl ? (
									<Image
										src={data.avatarUrl}
										alt={displayName}
										fill
										sizes="(max-width: 640px) 128px, 144px"
										className="object-cover object-top"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<span className="text-3xl font-semibold text-gray-500">{initials}</span>
									</div>
								)}
							</div>

							<div className="min-w-0 flex-1">
								<div className="mb-3 flex flex-wrap items-center gap-2">
									{optionalStructureValue(data.memberCode) && <SoftPill>{displayStructureValue(data.memberCode)}</SoftPill>}
									{data.headRole && (
										<span className="inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-900">
											<BadgeCheck className="h-3.5 w-3.5" />
											{t("member.detail.headMember")}
										</span>
									)}
								</div>

								<h1 className="max-w-3xl text-3xl font-bold leading-tight text-gray-950 sm:text-4xl">{displayName}</h1>
								<p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">{displayStructureValue(data.title)}</p>

								<div className="mt-5 flex flex-wrap gap-2 text-sm text-gray-600">
									{data.joinDate && (
										<span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 font-medium">
											<CalendarDays className="h-3.5 w-3.5 text-primary-900" />
											{t("member.detail.since")} {data.joinDate}
										</span>
									)}
									{data.yearsOfService !== null && data.yearsOfService > 0 && (
										<span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 font-medium">
											<BriefcaseBusiness className="h-3.5 w-3.5 text-primary-900" />
											{data.yearsOfService} {data.yearsOfService === 1 ? t("member.detail.year") : t("member.detail.years")}{" "}
											{t("member.detail.ofService")}
										</span>
									)}
								</div>

								<div className="mt-7 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
									<DetailTile icon={Phone} label={t("member.detail.phone")} value={data.phone} />
									<DetailTile icon={Mail} label={t("member.detail.email")} value={data.email} />
									<DetailTile icon={MapPin} label={t("member.detail.location")} value={data.location} />
								</div>

								{data.socials.length > 0 && (
									<div className="mt-6 flex items-center gap-2 print:hidden">
										{data.socials.map((s: any) => {
											const Icon = getSocialIcon(s.platform);
											return (
												<a
													key={s.id || s.platform}
													href={s.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-900"
													aria-label={s.platform}
													title={s.displayText || s.platform}
												>
													<Icon className="h-4 w-4" />
												</a>
											);
										})}
									</div>
								)}
							</div>
							</div>
						</div>
					</header>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
						<aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
							<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none">
								<Section title={t("member.detail.personal")}>
									<div className="space-y-4">
										<InfoRow label={t("member.detail.dateOfBirth")} value={data.dob} />
										<InfoRow label={t("member.detail.nationality")} value={data.nationality} />
										<InfoRow
											label={t("member.detail.gender")}
											value={data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : null}
										/>
										<InfoRow label={t("member.detail.joined")} value={data.joinDate} />
									</div>
								</Section>
							</div>

							<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none">
								<Section title={t("member.detail.skills")} count={displaySkills.length}>
									<div className="flex flex-wrap gap-2">
										{displaySkills.map((s: any) => (
											<SoftPill key={s.id || s.name}>{displayStructureValue(s.name)}</SoftPill>
										))}
									</div>
								</Section>
							</div>

							<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none">
								<Section title={t("member.detail.languages")} count={displayLanguages.length}>
									<div className="flex flex-wrap gap-2">
										{displayLanguages.map((lang: string, idx: number) => (
											<SoftPill key={idx}>{displayStructureValue(lang)}</SoftPill>
										))}
									</div>
								</Section>
							</div>
						</aside>

						<main className="space-y-6 lg:col-span-8">
						<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:rounded-none print:border-0 print:shadow-none sm:p-8">
							<div className="rounded-xl bg-primary-50/60 p-5">
								<p className="text-base leading-8 text-gray-700">{displayStructureValue(data.bio)}</p>
							</div>
						</div>

								<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none sm:p-8">
									<Section title={t("member.detail.experience")} count={displayExperiences.length}>
										<div className="relative space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gray-200">
											{displayExperiences.map((exp: any, index: number) => (
												<article key={exp.id || index} className="relative pl-8 print:break-inside-avoid">
													<span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 rounded-full border-2 border-white bg-primary-900 shadow-sm" />
													<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
														<div className="min-w-0 flex-1">
															<h4 className="text-base font-bold text-gray-950">
																{displayStructureValue(exp.title)}
															</h4>
															<p className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary-900">
																<BriefcaseBusiness className="h-4 w-4" />
																{displayStructureValue(exp.organization)}
															</p>
														</div>
														<p className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
															{displayStructureValue(exp.startYear)} - {displayStructureValue(exp.endYear)}
														</p>
													</div>
													<p className="mt-2 text-sm leading-6 text-gray-600">{displayStructureValue(exp.description)}</p>
												</article>
											))}
										</div>
									</Section>
								</div>

								<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none sm:p-8">
									<Section title={t("member.detail.education")} count={displayEducations.length}>
										<div className="grid gap-4">
											{displayEducations.map((edu: any, index: number) => (
												<article key={edu.id || index} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 print:break-inside-avoid">
													<div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
														<div className="min-w-0 flex-1">
															<h4 className="text-base font-bold text-gray-950">
																{displayStructureValue(edu.degree)}
															</h4>
															<p className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary-900">
																<School className="h-4 w-4" />
																{displayStructureValue(edu.school)}
															</p>
														</div>
														<p className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600">
															{displayStructureValue(edu.startYear)} - {displayStructureValue(edu.endYear)}
														</p>
													</div>
												</article>
											))}
										</div>
									</Section>
								</div>

								<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/70 print:shadow-none sm:p-8">
									<Section title={t("member.detail.organizations")} count={displayAssociations.length}>
										<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
											{displayAssociations.map((assoc: any, idx: number) => (
												<div key={assoc.id || idx} className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 transition-colors hover:bg-white print:break-inside-avoid">
													<div className="flex items-start justify-between gap-3">
														<div className="flex min-w-0 gap-3">
															<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary-900">
																<Building2 className="h-4 w-4" />
															</div>
															<div className="min-w-0">
															<p className="truncate text-sm font-bold text-gray-950">
																{displayStructureValue(assoc.name)}
															</p>
															<p className="mt-1 truncate text-sm text-gray-500">{displayStructureValue(assoc.role)}</p>
															</div>
														</div>
														{assoc.isHead && <SoftPill>{t("member.detail.head")}</SoftPill>}
													</div>
												</div>
											))}
										</div>
									</Section>
								</div>
							</main>
					</div>
				</div>
			</div>

			<div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-gray-200 bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] print:hidden lg:hidden">
				<Button variant="outline" asChild className="flex-1 gap-2 border-gray-200 text-gray-600">
					<Link href="/structure">
						<ArrowLeft className="h-4 w-4" />
						{t("member.detail.back")}
					</Link>
				</Button>
				<Button
					onClick={handleDownloadPDF}
					disabled={isGenerating}
					className="flex-1 gap-2 rounded-lg bg-primary-900 text-white hover:bg-primary-950"
				>
					{isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
					{isGenerating ? t("member.detail.generating") : t("member.detail.downloadCV")}
				</Button>
			</div>
		</div>
	);
}
