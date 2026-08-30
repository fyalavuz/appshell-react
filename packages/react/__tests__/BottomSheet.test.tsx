import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BottomSheet } from "../src/BottomSheet";

const grabber = () =>
  document.querySelector<HTMLElement>("[data-bottom-sheet] .touch-none")!;

describe("BottomSheet", () => {
  it("renders nothing while closed", () => {
    render(
      <BottomSheet open={false} onClose={() => {}}>
        content
      </BottomSheet>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens as a portaled dialog sized by its snap points", async () => {
    render(
      <BottomSheet open onClose={() => {}} aria-label="City guide">
        <p>Places</p>
      </BottomSheet>
    );
    const dialog = screen.getByRole("dialog", { name: "City guide" });
    expect(document.body.contains(dialog)).toBe(true);
    // Panel height is the tallest snap; resting offset is the difference.
    expect(dialog.style.height).toBe("90dvh");
    await waitFor(() =>
      expect(dialog.style.transform).toContain("45dvh")
    );
    expect(screen.getByText("Places")).toBeInTheDocument();
  });

  it("closes on Escape and backdrop click when modal", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        content
      </BottomSheet>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(
      document.querySelector("[data-bottom-sheet-root] > [aria-hidden]")!
    );
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("locks body scroll only while a modal sheet is open", () => {
    const { rerender } = render(
      <BottomSheet open onClose={() => {}}>
        c
      </BottomSheet>
    );
    expect(document.body.style.overflow).toBe("hidden");
    rerender(
      <BottomSheet open={false} onClose={() => {}}>
        c
      </BottomSheet>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("renders no backdrop and keeps the page interactive when non-modal", () => {
    render(
      <BottomSheet open onClose={() => {}} modal={false}>
        c
      </BottomSheet>
    );
    const root = document.querySelector("[data-bottom-sheet-root]")!;
    expect(root.className).toContain("pointer-events-none");
    expect(root.querySelector(":scope > [aria-hidden]")).toBeNull();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("dismisses when dragged well below the lowest snap", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        c
      </BottomSheet>
    );
    const handle = grabber();
    fireEvent.pointerDown(handle, { clientY: 200, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 800, pointerId: 1 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("snaps to the nearest point after an upward drag", () => {
    const onSnapChange = vi.fn();
    render(
      <BottomSheet open onClose={() => {}} onSnapChange={onSnapChange}>
        c
      </BottomSheet>
    );
    const handle = grabber();
    fireEvent.pointerDown(handle, { clientY: 600, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(onSnapChange).toHaveBeenCalledWith(1);
  });

  it("unmounts after the exit transition", async () => {
    const { rerender } = render(
      <BottomSheet open onClose={() => {}}>
        c
      </BottomSheet>
    );
    rerender(
      <BottomSheet open={false} onClose={() => {}}>
        c
      </BottomSheet>
    );
    await waitFor(
      () => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      { timeout: 1500 }
    );
  });
});
