export const snippet = `import { AppShell, Header, Content, SearchField, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Bell } from "lucide-react";

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
          searchContent={<SearchField placeholder="Search Pulse" />}
        />
        <Content>
          {/* Scroll down: title + search rows hide. Scroll up: all rows reveal. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
