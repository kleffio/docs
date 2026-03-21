"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pre({ className, children, ...props }: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!preRef.current) return;
    await navigator.clipboard.writeText(preRef.current.textContent ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/pre">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={copy}
        aria-label="Copy code"
        className={cn(
          "absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium transition-all",
          "opacity-0 group-hover/pre:opacity-100",
          copied
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
