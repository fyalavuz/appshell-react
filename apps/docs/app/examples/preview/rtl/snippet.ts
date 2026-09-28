export const snippet = `import { useEffect, useState } from "react";
import {
  AppShell, Header, Content, Footer, FooterItem, Sidebar, NavGroup, NavItem,
  I18nProvider, MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Home, ArrowLeftRight, CreditCard, User, Languages } from "lucide-react";

// Only the library's own chrome strings need overriding — your app's own
// copy (balances, nav labels, tab labels) is just data you swap per locale.
const arabicLabels = {
  navigationMenu: "قائمة التنقل",
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  search: "بحث",
  cancel: "إلغاء",
};

export default function App() {
  const [dir, setDir] = useState("ltr"); // "ltr" | "rtl"
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the native document in sync too — logical CSS (ms-*, pe-*) only
  // needs the wrapping dir, but scrollbars and form controls need the html one.
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ar" : "en";
  }, [dir]);

  return (
    <div dir={dir}>
      <I18nProvider dir={dir} labels={dir === "rtl" ? arabicLabels : undefined}>
        <MotionProvider adapter={framerMotionAdapter}>
          <AppShell safeArea>
            <Header
              behavior="fixed"
              title={dir === "rtl" ? "بنك النور" : "Al-Noor Bank"}
              actions={
                <button onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}>
                  <Languages className="size-3.5" />
                  {dir === "rtl" ? "English" : "العربية"}
                </button>
              }
            />

            <Content>{/* balance card + transaction list */}</Content>

            {/* side defaults to "start", which is the right edge in RTL. */}
            <Sidebar variant="overlay" open={menuOpen} onClose={() => setMenuOpen(false)}>
              <NavGroup title={dir === "rtl" ? "القائمة" : "Menu"} defaultOpen>
                <NavItem icon={<Home className="size-4" />} label={dir === "rtl" ? "الحسابات" : "Accounts"} />
              </NavGroup>
            </Sidebar>

            <Footer variant="tab-bar">
              <FooterItem icon={<Home className="size-5" />} label={dir === "rtl" ? "الرئيسية" : "Home"} active />
              <FooterItem icon={<ArrowLeftRight className="size-5" />} label={dir === "rtl" ? "التحويلات" : "Transfers"} />
              <FooterItem icon={<CreditCard className="size-5" />} label={dir === "rtl" ? "البطاقات" : "Cards"} />
              <FooterItem icon={<User className="size-5" />} label={dir === "rtl" ? "حسابي" : "Profile"} />
            </Footer>
          </AppShell>
        </MotionProvider>
      </I18nProvider>
    </div>
  );
}`;
