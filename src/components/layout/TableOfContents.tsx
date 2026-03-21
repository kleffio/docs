"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Re-scan headings on page change
  useEffect(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    setHeadings(
      Array.from(elements).map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: parseInt(el.tagName[1]),
      }))
    );
    setActiveId("");
  }, [pathname]);

  // Scroll-based active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      const elements = document.querySelectorAll(".prose h2, .prose h3");
      let current = "";
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top <= 120) {
          current = el.id;
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct heading on initial render / anchor jump
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
        On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-sm leading-snug transition-colors",
                h.level === 3 && "pl-3",
                activeId === h.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
