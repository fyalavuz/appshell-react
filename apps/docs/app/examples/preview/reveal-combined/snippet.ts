export const snippet = `import { AppShell, Header, Content, Footer, FooterItem, MotionProvider, SearchField } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { House, Search, CirclePlus, Bell, User } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Scroll down: header rows AND tab bar leave. Scroll up: both return. */}
        <Header
          behavior="reveal-all"
          logo={<span className="font-bold">Pulse</span>}
          searchContent={<SearchField variant="full" placeholder="Search Pulse" />}
        />

        <Content>{/* feed */}</Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem icon={<House className="size-5" />} label="Home"
            active={tab === "home"} onClick={() => setTab("home")} />
          <FooterItem icon={<Search className="size-5" />} label="Search"
            active={tab === "search"} onClick={() => setTab("search")} />
          <FooterItem icon={<CirclePlus className="size-5" />} label="Create"
            active={tab === "create"} onClick={() => setTab("create")} />
          <FooterItem icon={<Bell className="size-5" />} label="Alerts" badge={2}
            active={tab === "alerts"} onClick={() => setTab("alerts")} />
          <FooterItem icon={<User className="size-5" />} label="Profile"
            active={tab === "profile"} onClick={() => setTab("profile")} />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}`;
