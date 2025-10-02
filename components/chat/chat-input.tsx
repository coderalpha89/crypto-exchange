"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => Promise<void> | void
  disabled?: boolean
}) {
  const [text, setText] = useState("")
  async function handleSend() {
    const t = text.trim()
    if (!t) return
    await onSend(t)
    setText("")
  }
  return (
    <div className="flex items-center gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            void handleSend()
          }
        }}
        placeholder="Type your message…"
        aria-label="Message"
        disabled={disabled}
      />
      <Button onClick={() => void handleSend()} disabled={disabled}>
        Send
      </Button>
    </div>
  )
}
