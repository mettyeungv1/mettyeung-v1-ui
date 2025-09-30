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

export async function listCategoriesService(): Promise<APIResponse<RawCategory[]>> {
  return fetchAPI<RawCategory[]>(CATEGORY_ENDPOINT);
}

export function mapToUICategories(raw: RawCategory[], posts?: Array<{ categoryId?: string | null }>): UICategory[] {
  const counts = new Map<string, number>();
  if (posts) {
    for (const p of posts) {
      if (p.categoryId) counts.set(p.categoryId, (counts.get(p.categoryId) || 0) + 1);
    }
  }

  const ui: UICategory[] = [];
  for (const cat of raw) {
    const children = (cat.children || []).map((c) => ({ id: c.id, name_en: getNameEn(c.name) }));
    const count = counts.size > 0 ? (counts.get(cat.id) || 0) : 0;
    ui.push({ id: cat.id, name_en: getNameEn(cat.name), count, subcategories: children });
  }

  const allCount = counts.size > 0 ? Array.from(counts.values()).reduce((a, b) => a + b, 0) : 0;
  return [{ id: "all", name_en: "All", count: allCount }, ...ui];
}


