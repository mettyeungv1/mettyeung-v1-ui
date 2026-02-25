"use client";

import { Member } from "@/lib/types/structure";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { normalizeUrl } from "@/lib/utils/image";
import {
	Mail,
	Phone,
	MapPin,
	Calendar,
	ExternalLink,
	Building2,
	Crown,
	Globe,
	User,
	Briefcase,
	Cake,
	Flag,
	Users,
} from "lucide-react";

interface ProfileCardProps {
	person: Member;
}

/* ------------------------------------------------------------------ */
/*  Helper: format date-of-birth                                      */
/* ------------------------------------------------------------------ */
function formatDob(dob: string | undefined): string {
	if (!dob) return "";
	try {
		const d = new Date(dob);
		return d.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} catch {
		return dob;
	}
}

/* ------------------------------------------------------------------ */
/*  Helper: capitalize gender                                         */
/* ------------------------------------------------------------------ */
function formatGender(g: string | undefined): string {
	if (!g) return "";
	return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
}

/* ------------------------------------------------------------------ */
/*  Reused section heading                                            */
/* ------------------------------------------------------------------ */
function SectionLabel({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) {
	return (
		<div className="flex items-center gap-1.5 mb-3">
			<Icon className="w-3.5 h-3.5 text-gray-400" />
			<span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
				{label}
			</span>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Reused contact row                                                */
/* ------------------------------------------------------------------ */
function ContactRow({
	icon: Icon,
	iconBg,
	iconColor,
	children,
	href,
}: {
	icon: React.ElementType;
	iconBg: string;
	iconColor: string;
	children: React.ReactNode;
	href?: string;
}) {
	const Wrapper = href ? "a" : "div";
	const linkProps = href
		? href.startsWith("http")
			? { href, target: "_blank", rel: "noopener noreferrer" }
			: { href }
		: {};

	return (
		<Wrapper
			{...linkProps}
			className="group/row flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-default"
			style={href ? { cursor: "pointer" } : undefined}
		>
			<span
				className={`flex-shrink-0 w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center transition-colors duration-200`}
			>
				<Icon className={`w-4 h-4 ${iconColor}`} />
			</span>
			<span className="text-sm text-gray-700 group-hover/row:text-gray-900 font-medium transition-colors truncate">
				{children}
			</span>
		</Wrapper>
	);
}

/* ================================================================== */
/*  PROFILE CARD                                                      */
/* ================================================================== */
export function ProfileCard({ person }: ProfileCardProps) {
	/* ---------- image ---------- */
	const imageSrc = normalizeUrl(
		person.image ||
			(person as any).avatarUrl ||
			(person as any).avatar_url
	);

	const initials = person.name_en
		? person.name_en
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "?";

	/* ---------- derived flags ---------- */
	const hasContactInfo =
		person.email ||
		person.phone ||
		person.phoneNumber ||
		person.location ||
		person.location_en ||
		person.joinDate ||
		person.joinYear;

	const hasPersonalInfo =
		person.dob || person.gender || person.nationality;

	const hasSocials =
		(person.socialLinks && person.socialLinks.length > 0) ||
		(person.socials && person.socials.length > 0);

	const hasAssociations =
		person.associations && person.associations.length > 0;

	const locationText = person.location_en || person.location || "";
	const phoneText = person.phone || person.phoneNumber || "";

	return (
		<div className="sticky top-24 flex flex-col gap-5 print:static print:gap-3">
			{/* ═══════════════════════════════════════════════════════ */}
			{/*  MAIN CARD                                            */}
			{/* ═══════════════════════════════════════════════════════ */}
			<div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200/60 shadow-lg shadow-gray-200/30 print:shadow-none print:border-gray-300">
				{/* Accent gradient top */}
				<div className="h-1.5 bg-gradient-to-r from-khmer-gold via-amber-400 to-khmer-gold print:h-1 print:bg-khmer-gold" />

				{/* ──── Header ──── */}
				<div className="px-6 pt-8 pb-5 text-center">
					{/* Avatar */}
					<div className="relative inline-block mb-5">
						<Avatar className="w-32 h-32 ring-4 ring-gray-100 shadow-lg print:w-28 print:h-28 print:ring-2">
							<AvatarImage
								src={imageSrc}
								alt={person.name_en}
								className="object-cover"
							/>
							<AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-white text-3xl font-bold tracking-wider">
								{initials}
							</AvatarFallback>
						</Avatar>
						{/* Status indicator — reflects real member status */}
						<span className={`absolute bottom-1.5 right-1.5 w-4 h-4 border-[3px] border-white rounded-full shadow-sm print:hidden ${
							person.status === "active" ? "bg-emerald-500" :
							person.status === "alumni" ? "bg-blue-500" :
							"bg-gray-400"
						}`} />
					</div>

					{/* Name — English */}
					<h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
						{person.name_en || person.name || "Unknown Member"}
					</h1>

					{/* Name — Khmer (if different) */}
					{person.name && person.name !== person.name_en && (
						<p className="text-sm text-gray-400 mt-1 font-medium">
							{person.name}
						</p>
					)}

					{/* Position badge */}
					{(person.position_en || person.title_en) && (
						<div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold tracking-wide uppercase print:bg-khmer-gold">
							<Briefcase className="w-3.5 h-3.5 opacity-70" />
							{person.position_en || person.title_en}
						</div>
					)}

					{/* Subtitle title — only if different from position */}
					{person.title_en &&
						person.title_en !== person.position_en && (
							<p className="text-xs text-gray-500 mt-2.5 font-medium">
								{person.title_en}
							</p>
						)}
				</div>

				{/* ──── Bio ──── */}
				{person.bio && (
					<div className="mx-5 mb-5 px-4 py-3.5 bg-gradient-to-br from-gray-50 to-gray-50/60 rounded-xl border border-gray-100">
						<p className="text-xs text-gray-600 leading-relaxed italic">
							&ldquo;{person.bio}&rdquo;
						</p>
					</div>
				)}

				{/* ──── Associations / Departments ──── */}
				{hasAssociations && (
					<div className="mx-5 mb-5">
						<SectionLabel icon={Building2} label="Affiliations" />
						<div className="space-y-2">
							{person.associations.map((assoc: any, idx: number) => (
								<div
									key={assoc.associationId || idx}
									className="flex items-center gap-3 px-3 py-2.5 bg-amber-50/70 rounded-xl border border-amber-100/80 transition-colors duration-200 hover:bg-amber-50"
								>
									<div className="flex-shrink-0 w-8 h-8 rounded-lg bg-khmer-gold/10 flex items-center justify-center">
										<Building2 className="w-4 h-4 text-khmer-gold" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-semibold text-gray-800 truncate">
											{assoc.name || "Department"}
										</p>
										{assoc.role && (
											<p className="text-[10px] text-gray-500 truncate">
												{assoc.role}
											</p>
										)}
									</div>
									{assoc.isHead && (
										<span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-khmer-gold/15 text-khmer-gold">
											<Crown className="w-2.5 h-2.5" />
											Head
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* ──── Divider ──── */}
				{(hasContactInfo || hasPersonalInfo) && (
					<div className="mx-5">
						<div className="border-t border-gray-100" />
					</div>
				)}

				{/* ──── Contact Info ──── */}
				{hasContactInfo && (
					<div className="px-5 py-4 space-y-0.5">
						<SectionLabel icon={User} label="Contact" />

						{person.email && (
							<ContactRow
								icon={Mail}
								iconBg="bg-blue-50 group-hover/row:bg-blue-100"
								iconColor="text-blue-600"
								href={`mailto:${person.email}`}
							>
								{person.email}
							</ContactRow>
						)}

						{phoneText && (
							<ContactRow
								icon={Phone}
								iconBg="bg-green-50 group-hover/row:bg-green-100"
								iconColor="text-green-600"
								href={`tel:${phoneText}`}
							>
								{phoneText}
							</ContactRow>
						)}

						{locationText && (
							<ContactRow
								icon={MapPin}
								iconBg="bg-rose-50 group-hover/row:bg-rose-100"
								iconColor="text-rose-500"
							>
								{locationText}
							</ContactRow>
						)}

						{(person.joinDate || person.joinYear) && (
							<ContactRow
								icon={Calendar}
								iconBg="bg-purple-50 group-hover/row:bg-purple-100"
								iconColor="text-purple-600"
							>
								Joined {person.joinDate || person.joinYear}
							</ContactRow>
						)}
					</div>
				)}

				{/* ──── Personal Details ──── */}
				{hasPersonalInfo && (
					<>
						{hasContactInfo && (
							<div className="mx-5">
								<div className="border-t border-gray-100" />
							</div>
						)}
						<div className="px-5 py-4 space-y-0.5">
							<SectionLabel icon={Users} label="Personal" />

							{person.dob && (
								<ContactRow
									icon={Cake}
									iconBg="bg-pink-50 group-hover/row:bg-pink-100"
									iconColor="text-pink-500"
								>
									{formatDob(person.dob)}
								</ContactRow>
							)}

							{person.gender && (
								<ContactRow
									icon={User}
									iconBg="bg-indigo-50 group-hover/row:bg-indigo-100"
									iconColor="text-indigo-500"
								>
									{formatGender(person.gender)}
								</ContactRow>
							)}

							{person.nationality && (
								<ContactRow
									icon={Flag}
									iconBg="bg-amber-50 group-hover/row:bg-amber-100"
									iconColor="text-amber-600"
								>
									{person.nationality}
								</ContactRow>
							)}
						</div>
					</>
				)}

				{/* ──── Social Links ──── */}
				{hasSocials && (
					<>
						<div className="mx-5">
							<div className="border-t border-gray-100" />
						</div>
						<div className="px-5 py-4">
							<SectionLabel icon={Globe} label="Social" />
							<div className="flex flex-wrap gap-2">
								{(person.socials || person.socialLinks || []).map(
									(social: any, idx: number) => (
										<a
											key={idx}
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 cursor-pointer"
										>
											<ExternalLink className="w-3 h-3" />
											<span className="capitalize">
												{social.platform}
											</span>
										</a>
									)
								)}
							</div>
						</div>
					</>
				)}

				{/* Bottom spacing */}
				<div className="h-2" />
			</div>
		</div>
	);
}
