import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NavItem } from "../src/NavItem";
import { NavGroup } from "../src/NavGroup";

describe("NavItem rail support", () => {
  it("exposes the label as a title for icon-only rails", () => {
    render(<NavItem label="Reports" icon={<svg />} />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Reports");
  });

  it("hides label and badge under a collapsed sidebar group", () => {
    render(<NavItem label="Reports" badge={<span>2</span>} />);
    const label = screen.getByText("Reports");
    expect(label.className).toContain(
      "group-data-[collapsed=true]/sidebar:hidden"
    );
    const badge = screen.getByText("2").parentElement!;
    expect(badge.className).toContain(
      "group-data-[collapsed=true]/sidebar:hidden"
    );
  });
});

describe("NavGroup rail support", () => {
  it("keeps the literal max-h-0 collapse class while adding the rail override", () => {
    const { container } = render(
      <NavGroup title="Workspace">
        <NavItem label="Dashboard" />
      </NavGroup>
    );
    const wrapper = container.querySelector(".overflow-hidden")!;
    expect(wrapper.className).toContain("max-h-0");
    expect(wrapper.className).toContain(
      "group-data-[collapsed=true]/sidebar:max-h-none"
    );
  });

  it("hides the group header button in a collapsed rail via variant class", () => {
    render(
      <NavGroup title="Workspace">
        <NavItem label="Dashboard" />
      </NavGroup>
    );
    const headerButton = screen.getByRole("button", { name: /workspace/i });
    expect(headerButton.className).toContain(
      "group-data-[collapsed=true]/sidebar:hidden"
    );
  });
});
