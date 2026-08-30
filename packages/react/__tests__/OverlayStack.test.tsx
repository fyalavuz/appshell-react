import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useState } from "react";
import { Sidebar } from "../src/Sidebar";
import { SearchModal } from "../src/SearchModal";
import { BottomSheet } from "../src/BottomSheet";
import { UserMenu, UserMenuItem } from "../src/UserMenu";
import { NavItem } from "../src/NavItem";

beforeEach(() => {
  document.body.style.overflow = "";
});

const dialogCount = () => document.querySelectorAll('[role="dialog"]').length;

/** A drawer with a button that opens a search modal on top of it. */
function DrawerWithModal({ onDrawerClose }: { onDrawerClose?: () => void } = {}) {
  const [drawer, setDrawer] = useState(true);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Sidebar
        open={drawer}
        onClose={() => {
          setDrawer(false);
          onDrawerClose?.();
        }}
      >
        <NavItem label="Home" />
        <button type="button" onClick={() => setModal(true)}>
          open search
        </button>
      </Sidebar>
      <button type="button" onClick={() => setModal(false)}>
        close modal
      </button>
      <SearchModal open={modal} onClose={() => setModal(false)}>
        {() => <div>results</div>}
      </SearchModal>
    </>
  );
}

describe("overlay stack — close requests", () => {
  it("Escape closes only the topmost layer", () => {
    const onDrawerClose = vi.fn();
    render(<DrawerWithModal onDrawerClose={onDrawerClose} />);
    fireEvent.click(screen.getByText("open search"));
    expect(dialogCount()).toBe(2);

    fireEvent.keyDown(document, { key: "Escape" });

    // The modal is gone, the drawer it was opened from is still there.
    expect(dialogCount()).toBe(1);
    expect(onDrawerClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Navigation menu"
    );
  });

  it("hands the close request down as layers close", () => {
    render(<DrawerWithModal />);
    fireEvent.click(screen.getByText("open search"));
    fireEvent.keyDown(document, { key: "Escape" }); // closes the modal
    fireEvent.keyDown(document, { key: "Escape" }); // now the drawer
    expect(dialogCount()).toBe(0);
  });

  it("lets a menu opened inside a drawer close on its own", () => {
    render(
      <Sidebar
        open
        onClose={() => {}}
        bottomContent={
          <UserMenu username="Mara" initials="MK">
            <UserMenuItem label="Log out" />
          </UserMenu>
        }
      >
        <NavItem label="Home" />
      </Sidebar>
    );
    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("menu")).toBeNull();
    // The drawer underneath survived the same keypress.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("overlay stack — scroll lock refcount", () => {
  it("keeps the page locked while the outer layer closes first", () => {
    function Pair() {
      const [drawer, setDrawer] = useState(true);
      const [modal, setModal] = useState(true);
      return (
        <>
          <button type="button" onClick={() => setDrawer(false)}>
            close drawer
          </button>
          <button type="button" onClick={() => setModal(false)}>
            close modal
          </button>
          <Sidebar open={drawer} onClose={() => setDrawer(false)}>
            <NavItem label="Home" />
          </Sidebar>
          <SearchModal open={modal} onClose={() => setModal(false)}>
            {() => <div>results</div>}
          </SearchModal>
        </>
      );
    }
    render(<Pair />);
    expect(document.body.style.overflow).toBe("hidden");

    // Close the OUTER layer first — the modal is still up, so the page
    // must stay locked.
    fireEvent.click(screen.getByText("close drawer"));
    expect(document.body.style.overflow).toBe("hidden");

    // Now the last layer goes: the lock is released, not left behind.
    fireEvent.click(screen.getByText("close modal"));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("releases the lock when two layers close in the same commit", () => {
    render(<DrawerWithModal />);
    fireEvent.click(screen.getByText("open search"));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(dialogCount()).toBe(0);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("does not lock for a non-modal sheet stacked over a drawer", () => {
    render(
      <>
        <Sidebar open onClose={() => {}}>
          <NavItem label="Home" />
        </Sidebar>
        <BottomSheet open modal={false} onClose={() => {}} aria-label="Sheet">
          sheet
        </BottomSheet>
      </>
    );
    // The drawer's own lock still stands; the sheet added none of its own.
    expect(document.body.style.overflow).toBe("hidden");
  });
});

describe("overlay stack — stacking order", () => {
  it("puts a sheet opened over a drawer above it", () => {
    render(
      <>
        <Sidebar open onClose={() => {}}>
          <NavItem label="Home" />
        </Sidebar>
        <BottomSheet open onClose={() => {}} aria-label="Sheet">
          sheet
        </BottomSheet>
      </>
    );
    const drawer = screen.getByRole("dialog", { name: "Navigation menu" });
    const sheetRoot = document.querySelector(
      "[data-bottom-sheet-root]"
    ) as HTMLElement;

    expect(Number(sheetRoot.style.zIndex)).toBeGreaterThan(
      Number((drawer as HTMLElement).style.zIndex)
    );
  });
});

describe("overlay stack — nested focus traps", () => {
  it("leaves focus in the frontmost layer on Tab", () => {
    render(<DrawerWithModal />);
    fireEvent.click(screen.getByText("open search"));

    const modal = screen.getByRole("dialog", { name: /Search/i });
    const input = modal.querySelector("input") as HTMLInputElement;
    input.focus();
    expect(modal.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(document, { key: "Tab" });

    // The drawer's trap must not yank focus down into itself.
    expect(modal.contains(document.activeElement)).toBe(true);
  });
});
