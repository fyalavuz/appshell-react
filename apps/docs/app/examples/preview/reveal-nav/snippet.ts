export const snippet = `import {
  AppShell, Header, HeaderNav, HeaderNavItem, Content, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav"
          logo={<span className="font-black">Wire.</span>}
          nav={
            <HeaderNav>
              <HeaderNavItem label="Top" active />
              <HeaderNavItem label="World" />
              <HeaderNavItem label="Tech" />
              <HeaderNavItem label="Culture" />
            </HeaderNav>
          }
          title="Top Stories"
          subtitle="Thursday, Aug 28"
        />
        <Content>
          {/* Scroll down: the whole header scrolls away.
              Scroll up: only the nav row returns as an overlay —
              the title row stays hidden until you reach the top. */}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}`;
