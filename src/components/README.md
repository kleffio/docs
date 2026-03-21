# docs/src/components

UI components used across the documentation site.

## layout/

Page chrome and structural components. These are wired up in `src/app/docs/layout.tsx` and `src/app/layout.tsx`.

| File | Purpose |
|---|---|
| `Navbar.tsx` | Top navigation bar |
| `Sidebar.tsx` | Left sidebar with navigation tree |
| `SidebarAside.tsx` | Sidebar wrapper/aside container |
| `sidebar-context.tsx` | React context for mobile sidebar open/close state |
| `PageHeader.tsx` | Page title and description header |
| `PageNav.tsx` | Previous / Next page navigation links |
| `TableOfContents.tsx` | Right-side heading anchor list |
| `Footer.tsx` | Page footer |
| `LastUpdated.tsx` | Displays last git commit date for a page |
| `ViewSource.tsx` | Link to view the page source |

## ui/

Reusable MDX-facing components. All are mapped globally in `src/mdx-components.tsx` so they can be used in `.mdx` files without importing.

| File | MDX Usage | Purpose |
|---|---|---|
| `callout.tsx` | `<Callout type="info">` | Highlighted info/warning/error blocks |
| `badge.tsx` | `<Badge variant="stable">` | Inline status or version badges |
| `tabs.tsx` | `<Tabs><Tabs.Tab label="">` | Tabbed content |
| `code-group.tsx` | `<CodeGroup><CodeGroup.Block label="">` | Multi-tab code examples |
| `pre.tsx` | Rendered automatically for code blocks | Styled code block wrapper |
| `alert.tsx` | Internal use | Alert primitive |
| `separator.tsx` | Internal use | Horizontal rule primitive |

## Adding a Component

1. Create the component in the appropriate folder.
2. If it should be available in MDX files without an import, add it to `src/mdx-components.tsx`.
