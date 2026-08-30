import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NotificationsMenu, NotificationItem } from "../src/NotificationsMenu";
import { UserMenu, UserMenuItem } from "../src/UserMenu";
import { HeaderProvider } from "../src/HeaderContext";

describe("NotificationsMenu", () => {
  const menu = (
    <NotificationsMenu unreadCount={2}>
      <NotificationItem title="Deploy finished" time="2m" unread onClick={() => {}} />
      <NotificationItem title="Weekly digest" onClick={() => {}} />
    </NotificationsMenu>
  );

  it("renders a closed bell trigger with the unread count in its label", () => {
    render(menu);
    const trigger = screen.getByRole("button", {
      name: "Notifications (2 unread)",
    });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("hides the badge at zero and caps it at 99+", () => {
    const { rerender } = render(<NotificationsMenu unreadCount={0} />);
    expect(
      screen.getByRole("button", { name: "Notifications" })
    ).toBeInTheDocument();
    rerender(<NotificationsMenu unreadCount={120} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("opens on click and lists the notifications", () => {
    render(menu);
    fireEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Deploy finished/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Weekly digest/ })
    ).toBeInTheDocument();
  });

  it("shows the built-in empty state without items", () => {
    render(<NotificationsMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    expect(screen.getByText(/all caught up/)).toBeInTheDocument();
  });

  it("closes after an item click but stays open for header actions", () => {
    const onItem = vi.fn();
    const onMarkAll = vi.fn();
    render(
      <NotificationsMenu
        unreadCount={1}
        action={
          <button type="button" onClick={onMarkAll}>
            Mark all read
          </button>
        }
      >
        <NotificationItem title="Ping" onClick={onItem} />
      </NotificationsMenu>
    );
    fireEvent.click(screen.getByRole("button", { name: /Notifications/ }));

    fireEvent.click(screen.getByRole("button", { name: "Mark all read" }));
    expect(onMarkAll).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Ping" }));
    expect(onItem).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape and on outside click", () => {
    render(
      <div>
        <p>outside</p>
        {menu}
      </div>
    );
    const trigger = screen.getByRole("button", { name: /Notifications/ });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.mouseDown(screen.getByText("outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <NotificationsMenu open={false} onOpenChange={onOpenChange} />
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // Still closed — parent owns the state.
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    rerender(<NotificationsMenu open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders href items as menuitem links", () => {
    render(
      <NotificationsMenu open onOpenChange={() => {}}>
        <NotificationItem title="Release notes" href="/releases/1.0" />
      </NotificationsMenu>
    );
    const item = screen.getByRole("menuitem", { name: /Release notes/ });
    expect(item.tagName).toBe("A");
    expect(item).toHaveAttribute("href", "/releases/1.0");
  });

  it("adapts the trigger to dark header themes", () => {
    render(
      <HeaderProvider value={{ theme: "primary" }}>
        <NotificationsMenu />
      </HeaderProvider>
    );
    expect(
      screen.getByRole("button", { name: "Notifications" }).className
    ).toContain("hover:ring-white/30");
  });
});

describe("anchored menu coexistence", () => {
  it("opening one menu closes the other instead of stacking", () => {
    render(
      <div>
        <UserMenu username="Mara" initials="M">
          <UserMenuItem label="Profile" onClick={() => {}} />
        </UserMenu>
        <NotificationsMenu unreadCount={1}>
          <NotificationItem title="Ping" onClick={() => {}} />
        </NotificationsMenu>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    expect(screen.getByRole("menu", { name: "User menu" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    expect(
      screen.queryByRole("menu", { name: "User menu" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("menu", { name: /Notifications/ })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    expect(screen.getByRole("menu", { name: "User menu" })).toBeInTheDocument();
    expect(
      screen.queryByRole("menu", { name: /Notifications/ })
    ).not.toBeInTheDocument();
  });

  it("opens upward when the trigger sits near the bottom of the viewport", () => {
    render(
      <UserMenu username="Mara" initials="M">
        <UserMenuItem label="Profile" onClick={() => {}} />
      </UserMenu>
    );
    const trigger = screen.getByRole("button", { name: "User menu" });
    // Pin the trigger to the bottom edge — the Sidebar bottom-slot case.
    const bottom = window.innerHeight - 8;
    vi.spyOn(trigger, "getBoundingClientRect").mockReturnValue({
      top: bottom - 32,
      bottom,
      left: 8,
      right: 40,
      width: 32,
      height: 32,
      x: 8,
      y: bottom - 32,
      toJSON: () => ({}),
    } as DOMRect);

    fireEvent.click(trigger);
    const panel = screen.getByRole("menu");
    expect(panel.style.bottom).not.toBe("auto");
    expect(panel.style.bottom).not.toBe("");
    expect(panel.style.top).toBe("auto");
  });
});
