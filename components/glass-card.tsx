import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow-[0_0_0_1px_theme(colors.border/0.35),0_0_40px_theme(colors.primary/0.08)]",
        className,
      )}
      {...props}
    />
  )
}
