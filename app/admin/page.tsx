"use client"

import { useState } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/glass-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function AdminPage() {
  const { data: rates } = useSWR("/api/rates", fetcher)
  const { data: requests } = useSWR("/api/exchange", fetcher)
  const [inr, setInr] = useState(rates?.USDT?.INR ?? 83)

  async function setRate() {
    await fetch("/api/rates", {
      method: "POST",
      body: JSON.stringify({ USDT: { INR: Number(inr) } }),
    })
    mutate("/api/rates")
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

      <GlassCard className="p-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="grow">
          <label className="text-xs text-muted-foreground">USDT → INR</label>
          <Input
            type="number"
            inputMode="decimal"
            defaultValue={rates?.USDT?.INR ?? 83}
            onChange={(e) => setInr(e.target.valueAsNumber)}
          />
        </div>
        <Button onClick={setRate}>Save rate</Button>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-sm text-muted-foreground mb-4">Pending exchange requests</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Quote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(requests?.items ?? []).map((r: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{r.from}</TableCell>
                <TableCell>{r.to}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.quote}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}
