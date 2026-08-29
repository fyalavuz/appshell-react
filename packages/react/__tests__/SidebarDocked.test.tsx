import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Sidebar } from "../src/Sidebar";

const originalMatchMedia = window.matchMedia;

function mockMatchMedia(matches: boolean) {
  const mql = {
    matches,
    media: "",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return mql;
}

describe("Sidebar docked variant", () => {
  beforeEach(() => {
    mockMatchMedia(false); // desktop by default
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    document.body.style.overflow = "";
  });

  it("renders a docked aside with no dialog or backdrop when closed", () => {
    const { container } = render(
      <Sidebar variant="docked">
        <p>Nav content</p>
      </Sidebar>
    );
    const aside = container.querySelector("[data-sidebar='docked']");
    expect(aside).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(container.querySelector("[aria-hidden='true']")).not.toBeInTheDocument();
  });

  it("applies hidden md:flex by default and honors breakpoint prop", () => {
    const { container, rerender } = render(
      <Sidebar variant="docked">x</Sidebar>
    );
    let aside = container.querySelector("[data-sidebar='docked']")!;
    expect(aside.className).toContain("hidden");
    expect(aside.className).toContain("md:flex");

    rerender(
      <Sidebar variant="docked" breakpoint="lg">
        x
      </Sidebar>
    );
    aside = container.querySelector("[data-sidebar='docked']")!;
    expect(aside.className).toContain("lg:flex");
  });

  it("renders no drawer markup at all when breakpoint is none, even while open", () => {
    render(
      <Sidebar variant="docked" breakpoint="none" open onClose={() => {}}>
        x
      </Sidebar>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps left-0 on the drawer and gates it with md:hidden", () => {
    render(
      <Sidebar variant="docked" open onClose={() => {}}>
        x
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("left-0");
    expect(dialog.className).toContain("md:hidden");
  });

  it("does not lock body scroll when open above the breakpoint", () => {
    render(
      <Sidebar variant="docked" open onClose={() => {}}>
        x
      </Sidebar>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("locks body scroll and closes on Escape below the breakpoint", () => {
    mockMatchMedia(true); // mobile
    const onClose = vi.fn();
    render(
      <Sidebar variant="docked" open onClose={onClose}>
        x
      </Sidebar>
    );
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("toggles uncontrolled collapse: data-collapsed, width, aria-expanded", () => {
    const { container } = render(
      <Sidebar variant="docked" collapsible>
        x
      </Sidebar>
    );
    const aside = container.querySelector("[data-sidebar='docked']") as HTMLElement;
    const toggle = screen.getByRole("button", { name: "Collapse sidebar" });

    expect(aside.dataset.collapsed).toBe("false");
    expect(aside.style.width).toBe("16rem");
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggle);
    expect(aside.dataset.collapsed).toBe("true");
    expect(aside.style.width).toBe("3.25rem");
    expect(
      screen.getByRole("button", { name: "Expand sidebar" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("respects controlled collapsed and reports changes without flipping itself", () => {
    const onCollapsedChange = vi.fn();
    const { container } = render(
      <Sidebar
        variant="docked"
        collapsible
        collapsed
        onCollapsedChange={onCollapsedChange}
      >
        x
      </Sidebar>
    );
    const aside = container.querySelector("[data-sidebar='docked']") as HTMLElement;
    expect(aside.dataset.collapsed).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
    // Controlled: prop still wins
    expect(aside.dataset.collapsed).toBe("true");
  });

  it("starts collapsed with defaultCollapsed and honors custom widths", () => {
    const { container } = render(
      <Sidebar
        variant="docked"
        collapsible
        defaultCollapsed
        width="20rem"
        railWidth="4rem"
      >
        x
      </Sidebar>
    );
    const aside = container.querySelector("[data-sidebar='docked']") as HTMLElement;
    expect(aside.dataset.collapsed).toBe("true");
    expect(aside.style.width).toBe("4rem");

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(aside.style.width).toBe("20rem");
  });

  it("renders no toggle button unless collapsible", () => {
    render(<Sidebar variant="docked">x</Sidebar>);
    expect(
      screen.queryByRole("button", { name: /sidebar/i })
    ).not.toBeInTheDocument();
  });

  it("orders right-side docked sidebar last with a left border", () => {
    const { container } = render(
      <Sidebar variant="docked" side="right">
        x
      </Sidebar>
    );
    const aside = container.querySelector("[data-sidebar='docked']")!;
    expect(aside.className).toContain("order-last");
    expect(aside.className).toContain("border-l");
  });
});
