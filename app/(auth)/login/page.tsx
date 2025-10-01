"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <GlassCard className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button
          onClick={() => {
            setLoading(true)
            setTimeout(() => {
              localStorage.setItem("neonx_user", "user")
              setLoading(false)
              router.push("/exchange")
            }, 500)
          }}
        >
          {loading ? "Authenticating…" : "Login"}
        </Button>
      </GlassCard>
    </div>
  )
}
