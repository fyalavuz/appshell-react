import { SiteHeader } from "@/components/site-header";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-1 px-4 sm:px-6">
        <DocsSidebar />
        <main className="min-w-0 flex-1 py-8 md:pl-10 md:py-10">
          <div className="mx-auto w-full max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
