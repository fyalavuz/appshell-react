import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SafeArea } from "../src/SafeArea";

const pad = (edge: string) =>
  `padding-${edge}: var(--appshell-safe-area-inset-${edge}, env(safe-area-inset-${edge}, 0px))`;

describe("SafeArea", () => {
  it("renders children", () => {
    render(<SafeArea>Hello</SafeArea>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies env(safe-area-inset-*) padding for all edges by default", () => {
    const { container } = render(<SafeArea>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    const styleAttr = el.getAttribute("style") || "";
    expect(styleAttr).toContain(pad("top"));
    expect(styleAttr).toContain(pad("bottom"));
    expect(styleAttr).toContain(pad("left"));
    expect(styleAttr).toContain(pad("right"));
  });

  it("applies padding only for specified edges", () => {
    const { container } = render(<SafeArea edges={["top", "bottom"]}>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    const styleAttr = el.getAttribute("style") || "";
    expect(styleAttr).toContain(pad("top"));
    expect(styleAttr).toContain(pad("bottom"));
    expect(styleAttr).not.toContain("padding-left");
    expect(styleAttr).not.toContain("padding-right");
  });

  it("renders the padding synchronously (SSR-safe, no effect pass needed)", () => {
    // The style must come from the style prop, not a client effect —
    // renderToString output carries it too (see SSR.test.tsx).
    const { container } = render(<SafeArea edges={["top"]}>Content</SafeArea>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.paddingTop).toContain("env(safe-area-inset-top");
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
