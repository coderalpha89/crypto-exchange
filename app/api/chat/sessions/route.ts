type Message = { id: string; role: "user" | "admin"; content: string; at: number }
const CHAT_STORE: Record<string, Message[]> = (globalThis as any).__CHAT_STORE__ || {}
;(globalThis as any).__CHAT_STORE__ = CHAT_STORE

export async function GET() {
  const sessions = Object.entries(CHAT_STORE).map(([userId, messages]) => {
    const last = messages[messages.length - 1]
    return {
      userId,
      lastMessage: last?.content ?? "",
      lastAt: last?.at ?? 0,
      count: messages.length,
    }
  })
  sessions.sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0))
  return new Response(JSON.stringify({ sessions }), {
    headers: { "cache-control": "no-store", "content-type": "application/json" },
  })
}
