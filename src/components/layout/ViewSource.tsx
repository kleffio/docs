"use client";

import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

export function ViewSource() {
  const pathname = usePathname();

  return (
    <a
      href={`/api/source?path=${pathname}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
    >
      <FileText size={12} />
      View source
    </a>
  );
}
