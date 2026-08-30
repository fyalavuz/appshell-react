export const snippet = `import { AppShell, Header, Content, Sidebar, NavGroup, NavItem, SearchField, SearchModal, useSearchShortcut } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);       // mobile drawer fallback
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchShortcut(() => setSearchOpen(true));  // ⌘K / Ctrl+K

  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span className="font-bold">Terra</span>} />

      {/* Docked on md+, overlay drawer below md.
          With a docked sidebar, desktop search belongs at its top —
          the header stays clean and the panel's empty space earns its keep. */}
      <Sidebar
        variant="docked"
        breakpoint="md"
        collapsible          /* collapse to an icon rail */
        open={open}
        onClose={() => setOpen(false)}
        topContent={
          <div className="p-3 group-data-[collapsed=true]/sidebar:hidden">
            <SearchField
              inset={false}
              placeholder="Search tasks"
              shortcutHint="⌘K"
              onClick={() => setSearchOpen(true)}
            />
          </div>
        }
      >
        <NavGroup title="Projects" defaultOpen>
          <NavItem label="Atlas launch" active />
          <NavItem label="Website refresh" />
        </NavGroup>
      </Sidebar>

      <Content className="p-4">{/* task board */}</Content>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)}>
        {(q) => <Results query={q} />}
      </SearchModal>
    </AppShell>
  );
}`;
