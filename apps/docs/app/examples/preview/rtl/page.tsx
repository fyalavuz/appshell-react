"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  I18nProvider,
  MotionProvider,
  NavGroup,
  NavItem,
  Sidebar,
  type AppShellLabelsInput,
  type Direction,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  ArrowLeftRight,
  CreditCard,
  Home,
  Languages,
  Menu,
  Receipt,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

// Only the library's own chrome strings — everything else below (balances,
// transaction names, tab labels) is this fictional bank's own copy.
const arabicLabels: AppShellLabelsInput = {
  navigationMenu: "قائمة التنقل",
  expandSidebar: "توسيع الشريط الجانبي",
  collapseSidebar: "طي الشريط الجانبي",
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  userMenu: "قائمة المستخدم",
  notifications: "الإشعارات",
  notificationsUnread: "الإشعارات ({count} غير مقروءة)",
  breadcrumb: "مسار التنقل",
  mainNavigation: "القائمة الرئيسية",
  skipToContent: "تخطي إلى المحتوى",
  search: "بحث",
  cancel: "إلغاء",
  tabs: "علامات التبويب",
  sheet: "لوحة",
  avatar: "الصورة الرمزية",
  badgeOverflow: "{max}+",
};

interface Tx {
  name: string;
  amount: string;
  positive: boolean;
}

interface Tab {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const copy = {
  ltr: {
    bank: "Al-Noor Bank",
    subtitle: "Personal banking",
    toggleLabel: "العربية",
    toggleAria: "Switch to Arabic",
    menuAria: "Open menu",
    balanceLabel: "Current balance",
    balance: "12,480 SAR",
    recentLabel: "Recent transactions",
    menuTitle: "Menu",
    nav: [
      { label: "Accounts", icon: Wallet },
      { label: "Transfers", icon: ArrowLeftRight },
      { label: "Bill payments", icon: Receipt },
      { label: "Cards", icon: CreditCard },
      { label: "Settings", icon: Settings },
    ],
    tabs: [
      { id: "home", label: "Home", icon: Home },
      { id: "transfers", label: "Transfers", icon: ArrowLeftRight },
      { id: "cards", label: "Cards", icon: CreditCard },
      { id: "profile", label: "Profile", icon: User },
    ] satisfies Tab[],
    transactions: [
      { name: "Monthly salary", amount: "+3,200 SAR", positive: true },
      { name: "Al-Othaim Supermarket", amount: "-186 SAR", positive: false },
      { name: "Electricity bill", amount: "-240 SAR", positive: false },
      { name: "Transfer to Sara", amount: "-500 SAR", positive: false },
      { name: "Café", amount: "-18 SAR", positive: false },
    ] satisfies Tx[],
    hint: "Tap the language pill above — the whole shell flips to Arabic and right-to-left.",
  },
  rtl: {
    bank: "بنك النور",
    subtitle: "الخدمات المصرفية الشخصية",
    toggleLabel: "English",
    toggleAria: "التبديل إلى الإنجليزية",
    menuAria: "فتح القائمة",
    balanceLabel: "الرصيد الحالي",
    balance: "12,480 ر.س",
    recentLabel: "أحدث العمليات",
    menuTitle: "القائمة",
    nav: [
      { label: "الحسابات", icon: Wallet },
      { label: "التحويلات", icon: ArrowLeftRight },
      { label: "دفع الفواتير", icon: Receipt },
      { label: "البطاقات", icon: CreditCard },
      { label: "الإعدادات", icon: Settings },
    ],
    tabs: [
      { id: "home", label: "الرئيسية", icon: Home },
      { id: "transfers", label: "التحويلات", icon: ArrowLeftRight },
      { id: "cards", label: "البطاقات", icon: CreditCard },
      { id: "profile", label: "حسابي", icon: User },
    ] satisfies Tab[],
    transactions: [
      { name: "راتب الشهر", amount: "+3,200 ر.س", positive: true },
      { name: "سوبر ماركت العثيم", amount: "-186 ر.س", positive: false },
      { name: "فاتورة الكهرباء", amount: "-240 ر.س", positive: false },
      { name: "تحويل إلى سارة", amount: "-500 ر.س", positive: false },
      { name: "مقهى", amount: "-18 ر.س", positive: false },
    ] satisfies Tx[],
    hint: "اضغط على زر اللغة أعلاه — يتحول التطبيق بالكامل إلى العربية ومن اليمين إلى اليسار.",
  },
} as const;

export default function RtlPage() {
  const [dir, setDir] = useState<Direction>("ltr");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const t = copy[dir];

  // `dir` on the wrapping element drives every logical-property class the
  // shell renders with (ms-*, pe-*, …); the html attribute keeps native
  // browser behavior (scrollbars, form controls) in sync too.
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ar" : "en";
    return () => {
      document.documentElement.removeAttribute("dir");
      document.documentElement.removeAttribute("lang");
    };
  }, [dir]);

  const toggleDir = () => setDir((d) => (d === "ltr" ? "rtl" : "ltr"));

  return (
    <div dir={dir} lang={dir === "rtl" ? "ar" : "en"}>
      <I18nProvider dir={dir} labels={dir === "rtl" ? arabicLabels : undefined}>
        <MotionProvider adapter={framerMotionAdapter}>
          <AppShell safeArea>
            <Header
              behavior="fixed"
              theme="light"
              logo={
                <button
                  type="button"
                  data-testid="rtl-sidebar-trigger"
                  aria-label={t.menuAria}
                  onClick={() => setSidebarOpen(true)}
                  className="me-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Menu className="size-5" />
                </button>
              }
              title={t.bank}
              subtitle={t.subtitle}
              actions={
                <button
                  type="button"
                  data-testid="rtl-dir-toggle"
                  onClick={toggleDir}
                  aria-label={t.toggleAria}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
                >
                  <Languages className="size-3.5" />
                  {t.toggleLabel}
                </button>
              }
            />

            <Content className="mx-auto w-full max-w-2xl pb-24 sm:border-x">
              <DemoHint>{t.hint}</DemoHint>

              <div className="mx-4 rounded-2xl bg-emerald-600 p-5 text-white">
                <p className="text-xs text-white/70">{t.balanceLabel}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{t.balance}</p>
              </div>

              <h2 className="mx-4 mt-6 text-sm font-semibold">{t.recentLabel}</h2>
              <ul className="mt-2">
                {t.transactions.map((tx) => (
                  <li
                    key={tx.name}
                    className="flex items-center justify-between border-b px-4 py-3 last:border-0"
                  >
                    <span className="text-sm">{tx.name}</span>
                    <span
                      className={cn(
                        "text-sm font-medium tabular-nums",
                        tx.positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground"
                      )}
                    >
                      {tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </Content>

            {/* No side prop: the default "start" edge is the right one in RTL. */}
            <Sidebar
              variant="overlay"
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            >
              <div className="p-2">
                <NavGroup title={t.menuTitle} defaultOpen>
                  {t.nav.map((item) => (
                    <NavItem
                      key={item.label}
                      icon={<item.icon className="size-4" />}
                      label={item.label}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}
                </NavGroup>
              </div>
            </Sidebar>

            <Footer variant="tab-bar" behavior="static">
              {t.tabs.map((tab) => (
                <FooterItem
                  key={tab.id}
                  icon={<tab.icon className="size-5" />}
                  label={tab.label}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </Footer>
          </AppShell>
        </MotionProvider>
      </I18nProvider>
    </div>
  );
}
