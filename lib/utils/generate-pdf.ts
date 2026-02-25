import { Member } from "@/lib/types/structure";
import { normalizeUrl } from "@/lib/utils/image";

/**
 * Helper to safely format dates
 */
const formatDate = (dateStr: string | undefined): string => {
	if (!dateStr) return "";
	try {
		return new Date(dateStr).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return dateStr;
	}
};

/**
 * Builds simple, clean, professional CV HTML for PDF export.
 * Uses the project's primary Deep Blue (#004D8C) as the accent color.
 */
const buildCVHtml = (person: Member): string => {
	const PRIMARY     = "#004D8C";
	const PRIMARY_L   = "#E6F2FF";
	const TEXT_DARK   = "#1F2937";
	const TEXT_MED    = "#4B5563";
	const TEXT_LIGHT  = "#9CA3AF";
	const BORDER      = "#E5E7EB";

	const imageSrc = person.image ? normalizeUrl(person.image) : "";
	const name     = person.name_en || person.name || "Unknown Member";
	const title    = person.position_en || person.title_en || "";
	const phone    = person.phone || person.phoneNumber || "";

	const experiences  = person.experiences?.length  ? person.experiences  : null;
	const educations   = person.educations?.length   ? person.educations   : null;
	const skills       = person.skills?.length       ? person.skills       : null;
	const associations = person.associations?.length ? person.associations : null;
	const languages    = person.languages?.length    ? person.languages    : null;

	const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

	const getAbsoluteUrl = (path: string) => {
		if (!path) return "";
		if (path.startsWith("http")) return path;
		return window.location.origin + (path.startsWith("/") ? path : `/${path}`);
	};

	/* ── Sidebar info row ── */
	const infoRow = (label: string, value: string) =>
		`<tr>
			<td style="padding: 4px 0; font-size: 11px; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; width: 75px;">${label}</td>
			<td style="padding: 4px 0 4px 8px; font-size: 12px; color: #F1F5F9; font-weight: 500; vertical-align: top;">${value}</td>
		</tr>`;

	/* ── Main content section title ── */
	const sectionTitle = (text: string) =>
		`<div style="font-size: 13px; font-weight: 700; color: ${PRIMARY}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${PRIMARY};">${text}</div>`;

	/* ── Build sidebar rows ── */
	let contactHtml = "";
	if (person.email)       contactHtml += infoRow("Email", person.email);
	if (phone)              contactHtml += infoRow("Phone", phone);
	if (person.location_en) contactHtml += infoRow("Location", person.location_en);

	let personalHtml = "";
	if (person.dob)                            personalHtml += infoRow("DOB", formatDate(person.dob));
	if (person.gender)                         personalHtml += infoRow("Gender", person.gender.charAt(0).toUpperCase() + person.gender.slice(1));
	if (person.nationality)                    personalHtml += infoRow("Nationality", person.nationality);
	if (person.joinDate || person.joinYear)     personalHtml += infoRow("Joined", String(person.joinDate || person.joinYear));
	if (person.status)                          personalHtml += infoRow("Status", person.status.toUpperCase());
	if (person.memberCode)                      personalHtml += infoRow("Code", person.memberCode);

	/* ── Section divider for sidebar ── */
	const sidebarDivider = `<div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;"></div>`;

	/* ── Sidebar section label ── */
	const sidebarLabel = (text: string) =>
		`<div style="font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">${text}</div>`;

	return `
		<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; display: flex; width: 794px; min-height: 1123px; margin: 0 auto; background: #fff;">

			<!-- SIDEBAR -->
			<div style="width: 250px; background: ${PRIMARY}; color: #fff; flex-shrink: 0; padding: 0;">

				<!-- Avatar -->
				<div style="padding: 44px 30px 28px; text-align: center;">
					${imageSrc
						? `<img src="${getAbsoluteUrl(imageSrc)}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.25); display: block; margin: 0 auto;" crossorigin="anonymous" />`
						: `<div style="width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.15); margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 2px;">${initials}</div>`
					}
					<div style="margin-top: 20px; font-size: 16px; font-weight: 700; letter-spacing: 0.3px;">${name}</div>
					${title ? `<div style="margin-top: 4px; font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1.5px;">${title}</div>` : ""}
				</div>

				<!-- Sidebar content -->
				<div style="padding: 0 28px 40px;">

					${contactHtml ? `
						${sidebarLabel("Contact")}
						<table style="width: 100%; border-collapse: collapse;">${contactHtml}</table>
					` : ""}

					${personalHtml ? `
						${sidebarDivider}
						${sidebarLabel("Personal")}
						<table style="width: 100%; border-collapse: collapse;">${personalHtml}</table>
					` : ""}

					${skills ? `
						${sidebarDivider}
						${sidebarLabel("Skills")}
						<div style="display: flex; flex-wrap: wrap; gap: 5px;">
							${skills.map((s: string) => `<span style="display: inline-block; padding: 3px 10px; font-size: 10px; font-weight: 600; color: #fff; background: rgba(255,255,255,0.15); border-radius: 3px;">${s}</span>`).join("")}
						</div>
					` : ""}

					${languages ? `
						${sidebarDivider}
						${sidebarLabel("Languages")}
						<div style="display: flex; flex-wrap: wrap; gap: 5px;">
							${languages.map((l: string) => `<span style="display: inline-block; padding: 3px 10px; font-size: 10px; font-weight: 600; color: #fff; background: rgba(255,255,255,0.15); border-radius: 3px;">${l}</span>`).join("")}
						</div>
					` : ""}
				</div>
			</div>

			<!-- MAIN CONTENT -->
			<div style="flex: 1; padding: 44px 40px; box-sizing: border-box;">

				<!-- Logo -->
				<div style="text-align: right; margin-bottom: 30px;">
					<img src="${getAbsoluteUrl("/logo.png")}" style="height: 48px; width: auto;" crossorigin="anonymous" />
				</div>

				<!-- Bio -->
				${person.bio ? `
				<div style="margin-bottom: 32px; padding: 14px 18px; background: ${PRIMARY_L}; border-left: 3px solid ${PRIMARY}; page-break-inside: avoid;">
					<p style="margin: 0; font-size: 13px; color: ${TEXT_MED}; line-height: 1.7; font-style: italic;">"${person.bio}"</p>
				</div>
				` : ""}

				<!-- Experience -->
				${experiences ? `
				<div style="margin-bottom: 30px;">
					${sectionTitle("Experience")}
					${[...experiences].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((exp) => `
						<div style="margin-bottom: 18px; page-break-inside: avoid;">
							<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
								<div style="font-size: 14px; font-weight: 700; color: ${TEXT_DARK};">${exp.title?.en || exp.title?.km || "Role"}</div>
								<div style="font-size: 11px; color: ${TEXT_LIGHT}; font-weight: 600; white-space: nowrap;">${exp.startYear || "—"} – ${exp.endYear || "Present"}</div>
							</div>
							<div style="font-size: 13px; color: ${PRIMARY}; font-weight: 600; margin-bottom: 4px;">${exp.organization?.en || exp.organization?.km || "Organization"}</div>
							${(exp.description?.en || exp.description?.km) ? `<p style="margin: 0; font-size: 12px; color: ${TEXT_MED}; line-height: 1.65;">${exp.description?.en || exp.description?.km}</p>` : ""}
						</div>
					`).join("")}
				</div>
				` : ""}

				<!-- Education -->
				${educations ? `
				<div style="margin-bottom: 30px;">
					${sectionTitle("Education")}
					${[...educations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((edu) => `
						<div style="margin-bottom: 14px; page-break-inside: avoid;">
							<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
								<div style="font-size: 14px; font-weight: 700; color: ${TEXT_DARK};">${edu.degree?.en || edu.degree?.km || "Degree"}</div>
								<div style="font-size: 11px; color: ${TEXT_LIGHT}; font-weight: 600; white-space: nowrap;">${edu.startYear || "—"} – ${edu.endYear || "Present"}</div>
							</div>
							<div style="font-size: 13px; color: ${TEXT_MED};">${edu.schoolName?.en || edu.schoolName?.km || "Institution"}</div>
						</div>
					`).join("")}
				</div>
				` : ""}

				<!-- Organizations -->
				${associations ? `
				<div style="margin-bottom: 30px;">
					${sectionTitle("Organizations")}
					${associations.map((assoc: any) => `
						<div style="margin-bottom: 10px; padding: 10px 14px; background: #F9FAFB; border-left: 3px solid ${PRIMARY}; page-break-inside: avoid; display: flex; justify-content: space-between; align-items: center;">
							<div>
								<div style="font-size: 13px; font-weight: 700; color: ${TEXT_DARK};">${assoc.name || "Organization"}</div>
								${assoc.role ? `<div style="font-size: 11px; color: ${TEXT_MED}; margin-top: 2px;">${assoc.role}</div>` : ""}
							</div>
							${assoc.isHead ? `<span style="font-size: 9px; font-weight: 700; padding: 2px 8px; background: ${PRIMARY_L}; color: ${PRIMARY}; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">Head</span>` : ""}
						</div>
					`).join("")}
				</div>
				` : ""}

			</div>
		</div>
	`;
};

/**
 * Generates and downloads a professional A4 PDF for a member
 */
export const generateMemberPDF = async (member: Member): Promise<void> => {
	try {
		const html2pdf = (await import("html2pdf.js")).default;
		const htmlContent = buildCVHtml(member);
		const filename = `${member.name_en || member.name || "Member"}_CV.pdf`.replace(/\s+/g, "_");

		await html2pdf()
			.set({
				margin: [0, 0, 0, 0],
				filename,
				image: { type: "jpeg", quality: 0.98 },
				html2canvas: {
					scale: 2,
					useCORS: true,
					letterRendering: true,
					logging: false,
				},
				jsPDF: {
					unit: "mm",
					format: "a4",
					orientation: "portrait",
				},
				pagebreak: { mode: ["avoid-all", "css", "legacy"] },
			} as any)
			.from(htmlContent)
			.save();
	} catch (error) {
		console.error("Failed to generate PDF CV:", error);
		throw error;
	}
};
