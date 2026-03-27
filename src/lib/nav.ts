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
      { label: "Error Handling", slug: "error-handling" },
      { label: "Domain Events", slug: "events" },
      {
        label: "Modules",
        items: [
          { label: "Identity", slug: "identity" },
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
      { label: "Configuration", slug: "configuration" },
      { label: "Node Registration", slug: "node-registration" },
      { label: "Deployment Execution", slug: "deployment-execution" },
      { label: "Log Aggregation", slug: "log-aggregation" },
    ],
  },
  {
    title: "Management Panel",
    prefix: "panel",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Authentication", slug: "authentication" },
      { label: "Data Fetching", slug: "data-fetching" },
      { label: "UI Components", slug: "components" },
    ],
  },
  {
    title: "Infrastructure",
    prefix: "infra",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Local Development", slug: "local-dev" },
      { label: "Production Deployment", slug: "production" },
      { label: "Keycloak", slug: "keycloak" },
    ],
  },
  {
    title: "API Reference",
    prefix: "api",
    items: [
      { label: "Authentication", slug: "authentication" },
      { label: "Endpoints", slug: "endpoints" },
      { label: "Pagination", slug: "pagination" },
      { label: "Errors", slug: "errors" },
    ],
  },
  {
    title: "Plugins",
    prefix: "plugins",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Authoring a Plugin", slug: "authoring" },
      {
        label: "SDK & Reference",
        items: [
          { label: "SDK Reference", slug: "sdk-reference" },
          { label: "Common Types", slug: "sdk-common-types" },
          { label: "IDP Types", slug: "sdk-idp-types" },
          { label: "Capabilities", slug: "capabilities" },
          { label: "Manifest Reference", slug: "manifest-reference" },
          { label: "Plugin Lifecycle", slug: "lifecycle" },
          { label: "Security", slug: "security" },
        ],
      },
      {
        label: "Capability Guides",
        items: [
          { label: "Identity Provider", slug: "identity-provider" },
          { label: "Token Validation", slug: "idp-token-validation" },
          { label: "Optional RPCs", slug: "idp-optional-rpcs" },
          { label: "API Middleware", slug: "api-middleware" },
          { label: "UI Contributions", slug: "ui-contributions" },
          { label: "HTTP Routes", slug: "http-routes" },
        ],
      },
      {
        label: "Publishing",
        items: [
          { label: "Testing with grpcurl", slug: "testing" },
          { label: "Integration Testing", slug: "testing-integration" },
          { label: "Publishing", slug: "publishing" },
        ],
      },
      {
        label: "Official Plugins",
        items: [
          { label: "Keycloak (idp-keycloak)", slug: "idp-keycloak" },
        ],
      },
    ],
  },
];
