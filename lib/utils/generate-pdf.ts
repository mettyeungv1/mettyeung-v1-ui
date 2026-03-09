import { Member } from "@/lib/types/structure";
import { normalizeUrl } from "@/lib/utils/image";

// ─── A4 dimensions (mm) ──────────────────────────────────────────────────────
const PW = 210;
const PH = 297;

// ─── Layout zones ────────────────────────────────────────────────────────────
const HEADER_H    = 52;   // navy header band
const BODY_Y      = HEADER_H + 10; // body content starts
const BODY_BOTTOM = PH - 12;       // body ends (footer zone)

const LEFT_X  = 14;        // main column left edge
const LEFT_W  = 128;       // main column width
const RIGHT_X = LEFT_X + LEFT_W + 10; // sidebar left edge
const RIGHT_W = PW - RIGHT_X - 12;    // sidebar width ≈ 46mm

// ─── Colors ──────────────────────────────────────────────────────────────────
const NAVY    = "#00356B";
const GOLD    = "#C9A432";
const PRIMARY = "#004D8C";
const DARK    = "#111827";
const MED     = "#4B5563";
const LIGHT   = "#9CA3AF";
const BORDER  = "#E5E7EB";
const BG_SOFT = "#F8FAFC";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Render a circular avatar via canvas → PNG data-URL */
const makeCircularAvatar = (url: string): Promise<string | null> =>
	new Promise((resolve) => {
		const SIZE = 300;
		const canvas = document.createElement("canvas");
		canvas.width = SIZE;
		canvas.height = SIZE;
		const ctx = canvas.getContext("2d");
		if (!ctx) return resolve(null);
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			ctx.beginPath();
			ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(img, 0, 0, SIZE, SIZE);
			resolve(canvas.toDataURL("image/png"));
		};
		img.onerror = () => resolve(null);
		img.src = url;
	});

/** Fetch any URL as base64 data-URL */
const fetchDataUrl = async (url: string): Promise<string | null> => {
	try {
		const r = await fetch(url, { cache: "no-cache" });
		if (!r.ok) return null;
		const blob = await r.blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror   = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};

const fmtDate = (s: string): string => {
	try {
		return new Date(s).toLocaleDateString("en-US", {
			year: "numeric", month: "short", day: "numeric",
		});
	} catch { return s; }
};

// ─── Draw header band (repeated on each page for background only) ─────────────
const drawPageHeader = (doc: any, full: boolean, person?: Member, avatarDataUrl?: string | null, logoDataUrl?: string | null) => {
	// Navy band
	doc.setFillColor(NAVY);
	doc.rect(0, 0, PW, HEADER_H, "F");
	// Gold accent line at bottom of header
	doc.setFillColor(GOLD);
	doc.rect(0, HEADER_H - 1, PW, 1, "F");

	if (!full || !person) return;

	// ── Avatar ────────────────────────────────────────────────────────────────
	const AV_R  = 20;  // radius mm
	const AV_CX = LEFT_X + AV_R;
	const AV_CY = HEADER_H / 2;

	if (avatarDataUrl) {
		// Draw circular image
		doc.addImage(avatarDataUrl, "PNG", AV_CX - AV_R, AV_CY - AV_R, AV_R * 2, AV_R * 2);
	} else {
		// Initials fallback
		const initials = (person.name_en || person.name || "?")
			.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
		doc.setFillColor("#1B5FA8");
		doc.circle(AV_CX, AV_CY, AV_R, "F");
		doc.setFont("helvetica", "bold");
		doc.setFontSize(18);
		doc.setTextColor("#FFFFFF");
		doc.text(initials, AV_CX, AV_CY, { align: "center", baseline: "middle" });
	}

	// White ring around avatar
	doc.setDrawColor("#FFFFFF");
	doc.setLineWidth(0.8);
	doc.circle(AV_CX, AV_CY, AV_R, "S");

	// ── Name + title text ─────────────────────────────────────────────────────
	const textX = AV_CX + AV_R + 8;
	const maxW  = PW - textX - 14 - 35; // leave 35mm for logo

	const name  = person.name_en || person.name || "Unknown Member";
	const title = person.position_en || person.title_en || "";
	const phone = person.phone || person.phoneNumber || "";

	// Name
	doc.setFont("helvetica", "bold");
	doc.setFontSize(20);
	doc.setTextColor("#FFFFFF");
	const nameLines = doc.splitTextToSize(name, maxW);
	doc.text(nameLines, textX, 14);

	// Title
	if (title) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor("#A8C8E8");
		const titleY = 14 + nameLines.length * 8;
		doc.text(title, textX, titleY);
	}

	// Contact strip (email • phone • location)
	const contactParts: string[] = [];
	if (person.email)                               contactParts.push(person.email);
	if (phone)                                      contactParts.push(phone);
	if (person.location_en || person.location)      contactParts.push(person.location_en || person.location || "");
	if (contactParts.length) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8.5);
		doc.setTextColor("#C5DEF0");
		const contactStr = contactParts.join("   •   ");
		const contactY   = HEADER_H - 9;
		doc.text(contactStr, textX, contactY);
	}

	// ── Logo (top-right of header) ────────────────────────────────────────────
	if (logoDataUrl) {
		try {
			doc.addImage(logoDataUrl, "PNG", PW - 44, 6, 32, 12);
		} catch (_) { /* logo is optional */ }
	}
};

// ─── Section title in body ────────────────────────────────────────────────────
const drawSectionTitle = (doc: any, text: string, x: number, y: number, w: number) => {
	doc.setFont("helvetica", "bold");
	doc.setFontSize(9.5);
	doc.setTextColor(PRIMARY);
	doc.text(text.toUpperCase(), x, y);
	doc.setDrawColor(PRIMARY);
	doc.setLineWidth(0.4);
	doc.line(x, y + 2, x + w, y + 2);
};

// ─── Bullet list item (sidebar) ────────────────────────────────────────────────
const sidebarLabel = (doc: any, text: string, x: number, y: number) => {
	doc.setFont("helvetica", "bold");
	doc.setFontSize(7.5);
	doc.setTextColor(LIGHT);
	doc.text(text.toUpperCase(), x, y);
};

// ─── Main export ─────────────────────────────────────────────────────────────
export const generateMemberPDF = async (member: Member): Promise<void> => {
	const { jsPDF } = await import("jspdf");

	// Resolve image URLs
	const rawSrc = normalizeUrl(member.image || (member as any).avatarUrl || "");
	const absSrc = rawSrc
		? rawSrc.startsWith("http") ? rawSrc
			: `${window.location.origin}${rawSrc.startsWith("/") ? "" : "/"}${rawSrc}`
		: "";

	const [avatarDataUrl, logoDataUrl] = await Promise.all([
		absSrc ? makeCircularAvatar(absSrc) : Promise.resolve(null),
		fetchDataUrl(`${window.location.origin}/logo.png`),
	]);

	const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

	// ── Page 1 header ─────────────────────────────────────────────────────────
	drawPageHeader(doc, true, member, avatarDataUrl, logoDataUrl);

	// ── Body Y cursors (left column and right sidebar advance independently) ──
	let ly = BODY_Y; // left column Y
	let ry = BODY_Y; // right sidebar Y

	/** Add a new page and redraw the header band (no content) */
	const newPage = () => {
		doc.addPage();
		drawPageHeader(doc, false);
		ly = BODY_Y;
		ry = BODY_Y;
	};

	/** Ensure at least `needed` mm remains in the left column; break if not */
	const checkLeft = (needed: number) => {
		if (ly + needed > BODY_BOTTOM) newPage();
	};

	/** Ensure at least `needed` mm remains in the right sidebar */
	const checkRight = (needed: number) => {
		if (ry + needed > BODY_BOTTOM) {
			// If left column also overflows, start new page
			if (ly + needed > BODY_BOTTOM) newPage();
			else ry = BODY_Y; // reset sidebar to top of body if it overflows independently
		}
	};

	// ─────────────────────────────────────────────────────────────────────────
	// LEFT COLUMN — Bio / Experience / Education / Organizations
	// ─────────────────────────────────────────────────────────────────────────

	// Bio
	if (member.bio) {
		const bioLines = doc.splitTextToSize(`"${member.bio}"`, LEFT_W - 6);
		const bioH     = bioLines.length * 4.8 + 10;
		checkLeft(bioH);

		doc.setFillColor(BG_SOFT);
		doc.roundedRect(LEFT_X, ly, LEFT_W, bioH, 2, 2, "F");
		doc.setFillColor(PRIMARY);
		doc.roundedRect(LEFT_X, ly, 2.5, bioH, 1, 1, "F");

		doc.setFont("helvetica", "italic");
		doc.setFontSize(9.5);
		doc.setTextColor(MED);
		doc.text(bioLines, LEFT_X + 7, ly + 5.5);
		ly += bioH + 8;
	}

	// EXPERIENCE
	const experiences = member.experiences?.length ? member.experiences : null;
	if (experiences) {
		checkLeft(16);
		drawSectionTitle(doc, "Experience", LEFT_X, ly, LEFT_W);
		ly += 8;

		const sorted = [...experiences].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		for (let i = 0; i < sorted.length; i++) {
			const exp  = sorted[i];
			const role = exp.title?.en       || exp.title?.km       || "Role";
			const org  = exp.organization?.en || exp.organization?.km || "";
			const desc = exp.description?.en  || exp.description?.km  || "";
			const yr   = `${exp.startYear || "—"} – ${exp.endYear || "Present"}`;

			const descLines = desc ? doc.splitTextToSize(desc, LEFT_W - 4) : [];
			const blockH    = 6.5 + (org ? 5 : 0) + (desc ? descLines.length * 4.6 + 3 : 0) + 7;
			checkLeft(blockH);

			// Role + years on same row
			doc.setFont("helvetica", "bold");
			doc.setFontSize(11);
			doc.setTextColor(DARK);
			doc.text(role, LEFT_X, ly);

			doc.setFont("helvetica", "normal");
			doc.setFontSize(8.5);
			doc.setTextColor(LIGHT);
			doc.text(yr, LEFT_X + LEFT_W, ly, { align: "right" });
			ly += 5.5;

			// Organisation
			if (org) {
				doc.setFont("helvetica", "bold");
				doc.setFontSize(9.5);
				doc.setTextColor(PRIMARY);
				doc.text(org, LEFT_X, ly);
				ly += 5;
			}

			// Description
			if (desc) {
				doc.setFont("helvetica", "normal");
				doc.setFontSize(9.5);
				doc.setTextColor(MED);
				doc.text(descLines, LEFT_X, ly);
				ly += descLines.length * 4.6 + 2;
			}

			// Separator (except last)
			if (i < sorted.length - 1) {
				ly += 3;
				doc.setDrawColor(BORDER);
				doc.setLineWidth(0.2);
				doc.line(LEFT_X, ly, LEFT_X + LEFT_W, ly);
				ly += 4;
			} else {
				ly += 7;
			}
		}
	}

	// EDUCATION
	const educations = member.educations?.length ? member.educations : null;
	if (educations) {
		checkLeft(16);
		drawSectionTitle(doc, "Education", LEFT_X, ly, LEFT_W);
		ly += 8;

		const sorted = [...educations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		for (let i = 0; i < sorted.length; i++) {
			const edu    = sorted[i];
			const degree = edu.degree?.en     || edu.degree?.km     || "Degree";
			const school = edu.schoolName?.en || edu.schoolName?.km || "";
			const yr     = `${edu.startYear || "—"} – ${edu.endYear || "Present"}`;
			checkLeft(18);

			// Timeline dot
			doc.setFillColor(PRIMARY);
			doc.circle(LEFT_X + 1.5, ly + 1.5, 1.5, "F");
			doc.setDrawColor("#DBEAFE");
			doc.setLineWidth(0.3);

			// Degree + years
			doc.setFont("helvetica", "bold");
			doc.setFontSize(11);
			doc.setTextColor(DARK);
			doc.text(degree, LEFT_X + 7, ly + 2);

			doc.setFont("helvetica", "normal");
			doc.setFontSize(8.5);
			doc.setTextColor(LIGHT);
			doc.text(yr, LEFT_X + LEFT_W, ly + 2, { align: "right" });
			ly += 6;

			// School
			if (school) {
				doc.setFont("helvetica", "normal");
				doc.setFontSize(9.5);
				doc.setTextColor(MED);
				doc.text(school, LEFT_X + 7, ly);
				ly += 5;
			}

			ly += (i < sorted.length - 1) ? 5 : 8;
		}
	}

	// ORGANIZATIONS / MEMBERSHIPS
	const associations = member.associations?.length ? member.associations : null;
	if (associations) {
		checkLeft(16);
		drawSectionTitle(doc, "Organizations & Memberships", LEFT_X, ly, LEFT_W);
		ly += 8;

		for (const assoc of associations) {
			const assocName = assoc.name || "Organization";
			checkLeft(16);

			const cardH = assoc.role ? 14 : 10;
			doc.setFillColor(BG_SOFT);
			doc.roundedRect(LEFT_X, ly, LEFT_W, cardH, 1.5, 1.5, "F");
			doc.setFillColor(PRIMARY);
			doc.roundedRect(LEFT_X, ly, 2.5, cardH, 1, 1, "F");

			doc.setFont("helvetica", "bold");
			doc.setFontSize(10);
			doc.setTextColor(DARK);
			doc.text(assocName, LEFT_X + 7, ly + (assoc.role ? 5.5 : 6));

			if (assoc.role) {
				doc.setFont("helvetica", "normal");
				doc.setFontSize(8.5);
				doc.setTextColor(MED);
				doc.text(assoc.role, LEFT_X + 7, ly + 10);
			}

			if (assoc.isHead) {
				doc.setFont("helvetica", "bold");
				doc.setFontSize(7);
				const badgeW = doc.getTextWidth("HEAD") + 5;
				doc.setFillColor("#DBEAFE");
				doc.roundedRect(LEFT_X + LEFT_W - badgeW, ly + (assoc.role ? 3 : 2.5), badgeW, 5, 1, 1, "F");
				doc.setTextColor(PRIMARY);
				doc.text("HEAD", LEFT_X + LEFT_W - badgeW / 2, ly + (assoc.role ? 5.5 : 5), {
					align: "center", baseline: "middle",
				});
			}

			ly += cardH + 4;
		}
	}

	// ─────────────────────────────────────────────────────────────────────────
	// RIGHT SIDEBAR — Skills / Languages / Personal
	// ─────────────────────────────────────────────────────────────────────────

	// Thin vertical separator
	doc.setDrawColor(BORDER);
	doc.setLineWidth(0.3);
	doc.line(RIGHT_X - 6, BODY_Y, RIGHT_X - 6, Math.max(ly, ry));

	// SKILLS
	if (member.skills?.length) {
		checkRight(14);
		drawSectionTitle(doc, "Skills", RIGHT_X, ry, RIGHT_W);
		ry += 8;

		for (const skill of member.skills) {
			checkRight(6);
			const skillLines = doc.splitTextToSize(`• ${skill}`, RIGHT_W);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(9);
			doc.setTextColor(DARK);
			doc.text(skillLines, RIGHT_X, ry);
			ry += skillLines.length * 4.5 + 1;
		}
		ry += 8;
	}

	// LANGUAGES
	if (member.languages?.length) {
		checkRight(14);
		drawSectionTitle(doc, "Languages", RIGHT_X, ry, RIGHT_W);
		ry += 8;

		for (const lang of member.languages) {
			checkRight(6);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(9);
			doc.setTextColor(DARK);
			doc.text(`• ${lang}`, RIGHT_X, ry);
			ry += 5;
		}
		ry += 8;
	}

	// PERSONAL INFO
	const hasPersonal =
		member.dob || member.gender || member.nationality ||
		member.joinDate || member.joinYear;

	if (hasPersonal) {
		checkRight(14);
		drawSectionTitle(doc, "Personal", RIGHT_X, ry, RIGHT_W);
		ry += 8;

		const rows: [string, string][] = [];
		if (member.dob)         rows.push(["Born",        fmtDate(member.dob)]);
		if (member.gender)      rows.push(["Gender",      member.gender.charAt(0).toUpperCase() + member.gender.slice(1)]);
		if (member.nationality) rows.push(["Nationality", member.nationality]);
		if (member.joinDate || member.joinYear)
			rows.push(["Joined", String(member.joinDate || member.joinYear)]);

		for (const [label, value] of rows) {
			checkRight(10);
			sidebarLabel(doc, label, RIGHT_X, ry);
			ry += 4;
			doc.setFont("helvetica", "normal");
			doc.setFontSize(9);
			doc.setTextColor(DARK);
			const lines = doc.splitTextToSize(value, RIGHT_W);
			doc.text(lines, RIGHT_X, ry);
			ry += lines.length * 4.5 + 4;
		}
	}

	// ── Footer with page numbers ──────────────────────────────────────────────
	const total = doc.getNumberOfPages();
	for (let i = 1; i <= total; i++) {
		doc.setPage(i);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(7.5);
		doc.setTextColor(LIGHT);
		doc.text(
			`Page ${i} of ${total}`,
			PW / 2, PH - 5,
			{ align: "center" }
		);
	}

	const filename = `${(member.name_en || member.name || "Member").replace(/\s+/g, "_")}_CV.pdf`;
	doc.save(filename);
};
