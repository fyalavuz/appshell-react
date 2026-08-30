import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sidebar } from "../src/Sidebar";
import { NavItem } from "../src/NavItem";

describe("Sidebar bottomContent", () => {
  it("pins bottom content in the docked panel", () => {
    const { container } = render(
      <Sidebar
        variant="docked"
        breakpoint="none"
        bottomContent={<NavItem label="Settings" />}
      >
        <NavItem label="Home" />
      </Sidebar>
    );
    const aside = container.querySelector('[data-sidebar="docked"]')!;
    const bottom = aside.querySelector("[data-sidebar-bottom]")!;
    expect(bottom).toBeInTheDocument();
    expect(bottom.textContent).toContain("Settings");
    // The nav scroll area comes before the pinned bottom section.
    expect(
      screen.getByText("Home").compareDocumentPosition(bottom) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("pins bottom content in the overlay drawer", () => {
    render(
      <Sidebar
        open
        onClose={() => {}}
        bottomContent={<NavItem label="About" />}
      >
        <NavItem label="Home" />
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    const bottom = dialog.querySelector("[data-sidebar-bottom]")!;
    expect(bottom).toBeInTheDocument();
    expect(bottom.textContent).toContain("About");
  });

  it("renders no bottom section when the prop is absent", () => {
    const { container } = render(
      <Sidebar variant="docked" breakpoint="none">
        <NavItem label="Home" />
      </Sidebar>
    );
    expect(container.querySelector("[data-sidebar-bottom]")).toBeNull();
  });
});

describe("Sidebar topContent", () => {
  it("pins top content above the nav scroll area in the docked panel", () => {
    const { container } = render(
      <Sidebar
        variant="docked"
        breakpoint="none"
        topContent={<input aria-label="Search projects" />}
      >
        <NavItem label="Home" />
      </Sidebar>
    );
    const aside = container.querySelector('[data-sidebar="docked"]')!;
    const top = aside.querySelector("[data-sidebar-top]")!;
    expect(top).toBeInTheDocument();
    expect(screen.getByLabelText("Search projects")).toBeInTheDocument();
    // The pinned top section comes before the nav scroll area.
    expect(
      top.compareDocumentPosition(screen.getByText("Home")) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("pins top content in the overlay drawer", () => {
    render(
      <Sidebar open onClose={() => {}} topContent={<span>Search</span>}>
        <NavItem label="Home" />
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    const top = dialog.querySelector("[data-sidebar-top]")!;
    expect(top).toBeInTheDocument();
    expect(top.textContent).toContain("Search");
  });

  it("renders no top section when the prop is absent", () => {
    const { container } = render(
      <Sidebar variant="docked" breakpoint="none">
        <NavItem label="Home" />
      </Sidebar>
    );
    expect(container.querySelector("[data-sidebar-top]")).toBeNull();
  });
});

describe("Sidebar drawer safe areas", () => {
  it("pads the panel top even without topContent", () => {
    render(
      <Sidebar open onClose={() => {}}>
        <NavItem label="Home" />
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog") as HTMLElement;
    expect(dialog.style.paddingTop).toContain("env(safe-area-inset-top");
  });

  it("pads the leading edge matching the side", () => {
    render(
      <Sidebar open onClose={() => {}} side="right">
        <NavItem label="Home" />
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog") as HTMLElement;
    expect(dialog.style.paddingRight).toContain("env(safe-area-inset-right");
    expect(dialog.style.paddingLeft).toBe("");
  });

  it("hands the bottom inset to the scroll area when no bottomContent", () => {
    render(
      <Sidebar open onClose={() => {}}>
        <NavItem label="Home" />
      </Sidebar>
    );
    const scroll = screen
      .getByRole("dialog")
      .querySelector(".overflow-y-auto") as HTMLElement;
    expect(scroll.style.paddingBottom).toContain("env(safe-area-inset-bottom");
  });

  it("hands the bottom inset to bottomContent when present", () => {
    render(
      <Sidebar open onClose={() => {}} bottomContent={<span>About</span>}>
        <NavItem label="Home" />
      </Sidebar>
    );
    const dialog = screen.getByRole("dialog");
    const scroll = dialog.querySelector(".overflow-y-auto") as HTMLElement;
    const bottom = dialog.querySelector("[data-sidebar-bottom]") as HTMLElement;
    expect(scroll.style.paddingBottom).toBe("");
    expect(bottom.style.paddingBottom).toContain("env(safe-area-inset-bottom");
  });
});
