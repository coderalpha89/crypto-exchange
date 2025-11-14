"use client";

import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function RatesPage() {
  const { data, error, isLoading } = useSWR("/api/rates", fetcher, {
    refreshInterval: 10000, // refresh every 10 seconds
  });

  if (error)
    return <div className="p-4 text-red-500">Failed to load rates</div>;
  if (isLoading || !data)
    return <div className="p-4 text-gray-400">Loading live rates...</div>;

  // Expected data format from /api/rates:
  // { BTC: { INR: 6800000 }, ETH: { INR: 300000 }, DOGE: { INR: 12 } }
  const items = Object.entries(data).map(([symbol, value]: [string, any]) => ({
    symbol,
    inr: value?.INR?.toFixed(2) ?? "N/A",
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Current Rates</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>INR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((i) => (
            <TableRow key={i.symbol}>
              <TableCell className="font-medium">{i.symbol}</TableCell>
              <TableCell>{i.inr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="mt-4 text-sm text-muted-foreground">
        Rates are updated live from CoinMarketCap API.
      </p>
    </div>
  );
}
