"use client"

import { cn } from "@/lib/utils"

export function MessageBubble({
  role,
  content,
}: {
  role: "user" | "admin"
  content: string
}) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm animate-fade-in-up",
          isUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border border-border",
        )}
        role="group"
        aria-label={isUser ? "Your message" : "Admin message"}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
