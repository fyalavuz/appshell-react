import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SearchModal } from "../src/SearchModal";
import { Sidebar } from "../src/Sidebar";
import { NavItem } from "../src/NavItem";

describe("focus traps", () => {
  it("cycles Tab inside an open SearchModal", async () => {
    render(<SearchModal open onClose={() => {}} closeLabel="Cancel" />);
    const input = screen.getByRole("searchbox");
    const cancel = screen.getByRole("button", { name: "Cancel" });
    await waitFor(() => expect(input).toHaveFocus());

    // Forward from the last focusable wraps to the first.
    cancel.focus();
    fireEvent.keyDown(cancel, { key: "Tab" });
    expect(input).toHaveFocus();

    // Backward from the first wraps to the last.
    fireEvent.keyDown(input, { key: "Tab", shiftKey: true });
    expect(cancel).toHaveFocus();
  });

  it("pulls focus into the trap when it is elsewhere", async () => {
    render(
      <>
        <button type="button">outside</button>
        <SearchModal open onClose={() => {}} closeLabel="Cancel" />
      </>
    );
    await waitFor(() =>
      expect(screen.getByRole("searchbox")).toHaveFocus()
    );
    screen.getByRole("button", { name: "outside" }).focus();
    fireEvent.keyDown(document.activeElement!, { key: "Tab" });
    expect(screen.getByRole("searchbox")).toHaveFocus();
  });

  it("traps Tab inside the open drawer and restores focus on close", () => {
    function App({ open }: { open: boolean }) {
      return (
        <>
          <button type="button">menu trigger</button>
          <Sidebar open={open} onClose={() => {}}>
            <NavItem label="Home" href="/home" />
            <NavItem label="Library" href="/library" />
          </Sidebar>
        </>
      );
    }
    const { rerender } = render(<App open={false} />);
    const trigger = screen.getByRole("button", { name: "menu trigger" });
    trigger.focus();

    rerender(<App open />);
    const home = screen.getByText("Home").closest("a")!;
    const library = screen.getByText("Library").closest("a")!;

    // First Tab pulls focus into the drawer.
    fireEvent.keyDown(document.activeElement!, { key: "Tab" });
    expect(home).toHaveFocus();

    // Forward from the last wraps to the first.
    library.focus();
    fireEvent.keyDown(library, { key: "Tab" });
    expect(home).toHaveFocus();

    // Closing hands focus back to the trigger.
    rerender(<App open={false} />);
    expect(trigger).toHaveFocus();
  });
});
