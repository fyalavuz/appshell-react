export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Bookmark } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="static"
          logo={<span className="font-bold">Journal</span>}
          actions={<button aria-label="Save essay"><Bookmark /></button>}
          title="The Case for the Slow Web"
          subtitle="Elif Aksoy · 14 min read"
        />
        <Content>
          {/* The header scrolls away with the page — nothing stays pinned,
              so long-form reading gets the entire viewport. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
