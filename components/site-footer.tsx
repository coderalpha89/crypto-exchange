export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">© {year} NEON X. All rights reserved. Redevs by Atmam</p>
        <nav aria-label="Footer" className="flex items-center gap-4 text-sm">
          <a className="text-muted-foreground hover:text-primary transition-colors" href="/deposit">
            Deposit
          </a>
          <a className="text-muted-foreground hover:text-primary transition-colors" href="/rates">
            Rates
          </a>
          <a className="text-muted-foreground hover:text-primary transition-colors" href="/contact">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
