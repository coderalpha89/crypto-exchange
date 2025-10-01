"use client"

import type React from "react"

import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Message sent", description: "We will get back to you soon." })
    }, 600)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <GlassCard className="p-6">
        <form onSubmit={submit} className="grid gap-4">
          <Input placeholder="Name" required />
          <Input placeholder="Email" type="email" required />
          <Textarea placeholder="Message" required />
          <Button disabled={loading}>{loading ? "Sending…" : "Send message"}</Button>
        </form>
      </GlassCard>
    </div>
  )
}
