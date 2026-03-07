import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbar = (
    <Navbar
      logo={
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-black dark:bg-white">
            <svg
              className="size-4 text-white dark:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">AppShell</span>
        </div>
      }
      projectLink="https://github.com/fyalavuz/appshell-react"
    />
  );

  const footer = (
    <Footer className="text-sm">
      MIT {new Date().getFullYear()} &copy; AppShell React — Built by{" "}
      <a
        href="https://github.com/fyalavuz"
        className="underline underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        Furkan Yalavuz
      </a>
    </Footer>
  );

  return (
    <Layout
      navbar={navbar}
      footer={footer}
      docsRepositoryBase="https://github.com/fyalavuz/appshell-react/tree/main/apps/docs/content"
      pageMap={await getPageMap("/docs")}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
    >
      <Head />
      {children}
    </Layout>
  );
}
