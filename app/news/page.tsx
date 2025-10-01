"use client"

import useSWR from "swr"
import { NewsCards } from "@/components/news-cards"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function NewsPage() {
  const { data } = useSWR("/api/news", fetcher)
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-3xl font-semibold">News</h1>
      <NewsCards items={data?.items ?? []} />
    </div>
  )
}
