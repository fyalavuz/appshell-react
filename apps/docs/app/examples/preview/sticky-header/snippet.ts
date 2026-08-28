export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { MessageSquare, SquarePen } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          logo={
            <span className="flex items-center gap-2 font-bold">
              <MessageSquare className="size-5 text-violet-600" />
              Chirp
            </span>
          }
          actions={<button aria-label="New message"><SquarePen /></button>}
          title="Messages"
          subtitle="3 unread"
        />
        <Content>
          {/* "sticky" pins the whole header, like "fixed", but uses
              position: sticky — the lightest always-visible option. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
