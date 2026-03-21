# docs/src/app/docs

All documentation pages live here as MDX files. Each folder corresponds to a section in the sidebar.

## Structure

```
docs/
  getting-started/    → /docs/getting-started
  platform/           → /docs/platform/*
  daemon/             → /docs/daemon/*
  panel/              → /docs/panel/*
  infra/              → /docs/infra/*
  api/                → /docs/api/*
```

Each section folder contains one subfolder per page, each with a single `page.mdx`.

## Sections

| Folder | Sidebar Title | Content |
|---|---|---|
| `getting-started/` | Getting Started | Introduction, architecture overview, quick start |
| `platform/` | Platform API | Go control plane modules, authentication, deployments, nodes, orgs, billing, audit |
| `daemon/` | Gameserver Daemon | Node agent architecture, registration, deployment execution |
| `panel/` | Management Panel | Next.js UI overview and authentication |
| `infra/` | Infrastructure | Local dev setup, deployment overview |
| `api/` | API Reference | HTTP authentication and endpoint reference |

## Writing Pages

Each `page.mdx` must export a `metadata` object:

```mdx
export const metadata = {
  title: "Page Title",
  description: "Used for SEO and the page header.",
};

# Page Title

Content here.
```

After creating a page, register it in [`src/lib/nav.ts`](../../lib/nav.ts).
