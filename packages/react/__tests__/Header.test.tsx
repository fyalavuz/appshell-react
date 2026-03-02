import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../src/Header";
import { HeaderNav, HeaderNavItem } from "../src/HeaderNav";
import { AppShellProvider } from "../src/context";

function renderHeader(props: Record<string, any> = {}) {
  return render(
    <AppShellProvider>
      <Header {...props} />
    </AppShellProvider>
  );
}

describe("Header", () => {
  it("renders with default props", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders logo", () => {
    renderHeader({ logo: <span>MyApp</span> });
    expect(screen.getByText("MyApp")).toBeInTheDocument();
  });

  it("renders actions", () => {
    renderHeader({ actions: <button>Login</button> });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders title and subtitle", () => {
    renderHeader({ title: "Dashboard", subtitle: "Overview" });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders search content", () => {
    renderHeader({ searchContent: <input placeholder="Search..." /> });
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("applies light theme by default", () => {
    const { container } = renderHeader();
    const header = container.querySelector("header");
    expect(header?.className).toContain("bg-background");
  });

  it("applies dark theme", () => {
    const { container } = renderHeader({ theme: "dark" });
    const header = container.querySelector("header");
    expect(header?.className).toContain("bg-zinc-950");
  });

  it("renders mobile menu toggle", () => {
    renderHeader({ mobileMenu: <nav>Menu</nav> });
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("toggles mobile menu on click", () => {
    renderHeader({ mobileMenu: <nav>Mobile Nav</nav> });
    const toggle = screen.getByLabelText("Open menu");
    fireEvent.click(toggle);
    expect(screen.getByText("Mobile Nav")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderHeader({ className: "my-header" });
    const header = container.querySelector("header");
    expect(header).toHaveClass("my-header");
  });

  describe("behaviors", () => {
    it("renders static header without sticky", () => {
      const { container } = renderHeader({ behavior: "static" });
      const header = container.querySelector("header");
      expect(header?.className).not.toContain("sticky");
    });

    it("renders fixed header with sticky positioning", () => {
      const { container } = renderHeader({ behavior: "fixed" });
      const header = container.querySelector("header");
      expect(header?.className).toContain("sticky");
    });
  });

  describe("theme inheritance", () => {
    it("passes primary theme to HeaderNavItem", () => {
      renderHeader({
        theme: "primary",
        nav: (
          <HeaderNav>
            <HeaderNavItem label="Home" active />
          </HeaderNav>
        ),
      });
      const navItem = screen.getByRole("button", { name: "Home" });
      // Primary theme active item should have bg-primary-foreground/20
      expect(navItem.className).toContain("bg-primary-foreground/20");
    });

    it("passes dark theme to HeaderNavItem", () => {
      renderHeader({
        theme: "dark",
        nav: (
          <HeaderNav>
            <HeaderNavItem label="Home" active />
          </HeaderNav>
        ),
      });
      const navItem = screen.getByRole("button", { name: "Home" });
      // Dark theme active item should have bg-primary-foreground/10
      expect(navItem.className).toContain("bg-primary-foreground/10");
    });
  });
});
