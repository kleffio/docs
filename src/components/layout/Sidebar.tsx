"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, isNavGroup, hrefFor, type NavLeaf, type NavGroup, type NavSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

function LeafLink({ item, prefix, pathname }: { item: NavLeaf; prefix: string; pathname: string }) {
  const href = hrefFor(prefix, item.slug);
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block rounded-md px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}

function GroupItems({ group, prefix, pathname }: { group: NavGroup; prefix: string; pathname: string }) {
  return (
    <li className="flex flex-col">
      <span className="block px-2 py-1.5 text-sm font-medium text-foreground/70">
        {group.label}
      </span>
      <ul className="mt-0.5 space-y-0.5 border-l border-border ml-3">
        {group.items.map((leaf) => {
          const href = hrefFor(prefix, leaf.slug);
          const isActive = pathname === href;
          return (
            <li key={leaf.slug}>
              <Link
                href={href}
                className={cn(
                  "block rounded-md pl-3 pr-2 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {leaf.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

function Section({ section, pathname }: { section: NavSection; pathname: string }) {
  return (
    <div>
      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
        {section.title}
      </p>
      <ul className="space-y-0.5">
        {section.items.map((item) =>
          isNavGroup(item) ? (
            <GroupItems key={item.label} group={item} prefix={section.prefix} pathname={pathname} />
          ) : (
            <LeafLink key={item.slug} item={item} prefix={section.prefix} pathname={pathname} />
          )
        )}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 py-6 px-4">
      {navigation.map((section) => (
        <Section key={section.title} section={section} pathname={pathname} />
      ))}
    </nav>
  );
}
