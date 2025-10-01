const NEWS = [
  { id: "n1", title: "USDT volumes surge amid market rebound", source: "Wire" },
  { id: "n2", title: "BTC hash rate reaches new high", source: "On-chain" },
  { id: "n3", title: "ETH L2 fees trending down this week", source: "Analytics" },
  { id: "n4", title: "Stablecoins adoption grows in APAC", source: "Research" },
  { id: "n5", title: "India fintech: INR rails modernizing", source: "Finance" },
  { id: "n6", title: "Security best practices for wallets", source: "Security" },
]

export async function GET() {
  return Response.json({ items: NEWS })
}
