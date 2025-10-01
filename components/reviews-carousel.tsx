"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { GlassCard } from "./glass-card"

type Review = { id: string; name: string; text: string }

export function ReviewsCarousel({ items }: { items: Review[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((r) => (
          <CarouselItem key={r.id} className="md:basis-1/2 lg:basis-1/3">
            <GlassCard className="p-6 h-full">
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              <div className="mt-4 text-xs text-primary">
                {"— "}
                {r.name}
              </div>
            </GlassCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
