// @vitest-environment node
//
// True server-side rendering smoke test: renders the entire public surface
// with react-dom/server in a Node environment (no window, no document).
// Any render-time browser API access fails loudly here.
import { renderToString } from "react-dom/server";
import { describe, it, expect } from "vitest";
import {
  AppShell,
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
  Sidebar,
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
        <Sidebar variant="docked" collapsible defaultCollapsed>
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
});
