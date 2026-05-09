"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Member } from "@/lib/types/structure";
import { useTranslation } from "@/lib/i18n";

// Reusable Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Layout Components
import { ProfileCard } from "@/components/structure/detail/profile-card";
import { DetailSection } from "@/components/structure/detail/detail-section";

// Icons
import {
	ArrowLeft,
	Star,
	Building2,
	Download,
	Loader2,
	GraduationCap,
	Briefcase,
	FileText,
	Languages,
	ChevronRight,
	CircleCheck,
	CircleMinus,
} from "lucide-react";

interface PersonDetailClientProps {
	person: Member;
}

/* ── Status Badge Component (C10) ── */
function StatusBadge({ status }: { status?: string }) {
	switch (status) {
		case "active":
			return (
				<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
					<CircleCheck className="w-3.5 h-3.5" />
					Active
				</span>
			);
		case "alumni":
			return (
				<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
					<GraduationCap className="w-3.5 h-3.5" />
					Alumni
				</span>
			);
		case "inactive":
			return (
				<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
					<CircleMinus className="w-3.5 h-3.5" />
					Inactive
				</span>
			);
		default:
			return null;
	}
}

export function PersonDetailClient({ person }: PersonDetailClientProps) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { t } = useTranslation();

	/* ---------------------------------------------------------------- */
	/*  PDF Generation                                                   */
	/* ---------------------------------------------------------------- */
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

	/* ---------------------------------------------------------------- */
	/*  Data helpers                                                     */
	/* ---------------------------------------------------------------- */
	const experiences =
		person.experiences && person.experiences.length > 0
			? person.experiences
			: null;

	const educations =
		person.educations && person.educations.length > 0
			? person.educations
			: null;

	const skills =
		person.skills && person.skills.length > 0 ? person.skills : null;

	const associations =
		person.associations && person.associations.length > 0
			? person.associations
			: null;

	const languages =
		person.languages && person.languages.length > 0
			? person.languages
			: null;

	const hasAnySections =
		experiences || educations || skills || associations || languages;

	const displayName = person.name_en || person.name || t("member.detail.unknownMember");

	/* ================================================================ */
	/*  RENDER                                                          */
	/* ================================================================ */
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50 print:bg-white overflow-x-hidden pb-24 lg:pb-0">
			{/* --- Top hero area --- */}
			<section className="relative pt-24 lg:pt-28 pb-12 md:pb-16 bg-gradient-to-br from-khmer-gold/5 via-white to-khmer-gold/3 print:pt-4 print:pb-4 print:bg-white">
				{/* Decorative blobs */}
				<div className="absolute top-0 right-0 w-72 h-72 bg-khmer-gold/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none print:hidden" />
				<div className="absolute bottom-0 left-0 w-56 h-56 bg-khmer-gold/5 rounded-full blur-3xl translate-y-1/3 pointer-events-none print:hidden" />

				<div className="container max-w-6xl relative z-10">
					{/* C9: Breadcrumb navigation */}
					<nav className="mb-6 print:hidden" aria-label="Breadcrumb">
						<ol className="flex items-center gap-1.5 text-sm text-gray-500">
							<li>
								<Link
									href="/structure"
									className="hover:text-khmer-gold transition-colors font-medium"
								>
									{t("member.detail.backToOrg") || "Organization"}
								</Link>
							</li>
							<li>
								<ChevronRight className="w-3.5 h-3.5" />
							</li>
							<li className="text-gray-900 font-medium truncate max-w-[200px]">
								{displayName}
							</li>
						</ol>
					</nav>

					{/* C12: Desktop top bar with back button always visible */}
					<div className="flex items-center justify-between mb-8 print:hidden">
						<Button
							variant="ghost"
							asChild
							className="text-gray-500 hover:text-khmer-gold gap-2 px-3"
							aria-label="Go back to organization page"
						>
							<Link href="/structure">
								<ArrowLeft className="w-4 h-4" />
								<span className="hidden sm:inline">{t("member.detail.back") || "Back"}</span>
							</Link>
						</Button>

						{/* C10: Status badge */}
						<div className="flex items-center gap-3">
							<StatusBadge status={person.status} />

							<Button
								onClick={handleDownloadPDF}
								disabled={isGenerating}
								className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/10 gap-2 px-5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-gray-900/15 disabled:opacity-60"
								aria-label="Download CV as PDF"
							>
								{isGenerating ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Download className="w-4 h-4" />
								)}
								{isGenerating
									? t("member.detail.generating")
									: t("member.detail.downloadCV")}
							</Button>
						</div>
					</div>

					{/* ── CV Content ── */}
					<div
						id="cv-content"
						className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-sm border border-gray-100 print:shadow-none print:border-0 print:p-4 print:gap-4"
					>
						{/* LEFT COLUMN — Profile Card */}
						<div className="lg:col-span-1">
							<ProfileCard person={person} />
						</div>

						{/* RIGHT COLUMN — CV Sections */}
						<div className="lg:col-span-2 space-y-6 print:space-y-4">

							{/* SKILLS */}
							{skills && (
								<DetailSection title={t("member.detail.skills")} icon={Star}>
									<div className="flex flex-wrap gap-2.5">
										{skills.map((skill: string, idx: number) => (
											<Badge
												key={idx}
												variant="secondary"
												className="bg-khmer-gold/8 text-khmer-gold border border-khmer-gold/15 hover:bg-khmer-gold/15 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200"
											>
												{skill}
											</Badge>
										))}
									</div>
								</DetailSection>
							)}

							{/* LANGUAGES */}
							{languages && (
								<DetailSection
									title={t("member.detail.languages")}
									icon={Languages}
									delay={0.05}
								>
									<div className="flex flex-wrap gap-2.5">
										{languages.map((lang: string, idx: number) => (
											<Badge
												key={idx}
												variant="secondary"
												className="bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200"
											>
												{lang}
											</Badge>
										))}
									</div>
								</DetailSection>
							)}

							{/* PROFESSIONAL EXPERIENCE */}
							{experiences && (
								<DetailSection
									title={t("member.detail.experience")}
									icon={Briefcase}
									delay={0.1}
								>
									<div className="space-y-0">
										{[...experiences]
											.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
											.map((exp, index) => {
												const title =
													exp.title?.en || exp.title?.km || t("member.detail.role");
												const org =
													exp.organization?.en ||
													exp.organization?.km ||
													t("member.detail.organization");
												const desc =
													exp.description?.en || exp.description?.km || "";
												const years = `${exp.startYear || "—"} – ${exp.endYear || t("member.detail.present")}`;

												return (
													<div key={index} className="relative group print:break-inside-avoid">
														{index > 0 && (
															<Separator className="my-5 print:my-3" />
														)}
														<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
															<div className="flex-1 min-w-0">
																<h4 className="font-bold text-base text-gray-900 leading-snug group-hover:text-khmer-gold transition-colors duration-200">
																	{title}
																</h4>
																<p className="text-sm font-semibold text-khmer-gold mt-0.5">
																	{org}
																</p>
															</div>
															<Badge
																variant="secondary"
																className="bg-gray-100 text-gray-600 hover:bg-gray-200 text-[11px] font-semibold px-3 py-1 rounded-lg border-0 flex-shrink-0 whitespace-nowrap"
															>
																{years}
															</Badge>
														</div>
														{desc && (
															<p className="text-sm text-gray-600 leading-relaxed mt-1.5">
																{desc}
															</p>
														)}
													</div>
												);
											})}
									</div>
								</DetailSection>
							)}

							{/* EDUCATION */}
							{educations && (
								<DetailSection
									title={t("member.detail.education")}
									icon={GraduationCap}
									delay={0.2}
								>
									<div className="space-y-4">
										{[...educations]
											.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
											.map((edu, index) => {
												const degree =
													edu.degree?.en || edu.degree?.km || t("member.detail.education");
												const school =
													edu.schoolName?.en || edu.schoolName?.km || "";
												const years = `${edu.startYear || "—"} – ${edu.endYear || t("member.detail.present")}`;

												return (
													<div
														key={index}
														className="relative pl-5 border-l-2 border-khmer-gold/40 hover:border-khmer-gold transition-colors duration-200 group print:break-inside-avoid"
													>
														<span className="absolute left-0 top-1 -translate-x-[5px] w-2 h-2 rounded-full bg-khmer-gold ring-2 ring-white" />
														<h4 className="font-bold text-base text-gray-900 leading-snug group-hover:text-khmer-gold transition-colors duration-200">
															{degree}
														</h4>
														<p className="text-sm font-semibold text-khmer-gold mt-0.5">
															{school}
														</p>
														<p className="text-xs text-gray-500 font-medium mt-1">
															{years}
														</p>
													</div>
												);
											})}
									</div>
								</DetailSection>
							)}

							{/* ORGANIZATIONS */}
							{associations && (
								<DetailSection
									title={t("member.detail.organizations")}
									icon={Building2}
									delay={0.3}
								>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{associations.map((assoc: any, idx: number) => (
											<div
												key={assoc.associationId || idx}
												className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-khmer-gold/30 hover:bg-khmer-gold/3 transition-all duration-200 print:break-inside-avoid"
											>
												<div className="flex-shrink-0 w-9 h-9 rounded-xl bg-khmer-gold/10 flex items-center justify-center">
													<Building2 className="w-4 h-4 text-khmer-gold" />
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-semibold text-gray-800 truncate">
														{assoc.name || t("member.detail.organization")}
													</p>
													{assoc.role && (
														<p className="text-xs text-gray-500 truncate">
															{assoc.role}
														</p>
													)}
												</div>
												{assoc.isHead && (
													<Badge className="bg-khmer-gold/15 text-khmer-gold border-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
														{t("member.detail.head")}
													</Badge>
												)}
											</div>
										))}
									</div>
								</DetailSection>
							)}

							{/* C15: Per-section empty states */}
							{!hasAnySections && (
								<div className="space-y-6">
									{!skills && (
										<DetailSection title={t("member.detail.skills")} icon={Star}>
											<p className="text-sm text-gray-400 italic">No skills listed yet.</p>
										</DetailSection>
									)}
									{!experiences && (
										<DetailSection title={t("member.detail.experience")} icon={Briefcase} delay={0.1}>
											<p className="text-sm text-gray-400 italic">No experience records.</p>
										</DetailSection>
									)}
									{!educations && (
										<DetailSection title={t("member.detail.education")} icon={GraduationCap} delay={0.2}>
											<p className="text-sm text-gray-400 italic">No education records.</p>
										</DetailSection>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* C11: Mobile-only fixed bottom action bar with safe bottom padding */}
			<div className="fixed bottom-0 inset-x-0 z-40 lg:hidden print:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
				<Button
					variant="outline"
					asChild
					className="flex-1 gap-2 border-gray-200 text-gray-600 hover:text-khmer-gold hover:border-khmer-gold/40"
					aria-label="Go back to organization page"
				>
					<Link href="/structure">
						<ArrowLeft className="w-4 h-4" />
						{t("member.detail.back")}
					</Link>
				</Button>

				<Button
					onClick={handleDownloadPDF}
					disabled={isGenerating}
					className="flex-1 gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 disabled:opacity-60"
					aria-label="Download CV as PDF"
				>
					{isGenerating ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Download className="w-4 h-4" />
					)}
					{isGenerating
						? t("member.detail.generating")
						: t("member.detail.downloadCV")}
				</Button>
			</div>
		</div>
	);
}
