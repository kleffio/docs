"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

export function SidebarAside() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  // Close sidebar on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Mobile: fixed overlay, slides in from left
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 transition-transform duration-200 ease-in-out lg:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop: sticky, always visible
          "lg:sticky lg:translate-x-0 lg:w-60 lg:shrink-0",
          "overflow-y-auto border-r border-border bg-card/50"
        )}
      >
        <Sidebar />
      </aside>
    </>
  );
}
