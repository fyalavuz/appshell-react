export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Bell, Search } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          logo={<span className="font-bold">Pulse</span>}
          actions={<button aria-label="Notifications"><Bell /></button>}
          title="Home"
          subtitle="Catch up on today"
          searchContent={
            <label className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="size-4" />
              <input placeholder="Search Pulse" />
            </label>
          }
        />
        <Content>
          {/* Scroll down: all rows hide. Scroll up: all rows reveal. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
