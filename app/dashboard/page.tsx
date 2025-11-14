'use client'

import { ProtectedRoute } from "@/components/protected-route"
import { GlassCard } from "@/components/glass-card"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("neonx_user_id"))
      setUserEmail(localStorage.getItem("neonx_user"))
    }
  }, [])

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-sm px-4 py-10">
        <GlassCard className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p>Welcome to your dashboard!</p>
          {userEmail && <p>Email: {userEmail}</p>}
          {userId && <p>User ID: {userId}</p>}
        </GlassCard>
      </div>
    </ProtectedRoute>
  )
}
