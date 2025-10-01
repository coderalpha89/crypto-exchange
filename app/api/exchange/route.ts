type Req = { from: string; to: string; amount: number; quote: number }
const QUEUE: Req[] = []

export async function GET() {
  return Response.json({ items: QUEUE }, { headers: { "cache-control": "no-store" } })
}

export async function POST(req: Request) {
  const body = (await req.json()) as Req
  if (body?.from && body?.to) {
    QUEUE.unshift(body)
  }
  return Response.json({ ok: true })
}
