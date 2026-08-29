// @vitest-environment node
//
// True server-side rendering smoke test: renders the entire public surface
// with react-dom/server in a Node environment (no window, no document).
// Any render-time browser API access fails loudly here.
import { renderToString } from "react-dom/server";
import { describe, it, expect } from "vitest";
import {
  AppShell,
  Avatar,
  Content,
  Footer,
  FooterItem,
  Header,
  HeaderNav,
  HeaderNavItem,
  NavGroup,
  NavItem,
  SafeArea,
  ScrollNav,
  ScrollNavItem,
  SearchField,
  SearchModal,
  Sidebar,
  UserMenu,
  UserMenuItem,
} from "../src/index";

describe("server-side rendering", () => {
  it("renders a full shell to string without browser APIs", () => {
    const html = renderToString(
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          logo={<span>Logo</span>}
          actions={<button type="button">act</button>}
          nav={
            <HeaderNav>
              <HeaderNavItem label="Home" active />
              <HeaderNavItem label="More">
                <p>dropdown</p>
              </HeaderNavItem>
            </HeaderNav>
          }
          title="Title"
          subtitle="Subtitle"
          searchContent={<SearchField placeholder="Search here" />}
          mobileMenu={<NavItem label="Mobile" />}
        />
        <Sidebar
          variant="docked"
          collapsible
          defaultCollapsed
          bottomContent={<NavItem label="Settings" />}
        >
          <NavGroup title="Group" defaultOpen>
            <NavItem label="Item" icon={<span>i</span>} active />
          </NavGroup>
        </Sidebar>
        <Content>
          <ScrollNav>
            <ScrollNavItem label="All" active />
            <ScrollNavItem label="Other" />
          </ScrollNav>
          <SafeArea edges={["left", "right"]}>
            <p>Body</p>
          </SafeArea>
        </Content>
        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem icon={<span>i</span>} label="Home" active badge={3} />
          <FooterItem icon={<span>i</span>} label="Search" />
        </Footer>
      </AppShell>
    );

    expect(html).toContain("Logo");
    expect(html).toContain("Search here");
    expect(html).toContain('data-sidebar="docked"');
    expect(html).toContain("Body");
  });

  it("renders the overlay sidebar closed and open on the server", () => {
    expect(
      renderToString(
        <Sidebar open={false} onClose={() => {}}>
          nav
        </Sidebar>
      )
    ).not.toContain("dialog");

    expect(
      renderToString(
        <Sidebar open onClose={() => {}}>
          nav
        </Sidebar>
      )
    ).toContain('role="dialog"');
  });

  it("renders both SearchField variants on the server", () => {
    const pill = renderToString(<SearchField placeholder="p" />);
    const full = renderToString(<SearchField variant="full" placeholder="f" />);
    expect(pill).toContain('data-search-field="pill"');
    expect(full).toContain('data-search-field="full"');
  });

  it("renders SearchModal harmlessly on the server (portal defers to the client)", () => {
    expect(() =>
      renderToString(
        <SearchModal open onClose={() => {}}>
          results
        </SearchModal>
      )
    ).not.toThrow();
  });

  it("renders Avatar and UserMenu on the server", () => {
    expect(renderToString(<Avatar initials="FY" />)).toContain("FY");

    const closed = renderToString(
      <UserMenu username="Fatih" detail="admin" initials="F">
        <UserMenuItem label="Log out" destructive />
      </UserMenu>
    );
    expect(closed).toContain("data-user-menu");

    // Even forced open, the panel is a client portal — the server renders
    // just the trigger, without crashing.
    const open = renderToString(
      <UserMenu username="Fatih" detail="admin" initials="F" open>
        <UserMenuItem label="Log out" destructive />
      </UserMenu>
    );
    expect(open).toContain('aria-expanded="true"');
    expect(open).not.toContain("Log out");
  });
});
