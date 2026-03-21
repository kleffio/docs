import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Navbar } from "@/components/layout/Navbar";
import { SidebarAside } from "@/components/layout/SidebarAside";
import { PageNav } from "@/components/layout/PageNav";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { Footer } from "@/components/layout/Footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Navbar />

        <div className="flex flex-1 pt-14">
          <SidebarAside />

          {/* Main content */}
          <main className="flex-1 min-w-0 flex justify-center">
            <div className="w-full max-w-3xl px-6 lg:px-10 py-12 min-w-0">
              <div className="prose">{children}</div>
              <PageNav />
            </div>

            {/* Right TOC — hidden on small screens */}
            <aside className="hidden xl:block w-56 shrink-0 py-12">
              <div className="sticky top-20 pr-2">
                <TableOfContents />
              </div>
            </aside>
          </main>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
}
