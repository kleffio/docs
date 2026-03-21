"use client";

import React from "react";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./tabs";

interface CodeBlockProps {
  label: string;
  children: React.ReactNode;
}

function CodeBlock({ children }: CodeBlockProps) {
  return <div>{children}</div>;
}

interface CodeGroupProps {
  children:
    | React.ReactElement<CodeBlockProps>
    | React.ReactElement<CodeBlockProps>[];
}

function CodeGroup({ children }: CodeGroupProps) {
  const blocks = React.Children.toArray(children) as React.ReactElement<CodeBlockProps>[];

  return (
    <TabsRoot defaultValue="0" className="my-5">
      <div className="flex items-center border-b border-border bg-card rounded-t-lg px-3 pt-1">
        <TabsList className="h-auto bg-transparent p-0 gap-0 rounded-none">
          {blocks.map((block, i) => (
            <TabsTrigger
              key={i}
              value={String(i)}
              className="rounded-none border-b-2 border-transparent px-3 py-2.5 text-xs font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {block.props.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {blocks.map((block, i) => (
        <TabsContent
          key={i}
          value={String(i)}
          className="mt-0 [&_pre]:!rounded-t-none [&_pre]:!border-t-0 [&_pre]:!my-0"
        >
          {block}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}

CodeGroup.Block = CodeBlock;

export { CodeGroup, CodeBlock };
