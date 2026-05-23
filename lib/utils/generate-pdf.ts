import { Member } from "@/lib/types/structure";
import { normalizeUrl } from "@/lib/utils/image";

const PW = 210;
const PH = 297;
const MX = 18;
const TOP = 18;
const BOTTOM = 280;
const CONTENT_W = PW - MX * 2;

const INK = "#111827";
const MUTED = "#4B5563";
const FAINT = "#6B7280";
const LINE = "#D1D5DB";
const SOFT_LINE = "#E5E7EB";
const ACCENT = "#1F4E79";
const PAPER = "#FFFFFF";

type PdfDoc = any;

const clean = (value?: string | null): string =>
	(value || "").replace(/\s+/g, " ").trim();

const pick = (...values: Array<string | undefined | null>): string =>
	clean(values.find((value) => clean(value)) || "");

const lines = (doc: PdfDoc, value: string, width: number): string[] =>
	clean(value) ? doc.splitTextToSize(clean(value), width) : [];

const formatDate = (value?: string | number | null): string => {
	if (!value) return "";
	if (typeof value === "number") return String(value);

	const raw = clean(value);
	const date = new Date(raw);
	if (Number.isNaN(date.getTime())) return raw;

	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatPeriod = (start?: number, end?: number): string => {
	if (!start && !end) return "";
	if (start && end) return `${start} - ${end}`;
	if (start) return `${start} - Present`;
	return String(end);
};

const filenameSafe = (value: string): string =>
	(value || "Member")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "_") || "Member";

const makeSquareAvatar = (url: string): Promise<string | null> =>
	new Promise((resolve) => {
		const size = 360;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;

		const ctx = canvas.getContext("2d");
		if (!ctx) return resolve(null);

		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			const side = Math.min(img.width, img.height);
			const sx = (img.width - side) / 2;
			const sy = (img.height - side) / 2;
			ctx.fillStyle = PAPER;
			ctx.fillRect(0, 0, size, size);
			ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
			resolve(canvas.toDataURL("image/jpeg", 0.92));
		};
		img.onerror = () => resolve(null);
		img.src = url;
	});

const fetchDataUrl = async (url: string): Promise<string | null> => {
	try {
		const response = await fetch(url, { cache: "no-cache" });
		if (!response.ok) return null;

		const blob = await response.blob();
		return await new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};

const setText = (doc: PdfDoc, size: number, color = INK, weight: "normal" | "bold" = "normal") => {
	doc.setFont("helvetica", weight);
	doc.setFontSize(size);
	doc.setTextColor(color);
};

const drawSectionTitle = (doc: PdfDoc, title: string, y: number) => {
	setText(doc, 9.3, ACCENT, "bold");
	doc.text(title.toUpperCase(), MX, y);
	doc.setDrawColor(LINE);
	doc.setLineWidth(0.25);
	doc.line(MX, y + 2.5, PW - MX, y + 2.5);
};

const drawFooter = (doc: PdfDoc, page: number, total: number) => {
	doc.setDrawColor(SOFT_LINE);
	doc.setLineWidth(0.2);
	doc.line(MX, PH - 12, PW - MX, PH - 12);
	setText(doc, 7.5, FAINT);
	doc.text(`Page ${page} of ${total}`, PW / 2, PH - 7, { align: "center" });
};

export const generateMemberPDF = async (member: Member): Promise<void> => {
	const { jsPDF } = await import("jspdf");

	const rawSrc = normalizeUrl(member.image || (member as any).avatarUrl || "");
	const absSrc = rawSrc
		? rawSrc.startsWith("http")
			? rawSrc
			: `${window.location.origin}${rawSrc.startsWith("/") ? "" : "/"}${rawSrc}`
		: "";

	const [avatarDataUrl, logoDataUrl] = await Promise.all([
		absSrc ? makeSquareAvatar(absSrc) : Promise.resolve(null),
		fetchDataUrl(`${window.location.origin}/logo.png`),
	]);

	const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
	let y = TOP;

	const newPage = () => {
		doc.addPage();
		y = TOP;
	};

	const ensure = (height: number) => {
		if (y + height > BOTTOM) newPage();
	};

	const name = pick(member.name_en, member.name, "Member");
	const title = pick(member.position_en, member.title_en, member.department);
	const phone = pick(member.phone, member.phoneNumber);
	const location = pick(member.location_en, member.location);
	const contact = [member.email, phone, location].filter(Boolean).join("  |  ");

	if (logoDataUrl) {
		try {
			doc.addImage(logoDataUrl, "PNG", MX, y - 3, 29, 11);
		} catch {
			/* Optional logo. */
		}
	}

	if (avatarDataUrl) {
		doc.addImage(avatarDataUrl, "JPEG", PW - MX - 24, y - 2, 24, 24);
		doc.setDrawColor(LINE);
		doc.setLineWidth(0.25);
		doc.rect(PW - MX - 24, y - 2, 24, 24, "S");
	}

	const headerTextW = avatarDataUrl ? CONTENT_W - 34 : CONTENT_W;
	setText(doc, 21, INK, "bold");
	doc.text(lines(doc, name, headerTextW).slice(0, 2), MX, y + 20);
	y += 28;

	if (title) {
		setText(doc, 10.5, MUTED);
		doc.text(lines(doc, title, headerTextW).slice(0, 2), MX, y);
		y += 6;
	}

	if (contact) {
		setText(doc, 8.6, FAINT);
		doc.text(lines(doc, contact, CONTENT_W).slice(0, 2), MX, y);
		y += 7;
	}

	doc.setDrawColor(ACCENT);
	doc.setLineWidth(0.55);
	doc.line(MX, y, PW - MX, y);
	y += 11;

	if (member.bio) {
		const bioLines = lines(doc, member.bio, CONTENT_W);
		ensure(bioLines.length * 4.5 + 12);
		drawSectionTitle(doc, "Profile", y);
		y += 8;
		setText(doc, 9.2, MUTED);
		doc.text(bioLines, MX, y);
		y += bioLines.length * 4.5 + 8;
	}

	const experiences = member.experiences?.length ? [...member.experiences] : [];
	if (experiences.length) {
		ensure(18);
		drawSectionTitle(doc, "Professional Experience", y);
		y += 8;

		experiences.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		for (const exp of experiences) {
			const role = pick(exp.title?.en, exp.title?.km, "Role");
			const org = pick(exp.organization?.en, exp.organization?.km);
			const desc = pick(exp.description?.en, exp.description?.km);
			const period = formatPeriod(exp.startYear, exp.endYear);
			const roleLines = lines(doc, role, period ? CONTENT_W - 38 : CONTENT_W).slice(0, 2);
			const orgLines = org ? lines(doc, org, CONTENT_W).slice(0, 2) : [];
			const descLines = desc ? lines(doc, desc, CONTENT_W).slice(0, 8) : [];
			const blockH = roleLines.length * 4.8 + orgLines.length * 4.3 + descLines.length * 4.4 + 10;

			ensure(blockH);
			setText(doc, 10.3, INK, "bold");
			doc.text(roleLines, MX, y);

			if (period) {
				setText(doc, 8.4, FAINT);
				doc.text(period, PW - MX, y, { align: "right" });
			}

			y += roleLines.length * 4.8;
			if (orgLines.length) {
				setText(doc, 9, ACCENT, "bold");
				doc.text(orgLines, MX, y);
				y += orgLines.length * 4.3 + 1;
			}

			if (descLines.length) {
				setText(doc, 8.9, MUTED);
				doc.text(descLines, MX, y);
				y += descLines.length * 4.4;
			}

			y += 6;
		}
	}

	const educations = member.educations?.length ? [...member.educations] : [];
	if (educations.length) {
		ensure(18);
		drawSectionTitle(doc, "Education", y);
		y += 8;

		educations.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		for (const edu of educations) {
			const degree = pick(edu.degree?.en, edu.degree?.km, "Degree");
			const school = pick(edu.schoolName?.en, edu.schoolName?.km);
			const period = formatPeriod(edu.startYear, edu.endYear);
			const degreeLines = lines(doc, degree, period ? CONTENT_W - 38 : CONTENT_W).slice(0, 2);
			const schoolLines = school ? lines(doc, school, CONTENT_W).slice(0, 2) : [];
			const blockH = degreeLines.length * 4.7 + schoolLines.length * 4.2 + 8;

			ensure(blockH);
			setText(doc, 10, INK, "bold");
			doc.text(degreeLines, MX, y);

			if (period) {
				setText(doc, 8.4, FAINT);
				doc.text(period, PW - MX, y, { align: "right" });
			}

			y += degreeLines.length * 4.7;
			if (schoolLines.length) {
				setText(doc, 8.9, MUTED);
				doc.text(schoolLines, MX, y);
				y += schoolLines.length * 4.2;
			}
			y += 6;
		}
	}

	const associations = member.associations?.length ? [...member.associations] : [];
	if (associations.length) {
		ensure(18);
		drawSectionTitle(doc, "Organizations & Memberships", y);
		y += 8;

		associations.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		for (const assoc of associations) {
			const assocName = pick(assoc.name, assoc.association?.name_en, assoc.association?.name, "Organization");
			const role = pick(assoc.role, assoc.isHead ? "Head" : "");
			const rowText = role ? `${assocName} - ${role}` : assocName;
			const rowLines = lines(doc, rowText, CONTENT_W);
			ensure(rowLines.length * 4.4 + 5);
			setText(doc, 8.9, MUTED);
			doc.text(rowLines, MX, y);
			y += rowLines.length * 4.4 + 4;
		}
	}

	const skillText = member.skills?.map(clean).filter(Boolean).join(", ");
	const languagesText = member.languages?.map(clean).filter(Boolean).join(", ");
	const personalRows: string[] = [];
	if (member.dob) personalRows.push(`Born: ${formatDate(member.dob)}`);
	if (member.gender) personalRows.push(`Gender: ${member.gender.charAt(0).toUpperCase()}${member.gender.slice(1)}`);
	if (member.nationality) personalRows.push(`Nationality: ${member.nationality}`);
	if (member.joinDate || member.joinYear) personalRows.push(`Joined: ${formatDate(member.joinDate || member.joinYear)}`);
	if (member.memberCode) personalRows.push(`Member ID: ${member.memberCode}`);

	if (skillText || languagesText || personalRows.length) {
		ensure(18);
		drawSectionTitle(doc, "Additional Information", y);
		y += 8;

		const rows: Array<[string, string]> = [];
		if (skillText) rows.push(["Skills", skillText]);
		if (languagesText) rows.push(["Languages", languagesText]);
		if (personalRows.length) rows.push(["Details", personalRows.join("  |  ")]);

		for (const [label, value] of rows) {
			const labelW = 24;
			const valueLines = lines(doc, value, CONTENT_W - labelW);
			ensure(valueLines.length * 4.4 + 5);

			setText(doc, 8.9, INK, "bold");
			doc.text(label, MX, y);
			setText(doc, 8.9, MUTED);
			doc.text(valueLines, MX + labelW, y);
			y += valueLines.length * 4.4 + 4;
		}
	}

	const socials = (member.socialLinks?.length ? member.socialLinks : member.socials || [])
		.map((social) => [clean(social.platform), clean(social.url)] as [string, string])
		.filter(([, url]) => url);

	if (socials.length) {
		ensure(18);
		drawSectionTitle(doc, "Links", y);
		y += 8;

		for (const [platform, url] of socials) {
			const text = `${platform || "Link"}: ${url.replace(/^https?:\/\//, "")}`;
			const rowLines = lines(doc, text, CONTENT_W);
			ensure(rowLines.length * 4.4 + 4);
			setText(doc, 8.7, MUTED);
			doc.text(rowLines, MX, y);
			y += rowLines.length * 4.4 + 3;
		}
	}

	const total = doc.getNumberOfPages();
	for (let page = 1; page <= total; page += 1) {
		doc.setPage(page);
		drawFooter(doc, page, total);
	}

	doc.save(`${filenameSafe(name)}_CV.pdf`);
};
