export type NavLeaf = { label: string; slug: string };
export type NavGroup = { label: string; items: NavLeaf[] };
export type NavSection = {
  title: string;
  /** URL prefix after /docs/, e.g. "platform" → /docs/platform/{slug} */
  prefix: string;
  items: (NavLeaf | NavGroup)[];
};

export function isNavGroup(item: NavLeaf | NavGroup): item is NavGroup {
  return "items" in item;
}

export function hrefFor(prefix: string, slug: string): string {
  return prefix ? `/docs/${prefix}/${slug}` : `/docs/${slug}`;
}

export type FlatPage = { label: string; href: string; section: string };

export function flattenNav(): FlatPage[] {
  const pages: FlatPage[] = [];
  for (const section of navigation) {
    for (const item of section.items) {
      if (isNavGroup(item)) {
        for (const leaf of item.items) {
          pages.push({ label: leaf.label, href: hrefFor(section.prefix, leaf.slug), section: section.title });
        }
      } else {
        pages.push({ label: item.label, href: hrefFor(section.prefix, item.slug), section: section.title });
      }
    }
  }
  return pages;
}

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    prefix: "",
    items: [{ label: "Introduction", slug: "getting-started" }],
  },
  {
    title: "Platform API",
    prefix: "platform",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Authentication", slug: "authentication" },
      {
        label: "Modules",
        items: [
          { label: "Deployments", slug: "deployments" },
          { label: "Nodes", slug: "nodes" },
          { label: "Organizations", slug: "organizations" },
          { label: "Billing", slug: "billing" },
          { label: "Audit Log", slug: "audit" },
        ],
      },
    ],
  },
  {
    title: "Gameserver Daemon",
    prefix: "daemon",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Node Registration", slug: "node-registration" },
      { label: "Deployment Execution", slug: "deployment-execution" },
    ],
  },
  {
    title: "Management Panel",
    prefix: "panel",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Authentication", slug: "authentication" },
    ],
  },
  {
    title: "Infrastructure",
    prefix: "infra",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Local Development", slug: "local-dev" },
    ],
  },
  {
    title: "API Reference",
    prefix: "api",
    items: [
      { label: "Authentication", slug: "authentication" },
      { label: "Endpoints", slug: "endpoints" },
    ],
  },
];
