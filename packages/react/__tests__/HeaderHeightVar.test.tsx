import { render, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Header } from "../src/Header";
import { AppShellProvider } from "../src/context";

// jsdom has no layout: give the in-flow header 120px that scroll away with
// the page, and the floating overlay copy 64px.
const HEADER = 120;
const OVERLAY = 64;

function headerHeightVar() {
  return document.documentElement.style.getPropertyValue("--header-height");
}

async function scrollTo(y: number) {
  await act(async () => {
    Object.defineProperty(window, "scrollY", { value: y, configurable: true });
    window.dispatchEvent(new Event("scroll"));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  });
}

describe("--header-height tracks the header chrome actually on screen", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function (this: HTMLElement) {
      if (this.hasAttribute("data-header-overlay")) return OVERLAY;
      if (this.tagName === "HEADER") return HEADER;
      return 0;
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      const top = this.tagName === "HEADER" ? -window.scrollY : 0;
      const height = this.tagName === "HEADER" ? HEADER : 0;
      return { top, bottom: top + height, height, left: 0, right: 0, width: 0, x: 0, y: top, toJSON() {} } as DOMRect;
    });
  });

  afterEach(async () => {
    await scrollTo(0);
    vi.restoreAllMocks();
    document.documentElement.style.removeProperty("--header-height");
  });

  it("publishes the full height for a pinned header, wherever the page is", async () => {
    render(<AppShellProvider><Header behavior="fixed" /></AppShellProvider>);
    await scrollTo(900);
    expect(headerHeightVar()).toBe(`${HEADER}px`);
  });

  it("shrinks to what is left on screen as a reveal header scrolls away, then to 0", async () => {
    render(<AppShellProvider><Header behavior="reveal-nav" /></AppShellProvider>);
    await scrollTo(0);
    expect(headerHeightVar()).toBe(`${HEADER}px`);
    await scrollTo(50);
    expect(headerHeightVar()).toBe(`${HEADER - 50}px`);
    await scrollTo(900);
    expect(headerHeightVar()).toBe("0px");
  });

  it("publishes the overlay's height while the overlay stands in for the header", async () => {
    render(<AppShellProvider><Header behavior="reveal-nav" /></AppShellProvider>);
    await scrollTo(900);
    await scrollTo(600);
    expect(document.querySelector("[data-header-overlay]")).toBeInTheDocument();
    expect(headerHeightVar()).toBe(`${OVERLAY}px`);
  });
});
