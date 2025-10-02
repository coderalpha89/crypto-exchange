"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("neonx_user") : null
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
      setAllowed(false)
    } else {
      setAllowed(true)
    }
  }, [pathname, router])

  if (allowed === null) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-sm text-muted-foreground">Checking authentication…</div>
    )
  }

  if (!allowed) return null
  return <>{children}</>
}
