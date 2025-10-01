const REVIEWS = [
  { id: "1", name: "Anita", text: "Lightning-fast exchange and very clear UX." },
  { id: "2", name: "Rahul", text: "Rates are transparent and approvals are quick." },
  { id: "3", name: "Meera", text: "Love the dark neon interface and simple flows." },
  { id: "4", name: "Karan", text: "Great for converting USDT to INR without noise." },
]

export async function GET() {
  return Response.json({ items: REVIEWS })
}
