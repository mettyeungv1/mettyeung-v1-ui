import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[96px] w-full rounded-md border border-border bg-surface-panel px-3 py-2 text-body text-text-primary placeholder:text-text-muted shadow-surface transition-all duration-200 hover:border-border-strong focus:border-border-focus focus-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
