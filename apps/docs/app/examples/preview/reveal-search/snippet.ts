export const snippet = `import { AppShell, Header, Content, SearchField, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Leaf } from "lucide-react";

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
          searchContent={<SearchField placeholder="Search 2,400 products" />}
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
