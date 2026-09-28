import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Sidebar } from "../src/Sidebar";
import { I18nProvider } from "../src/I18nContext";

const rtl = ({ children }: { children: React.ReactNode }) => (
  <div dir="rtl">
    <I18nProvider dir="rtl">{children}</I18nProvider>
  </div>
);

describe("Sidebar side follows the writing direction", () => {
  it("opens the drawer from the start edge by default — right in RTL", () => {
    render(<Sidebar open onClose={vi.fn()}>x</Sidebar>, { wrapper: rtl });
    expect(screen.getByRole("dialog").className).toContain("right-0");
  });

  it("resolves side='end' to the right edge in LTR", () => {
    render(<Sidebar open onClose={vi.fn()} side="end">x</Sidebar>);
    expect(screen.getByRole("dialog").className).toContain("right-0");
  });

  it("keeps physical sides physical in RTL", () => {
    render(<Sidebar open onClose={vi.fn()} side="left">x</Sidebar>, { wrapper: rtl });
    expect(screen.getByRole("dialog").className).toContain("left-0");
  });

  it("docks at the start in RTL without reordering, border on its left", () => {
    const { container } = render(<Sidebar variant="docked">x</Sidebar>, { wrapper: rtl });
    const aside = container.querySelector("[data-sidebar='docked']")!;
    expect(aside.className).not.toContain("order-last");
    expect(aside.className).toContain("border-l");
  });

  it("moves a physical-left docked sidebar to the flex end in RTL", () => {
    const { container } = render(<Sidebar variant="docked" side="left">x</Sidebar>, { wrapper: rtl });
    const aside = container.querySelector("[data-sidebar='docked']")!;
    expect(aside.className).toContain("order-last");
    expect(aside.className).toContain("border-r");
  });
});
