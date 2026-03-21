"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// ─── Shadcn primitives ────────────────────────────────────────────────────────
const TabsRoot = TabsPrimitive.Root;

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className)}
      {...props}
    />
  );
}

// ─── MDX Tabs wrapper ─────────────────────────────────────────────────────────
interface TabProps {
  label: string;
  children: React.ReactNode;
}

function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  defaultTab?: number;
}

function TabsWrapper({ children, defaultTab = 0 }: TabsProps) {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  return (
    <TabsRoot defaultValue={String(defaultTab)} className="my-5">
      <TabsList>
        {tabs.map((tab, i) => (
          <TabsTrigger key={i} value={String(i)}>
            {tab.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={i} value={String(i)} className="pt-3 [&>p:last-child]:mb-0">
          {tab}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

export const Tabs = Object.assign(TabsWrapper, { Tab }) as typeof TabsWrapper & { Tab: typeof Tab };
export { TabsRoot, TabsList, TabsTrigger, TabsContent, Tab };
