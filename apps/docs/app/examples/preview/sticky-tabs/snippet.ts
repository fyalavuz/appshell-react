export const snippet = `import { AppShell, Header, Content, Tabs, Tab, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { useState } from "react";

export default function App() {
  const [tab, setTab] = useState("posts");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={<span className="font-bold">Orbit</span>}
          title="Nadia Reyes"
          subtitle="@nadia · Product designer"
        />

        {/* Docks itself below the fixed header via --header-height —
            real tablist semantics, arrow-key navigation included. */}
        <Tabs value={tab} onValueChange={setTab} aria-label="Profile sections">
          <Tab value="posts" label="Posts" />
          <Tab value="replies" label="Replies" />
          <Tab value="media" label="Media" />
          <Tab value="likes" label="Likes" />
        </Tabs>

        <Content>{/* content for the active tab */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
