export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

const sections = ["basics", "camp-setup", "knots", "weather", "first-aid"];

export default function App() {
  const [active, setActive] = useState(sections[0]);
  // An IntersectionObserver (rootMargin "-120px 0px -65% 0px") sets 'active'.

  const jump = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header behavior="reveal-nav" logo={<span>Handbook</span>} title="The Overnight" />
        {/* Anchor pills dock below the header via the --header-height variable */}
        <div
          style={{ top: "var(--header-height)" }}
          className="sticky z-40 border-b bg-background/95 backdrop-blur"
        >
          <nav className="flex gap-2 overflow-x-auto px-4 py-2.5">
            {sections.map((id) => (
              <button key={id} onClick={() => jump(id)} data-active={active === id}>
                {id}
              </button>
            ))}
          </nav>
        </div>
        {/* Sections carry scroll-mt-28 so anchors land below both bars */}
        <Content>{/* <section id="basics" className="scroll-mt-28">…</section> */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
