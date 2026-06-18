import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-button transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "border border-transparent bg-interactive-primary text-white shadow-surface hover:bg-interactive-primaryHover active:bg-interactive-primaryHover",
        destructive:
          "border border-transparent bg-error-DEFAULT text-white shadow-surface hover:bg-error-dark active:bg-error-dark",
        outline:
          "border border-border bg-surface-panel text-primary-900 shadow-surface hover:border-border-focus hover:bg-interactive-primaryMuted active:bg-primary-100",
        secondary:
          "border border-border-subtle bg-interactive-neutral text-text-primary shadow-surface hover:bg-interactive-neutralHover active:bg-neutral-300",
        ghost: "border border-transparent text-primary-900 hover:bg-interactive-primaryMuted active:bg-primary-100",
        link: "border border-transparent text-primary-900 underline-offset-4 hover:text-interactive-accent hover:underline active:text-interactive-accentHover",
        accent: "border border-transparent bg-interactive-accent text-white shadow-surface hover:bg-interactive-accentHover active:bg-accent-600"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-caption",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-body",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
