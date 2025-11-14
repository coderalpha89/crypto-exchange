import { NextResponse } from "next/server";

const API_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const SYMBOLS = ["BTC", "ETH", "DOGE", "SOL", "BNB", "USDT"];

export async function GET() {
  try {
    const res = await fetch(
      `${API_URL}?symbol=${SYMBOLS.join(",")}&convert=INR`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COINMARKET_API_KEY || "",
        },
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const json = await res.json();
    const data: Record<string, any> = {};

    for (const symbol of SYMBOLS) {
      const inrPrice = json.data[symbol]?.quote?.INR?.price;
      data[symbol] = { INR: inrPrice };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto rates" },
      { status: 500 }
    );
  }
}
