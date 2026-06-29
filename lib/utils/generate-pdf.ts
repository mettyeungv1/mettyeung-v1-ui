import { Member } from "@/lib/types/structure";
import { normalizeUrl } from "@/lib/utils/image";
import { displayStructureValue, optionalStructureValue } from "@/lib/utils/structure-display";

type LanguageCode = "en" | "km" | string;
type LocalizedValue = string | number | { en?: string | null; km?: string | null } | null | undefined;

const PAPER_WIDTH = 794;
const EMPTY = "N/A";

type CvEducation = {
	degree: string;
	school: string;
	period: string;
};

type CvExperience = {
	title: string;
	organization: string;
	description: string;
	period: string;
};

type CvAssociation = {
	name: string;
	role: string;
};

type CvSocial = {
	platform: string;
	url: string;
};

function escapeHtml(value: unknown): string {
	return displayStructureValue(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function pickLocalized(value: LocalizedValue, language: LanguageCode, fallback: LocalizedValue = ""): string {
	if (typeof value === "number") return String(value);
	if (typeof value === "string") {
		const text = optionalStructureValue(value);
		if (text) return text;
		if (fallback === value) return "";
		return pickLocalized(fallback, language, "");
	}
	if (value && typeof value === "object") {
		const primary = language === "km" ? value.km : value.en;
		const secondary = language === "km" ? value.en : value.km;
		return optionalStructureValue(primary) || optionalStructureValue(secondary) || pickLocalized(fallback, language, "");
	}
	return fallback === value ? "" : pickLocalized(fallback, language, "");
}

function firstValue(language: LanguageCode, ...values: LocalizedValue[]): string {
	for (const value of values) {
		const picked = pickLocalized(value, language);
		if (optionalStructureValue(picked)) return picked;
	}
	return EMPTY;
}

function formatDate(value: unknown, language: LanguageCode, options: Intl.DateTimeFormatOptions): string {
	const raw = optionalStructureValue(value);
	if (!raw) return EMPTY;

	const date = new Date(raw);
	if (Number.isNaN(date.getTime())) return raw;

	return date.toLocaleDateString(language === "km" ? "km-KH" : "en-US", options);
}

function formatPeriod(start: unknown, end: unknown, language: LanguageCode): string {
	const startText = optionalStructureValue(start);
	const endText = optionalStructureValue(end);
	if (!startText && !endText) return EMPTY;
	return `${startText || EMPTY} - ${endText || (language === "km" ? "បច្ចុប្បន្ន" : "Present")}`;
}

function filenameSafe(value: string): string {
	return optionalStructureValue(value)
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "_") || "Member";
}

function absoluteAssetUrl(value: unknown): string {
	const raw = optionalStructureValue(value);
	if (!raw || raw === "/placeholder.svg") return "";
	const normalized = normalizeUrl(raw);
	if (normalized.startsWith("http")) return normalized;
	if (typeof window === "undefined") return normalized;
	return `${window.location.origin}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
}

function row(label: string, value: unknown): string {
	return `
		<div class="cv-row">
			<div class="cv-label">${escapeHtml(label)}</div>
			<div class="cv-value">${escapeHtml(value)}</div>
		</div>
	`;
}

function section(title: string, content: string): string {
	return `
		<section class="cv-section">
			<h2>${escapeHtml(title)}</h2>
			${content}
		</section>
	`;
}

function collectCvData(member: Member, language: LanguageCode) {
	const raw = member as any;
	const name = firstValue(language, raw.name, raw.name_km, raw.name_en, member.name_km, member.name_en, member.name);
	const title = firstValue(language, raw.title, raw.title_km, raw.title_en, member.title_km, member.title_en, member.position_en, member.department);
	const bio = firstValue(language, raw.bio, raw.bio_km, member.bio_km, member.bio);
	const location = firstValue(language, raw.location, raw.location_km, raw.location_en, member.location_km, member.location, member.location_en);
	const phone = firstValue(language, raw.phoneNumber, raw.phone_number, member.phone, member.phoneNumber);

	const educations = (raw.personalEducations || member.educations || [])
		.slice()
		.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
		.map((education: any) => ({
			degree: firstValue(language, education.degree),
			school: firstValue(language, education.schoolName, education.school_name),
			period: formatPeriod(education.startYear ?? education.start_year, education.endYear ?? education.end_year, language),
		}));

	const experiences = (raw.personalExperiences || member.experiences || [])
		.slice()
		.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
		.map((experience: any) => ({
			title: firstValue(language, experience.title),
			organization: firstValue(language, experience.organization),
			description: firstValue(language, experience.description),
			period: formatPeriod(experience.startYear ?? experience.start_year, experience.endYear ?? experience.end_year, language),
		}));

	const associations = (raw.associationMembers || member.associations || [])
		.slice()
		.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
		.map((association: any) => ({
			name: firstValue(language, association.name, association.association?.name, association.association?.name_en),
			role: firstValue(language, association.role, association.isHead || association.is_head ? "Head" : ""),
		}));

	const skills = (raw.memberSkills || member.skills || [])
		.map((skill: any) =>
			typeof skill === "string"
				? displayStructureValue(skill)
				: firstValue(language, skill.skillName, skill.name, skill.skill?.name, skill.skillId || skill.id)
		);

	const languages = (raw.memberLanguages || member.languages || [])
		.map((languageItem: any) =>
			typeof languageItem === "string"
				? displayStructureValue(languageItem)
				: firstValue(language, languageItem.name, languageItem.language?.name, languageItem.languageName)
		);

	const socials = (member.socialLinks?.length ? member.socialLinks : member.socials || [])
		.map((social: any) => ({
			platform: displayStructureValue(social.platform || "Link"),
			url: displayStructureValue(social.url),
		}))
		.filter((social) => social.url !== EMPTY);

	return {
		name,
		title,
		bio,
		email: displayStructureValue(member.email),
		phone,
		location,
		avatarUrl: absoluteAssetUrl(raw.image || raw.avatarUrl || raw.avatar_url),
		memberCode: displayStructureValue(raw.memberCode || raw.member_code || member.memberCode),
		dob: formatDate(raw.dob || member.dob, language, { year: "numeric", month: "long", day: "numeric" }),
		gender: displayStructureValue(raw.gender || member.gender),
		nationality: displayStructureValue(raw.nationality || member.nationality),
		joined: formatDate(raw.join_date || raw.joinDate || member.joinDate || member.joinYear, language, { year: "numeric", month: "long" }),
		educations,
		experiences,
		associations,
		skills,
		languages,
		socials,
	};
}

function buildCvHtml(member: Member, language: LanguageCode): HTMLElement {
	const data = collectCvData(member, language);
	const root = document.createElement("div");
	root.className = "cv-export";
	root.style.position = "absolute";
	root.style.left = "0";
	root.style.top = "0";
	root.style.width = `${PAPER_WIDTH}px`;
	root.style.background = "#ffffff";
	root.style.pointerEvents = "none";
	root.style.zIndex = "-1";

	const fontFamily = language === "km"
		? "'MiSansKhmerPdf', 'Khmer OS Siemreap', 'Noto Sans Khmer', Arial, sans-serif"
		: "'GoogleSansPdf', Arial, sans-serif";

	root.innerHTML = `
		<style>
			@font-face {
				font-family: 'MiSansKhmerPdf';
				src: url('/fonts/MiSansKhmer-Regular.ttf') format('truetype');
				font-weight: 400;
				font-style: normal;
			}
			@font-face {
				font-family: 'GoogleSansPdf';
				src: url('/fonts/GoogleSans-Regular.ttf') format('truetype');
				font-weight: 400;
				font-style: normal;
			}
			.cv-export, .cv-export * {
				box-sizing: border-box;
				font-family: ${fontFamily};
				letter-spacing: 0;
			}
			.cv-page {
				width: ${PAPER_WIDTH}px;
				min-height: 1123px;
				padding: 54px 58px;
				color: #111827;
				background: #ffffff;
			}
			.cv-header {
				display: grid;
				grid-template-columns: 1fr 112px;
				gap: 28px;
				align-items: start;
				border-bottom: 3px solid #1f4e79;
				padding-bottom: 26px;
				margin-bottom: 28px;
			}
			.cv-name {
				margin: 0 0 10px;
				font-size: 30px;
				line-height: 1.35;
				font-weight: 700;
				color: #111827;
			}
			.cv-title {
				margin: 0 0 18px;
				font-size: 15px;
				line-height: 1.65;
				color: #4b5563;
			}
			.cv-contact {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 8px 18px;
				font-size: 12px;
				line-height: 1.6;
				color: #374151;
			}
			.cv-avatar {
				width: 112px;
				height: 112px;
				object-fit: cover;
				object-position: top;
				border: 1px solid #d1d5db;
				border-radius: 8px;
				background: #f3f4f6;
			}
			.cv-avatar-fallback {
				width: 112px;
				height: 112px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #d1d5db;
				border-radius: 8px;
				background: #f3f4f6;
				color: #6b7280;
				font-size: 26px;
				font-weight: 700;
			}
			.cv-grid {
				display: grid;
				grid-template-columns: 220px 1fr;
				gap: 34px;
			}
			.cv-section {
				break-inside: avoid;
				margin-bottom: 26px;
			}
			.cv-section h2 {
				margin: 0 0 12px;
				padding-bottom: 7px;
				border-bottom: 1px solid #d1d5db;
				color: #1f4e79;
				font-size: 13px;
				line-height: 1.4;
				text-transform: uppercase;
				font-weight: 700;
			}
			.cv-row {
				margin-bottom: 12px;
				break-inside: avoid;
			}
			.cv-label {
				margin-bottom: 3px;
				color: #6b7280;
				font-size: 10px;
				line-height: 1.4;
				text-transform: uppercase;
				font-weight: 700;
			}
			.cv-value {
				color: #111827;
				font-size: 12px;
				line-height: 1.65;
				overflow-wrap: anywhere;
			}
			.cv-item {
				break-inside: avoid;
				margin-bottom: 18px;
			}
			.cv-item-head {
				display: grid;
				grid-template-columns: 1fr auto;
				gap: 16px;
				align-items: start;
			}
			.cv-item-title {
				margin: 0;
				color: #111827;
				font-size: 14px;
				line-height: 1.55;
				font-weight: 700;
			}
			.cv-item-meta {
				margin: 2px 0 0;
				color: #1f4e79;
				font-size: 12px;
				line-height: 1.6;
				font-weight: 700;
			}
			.cv-period {
				white-space: nowrap;
				color: #6b7280;
				font-size: 11px;
				line-height: 1.7;
			}
			.cv-desc {
				margin: 7px 0 0;
				color: #4b5563;
				font-size: 12px;
				line-height: 1.75;
			}
			.cv-pills {
				display: flex;
				flex-wrap: wrap;
				gap: 7px;
			}
			.cv-pill {
				display: inline-flex;
				padding: 5px 8px;
				border-radius: 6px;
				background: #f3f4f6;
				color: #374151;
				font-size: 11px;
				line-height: 1.4;
			}
			.cv-profile {
				margin: 0;
				color: #374151;
				font-size: 13px;
				line-height: 1.85;
			}
		</style>
		<div class="cv-page" lang="${escapeHtml(language)}">
			<header class="cv-header">
				<div>
					<h1 class="cv-name">${escapeHtml(data.name)}</h1>
					<p class="cv-title">${escapeHtml(data.title)}</p>
					<div class="cv-contact">
						<div><strong>Email:</strong> ${escapeHtml(data.email)}</div>
						<div><strong>Phone:</strong> ${escapeHtml(data.phone)}</div>
						<div><strong>Location:</strong> ${escapeHtml(data.location)}</div>
						<div><strong>Member ID:</strong> ${escapeHtml(data.memberCode)}</div>
					</div>
				</div>
				${data.avatarUrl
					? `<img class="cv-avatar" src="${escapeHtml(data.avatarUrl)}" crossorigin="anonymous" alt="${escapeHtml(data.name)}" />`
					: `<div class="cv-avatar-fallback">${escapeHtml(data.name.slice(0, 2).toUpperCase())}</div>`}
			</header>

			<div class="cv-grid">
				<aside>
					${section("Personal", [
						row("Date of Birth", data.dob),
						row("Gender", data.gender),
						row("Nationality", data.nationality),
						row("Joined", data.joined),
					].join(""))}
					${data.skills.length ? section("Skills", `<div class="cv-pills">${data.skills.map((skill: string) => `<span class="cv-pill">${escapeHtml(skill)}</span>`).join("")}</div>`) : ""}
					${data.languages.length ? section("Languages", `<div class="cv-pills">${data.languages.map((item: string) => `<span class="cv-pill">${escapeHtml(item)}</span>`).join("")}</div>`) : ""}
					${data.socials.length ? section("Links", data.socials.map((social: CvSocial) => row(social.platform, social.url)).join("")) : ""}
				</aside>

				<main>
					${section("Profile", `<p class="cv-profile">${escapeHtml(data.bio)}</p>`)}
					${data.experiences.length ? section("Professional Experience", data.experiences.map((item: CvExperience) => `
						<article class="cv-item">
							<div class="cv-item-head">
								<div>
									<h3 class="cv-item-title">${escapeHtml(item.title)}</h3>
									<p class="cv-item-meta">${escapeHtml(item.organization)}</p>
								</div>
								<div class="cv-period">${escapeHtml(item.period)}</div>
							</div>
							<p class="cv-desc">${escapeHtml(item.description)}</p>
						</article>
					`).join("")) : ""}
					${data.educations.length ? section("Education", data.educations.map((item: CvEducation) => `
						<article class="cv-item">
							<div class="cv-item-head">
								<div>
									<h3 class="cv-item-title">${escapeHtml(item.degree)}</h3>
									<p class="cv-item-meta">${escapeHtml(item.school)}</p>
								</div>
								<div class="cv-period">${escapeHtml(item.period)}</div>
							</div>
						</article>
					`).join("")) : ""}
					${data.associations.length ? section("Organizations & Memberships", data.associations.map((item: CvAssociation) => row(item.name, item.role)).join("")) : ""}
				</main>
			</div>
		</div>
	`;

	return root;
}

async function waitForFonts(language: LanguageCode): Promise<void> {
	if (!("fonts" in document)) return;
	const family = language === "km" ? "MiSansKhmerPdf" : "GoogleSansPdf";
	await document.fonts.load(`16px ${family}`);
	await document.fonts.ready;
}

export async function generateMemberPDF(member: Member, language: LanguageCode = "en"): Promise<void> {
	const html2pdfModule = await import("html2pdf.js");
	const html2pdf = (html2pdfModule as any).default || html2pdfModule;
	const cvElement = buildCvHtml(member, language);
	document.body.appendChild(cvElement);

	try {
		await waitForFonts(language);
		const pageElement = cvElement.querySelector(".cv-page");
		if (!(pageElement instanceof HTMLElement)) {
			throw new Error("CV page element was not created.");
		}

		const options = {
			margin: 0,
			filename: `${filenameSafe(collectCvData(member, language).name)}_CV.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: {
				scale: Math.min(window.devicePixelRatio || 1, 2) * 2,
				useCORS: true,
				allowTaint: false,
				backgroundColor: "#ffffff",
				letterRendering: true,
				windowWidth: PAPER_WIDTH,
			},
			jsPDF: {
				unit: "px",
				format: [PAPER_WIDTH, 1123],
				orientation: "portrait",
			},
			pagebreak: { mode: ["css", "legacy"] },
		};

		await html2pdf()
			.set(options as any)
			.from(pageElement)
			.save();
	} finally {
		cvElement.remove();
	}
}
