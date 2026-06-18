import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-surface-panel px-3 py-2 text-body text-text-primary placeholder:text-text-muted shadow-surface transition-all duration-200 file:border-0 file:bg-transparent file:text-label file:font-medium hover:border-border-strong focus:border-border-focus focus-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
