export const snippet = `import { AppShell, Header, Content, Footer, FooterItem, SafeArea, useSafeArea, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { House, Layers, Settings } from "lucide-react";

// The platform standard drives everything: env(safe-area-inset-*).
// Opt in once in your HTML head (iOS and Android alike):
//   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

export default function App() {
  const insets = useSafeArea(); // resolved env() values in px, if you need numbers

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

          {/* Visualize the top inset with the measured value */}
          <div
            style={{ height: insets.top }}
            className="fixed inset-x-0 top-0 bg-orange-500/25"
          />
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
