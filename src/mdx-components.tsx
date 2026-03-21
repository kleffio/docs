import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/callout";
import { CodeGroup, CodeBlock } from "@/components/ui/code-group";
import { Tabs, Tab } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pre } from "@/components/ui/pre";
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
