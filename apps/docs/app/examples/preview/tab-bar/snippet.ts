export const snippet = `import {
  AppShell, Header, Content, Footer, FooterItem, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");

  const items = [
    { id: "home", label: "Home", icon: <Home /> },
    { id: "search", label: "Search", icon: <Search /> },
    { id: "create", label: "Create", icon: <PlusCircle /> },
    { id: "activity", label: "Activity", icon: <Bell />, badge: 3 },
    { id: "profile", label: "Profile", icon: <User /> },
  ];

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header behavior="sticky" logo={<span className="font-bold">Feedflow</span>} />

        {/* pb-24 keeps the last card clear of the tab bar */}
        <Content className="pb-24">{/* active tab's screen */}</Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          {items.map((item) => (
            <FooterItem key={item.id} {...item}
              active={tab === item.id} onClick={() => setTab(item.id)} />
          ))}
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}`;
