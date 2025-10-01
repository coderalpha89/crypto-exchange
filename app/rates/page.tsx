"use client"

import useSWR from "swr"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function RatesPage() {
  const { data } = useSWR("/api/rates", fetcher)
  const items = [{ symbol: "USDT", inr: data?.USDT?.INR ?? 83 }]
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
      <p className="mt-4 text-sm text-muted-foreground">Rates are set by the admin and update instantly.</p>
    </div>
  )
}
