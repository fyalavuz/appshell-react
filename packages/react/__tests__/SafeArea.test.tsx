import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SafeArea } from "../src/SafeArea";

describe("SafeArea", () => {
  it("renders children", () => {
    render(<SafeArea>Hello</SafeArea>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies padding for all edges by default", () => {
    const { container } = render(<SafeArea>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    const styleAttr = el.getAttribute("style") || "";
    expect(styleAttr).toContain("padding-top: var(--sa-top, env(safe-area-inset-top, 0px))");
    expect(styleAttr).toContain("padding-bottom: var(--sa-bottom, env(safe-area-inset-bottom, 0px))");
    expect(styleAttr).toContain("padding-left: var(--sa-left, env(safe-area-inset-left, 0px))");
    expect(styleAttr).toContain("padding-right: var(--sa-right, env(safe-area-inset-right, 0px))");
  });

  it("applies padding only for specified edges", () => {
    const { container } = render(<SafeArea edges={["top", "bottom"]}>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    const styleAttr = el.getAttribute("style") || "";
    expect(styleAttr).toContain("padding-top: var(--sa-top, env(safe-area-inset-top, 0px))");
    expect(styleAttr).toContain("padding-bottom: var(--sa-bottom, env(safe-area-inset-bottom, 0px))");
    expect(styleAttr).not.toContain("padding-left");
    expect(styleAttr).not.toContain("padding-right");
  });

  it("applies custom className", () => {
    const { container } = render(<SafeArea className="custom">Content</SafeArea>);
    expect(container.firstElementChild).toHaveClass("custom");
  });

  it("exposes edges via data attribute", () => {
    const { container } = render(<SafeArea edges={["top", "bottom"]}>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("data-safe-area-edges")).toBe("top,bottom");
  });
});
