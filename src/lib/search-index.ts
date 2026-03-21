export type SearchEntry = {
  title: string;
  section: string;
  href: string;
  description: string;
};

export const searchIndex: SearchEntry[] = [
  // ── Getting Started ───────────────────────────────────────────────────────
  {
    title: "Introduction",
    section: "Getting Started",
    href: "/docs/getting-started",
    description: "Get started with Kleff — the game server hosting and deployment platform.",
  },

  // ── Platform API ──────────────────────────────────────────────────────────
  {
    title: "Platform Overview",
    section: "Platform API",
    href: "/docs/platform/overview",
    description: "High-level architecture of the Kleff control plane — modules, hexagonal layout, and API server.",
  },
  {
    title: "Authentication & Authorization",
    section: "Platform API",
    href: "/docs/platform/authentication",
    description: "OIDC-based bearer token auth, JWT claims, and role-based access control.",
  },
  {
    title: "Error Handling",
    section: "Platform API",
    href: "/docs/platform/error-handling",
    description: "How the platform structures errors and maps domain failures to HTTP responses.",
  },
  {
    title: "Domain Events",
    section: "Platform API",
    href: "/docs/platform/events",
    description: "In-process event bus, event catalog, and cross-process delivery to daemons.",
  },
  {
    title: "Identity",
    section: "Platform API",
    href: "/docs/platform/identity",
    description: "User profiles, first-login OIDC sync, and the /identity/me endpoint.",
  },
  {
    title: "Deployments",
    section: "Platform API",
    href: "/docs/platform/deployments",
    description: "Deployment model, status lifecycle, daemon dispatch, and API endpoints.",
  },
  {
    title: "Nodes",
    section: "Platform API",
    href: "/docs/platform/nodes",
    description: "Compute node tracking, capacity management, and heartbeat protocol.",
  },
  {
    title: "Organizations",
    section: "Platform API",
    href: "/docs/platform/organizations",
    description: "Multi-tenant boundaries, membership, and RBAC roles.",
  },
  {
    title: "Billing",
    section: "Platform API",
    href: "/docs/platform/billing",
    description: "Stripe subscriptions, invoicing, and usage metering.",
  },
  {
    title: "Audit Log",
    section: "Platform API",
    href: "/docs/platform/audit",
    description: "Append-only immutable event log with cursor-based pagination.",
  },

  // ── Gameserver Daemon ─────────────────────────────────────────────────────
  {
    title: "Daemon Overview",
    section: "Gameserver Daemon",
    href: "/docs/daemon/overview",
    description: "Architecture and responsibilities of the gameserver-daemon.",
  },
  {
    title: "Configuration",
    section: "Gameserver Daemon",
    href: "/docs/daemon/configuration",
    description: "Complete environment variable reference for the gameserver-daemon.",
  },
  {
    title: "Node Registration & Heartbeats",
    section: "Gameserver Daemon",
    href: "/docs/daemon/node-registration",
    description: "How the daemon registers nodes and reports capacity to the platform.",
  },
  {
    title: "Deployment Execution",
    section: "Gameserver Daemon",
    href: "/docs/daemon/deployment-execution",
    description: "How the daemon receives events and runs game server containers.",
  },
  {
    title: "Log Aggregation",
    section: "Gameserver Daemon",
    href: "/docs/daemon/log-aggregation",
    description: "How the daemon collects and streams container logs to the platform.",
  },

  // ── Management Panel ──────────────────────────────────────────────────────
  {
    title: "Panel Overview",
    section: "Management Panel",
    href: "/docs/panel/overview",
    description: "Architecture of the Next.js 15 management interface.",
  },
  {
    title: "Panel Authentication",
    section: "Management Panel",
    href: "/docs/panel/authentication",
    description: "OIDC Authorization Code + PKCE flow implementation in the Next.js panel.",
  },
  {
    title: "Data Fetching",
    section: "Management Panel",
    href: "/docs/panel/data-fetching",
    description: "Fetching data from the Platform API using Axios and React Query.",
  },
  {
    title: "UI Components",
    section: "Management Panel",
    href: "/docs/panel/components",
    description: "The panel's primitive component library — usage, variants, and patterns.",
  },

  // ── Infrastructure ────────────────────────────────────────────────────────
  {
    title: "Infrastructure Overview",
    section: "Infrastructure",
    href: "/docs/infra/overview",
    description: "GitOps deployment via ArgoCD — directory structure and included applications.",
  },
  {
    title: "Local Development",
    section: "Infrastructure",
    href: "/docs/infra/local-dev",
    description: "Running the full Kleff stack locally with Docker Compose and live reload.",
  },
  {
    title: "Production Deployment",
    section: "Infrastructure",
    href: "/docs/infra/production",
    description: "Deploying to a production Kubernetes cluster with ArgoCD, secrets, and ingress.",
  },
  {
    title: "Keycloak",
    section: "Infrastructure",
    href: "/docs/infra/keycloak",
    description: "Setting up Keycloak as the OIDC provider — realm, client, JWT claims, and roles.",
  },

  // ── API Reference ─────────────────────────────────────────────────────────
  {
    title: "API Authentication",
    section: "API Reference",
    href: "/docs/api/authentication",
    description: "How to authenticate requests to the Kleff platform API with bearer tokens.",
  },
  {
    title: "API Endpoints",
    section: "API Reference",
    href: "/docs/api/endpoints",
    description: "Comprehensive reference for all Kleff REST API endpoints.",
  },
  {
    title: "Pagination",
    section: "API Reference",
    href: "/docs/api/pagination",
    description: "Page-based and cursor-based pagination for list endpoints.",
  },
  {
    title: "Error Reference",
    section: "API Reference",
    href: "/docs/api/errors",
    description: "Complete reference for API error codes, HTTP statuses, and retry guidance.",
  },
];

export function searchDocs(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchIndex
    .filter((entry) => {
      const haystack = `${entry.title} ${entry.description} ${entry.section}`.toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      // Exact title match first
      if (aTitle === q && bTitle !== q) return -1;
      if (bTitle === q && aTitle !== q) return 1;
      // Title starts-with second
      if (aTitle.startsWith(q) && !bTitle.startsWith(q)) return -1;
      if (bTitle.startsWith(q) && !aTitle.startsWith(q)) return 1;
      // Title contains third
      if (aTitle.includes(q) && !bTitle.includes(q)) return -1;
      if (bTitle.includes(q) && !aTitle.includes(q)) return 1;
      return 0;
    });
}
