"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/components/news/detail/article-content-utils";

export function ArticleToc({ itemsByLanguage }: { itemsByLanguage: Record<string, TocItem[]> }) {
	const { language, t } = useTranslation();
	const items = useMemo(() => itemsByLanguage[language] || itemsByLanguage.en || Object.values(itemsByLanguage)[0] || [], [itemsByLanguage, language]);
	const [activeId, setActiveId] = useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => { if (!items.length) return; const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]; if (visible?.target.id) setActiveId(visible.target.id); }, { rootMargin: "-20% 0px -65% 0px" }); items.forEach((item) => { const node = document.getElementById(item.id); if (node) observer.observe(node); }); return () => observer.disconnect(); }, [items]);
	if (!items.length) return null;
	return <Card><CardContent className="p-4"><Button type="button" variant="ghost" className="mb-2 flex w-full items-center justify-between px-2 lg:pointer-events-none" onClick={() => setOpen((value) => !value)}><span className="inline-flex items-center gap-2"><ListTree className="h-4 w-4" />{t("news.tableOfContents")}</span><ChevronDown className={cn("h-4 w-4 transition-transform lg:hidden", open && "rotate-180")} /></Button><div className={cn("hidden lg:block", open && "block")}>{items.map((item) => <button key={item.id} type="button" onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); }} className={cn("block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-muted hover:text-primary-900", item.level === 3 && "pl-6 text-xs", activeId === item.id ? "bg-interactive-primaryMuted font-semibold text-primary-900" : "text-text-secondary")}>{item.text}</button>)}</div></CardContent></Card>;
}
