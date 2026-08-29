import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AppShell } from "../src/AppShell";
import { Header } from "../src/Header";
import { Content } from "../src/Content";
import { Sidebar } from "../src/Sidebar";

const originalMatchMedia = window.matchMedia;

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }) as unknown as typeof window.matchMedia;
}

describe("AppShell with docked Sidebar", () => {
  beforeEach(() => mockMatchMedia(false));
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("keeps the original single-column structure without a docked sidebar", () => {
    const { container } = render(
      <AppShell>
        <Content>Body</Content>
      </AppShell>
    );
    const root = container.firstElementChild!;
    expect(root.className).toContain("flex-col");
    // No row wrapper is introduced
    expect(root.querySelector(".flex-row")).toBeNull();
  });

  it("does not hoist an overlay Sidebar child", () => {
    const { container } = render(
      <AppShell>
        <Sidebar open={false} onClose={() => {}}>
          nav
        </Sidebar>
        <Content>Body</Content>
      </AppShell>
    );
    expect(container.querySelector(".flex-row")).toBeNull();
  });

  it("hoists a docked Sidebar into a row before a min-w-0 content column", () => {
    const { container } = render(
      <AppShell>
        <Content>Body</Content>
        <Sidebar variant="docked">nav</Sidebar>
      </AppShell>
    );
    const row = container.querySelector(".flex-row")!;
    expect(row).toBeInTheDocument();
    const [first, second] = Array.from(row.children);
    expect(first.getAttribute("data-sidebar")).toBe("docked");
    expect(second.className).toContain("min-w-0");
    expect(second.textContent).toContain("Body");
  });

  it("keeps the docked sidebar outside the bottom SafeArea in safeArea mode", () => {
    const { container } = render(
      <AppShell safeArea>
        <Header behavior="fixed" logo={<span>L</span>} />
        <Sidebar variant="docked">nav</Sidebar>
        <Content>Body</Content>
      </AppShell>
    );
    const row = container.querySelector(".flex-row")!;
    const aside = row.querySelector("[data-sidebar='docked']")!;
    const safeArea = row.querySelector("[data-safe-area-edges]")!;
    expect(safeArea).toBeInTheDocument();
    expect(safeArea.contains(aside)).toBe(false);
    expect(safeArea.textContent).toContain("Body");
  });

  it("pins the sidebar to the top when the header scrolls away", () => {
    const { container } = render(
      <AppShell>
        <Header behavior="static" logo={<span>L</span>} />
        <Sidebar variant="docked">nav</Sidebar>
        <Content>Body</Content>
      </AppShell>
    );
    const row = container.querySelector(".flex-row") as HTMLElement;
    expect(row.style.getPropertyValue("--appshell-sidebar-top")).toBe("0px");
  });

  it("lets a pinned header own the sidebar top offset", () => {
    const { container } = render(
      <AppShell>
        <Header behavior="fixed" logo={<span>L</span>} />
        <Sidebar variant="docked">nav</Sidebar>
        <Content>Body</Content>
      </AppShell>
    );
    const row = container.querySelector(".flex-row") as HTMLElement;
    expect(row.style.getPropertyValue("--appshell-sidebar-top")).toBe("");
  });
});
