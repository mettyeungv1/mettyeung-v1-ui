"use client";

import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

interface MediaFallbackProps {
	label: string;
	className?: string;
}

export function MediaFallback({ label, className }: MediaFallbackProps) {
	return (
		<div
			className={cn(
				"flex min-h-40 w-full flex-col items-center justify-center gap-3 bg-neutral-100 px-4 text-center text-neutral-500",
				className
			)}
		>
			<ImageOff className="h-8 w-8" aria-hidden="true" />
			<span className="text-sm font-medium">{label}</span>
		</div>
	);
}
