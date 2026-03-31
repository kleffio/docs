import type { MDXComponents } from "mdx/types";
import { Callout } from "@kleffio/ui/callout";
import { CodeGroup, CodeBlock } from "@kleffio/ui/code-group";
import { Tabs, Tab } from "@kleffio/ui/mdx-tabs";
import { Badge } from "@kleffio/ui/badge";
import { Pre } from "@kleffio/ui/pre";
import { PageHeader } from "@/components/layout/PageHeader";

(Tabs as any).Tab = Tab;
(CodeGroup as any).Block = CodeBlock;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => <PageHeader>{children}</PageHeader>,
    pre: Pre,
    Callout,
    CodeGroup,
    Tabs,
    Badge,
  };
}
