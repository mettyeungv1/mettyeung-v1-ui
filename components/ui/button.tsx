import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white shadow hover:bg-primary-950 focus:bg-primary-950 active:bg-primary-950 hover:shadow-md active:shadow-lg border border-transparent hover:border-accent-400/50",
        destructive:
          "bg-error-DEFAULT text-white shadow-sm hover:bg-error-dark focus:bg-error-dark active:bg-error-dark",
        outline:
          "border border-primary-900 bg-transparent text-primary-900 shadow-sm hover:bg-primary-900 hover:text-white focus:bg-primary-900 focus:text-white active:bg-primary-950 active:text-white hover:shadow-md",
        secondary:
          "bg-neutral-100 text-text-primary shadow-sm hover:bg-neutral-200 focus:bg-neutral-200 active:bg-neutral-300 border border-neutral-300 hover:border-neutral-400",
        ghost: "text-primary-900 hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 active:bg-primary-100 border border-transparent hover:border-primary-200",
        link: "text-primary-900 underline-offset-4 hover:underline hover:text-accent-400 focus:text-accent-400 active:text-accent-500",
        accent: "bg-accent-400 text-white shadow hover:bg-accent-500 focus:bg-accent-500 active:bg-accent-600 border border-transparent hover:border-accent-600/50"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
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