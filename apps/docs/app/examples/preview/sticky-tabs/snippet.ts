export const snippet = `import { AppShell, Header, Content, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

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

        {/* The Header keeps --header-height in sync, so a sibling
            can dock right below it with position: sticky. */}
        <div
          style={{ top: "var(--header-height)" }}
          className="sticky z-40 border-b bg-background/95 backdrop-blur"
        >
          {["posts", "replies", "media", "likes"].map((id) => (
            <button key={id} onClick={() => setTab(id)}>
              {id}
            </button>
          ))}
        </div>

        <Content>{/* content for the active tab */}</Content>
      </AppShell>
    </MotionProvider>
  );
}`;
