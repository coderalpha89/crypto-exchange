"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { GlassCard } from "@/components/glass-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "@/components/chat/message-bubble"
import { ChatInput } from "@/components/chat/chat-input"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function AdminChatPage() {
  const { data: sessionData } = useSWR("/api/chat/sessions", fetcher, { refreshInterval: 3000 })
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const { data: chatData } = useSWR(
    activeUserId ? `/api/chat?userId=${encodeURIComponent(activeUserId)}` : null,
    fetcher,
    { refreshInterval: 2000 },
  )

  useEffect(() => {
    if (!activeUserId && sessionData?.sessions?.length) {
      setActiveUserId(sessionData.sessions[0].userId)
    }
  }, [activeUserId, sessionData])

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [chatData?.messages?.length])

  async function sendToActive(text: string) {
    if (!activeUserId) return
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ userId: activeUserId, role: "admin", content: text }),
    })
    mutate(`/api/chat?userId=${encodeURIComponent(activeUserId)}`)
  }

  const sessions = useMemo(() => sessionData?.sessions ?? [], [sessionData])

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-0 overflow-hidden">
          <div className="border-b border-border px-4 py-3 text-sm font-medium">Sessions</div>
          <ScrollArea className="h-[65vh]">
            <div className="p-2 flex flex-col">
              {sessions.length === 0 && <div className="p-4 text-xs text-muted-foreground">No chats yet.</div>}
              {sessions.map((s: any) => (
                <button
                  key={s.userId}
                  onClick={() => setActiveUserId(s.userId)}
                  className={cn(
                    "text-left rounded-md px-3 py-2 hover:bg-accent/10 transition-colors",
                    activeUserId === s.userId && "bg-accent/10 ring-1 ring-accent",
                  )}
                >
                  <div className="text-sm font-medium">{s.userId}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{s.lastMessage || "—"}</div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </GlassCard>

        <GlassCard className="p-0 overflow-hidden md:col-span-2">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="text-sm font-medium">Chat</div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-glow" aria-hidden />
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>

          <ScrollArea className="h-[55vh] p-4">
            <div className="flex flex-col gap-3">
              {(chatData?.messages ?? []).map((m: any) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-border p-3 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-muted-foreground truncate">To: {activeUserId || "—"}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => activeUserId && mutate(`/api/chat?userId=${encodeURIComponent(activeUserId)}`)}
              >
                Refresh
              </Button>
            </div>
            <div className="mt-2">
              <ChatInput onSend={sendToActive} disabled={!activeUserId} />
            </div>
          </div>
        </GlassCard>
      </div>
    </ProtectedRoute>
  )
}
