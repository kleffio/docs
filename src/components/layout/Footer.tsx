import Link from "next/link";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/docs/platform/overview" },
      { label: "Authentication", href: "/docs/platform/authentication" },
      { label: "Deployments", href: "/docs/platform/deployments" },
      { label: "Nodes", href: "/docs/platform/nodes" },
      { label: "Organizations", href: "/docs/platform/organizations" },
      { label: "Billing", href: "/docs/platform/billing" },
    ],
  },
  {
    title: "Daemon",
    links: [
      { label: "Overview", href: "/docs/daemon/overview" },
      { label: "Node Registration", href: "/docs/daemon/node-registration" },
      { label: "Deployment Execution", href: "/docs/daemon/deployment-execution" },
    ],
  },
  {
    title: "Panel",
    links: [
      { label: "Overview", href: "/docs/panel/overview" },
      { label: "Authentication", href: "/docs/panel/authentication" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Overview", href: "/docs/infra/overview" },
      { label: "Local Development", href: "/docs/infra/local-dev" },
    ],
  },
  {
    title: "API Reference",
    links: [
      { label: "Authentication", href: "/docs/api/authentication" },
      { label: "Endpoints", href: "/docs/api/endpoints" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="mx-auto max-w-7xl px-8 py-16">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1fr_repeat(5,auto)]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link
              href="/docs/getting-started"
              className="flex items-center gap-2.5 w-fit"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 border border-primary/30">
                <span className="text-primary font-bold text-sm leading-none">K</span>
              </div>
              <span className="font-semibold text-foreground text-sm">Kleff</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Open-source game server hosting platform. Self-host and manage your game servers with full control.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-auto">
              &copy; {new Date().getFullYear()} Kleff. All rights reserved.
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50">
            Built with Next.js &amp; Tailwind CSS
          </p>
          <Link
            href="/docs/getting-started"
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Documentation v0.1
          </Link>
        </div>
      </div>
    </footer>
  );
}
