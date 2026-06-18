import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-caption font-semibold transition-all duration-200 focus-ring",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-interactive-primary text-white hover:bg-interactive-primaryHover",
				secondary:
					"border-border-subtle bg-interactive-neutral text-text-primary hover:bg-interactive-neutralHover",
				destructive:
					"border-transparent bg-error-DEFAULT text-white hover:bg-error-dark",
				outline:
					"border-border text-primary-900 bg-surface-panel hover:bg-interactive-primaryMuted",
				accent:
					"border-transparent bg-interactive-accent text-white hover:bg-interactive-accentHover",
				success:
					"border-transparent bg-success-DEFAULT text-white hover:bg-success-dark",
				warning:
					"border-transparent bg-warning-DEFAULT text-white hover:bg-warning-dark",
				info: "border-transparent bg-info-DEFAULT text-white hover:bg-info-dark",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
