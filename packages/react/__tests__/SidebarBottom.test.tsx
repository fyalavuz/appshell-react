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
