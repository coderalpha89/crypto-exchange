"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <GlassCard className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button
          onClick={() => {
            localStorage.setItem("neonx_user", "user")
            router.push("/exchange")
          }}
        >
          Sign up
        </Button>
      </GlassCard>
    </div>
  )
}
