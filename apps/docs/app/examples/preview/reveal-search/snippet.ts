export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Leaf, Search } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-search"
          logo={
            <span className="flex items-center gap-2 font-bold">
              <Leaf className="size-5 text-emerald-600" />
              Market
            </span>
          }
          title="Fresh today"
          subtitle="Delivery before 6 pm"
          searchContent={
            <label className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-muted px-3.5 py-2">
              <Search className="size-4" />
              <input placeholder="Search 2,400 products" />
            </label>
          }
        />
        <Content>
          {/* Scroll down: the header scrolls away. Scroll up: the
              search row returns as an overlay — discovery stays
              one gesture away, without pinning the whole header. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
