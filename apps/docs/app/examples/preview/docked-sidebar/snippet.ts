export const snippet = `import { AppShell, Header, Content, Sidebar, NavGroup, NavItem } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false); // mobile drawer fallback

  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span className="font-bold">Terra</span>} />

      {/* Docked on md+, overlay drawer below md.
          AppShell places it into a two-column layout automatically. */}
      <Sidebar
        variant="docked"
        breakpoint="md"
        collapsible          /* collapse to an icon rail */
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavGroup title="Projects" defaultOpen>
          <NavItem label="Atlas launch" active />
          <NavItem label="Website refresh" />
        </NavGroup>
      </Sidebar>

      <Content className="p-4">{/* task board */}</Content>
    </AppShell>
  );
}`;
