import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ComponentProps, ReactNode } from "react";
import { LinkProvider } from "../src/LinkContext";
import { NavItem } from "../src/NavItem";
import { HeaderNav, HeaderNavItem } from "../src/HeaderNav";
import { UserMenu, UserMenuItem } from "../src/UserMenu";

// A stand-in for Next.js Link / a React Router adapter.
function FakeLink({ href, children, ...rest }: ComponentProps<"a">) {
  return (
    <a href={href} data-router-link {...rest}>
      {children}
    </a>
  );
}

const withProvider = (ui: ReactNode) => (
  <LinkProvider component={FakeLink}>{ui}</LinkProvider>
);

describe("LinkProvider", () => {
  it("defaults every href component to a plain <a>", () => {
    render(
      <>
        <NavItem href="/nav" label="Nav" />
        <HeaderNav>
          <HeaderNavItem href="/top" label="Top" />
        </HeaderNav>
        <UserMenu username="U" initials="U" open onOpenChange={() => {}}>
          <UserMenuItem href="/settings" label="Settings" />
        </UserMenu>
      </>
    );
    for (const name of ["Nav", "Top", "Settings"]) {
      const el = screen.getByText(name).closest("a")!;
      expect(el).not.toHaveAttribute("data-router-link");
    }
  });

  it("routes NavItem through the provided link component", () => {
    render(withProvider(<NavItem href="/library" label="Library" icon={<span>i</span>} />));
    const link = screen.getByText("Library").closest("a")!;
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("href", "/library");
    // The NavItem contract survives the swap.
    expect(link).toHaveAttribute("title", "Library");
  });

  it("routes HeaderNavItem through the provided link component", () => {
    render(
      withProvider(
        <HeaderNav>
          <HeaderNavItem href="/pricing" label="Pricing" active />
        </HeaderNav>
      )
    );
    const link = screen.getByText("Pricing").closest("a")!;
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("routes UserMenuItem through the provided link component", () => {
    render(
      withProvider(
        <UserMenu username="U" initials="U" open onOpenChange={() => {}}>
          <UserMenuItem href="/profile" label="Profile" />
        </UserMenu>
      )
    );
    const item = screen.getByRole("menuitem", { name: "Profile" });
    expect(item).toHaveAttribute("data-router-link");
    expect(item).toHaveAttribute("href", "/profile");
  });

  it("leaves onClick-only items as buttons", () => {
    render(withProvider(<NavItem label="Action" onClick={() => {}} />));
    expect(screen.getByText("Action").closest("button")).toBeInTheDocument();
  });
});
