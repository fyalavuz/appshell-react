import { SiteHeader } from "@/components/site-header";
import { ExamplesSidebar } from "@/components/examples/examples-sidebar";

export default function ExampleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6">
        <ExamplesSidebar />
        <main className="min-w-0 flex-1 py-10 md:py-14 lg:pl-10">
          {children}
        </main>
      </div>
    </div>
  );
}
