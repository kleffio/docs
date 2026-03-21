"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flattenNav } from "@/lib/nav";

const pages = flattenNav();

export function PageNav() {
  const pathname = usePathname();
  const index = pages.findIndex((p) => p.href === pathname);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 flex items-stretch gap-3 border-t border-border pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col gap-1 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm transition-colors hover:bg-card hover:border-border/80"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft size={13} />
            Previous
          </span>
          <span className="font-medium text-foreground">{prev.label}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next && (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end gap-1 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm transition-colors hover:bg-card hover:border-border/80"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next
            <ChevronRight size={13} />
          </span>
          <span className="font-medium text-foreground">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
