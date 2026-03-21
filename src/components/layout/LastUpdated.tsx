"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function LastUpdated() {
  const pathname = usePathname();
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/last-updated?path=${pathname}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.mtime) {
          setDate(
            new Date(data.mtime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
        }
      })
      .catch(() => {});
  }, [pathname]);

  if (!date) return null;

  return (
    <p className="mt-1 text-sm text-muted-foreground">
      Last updated {date}
    </p>
  );
}
