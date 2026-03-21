"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSidebar } from "./sidebar-context";

export function Navbar() {
  const { open, setOpen } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-full items-center gap-3 px-4 lg:px-6">
        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Link
          href="/docs/getting-started"
          className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-foreground/90 transition-colors"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 border border-primary/30">
            <span className="text-primary font-bold text-sm leading-none">K</span>
          </div>
          <span>Kleff</span>
          <span className="text-muted-foreground/60">/</span>
          <span className="font-normal text-muted-foreground">Docs</span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded border border-border">
            v0.1
          </span>
        </div>
      </div>
    </header>
  );
}
