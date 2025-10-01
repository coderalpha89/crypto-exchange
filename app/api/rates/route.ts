let RATES = {
  USDT: { INR: 83 },
}

export async function GET() {
  return Response.json(RATES, { headers: { "cache-control": "no-store" } })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (body && typeof body === "object") {
    RATES = { ...RATES, ...body }
  }
  return Response.json(RATES)
}
