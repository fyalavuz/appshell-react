export const snippet = `import { AppShell, Sidebar, BottomSheet, SearchModal } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Nesting guarantees the open order: Sidebar, then Sheet, then Search.
  // The overlay stack handles the rest — Escape (or Android back) always
  // closes just the topmost layer, and the page stays scroll-locked until
  // the last one closes.
  return (
    <AppShell safeArea>
      <div className="fixed inset-0">{/* map canvas */}</div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} aria-label="Saved trails">
        <button onClick={() => setSheetOpen(true)}>Widowmaker Ridge</button>
      </Sidebar>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} aria-label="Trail details">
        <button onClick={() => setSearchOpen(true)}>Search other trails</button>
      </BottomSheet>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} aria-label="Search trails">
        {(q) => <TrailResults query={q} />}
      </SearchModal>
    </AppShell>
  );
}`;
