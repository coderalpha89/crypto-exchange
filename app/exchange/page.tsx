"use client"

import { useMemo, useState } from "react"
import useSWR, { mutate } from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/glass-card"
import QRCode from "react-qr-code"
import { toast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/protected-route"

const fetcher = (u: string) => fetch(u).then((r) => r.json())
const WALLET = "0xNEONX-EXAMPLE-WALLET-ADDR"

export default function ExchangePage() {
  const { data: rates } = useSWR("/api/rates", fetcher)
  const [fromUSDT, setFromUSDT] = useState(true)
  const [amount, setAmount] = useState("100")

  const rate = rates?.USDT?.INR ?? 83
  const result = useMemo(() => {
    const v = Number(amount || 0)
    return fromUSDT ? v * rate : v / rate
  }, [amount, fromUSDT, rate])

  const amountNumber = Number(amount)
  const invalid = !Number.isFinite(amountNumber) || amountNumber <= 0

  async function submitRequest() {
    if (invalid) {
      toast({ title: "Invalid amount", description: "Enter an amount greater than 0.", variant: "destructive" as any })
      return
    }
    const res = await fetch("/api/exchange", {
      method: "POST",
      body: JSON.stringify({
        from: fromUSDT ? "USDT" : "INR",
        to: fromUSDT ? "INR" : "USDT",
        amount: amountNumber,
        quote: result,
      }),
    })
    if (res.ok) {
      toast({ title: "Request sent", description: "Admin will review shortly." })
      setAmount("") // clear input on success
      mutate("/api/exchange")
    } else {
      toast({ title: "Request failed", description: "Please try again in a moment.", variant: "destructive" as any })
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <h1 className="text-3xl font-semibold">Exchange</h1>

        <GlassCard className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] items-end">
            <div>
              <label className="text-xs text-muted-foreground">From ({fromUSDT ? "USDT" : "INR"})</label>
              <Input
                inputMode="decimal"
                aria-invalid={invalid ? true : undefined}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {invalid && <p className="mt-1 text-xs text-destructive">Enter a valid amount greater than 0.</p>}
            </div>

            <Button variant="outline" onClick={() => setFromUSDT((v) => !v)} className="md:mb-0" aria-label="Swap">
              Swap
            </Button>

            <div>
              <label className="text-xs text-muted-foreground">To ({fromUSDT ? "INR" : "USDT"})</label>
              <Input value={Number.isFinite(result) ? result.toFixed(2) : ""} readOnly />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Live rate: <span className="text-primary font-mono">{rate}</span> INR per USDT
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard className="p-4 flex items-center justify-center">
              <QRCode value={WALLET} size={140} fgColor="currentColor" bgColor="transparent" />
            </GlassCard>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Common wallet address</div>
              <div className="font-mono break-all text-sm">{WALLET}</div>
              <Button
                className="mt-3 bg-transparent"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(WALLET)
                  toast({ title: "Copied", description: "Wallet address copied to clipboard." })
                }}
              >
                Copy address
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={submitRequest} disabled={invalid}>
              Request Exchange
            </Button>
            <Button variant="ghost" onClick={() => setAmount("")}>
              Clear
            </Button>
          </div>
        </GlassCard>
      </div>
    </ProtectedRoute>
  )
}
