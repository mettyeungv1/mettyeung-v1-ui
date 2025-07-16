import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-900 text-white shadow hover:bg-primary-950 active:bg-primary-950",
        secondary:
          "border-transparent bg-neutral-200 text-text-primary hover:bg-neutral-300 active:bg-neutral-400",
        destructive:
          "border-transparent bg-error-DEFAULT text-white shadow hover:bg-error-dark active:bg-error-dark",
        outline: 
          "border-primary-900 text-primary-900 bg-transparent hover:bg-primary-900 hover:text-white active:bg-primary-950 active:text-white",
        accent:
          "border-transparent bg-accent-400 text-white shadow hover:bg-accent-500 active:bg-accent-600",
        success:
          "border-transparent bg-success-DEFAULT text-white shadow hover:bg-success-dark active:bg-success-dark",
        warning:
          "border-transparent bg-warning-DEFAULT text-white shadow hover:bg-warning-dark active:bg-warning-dark",
        info:
          "border-transparent bg-info-DEFAULT text-white shadow hover:bg-info-dark active:bg-info-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }