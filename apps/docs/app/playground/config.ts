import type {
  AnimationSpeed,
  FooterBehavior,
  FooterPosition,
  HeaderBehavior,
  HeaderTheme,
  SidebarBreakpoint,
} from "appshell-react";

export interface PlaygroundConfig {
  behavior: HeaderBehavior;
  theme: HeaderTheme;
  speed: AnimationSpeed;
  showNav: boolean;
  showContext: boolean;
  showSearch: boolean;
  searchVariant: "pill" | "full";
  searchFirst: boolean;
  searchModal: boolean;
  userMenu: boolean;
  notifications: boolean;
  sidebar: "none" | "overlay" | "docked";
  sidebarCollapsible: boolean;
  sidebarBreakpoint: SidebarBreakpoint;
  footer: "none" | "tab-bar" | "floating" | "mini";
  footerBehavior: FooterBehavior;
  footerPosition: FooterPosition;
  safeArea: boolean;
}

export const defaultConfig: PlaygroundConfig = {
  behavior: "reveal-all",
  theme: "light",
  speed: "normal",
  showNav: false,
  showContext: true,
  showSearch: true,
  searchVariant: "pill",
  searchFirst: false,
  searchModal: false,
  userMenu: false,
  notifications: false,
  sidebar: "none",
  sidebarCollapsible: true,
  sidebarBreakpoint: "md",
  footer: "tab-bar",
  footerBehavior: "auto-hide",
  footerPosition: "center",
  safeArea: true,
};

export const sidebarBreakpoints: SidebarBreakpoint[] = ["sm", "md", "lg", "none"];

export const headerBehaviors: HeaderBehavior[] = [
  "static",
  "fixed",
  "sticky",
  "reveal-all",
  "reveal-nav",
  "reveal-context",
  "reveal-search",
  "reveal-nav-context",
  "reveal-nav-search",
  "reveal-context-search",
];

export const headerThemes: HeaderTheme[] = ["light", "primary", "dark", "none"];

export const animationSpeeds: AnimationSpeed[] = ["slow", "normal", "fast"];

/** Generate the code for the current configuration. */
export function generateCode(config: PlaygroundConfig): string {
  const imports = ["AppShell", "Header", "Content"];
  if (config.showSearch) imports.push("SearchField");
  if (config.showSearch && config.searchModal) imports.push("SearchModal");
  if (config.userMenu) imports.push("UserMenu", "UserMenuItem");
  if (config.notifications) imports.push("NotificationsMenu", "NotificationItem");
  if (config.sidebar !== "none") imports.push("Sidebar", "NavGroup", "NavItem");
  if (config.footer === "tab-bar") imports.push("Footer", "FooterItem");
  else if (config.footer !== "none") imports.push("Footer");
  if (config.showNav) imports.push("HeaderNav", "HeaderNavItem");
  imports.push("MotionProvider");

  const headerProps: string[] = [`behavior="${config.behavior}"`];
  if (config.theme !== "light") headerProps.push(`theme="${config.theme}"`);
  if (config.theme === "none")
    headerProps.push(`className={yourOwnStyles /* theme 'none' ships zero styles */}`);
  if (config.speed !== "normal") headerProps.push(`speed="${config.speed}"`);

  const hasSidebar = config.sidebar !== "none";

  const lines: string[] = [];
  lines.push(
    `import { ${imports.join(", ")} } from "appshell-react";`,
    `import { framerMotionAdapter } from "appshell-react/motion-framer";`,
    ``,
    `export default function App() {`
  );
  const hasSearchModal = config.showSearch && config.searchModal;

  const stateLines: string[] = [];
  if (hasSidebar) stateLines.push(`  const [open, setOpen] = useState(false);`);
  if (hasSearchModal) {
    stateLines.push(
      `  const [query, setQuery] = useState("");`,
      `  const [searchOpen, setSearchOpen] = useState(false);`
    );
  }
  if (stateLines.length) lines.push(...stateLines, ``);
  lines.push(
    `  return (`,
    `    <MotionProvider adapter={framerMotionAdapter}>`,
    `      <AppShell${config.safeArea ? " safeArea" : ""}>`,
    `        <Header`,
    ...headerProps.map((p) => `          ${p}`),
    hasSidebar
      ? `          logo={<MenuButton onOpen={() => setOpen(true)} />}`
      : `          logo={<span className="font-bold">Fieldnotes</span>}`
  );

  if (config.userMenu || config.notifications) {
    const both = config.userMenu && config.notifications;
    const indent = both ? "              " : "            ";
    const actionLines: string[] = [];
    if (config.notifications) {
      actionLines.push(
        `${indent}<NotificationsMenu unreadCount={2}>`,
        `${indent}  <NotificationItem title="Deploy finished" time="2m" unread />`,
        `${indent}  <NotificationItem title="Weekly digest ready" time="1d" />`,
        `${indent}</NotificationsMenu>`
      );
    }
    if (config.userMenu) {
      actionLines.push(
        `${indent}<UserMenu username="Mara Kealoha" detail="mara@fieldnotes.app" initials="MK">`,
        `${indent}  <UserMenuItem label="Profile" />`,
        `${indent}  <UserMenuItem label="Settings" />`,
        `${indent}  <UserMenuItem label="Log out" destructive />`,
        `${indent}</UserMenu>`
      );
    }
    lines.push(`          actions={`);
    if (both) lines.push(`            <>`, ...actionLines, `            </>`);
    else lines.push(...actionLines);
    lines.push(`          }`);
  }

  if (config.showNav) {
    lines.push(
      `          nav={`,
      `            <HeaderNav>`,
      `              <HeaderNavItem label="Today" active />`,
      `              <HeaderNavItem label="Library" />`,
      `              <HeaderNavItem label="People" />`,
      `            </HeaderNav>`,
      `          }`
    );
  }
  if (config.showContext) {
    lines.push(
      `          title="Today"`,
      `          subtitle="Six new notes from your circle"`
    );
  }
  if (config.searchFirst && config.showContext && config.showSearch) {
    lines.push(`          rowOrder={["search", "context"]}`);
  }
  if (config.showSearch) {
    const variantAttr =
      config.searchVariant === "full" ? ` variant="full"` : "";
    if (hasSearchModal) {
      lines.push(
        `          searchContent={`,
        `            <SearchField${variantAttr}`,
        `              placeholder="Search notes"`,
        `              value={query}`,
        `              onChange={setQuery}`,
        `              onClick={() => setSearchOpen(true)}`,
        `            />`,
        `          }`
      );
    } else {
      lines.push(
        `          searchContent={<SearchField${variantAttr} placeholder="Search notes" />}`
      );
    }
  }
  lines.push(`        />`);

  if (config.sidebar === "overlay") {
    lines.push(
      ``,
      `        <Sidebar open={open} onClose={() => setOpen(false)}>`,
      `          <NavGroup title="Browse" defaultOpen>`,
      `            <NavItem label="Today" active />`,
      `            <NavItem label="Library" />`,
      `            <NavItem label="People" />`,
      `          </NavGroup>`,
      `        </Sidebar>`
    );
  } else if (config.sidebar === "docked") {
    lines.push(
      ``,
      `        {/* Docked panel; below the breakpoint it opens as a drawer */}`,
      `        <Sidebar`,
      `          variant="docked"`,
      `          breakpoint="${config.sidebarBreakpoint}"`,
      ...(config.sidebarCollapsible ? [`          collapsible`] : []),
      `          open={open}`,
      `          onClose={() => setOpen(false)}`,
      `        >`,
      `          <NavGroup title="Browse" defaultOpen>`,
      `            <NavItem label="Today" active />`,
      `            <NavItem label="Library" />`,
      `            <NavItem label="People" />`,
      `          </NavGroup>`,
      `        </Sidebar>`
    );
  }

  lines.push(
    ``,
    `        {/* Center the app column so desktop doesn't stretch like a phone */}`,
    `        <Content className="mx-auto w-full max-w-2xl sm:border-x">`,
    `          {/* … */}`,
    `        </Content>`
  );

  if (hasSearchModal) {
    lines.push(
      ``,
      `        <SearchModal`,
      `          open={searchOpen}`,
      `          onClose={() => setSearchOpen(false)}`,
      `          defaultQuery={query}  // continues what was typed in the field`,
      `        >`,
      `          {(q) => <Results query={q} />}`,
      `        </SearchModal>`
    );
  }

  if (config.footer === "tab-bar") {
    lines.push(
      ``,
      `        <Footer variant="tab-bar" behavior="${config.footerBehavior}">`,
      `          <FooterItem icon={<Home />} label="Home" active />`,
      `          <FooterItem icon={<Compass />} label="Explore" />`,
      `          <FooterItem icon={<Bookmark />} label="Saved" badge={2} />`,
      `          <FooterItem icon={<User />} label="Profile" />`,
      `        </Footer>`
    );
  } else if (config.footer === "floating") {
    lines.push(
      ``,
      `        <Footer`,
      `          variant="floating"`,
      `          behavior="${config.footerBehavior}"`,
      `          position="${config.footerPosition}"`,
      `        >`,
      `          <button className="rounded-full bg-primary …">New note</button>`,
      `        </Footer>`
    );
  } else if (config.footer === "mini") {
    lines.push(
      ``,
      `        <Footer variant="mini" behavior="${config.footerBehavior}">`,
      `          <span className="text-xs">Syncing 3 notes…</span>`,
      `        </Footer>`
    );
  }

  lines.push(`      </AppShell>`, `    </MotionProvider>`, `  );`, `}`);
  return lines.join("\n");
}
