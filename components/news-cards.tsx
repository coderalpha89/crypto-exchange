import { GlassCard } from "./glass-card"
import Link from "next/link"

type News = { id: string; title: string; source: string; href?: string }

export function NewsCards({ items }: { items: News[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((n) => (
        <GlassCard key={n.id} className="p-5 hover:shadow-[0_0_24px_theme(colors.primary/0.12)] transition-shadow">
          <div className="text-sm text-primary mb-2">{n.source}</div>
          <div className="text-pretty">{n.title}</div>
          {n.href ? (
            <Link className="mt-3 inline-block text-sm text-muted-foreground hover:text-primary" href={n.href}>
              Read more →
            </Link>
          ) : null}
        </GlassCard>
      ))}
    </div>
  )
}
