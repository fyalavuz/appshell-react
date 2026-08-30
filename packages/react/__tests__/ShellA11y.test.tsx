import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { useState } from "react";
import { AppShell } from "../src/AppShell";
import { Content } from "../src/Content";
import { Header } from "../src/Header";
import { HeaderNav, HeaderNavItem } from "../src/HeaderNav";
import { Sidebar } from "../src/Sidebar";
import { NavItem } from "../src/NavItem";
import { Footer, FooterItem } from "../src/Footer";
import { SearchModal } from "../src/SearchModal";
import { I18nProvider } from "../src/I18nContext";

afterEach(() => {
  document.body.style.overflow = "";
});

describe("skip link", () => {
  it("is not rendered unless asked for", () => {
    render(
      <AppShell>
        <Content>page</Content>
      </AppShell>
    );
    expect(document.querySelector("[data-skip-link]")).toBeNull();
  });

  it("is the first focusable thing on the page and targets Content", () => {
    render(
      <AppShell skipToContent>
        <Header logo={<span>Brand</span>} />
        <Content>page</Content>
      </AppShell>
    );
    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toHaveAttribute("href", "#appshell-content");

    // It comes before the header in the DOM, so Tab reaches it first.
    const header = document.querySelector("header")!;
    expect(
      link.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("moves focus into the main region, not just the scroll position", () => {
    render(
      <AppShell skipToContent>
        <Content>page</Content>
      </AppShell>
    );
    const main = document.querySelector("main")!;
    main.scrollIntoView = vi.fn();

    fireEvent.click(screen.getByRole("link", { name: "Skip to content" }));

    expect(document.activeElement).toBe(main);
  });

  it("takes its wording from the labels", () => {
    render(
      <I18nProvider labels={{ skipToContent: "İçeriğe geç" }}>
        <AppShell skipToContent>
          <Content>page</Content>
        </AppShell>
      </I18nProvider>
    );
    expect(screen.getByRole("link", { name: "İçeriğe geç" })).toBeInTheDocument();
  });
});

describe("landmarks are named", () => {
  it("names the header's navigation", () => {
    render(
      <Header
        logo={<span>Brand</span>}
        nav={
          <HeaderNav>
            <HeaderNavItem label="Docs" href="/docs" />
          </HeaderNav>
        }
      />
    );
    expect(
      screen.getByRole("navigation", { name: "Main" })
    ).toBeInTheDocument();
  });

  it("lets a second navigation take its own name", () => {
    render(
      <Header
        logo={<span>Brand</span>}
        nav={
          <HeaderNav aria-label="Product areas">
            <HeaderNavItem label="Docs" href="/docs" />
          </HeaderNav>
        }
      />
    );
    expect(
      screen.getByRole("navigation", { name: "Product areas" })
    ).toBeInTheDocument();
  });

  it("names the docked sidebar", () => {
    const { container } = render(
      <Sidebar variant="docked" breakpoint="none">
        <NavItem label="Home" />
      </Sidebar>
    );
    const aside = container.querySelector("aside")!;
    expect(aside).toHaveAttribute("aria-label", "Navigation menu");
  });
});

describe("footer tabs", () => {
  it("marks the active tab as the current page", () => {
    render(
      <Footer>
        <FooterItem icon={<span />} label="Home" active />
        <FooterItem icon={<span />} label="Search" />
      </Footer>
    );
    expect(screen.getByText("Home").closest("[aria-current]")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByText("Search").closest("[aria-current]")).toBeNull();
  });

  it("renders a link when the tab navigates", () => {
    render(
      <Footer>
        <FooterItem icon={<span />} label="Home" href="/" active />
      </Footer>
    );
    const link = screen.getByRole("link", { name: /Home/ });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("stays a button without an href", () => {
    render(
      <Footer>
        <FooterItem icon={<span />} label="Home" onClick={() => {}} />
      </Footer>
    );
    expect(screen.getByRole("button", { name: /Home/ })).toBeInTheDocument();
  });
});

describe("focus on route change", () => {
  it("moves focus to the heading of the new screen", () => {
    function App() {
      const [route, setRoute] = useState("/a");
      return (
        <>
          <button type="button" onClick={() => setRoute("/b")}>
            go
          </button>
          <AppShell routeKey={route}>
            <Header logo={<span>Brand</span>} title="Inbox" />
            <Content>page</Content>
          </AppShell>
        </>
      );
    }
    render(<App />);
    // Nothing on first render — a fresh page load is left alone.
    expect(document.activeElement).toBe(document.body);

    fireEvent.click(screen.getByText("go"));

    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Inbox" })
    );
  });

  it("falls back to the main region when the screen has no heading", () => {
    function App() {
      const [route, setRoute] = useState("/a");
      return (
        <>
          <button type="button" onClick={() => setRoute("/b")}>
            go
          </button>
          <AppShell routeKey={route}>
            <Content>page</Content>
          </AppShell>
        </>
      );
    }
    render(<App />);
    fireEvent.click(screen.getByText("go"));
    expect(document.activeElement).toBe(document.querySelector("main"));
  });

  it("stays put when switched off", () => {
    function App() {
      const [route, setRoute] = useState("/a");
      return (
        <>
          <button type="button" onClick={() => setRoute("/b")}>
            go
          </button>
          <AppShell routeKey={route} focusOnRouteChange={false}>
            <Content>page</Content>
          </AppShell>
        </>
      );
    }
    render(<App />);
    const trigger = screen.getByText("go");
    trigger.focus();
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(trigger);
  });
});

describe("close requests through the platform", () => {
  it("uses CloseWatcher when the browser has one", () => {
    const destroy = vi.fn();
    let fire: (() => void) | null = null;
    class FakeCloseWatcher {
      onclose: (() => void) | null = null;
      constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        fire = () => self.onclose?.();
      }
      destroy = destroy;
    }
    Object.defineProperty(globalThis, "CloseWatcher", {
      value: FakeCloseWatcher,
      configurable: true,
      writable: true,
    });

    const onClose = vi.fn();
    const { unmount } = render(
      <SearchModal open onClose={onClose}>
        {() => <div>results</div>}
      </SearchModal>
    );

    // Escape no longer has its own listener — the platform delivers instead.
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();

    act(() => fire?.());
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
    expect(destroy).toHaveBeenCalled();
    // Drop just this one: unstubAllGlobals would also take the shared
    // ResizeObserver mock with it.
    Reflect.deleteProperty(globalThis, "CloseWatcher");
  });
});
