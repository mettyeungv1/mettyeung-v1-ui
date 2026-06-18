"use client";

import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
	title: string;
	description?: string;
	icon?: LucideIcon;
	className?: string;
}

export function EmptyState({
	title,
	description,
	icon: Icon = SearchX,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"rounded-lg border border-dashed border-border bg-surface-panel px-card-md py-12 text-center shadow-surface",
				className
			)}
		>
			<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-interactive-neutral text-text-muted">
				<Icon className="h-7 w-7" aria-hidden="true" />
			</div>
			<h3 className="text-heading-5">{title}</h3>
			{description && (
				<p className="mx-auto mt-2 max-w-md text-body-sm text-text-muted">
					{description}
				</p>
			)}
		</div>
	);
}
