export const snippet = `import { AppShell, Header, Content, Footer, FooterItem, SafeArea, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { House, Layers, Settings } from "lucide-react";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      {/* safeArea pads the header by the top inset, the footer by the bottom one */}
      <AppShell safeArea>
        <Header behavior="fixed" logo={<span className="font-bold">Inset</span>} />

        <Content>
          {/* Pad any region yourself — pick the edges it should respect */}
          <SafeArea edges={["left", "right"]}>
            {/* full-bleed map / carousel / video */}
          </SafeArea>

          {/* The insets are plain CSS variables, so you can visualize them: */}
          <div
            style={{ height: "var(--sa-top, 0px)" }}
            className="fixed inset-x-0 top-0 bg-orange-500/25"
          />
          {/* --sa-top falls back to env(safe-area-inset-top) on real devices */}
        </Content>

        <Footer variant="tab-bar" behavior="static">
          <FooterItem icon={<House className="size-5" />} label="Home" active />
          <FooterItem icon={<Layers className="size-5" />} label="Layers" />
          <FooterItem icon={<Settings className="size-5" />} label="Settings" />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}`;
