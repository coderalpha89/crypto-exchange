"use client"

import useSWR from "swr"
import { ReviewsCarousel } from "@/components/reviews-carousel"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function ReviewsPage() {
  const { data } = useSWR("/api/reviews", fetcher)
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-3xl font-semibold">Reviews</h1>
      <ReviewsCarousel items={data?.items ?? []} />
    </div>
  )
}
