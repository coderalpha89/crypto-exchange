type Message = { id: string; role: "user" | "admin"; content: string; at: number }
const CHAT_STORE: Record<string, Message[]> = (globalThis as any).__CHAT_STORE__ || {}
;(globalThis as any).__CHAT_STORE__ = CHAT_STORE

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) {
    return new Response(JSON.stringify({ error: "userId required" }), { status: 400 })
  }
  const messages = CHAT_STORE[userId] || []
  return new Response(JSON.stringify({ messages }), {
    headers: { "cache-control": "no-store", "content-type": "application/json" },
  })
}

export async function POST(req: Request) {
  const body = (await req.json()) as { userId?: string; role?: "user" | "admin"; content?: string }
  const { userId, role, content } = body || {}
  if (!userId || !role || !content?.trim()) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 })
  }
  const list = (CHAT_STORE[userId] = CHAT_STORE[userId] || [])
  const msg: Message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content: content.trim(),
    at: Date.now(),
  }
  list.push(msg)
  return new Response(JSON.stringify({ ok: true, message: msg }), {
    headers: { "cache-control": "no-store", "content-type": "application/json" },
  })
}
