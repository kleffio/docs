# docs/src/lib

Shared utilities for the docs site.

## nav.ts

Defines the full documentation navigation tree as a typed `NavSection[]` array. This is the single source of truth for the sidebar, previous/next page links, and any navigation rendering.

**Types:**
- `NavLeaf` — a single page: `{ label, slug }`
- `NavGroup` — a collapsible group with children: `{ label, items }`
- `NavSection` — a top-level sidebar section: `{ title, prefix, items }`

**Key exports:**
- `navigation` — the full nav tree
- `hrefFor(prefix, slug)` — builds a `/docs/<prefix>/<slug>` URL
- `flattenNav()` — returns all pages as a flat `FlatPage[]` (used for prev/next links)
- `isNavGroup(item)` — type guard

To add a page to the sidebar, add a `NavLeaf` entry to the relevant section's `items` array. The `slug` must match the folder name under `src/app/docs/<prefix>/`.

## utils.ts

Shared utility helpers (e.g. `cn()` for merging Tailwind class names).
