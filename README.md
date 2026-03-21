# kleff-docs

The Kleff documentation site — a Next.js 15 app that renders MDX content for the Kleff game server hosting platform.

## Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 | App router + MDX page rendering |
| Tailwind CSS | v4 | Styling |
| MDX | 3 | Markdown-based page authoring |
| rehype-pretty-code | 0.14 | Syntax highlighting (GitHub Dark) |
| rehype-slug | 6 | Auto heading anchors |
| remark-gfm | 4 | GitHub Flavored Markdown support |
| pnpm | — | Package manager |

## Getting Started

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build     # production build
pnpm start     # serve production build
```

## Project Structure

```
docs/
  src/
    app/
      docs/           ← documentation pages (MDX)
        getting-started/
        platform/
        daemon/
        panel/
        infra/
        api/
      api/            ← Next.js API routes (last-updated, source)
    components/
      layout/         ← Navbar, Sidebar, TOC, PageHeader, Footer
      ui/             ← Callout, Badge, CodeGroup, Tabs, etc.
    lib/
      nav.ts          ← navigation tree definition
      utils.ts        ← shared helpers
    mdx-components.tsx ← global MDX component mapping
  public/             ← static assets (favicon, etc.)
  next.config.ts      ← MDX + rehype/remark plugins
```

## Adding a New Page

1. Create a new folder and `page.mdx` under `src/app/docs/<section>/<slug>/`.
2. Export a `metadata` object at the top of the file:

```mdx
export const metadata = {
  title: "My Page",
  description: "Short description for SEO.",
};

# My Page

Content goes here.
```

3. Register the page in [`src/lib/nav.ts`](src/lib/nav.ts) so it appears in the sidebar.

## Navigation

All sidebar navigation is defined in `src/lib/nav.ts` as a typed `NavSection[]` tree. Each section has a `prefix` (URL segment) and an `items` array of leaves or groups.

```ts
{
  title: "My Section",
  prefix: "my-section",
  items: [
    { label: "Overview", slug: "overview" },
    {
      label: "Sub-group",
      items: [
        { label: "Detail", slug: "detail" },
      ],
    },
  ],
}
```

This generates routes at `/docs/my-section/overview` and `/docs/my-section/detail`.

## MDX Components

The following components are available globally in all `.mdx` files (no import needed):

| Component | Usage |
|---|---|
| `<Callout>` | Info/warning/error callout blocks |
| `<Badge>` | Inline version or status badges |
| `<Tabs>` / `<Tabs.Tab>` | Tabbed content sections |
| `<CodeGroup>` / `<CodeGroup.Block>` | Multi-tab code blocks |

See [`src/mdx-components.tsx`](src/mdx-components.tsx) for the full mapping and [`src/components/ui/`](src/components/ui/) for component implementations.

## Content Sections

| Section | URL Prefix | Description |
|---|---|---|
| Getting Started | `/docs/getting-started` | Introduction and quick start |
| Platform API | `/docs/platform/` | Control plane architecture and modules |
| Gameserver Daemon | `/docs/daemon/` | Compute node agent |
| Management Panel | `/docs/panel/` | Next.js management UI |
| Infrastructure | `/docs/infra/` | Local dev and deployment infra |
| API Reference | `/docs/api/` | HTTP API endpoints and auth |
