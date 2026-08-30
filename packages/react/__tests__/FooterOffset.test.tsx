import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { Footer, FooterItem } from "../src/Footer";
import { Content } from "../src/Content";

const footerVar = () =>
  document.documentElement.style.getPropertyValue("--appshell-footer-height");

beforeEach(() => {
  document.documentElement.style.removeProperty("--appshell-footer-height");
});

describe("Content reserves the footer's space", () => {
  it("reserves the published footer height below itself", () => {
    const { container } = render(<Content>page</Content>);
    const main = container.querySelector("main") as HTMLElement;
    expect(main.style.marginBottom).toContain("--appshell-footer-height");
  });

  it("leaves a caller's own bottom padding alone", () => {
    const { container } = render(<Content className="pb-8">page</Content>);
    const main = container.querySelector("main") as HTMLElement;
    expect(main.className).toContain("pb-8");
    expect(main.style.paddingBottom).toBe("");
  });

  it("collapses to nothing when there is no Footer", () => {
    render(<Content>page</Content>);
    // Nothing published the variable, so the var() falls back to 0px.
    expect(footerVar()).toBe("");
  });

  it("publishes a height while a Footer is mounted", () => {
    render(
      <Footer>
        <FooterItem label="Home" />
      </Footer>
    );
    // jsdom reports 0 for offsetHeight, but the variable must exist — the
    // measurement path ran.
    expect(footerVar()).toBe("0px");
  });

  it("clears the variable when the Footer unmounts", () => {
    const { unmount } = render(
      <Footer>
        <FooterItem label="Home" />
      </Footer>
    );
    expect(footerVar()).toBe("0px");
    unmount();
    expect(footerVar()).toBe("");
  });

  it("publishes from the floating variant too", () => {
    render(
      <Footer variant="floating">
        <div>dock</div>
      </Footer>
    );
    expect(footerVar()).toBe("0px");
  });
});
