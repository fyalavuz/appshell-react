import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useKeyboardInset } from "../src/hooks/use-keyboard-inset";
import { Footer, FooterItem } from "../src/Footer";

const VAR = "--appshell-keyboard-inset-bottom";

/** A stand-in for the visual viewport we can shrink at will. */
function stubViewport(height: number) {
  const listeners = new Set<() => void>();
  const viewport = {
    height,
    offsetTop: 0,
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
  };
  Object.defineProperty(window, "visualViewport", {
    value: viewport,
    configurable: true,
    writable: true,
  });
  return {
    resizeTo(next: number) {
      viewport.height = next;
      for (const cb of listeners) cb();
    },
  };
}

function Probe() {
  const inset = useKeyboardInset();
  return <span data-testid="inset">{inset}</span>;
}

// Restore by hand rather than vi.unstubAllGlobals(), which would also drop
// the ResizeObserver mock the shared setup installs.
const realRaf = globalThis.requestAnimationFrame;
const realCancel = globalThis.cancelAnimationFrame;

beforeEach(() => {
  // Run the measurement synchronously so assertions do not need to wait.
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    cb(0);
    return 1;
  }) as typeof globalThis.requestAnimationFrame;
  globalThis.cancelAnimationFrame = (() => {}) as typeof globalThis.cancelAnimationFrame;
});

afterEach(() => {
  globalThis.requestAnimationFrame = realRaf;
  globalThis.cancelAnimationFrame = realCancel;
  document.documentElement.style.removeProperty(VAR);
});

describe("useKeyboardInset", () => {
  it("reports nothing without a visual viewport", () => {
    Object.defineProperty(window, "visualViewport", {
      value: undefined,
      configurable: true,
      writable: true,
    });
    render(<Probe />);
    expect(screen.getByTestId("inset")).toHaveTextContent("0");
  });

  it("reports what the keyboard covers and publishes it as a variable", () => {
    const viewport = stubViewport(window.innerHeight);
    render(<Probe />);
    expect(screen.getByTestId("inset")).toHaveTextContent("0");

    act(() => viewport.resizeTo(window.innerHeight - 300));

    expect(screen.getByTestId("inset")).toHaveTextContent("300");
    expect(document.documentElement.style.getPropertyValue(VAR)).toBe("300px");
  });

  it("ignores a shrink too small to be a keyboard", () => {
    const viewport = stubViewport(window.innerHeight);
    render(<Probe />);
    // A retracting URL bar, not a keyboard.
    act(() => viewport.resizeTo(window.innerHeight - 40));
    expect(screen.getByTestId("inset")).toHaveTextContent("0");
  });

  it("releases the variable when the last subscriber unmounts", () => {
    const viewport = stubViewport(window.innerHeight);
    const { unmount } = render(<Probe />);
    act(() => viewport.resizeTo(window.innerHeight - 250));
    expect(document.documentElement.style.getPropertyValue(VAR)).toBe("250px");
    unmount();
    expect(document.documentElement.style.getPropertyValue(VAR)).toBe("");
  });
});

describe("Footer hideOnKeyboard", () => {
  it("stays put by default while the keyboard is up", () => {
    const viewport = stubViewport(window.innerHeight);
    render(
      <Footer>
        <FooterItem icon={<span />} label="Home" />
      </Footer>
    );
    act(() => viewport.resizeTo(window.innerHeight - 300));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("steps out of the way when asked", () => {
    const viewport = stubViewport(window.innerHeight);
    render(
      <Footer hideOnKeyboard>
        <FooterItem icon={<span />} label="Home" />
      </Footer>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    act(() => viewport.resizeTo(window.innerHeight - 300));
    expect(screen.queryByText("Home")).toBeNull();
  });
});
