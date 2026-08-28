export const snippet = `import { AppShell, Header, HeaderNav, HeaderNavItem, NavGroup, NavItem, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Cloud, Workflow, ChartColumn } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={<span className="flex items-center gap-2 font-bold"><Cloud className="size-5" /> Nimbus</span>}
          nav={
            <HeaderNav>
              {/* Children of a HeaderNavItem become its dropdown panel */}
              <HeaderNavItem label="Product">
                <a className="dropdown-row"><Workflow /> Pipelines</a>
                <a className="dropdown-row"><ChartColumn /> Metrics</a>
              </HeaderNavItem>
              <HeaderNavItem label="Pricing" href="/pricing" />
            </HeaderNav>
          }
          actions={<button className="btn-primary">Start free</button>}
          mobileMenu={
            /* On small screens the nav hides and a hamburger opens this drawer */
            <NavGroup title="Product" defaultOpen>
              <NavItem icon={<Workflow className="size-4" />} label="Pipelines" />
            </NavGroup>
          }
        />
        <Content>{/* hero, features, pricing… */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
