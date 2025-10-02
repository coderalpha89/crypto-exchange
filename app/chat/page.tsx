"use client"

import { useEffect, useMemo, useRef } from "react"
import useSWR, { mutate } from "swr"
import { GlassCard } from "@/components/glass-card"
import { MessageBubble } from "@/components/chat/message-bubble"
import { ChatInput } from "@/components/chat/chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProtectedRoute } from "@/components/protected-route"
import { useToast } from "@/hooks/use-toast"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function UserChatPage() {
  const { toast } = useToast()
  const userId = useMemo(() => {
    if (typeof window === "undefined") return ""
    let id = localStorage.getItem("neonx_user_id") || ""
    if (!id) {
      id = `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      localStorage.setItem("neonx_user_id", id)
    }
    return id
  }, [])

  const { data, isLoading } = useSWR(userId ? `/api/chat?userId=${encodeURIComponent(userId)}` : null, fetcher, {
    refreshInterval: 2000,
  })

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [data?.messages?.length])

  async function send(text: string) {
    try {
      await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ userId, role: "user", content: text }),
      })
      mutate(`/api/chat?userId=${encodeURIComponent(userId)}`)
    } catch {
      toast({ title: "Failed to send", description: "Please try again." })
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <GlassCard className="p-0 overflow-hidden">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-glow" aria-hidden />
              <h1 className="text-sm font-medium text-pretty">Chat with Admin</h1>
            </div>
            <span className="text-xs text-muted-foreground">You are: {userId}</span>
          </div>

          <ScrollArea className="h-[60vh] p-4">
            <div className="flex flex-col gap-3">
              {(data?.messages ?? []).map((m: any) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
              {isLoading && <div className="text-center text-xs text-muted-foreground">Loading messages…</div>}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-border p-3 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <ChatInput onSend={send} />
          </div>
        </GlassCard>
      </div>
    </ProtectedRoute>
  )
}
