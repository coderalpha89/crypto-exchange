"use client"
import { AnimatedLoginButton } from "@/components/animated-login-button"
import { GlassCard } from "@/components/glass-card"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import useSWR from "swr"
import { motion } from "framer-motion"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function HomePage() {
  const { data: reviews } = useSWR("/api/reviews", fetcher)
  const { data: news } = useSWR("/api/news", fetcher)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-2 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-balance text-4xl md:text-5xl font-semibold">
            Trade smarter with a neon-fast, admin-curated exchange.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A futuristic experience with glass UI, live rates, and streamlined approvals. Built for trust, speed, and
            scale.
          </p>
          <div className="flex gap-3">
            <AnimatedLoginButton />
          </div>
          <div className="flex gap-6 pt-2 text-sm text-muted-foreground">
            <span>Exchange</span>
            <span>Deposit</span>
            <span>Rates</span>
            <span>Reviews</span>
            <span>News</span>
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <GlassCard className="relative overflow-hidden p-6 min-h-64">
            {/* Subtle animated graphic */}
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              {["BTC", "ETH", "USDT", "SOL", "XRP", "MATIC"].map((s, i) => (
                <div
                  key={s}
                  className="rounded-lg border border-border/60 p-3 bg-background/40 animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{s}</span>
                    <span className="text-primary">↑</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded bg-primary/20 overflow-hidden relative">
                    <div className="h-1.5 rounded bg-primary w-2/3 animate-float" />
                  </div>
                </div>
              ))}
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_80%_-10%,theme(colors.primary/0.2),transparent_60%)]"
            />
          </GlassCard>
        </motion.div>
      </section>

      {/* About */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Admin-only exchange",
            body: "Requests are reviewed before execution for maximum safety.",
          },
          {
            title: "Security-first",
            body: "Wallets and flows designed for clarity and minimal mistakes.",
          },
          {
            title: "Built to scale",
            body: "Add new assets (BTC, ETH…) without redesigning the UI.",
          },
        ].map((b) => (
          <GlassCard key={b.title} className="p-6">
            <div className="text-sm text-primary mb-1">{b.title}</div>
            <p className="text-sm text-muted-foreground">{b.body}</p>
          </GlassCard>
        ))}
      </section>

      {/* Reviews */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What traders say</h2>
        <ReviewsCarousel items={reviews?.items ?? []} />
      </section>

      {/* News */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest crypto news</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(news?.items ?? []).slice(0, 3).map((n: any) => (
            <GlassCard key={n.id} className="p-5">
              <div className="text-sm text-primary mb-2">{n.source}</div>
              <div className="text-pretty">{n.title}</div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
