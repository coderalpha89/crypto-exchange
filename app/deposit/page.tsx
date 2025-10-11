"use client"

import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const WALLETS: Record<string, string> = {
  TRC20: "T-NEONX-TRC20-EXAMPLE-ADDR",
  ERC20: "0xNEONX-ERC20-EXAMPLE-ADDR",
  BEP20: "0xNEONX-BEP20-EXAMPLE-ADDR",
}

export default function DepositPage() {
  const [network, setNetwork] = useState<keyof typeof WALLETS>("TRC20")
  const wallet = WALLETS[network]

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Deposit</h1>
      <GlassCard className="p-6 grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <QRCode value={wallet} size={160} fgColor="currentColor" bgColor="transparent" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-2">Network</div>
          <Select value={network} onValueChange={(v) => setNetwork(v as any)}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRC20">TRC20 (Tron)</SelectItem>
              <SelectItem value="ERC20">ERC20 (Ethereum)</SelectItem>
              <SelectItem value="BEP20">BEP20 (BSC)</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground mb-2">Wallet address</div>
          <div className="font-mono break-all text-sm">{wallet}</div>
          <Button
            className="mt-3 bg-transparent"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(wallet)
              toast({ title: "Copied", description: `${network} address copied to clipboard.` })
            }}
          >
            Copy address
          </Button>

          <div className="text-xs text-muted-foreground mt-4">
            Minimum deposit 10 USDT. Always double-check the network to avoid loss of funds.
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
