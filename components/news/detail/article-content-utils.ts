export type TocItem = {
	id: string;
	text: string;
	level: number;
};

function slugify(value: string, index: number) {
	const slug = value
		.toLowerCase()
		.replace(/<[^>]*>/g, "")
		.replace(/[^a-z0-9\u1780-\u17ff]+/gi, "-")
		.replace(/^-+|-+$/g, "");

	return slug || `section-${index + 1}`;
}

export function extractTocItems(html: string): TocItem[] {
	return Array.from(html.matchAll(/<h([23])[^>]*>(.*?)<\/h[23]>/gi))
		.map((match, index) => ({
			id: slugify(match[2].replace(/<[^>]*>/g, "").trim(), index),
			text: match[2].replace(/<[^>]*>/g, "").trim(),
			level: Number(match[1]),
		}))
		.filter((item) => item.text);
}

export function addHeadingIds(html: string, items: TocItem[]) {
	let index = 0;

	return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (match, level, attrs, content) => {
		const item = items[index++];
		if (!item) return match;
		const cleanedAttrs = String(attrs).replace(/\s+id=(["']).*?\1/i, "");
		return `<h${level}${cleanedAttrs} id="${item.id}">${content}</h${level}>`;
	});
}
