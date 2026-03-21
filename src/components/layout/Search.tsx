"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { Search as SearchIcon, ArrowRight, Hash, Sparkles } from "lucide-react";
import { searchDocs, searchIndex, type SearchEntry } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const RECOMMENDED_HREFS = [
  "/docs/getting-started",
  "/docs/platform/overview",
  "/docs/platform/deployments",
  "/docs/daemon/overview",
  "/docs/infra/local-dev",
  "/docs/api/endpoints",
];

const recommended: SearchEntry[] = RECOMMENDED_HREFS
  .map((href) => searchIndex.find((e) => e.href === href)!)
  .filter(Boolean);

// ─── Highlight matching text ──────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Group results by section ─────────────────────────────────────────────────

function groupBySection(results: SearchEntry[]): Map<string, SearchEntry[]> {
  const map = new Map<string, SearchEntry[]>();
  for (const entry of results) {
    const group = map.get(entry.section) ?? [];
    group.push(entry);
    map.set(entry.section, group);
  }
  return map;
}

// ─── Search Modal ─────────────────────────────────────────────────────────────

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const results = searchDocs(query);
  const grouped = groupBySection(results);

  // Flat ordered list for keyboard navigation (recommended when idle)
  const flat: SearchEntry[] = query === ""
    ? recommended
    : Array.from(grouped.values()).flat();

  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Reset active index when results change
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  React.useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function navigate(href: string) {
    router.push(href);
    onOpenChange(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[activeIndex]) navigate(flat[activeIndex].href);
    }
  }

  // Compute absolute index across groups
  let globalIndex = 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />

        {/* Panel */}
        <Dialog.Content
          className="fixed left-1/2 top-[15vh] z-50 w-full max-w-xl -translate-x-1/2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          onKeyDown={handleKeyDown}
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>

          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchIcon size={16} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs…"
                className="h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              )}
              <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {query === "" && (
                <div className="py-2">
                  <div className="flex items-center gap-2 px-4 pb-1 pt-3">
                    <Sparkles size={11} className="text-muted-foreground/60" />
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                      Recommended
                    </span>
                  </div>
                  {recommended.map((entry, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={entry.href}
                        data-active={isActive}
                        onClick={() => navigate(entry.href)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                          isActive ? "bg-muted" : "hover:bg-muted/50"
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p className={cn(
                            "truncate text-sm font-medium",
                            isActive ? "text-foreground" : "text-foreground/80"
                          )}>
                            {entry.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {entry.section}
                          </p>
                        </div>
                        <ArrowRight
                          size={14}
                          className={cn(
                            "shrink-0 transition-opacity",
                            isActive ? "text-primary opacity-100" : "opacity-0"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {query !== "" && results.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No results for{" "}
                    <span className="font-medium text-foreground">"{query}"</span>
                  </p>
                </div>
              )}

              {query !== "" && results.length > 0 && (
                <div className="py-2">
                  {Array.from(grouped.entries()).map(([section, entries]) => (
                    <div key={section}>
                      {/* Section label */}
                      <div className="flex items-center gap-2 px-4 pb-1 pt-3">
                        <Hash size={11} className="text-muted-foreground/60" />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                          {section}
                        </span>
                      </div>

                      {/* Items */}
                      {entries.map((entry) => {
                        const idx = globalIndex++;
                        const isActive = idx === activeIndex;
                        return (
                          <button
                            key={entry.href}
                            data-active={isActive}
                            onClick={() => navigate(entry.href)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                              isActive ? "bg-muted" : "hover:bg-muted/50"
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "truncate text-sm font-medium",
                                  isActive ? "text-foreground" : "text-foreground/80"
                                )}
                              >
                                <Highlight text={entry.title} query={query} />
                              </p>
                              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                <Highlight text={entry.description} query={query} />
                              </p>
                            </div>
                            <ArrowRight
                              size={14}
                              className={cn(
                                "shrink-0 transition-opacity",
                                isActive ? "text-primary opacity-100" : "opacity-0"
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            {(query === "" || results.length > 0) && (
              <div className="flex items-center gap-4 border-t border-border px-4 py-2.5">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                  <kbd className="inline-flex h-4 items-center rounded border border-border bg-muted px-1 text-[10px] font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                  <kbd className="inline-flex h-4 items-center rounded border border-border bg-muted px-1 text-[10px] font-mono">↵</kbd>
                  open
                </span>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Search Trigger ───────────────────────────────────────────────────────────

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  // Register ⌘K / Ctrl+K globally
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClick();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClick]);

  return (
    <button
      onClick={onClick}
      className="hidden sm:flex items-center gap-2 h-8 rounded-md border border-border bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      aria-label="Search documentation"
    >
      <SearchIcon size={13} />
      <span className="text-xs">Search docs…</span>
      <kbd className="ml-1 inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}
