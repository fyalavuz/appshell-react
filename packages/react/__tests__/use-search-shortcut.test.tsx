import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useSearchShortcut } from "../src/hooks/use-search-shortcut";
import type { SearchShortcutOptions } from "../src/types";

function Harness({
  onTrigger,
  options,
}: {
  onTrigger: () => void;
  options?: SearchShortcutOptions;
}) {
  useSearchShortcut(onTrigger, options);
  return <input aria-label="editor" />;
}

describe("useSearchShortcut", () => {
  it("fires on ⌘K and Ctrl+K, but not on a bare K", () => {
    const onTrigger = vi.fn();
    render(<Harness onTrigger={onTrigger} />);

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.keyDown(window, { key: "K", ctrlKey: true });
    expect(onTrigger).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(window, { key: "k" });
    fireEvent.keyDown(window, { key: "k", metaKey: true, shiftKey: true });
    expect(onTrigger).toHaveBeenCalledTimes(2);
  });

  it("fires the combo even while typing in an input", () => {
    const onTrigger = vi.fn();
    const { getByLabelText } = render(<Harness onTrigger={onTrigger} />);
    fireEvent.keyDown(getByLabelText("editor"), { key: "k", ctrlKey: true });
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it("supports the slash trigger outside editable fields only", () => {
    const onTrigger = vi.fn();
    const { getByLabelText } = render(
      <Harness onTrigger={onTrigger} options={{ slash: true }} />
    );

    fireEvent.keyDown(window, { key: "/" });
    expect(onTrigger).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(getByLabelText("editor"), { key: "/" });
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it("ignores the slash without opting in, and everything when disabled", () => {
    const onTrigger = vi.fn();
    const { rerender } = render(<Harness onTrigger={onTrigger} />);

    fireEvent.keyDown(window, { key: "/" });
    expect(onTrigger).not.toHaveBeenCalled();

    rerender(<Harness onTrigger={onTrigger} options={{ enabled: false }} />);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(onTrigger).not.toHaveBeenCalled();
  });

  it("supports a custom key", () => {
    const onTrigger = vi.fn();
    render(<Harness onTrigger={onTrigger} options={{ key: "p" }} />);
    fireEvent.keyDown(window, { key: "p", metaKey: true });
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });
});
