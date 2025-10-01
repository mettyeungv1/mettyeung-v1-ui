import { CATEGORY_ENDPOINT } from "@/lib/static";
import { fetchAPI } from "@/lib/api";

type Localized = { [lang: string]: string };

export type RawCategory = {
	id: string;
	name: Localized | string;
	description?: Localized | string | null;
	parentId: string | null;
	children?: RawCategory[];
};

export interface UICategorySub {
	id: string;
	name_en: string;
}

export interface UICategory {
	id: string;
	name_en: string;
	count: number;
	subcategories?: UICategorySub[];
}

function getNameEn(name: Localized | string | undefined): string {
	if (!name) return "";
	if (typeof name === "string") return name;
	return name.en || Object.values(name)[0] || "";
}

export async function listCategoriesService(): Promise<
	APIResponse<RawCategory[]>
> {
	return fetchAPI<RawCategory[]>(CATEGORY_ENDPOINT);
}

export function mapToUICategories(
	raw: RawCategory[],
	posts?: Array<{ categoryId?: string | null }>
): UICategory[] {
	// Count occurrences per actual category id (typically leaf/child id on posts)
	const leafCounts = new Map<string, number>();
	if (posts) {
		for (const p of posts) {
			if (p.categoryId)
				leafCounts.set(p.categoryId, (leafCounts.get(p.categoryId) || 0) + 1);
		}
	}

	const ui: UICategory[] = [];
	let total = 0;
	for (const cat of raw) {
		const children = cat.children || [];
		const uiChildren: UICategorySub[] = children.map((c) => ({
			id: c.id,
			name_en: getNameEn(c.name),
		}));

		// Sum counts of this parent (own id if posts can be assigned to parent) + its children
		let parentCount = 0;
		if (leafCounts.size > 0) {
			parentCount += leafCounts.get(cat.id) || 0;
			for (const child of children)
				parentCount += leafCounts.get(child.id) || 0;
			total += parentCount;
		}

		ui.push({
			id: cat.id,
			name_en: getNameEn(cat.name),
			count: parentCount,
			subcategories: uiChildren,
		});
	}

	const allCount = leafCounts.size > 0 ? total : 0;
	return [{ id: "all", name_en: "All", count: allCount }, ...ui];
}
