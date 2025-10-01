"use client"

import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"

const WALLET = "0xNEONX-EXAMPLE-WALLET-ADDR"

export default function DepositPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Deposit</h1>
      <GlassCard className="p-6 grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <QRCode value={WALLET} size={160} fgColor="currentColor" bgColor="transparent" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Wallet address</div>
          <div className="font-mono break-all text-sm">{WALLET}</div>
          <Button
            className="mt-3 bg-transparent"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(WALLET)}
          >
            Copy address
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
