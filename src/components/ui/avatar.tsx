import * as React from "react"
import { cn } from "@/lib/utils"

function Avatar({
  className,
  fallback,
  src,
  alt,
  ...props
}: React.ComponentProps<"div"> & {
  fallback: string
  src?: string
  alt?: string
}) {
  return (
    <div
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-xs font-medium text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? fallback} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{fallback}</span>
      )}
    </div>
  )
}

export { Avatar }
