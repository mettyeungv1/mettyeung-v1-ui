"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TocItem = {
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
	const matches = Array.from(html.matchAll(/<h([23])[^>]*>(.*?)<\/h[23]>/gi));

	return matches.map((match, index) => ({
		id: slugify(match[2].replace(/<[^>]*>/g, "").trim(), index),
		text: match[2].replace(/<[^>]*>/g, "").trim(),
		level: Number(match[1]),
	})).filter((item) => item.text);
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

interface ArticleTocProps {
	items: TocItem[];
}

export function ArticleToc({ items }: ArticleTocProps) {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (items.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

				if (visible?.target.id) {
					setActiveId(visible.target.id);
				}
			},
			{ rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] }
		);

		items.forEach((item) => {
			const node = document.getElementById(item.id);
			if (node) observer.observe(node);
		});

		return () => observer.disconnect();
	}, [items]);

	const content = useMemo(() => (
		<nav className="space-y-1">
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => {
						document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
						setOpen(false);
					}}
					className={cn(
						"block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-muted hover:text-primary-900",
						item.level === 3 && "pl-6 text-xs",
						activeId === item.id ? "bg-interactive-primaryMuted font-semibold text-primary-900" : "text-text-secondary"
					)}
				>
					{item.text}
				</button>
			))}
		</nav>
	), [activeId, items]);

	if (items.length === 0) return null;

	return (
		<Card>
			<CardContent className="p-4">
				<Button
					type="button"
					variant="ghost"
					className="mb-2 flex w-full items-center justify-between px-2 lg:pointer-events-none"
					onClick={() => setOpen((value) => !value)}
				>
					<span className="inline-flex items-center gap-2">
						<ListTree className="h-4 w-4" />
						{t("news.tableOfContents")}
					</span>
					<ChevronDown className={cn("h-4 w-4 transition-transform lg:hidden", open && "rotate-180")} />
				</Button>
				<div className={cn("hidden lg:block", open && "block")}>
					{content}
				</div>
			</CardContent>
		</Card>
	);
}
