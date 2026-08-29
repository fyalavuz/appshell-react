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
  if (hasSidebar) {
    lines.push(`  const [open, setOpen] = useState(false);`, ``);
  }
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
  if (config.showSearch) {
    lines.push(
      config.searchVariant === "full"
        ? `          searchContent={<SearchField variant="full" placeholder="Search notes" />}`
        : `          searchContent={<SearchField placeholder="Search notes" />}`
    );
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

  lines.push(``, `        <Content>{/* … */}</Content>`);

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
