export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Plane } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={
            <span className="flex items-center gap-2 font-bold">
              <Plane className="size-5 text-sky-600" />
              Atlas
            </span>
          }
          actions={<button aria-label="Account">{/* avatar */}</button>}
          title="Tokyo in five days"
          subtitle="Apr 14 – 19 · 2 travelers"
        />
        <Content>
          {/* The header stays pinned; the itinerary scrolls beneath it. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
