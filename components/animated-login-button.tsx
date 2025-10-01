"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function AnimatedLoginButton() {
  return (
    <Link href="/signup">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Button className="relative overflow-hidden">
          <span className="relative z-10">Get Started</span>
          <span className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120px_60px_at_20%_0%,#000_20%,transparent_50%)] bg-[conic-gradient(from_0deg,theme(colors.primary/0.35),theme(colors.accent/0.35),theme(colors.primary/0.35))]" />
        </Button>
      </motion.div>
    </Link>
  )
}
