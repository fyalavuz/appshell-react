export const snippet = `import { AppShell, Header, Content, Footer, useScrollDirection } from "appshell-react";

function GlassDock() {
  const scrollDirection = useScrollDirection();
  const condensed = scrollDirection === "down";

  return (
    <div
      className="mb-3 rounded-[26px] border border-white/45 bg-white/55
                 backdrop-blur-2xl backdrop-saturate-150 shadow-xl shadow-black/15
                 transition-all duration-500 dark:border-white/10 dark:bg-zinc-900/55"
    >
      {condensed ? (
        <ActivePill />              /* just the active icon + label */
      ) : (
        <DockIcons />               /* full icon row, magnify on hover */
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" className="border-b-0 bg-background/70 backdrop-blur-2xl" />
      <Content className="pb-32">{/* Wallpaper grid */}</Content>

      {/* The floating slot positions and safe-area-pads the dock */}
      <Footer variant="floating" position="center">
        <GlassDock />
      </Footer>
    </AppShell>
  );
}`;
