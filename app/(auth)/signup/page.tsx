"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <GlassCard className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" />
        <Button
          onClick={() => {
            localStorage.setItem("neonx_user", "user")
            const id = email?.trim() || `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
            localStorage.setItem("neonx_user_id", id)
            router.push("/exchange")
          }}
        >
          Sign up
        </Button>
      </GlassCard>
    </div>
  )
}
