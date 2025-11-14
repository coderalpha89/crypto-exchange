"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function handleLogin() {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/exchange")
    } catch (error) {
      alert("Login failed. Please check your credentials.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <GlassCard className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button
          onClick={() => {
            handleLogin()
            setLoading(true)
            // Simulate authentication delay
            setTimeout(() => {
              localStorage.setItem("neonx_user", "user")
              const id = email?.trim() || `u-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
              localStorage.setItem("neonx_user_id", id)
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
