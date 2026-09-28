export const snippet = `import { AppShell, Header, HeaderNav, HeaderNavItem, Content, Footer, FooterItem, MotionProvider, SearchField } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { House, Search, ShoppingBag, Heart, User } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");
  const [cart, setCart] = useState<string[]>([]);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Scroll down: nav + search leave with the tab bar. Scroll up: all three return together. */}
        <Header
          behavior="reveal-nav-search"
          logo={<span className="font-bold">Drift</span>}
          nav={
            <HeaderNav>
              <HeaderNavItem label="All" active />
              <HeaderNavItem label="Lighting" />
              <HeaderNavItem label="Seating" />
              <HeaderNavItem label="Decor" />
              <HeaderNavItem label="Kitchen" />
            </HeaderNav>
          }
          actions={<button aria-label="Bag"><ShoppingBag />{cart.length}</button>}
          searchContent={<SearchField variant="full" placeholder="Search Drift" />}
        />

        <Content>{/* product grid */}</Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem icon={<House className="size-5" />} label="Home"
            active={tab === "home"} onClick={() => setTab("home")} />
          <FooterItem icon={<Search className="size-5" />} label="Search"
            active={tab === "search"} onClick={() => setTab("search")} />
          <FooterItem icon={<ShoppingBag className="size-5" />} label="Bag" badge={cart.length || undefined}
            active={tab === "bag"} onClick={() => setTab("bag")} />
          <FooterItem icon={<Heart className="size-5" />} label="Wishlist"
            active={tab === "wishlist"} onClick={() => setTab("wishlist")} />
          <FooterItem icon={<User className="size-5" />} label="Account"
            active={tab === "account"} onClick={() => setTab("account")} />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}`;
