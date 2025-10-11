"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const nav = [
  { href: "/", label: "Home" },
  { href: "/exchange", label: "Exchange" },
  { href: "/deposit", label: "Deposit" },
  { href: "/rates", label: "Rates" },
  { href: "/reviews", label: "Reviews" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
  { href: "/chat", label: "Chat" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check localStorage for user login status
    const user = localStorage.getItem("neonx_user")
    setIsLoggedIn(!!user)
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b border-border">
      <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="size-6 rounded-lg bg-primary/20 ring-1 ring-primary/40 shadow-[0_0_20px_theme(colors.primary/0.35)]" />
          <span className="font-mono text-sm tracking-widest text-primary">NEON X</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground hover:text-primary transition-colors",
                pathname === item.href && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isLoggedIn && (
            <>
              <Link href="/signup">
                <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="relative overflow-hidden">
                  <span className="relative z-10">Login</span>
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary/0.35),transparent_40%)]" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
