import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Avatar } from "../src/Avatar";
import { UserMenu, UserMenuItem } from "../src/UserMenu";
import { HeaderProvider } from "../src/HeaderContext";

describe("Avatar", () => {
  it("shows initials when there is no image", () => {
    render(<Avatar initials="FY" />);
    expect(screen.getByText("FY")).toBeInTheDocument();
  });

  it("renders the image when src is given and falls back on error", () => {
    render(<Avatar src="/me.png" alt="Me" initials="FY" />);
    const img = screen.getByRole("img", { name: "Me" });
    expect(img).toHaveAttribute("src", "/me.png");
    fireEvent.error(img);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("FY")).toBeInTheDocument();
  });

  it("honors the size prop", () => {
    const { container } = render(<Avatar initials="A" size="3rem" />);
    const el = container.querySelector("[data-avatar]") as HTMLElement;
    expect(el.style.width).toBe("3rem");
    expect(el.style.height).toBe("3rem");
  });
});

describe("UserMenu", () => {
  const menu = (
    <UserMenu username="Fatih Yalavuz" detail="yalavuz@example.com" initials="FY">
      <UserMenuItem label="Profile" onClick={() => {}} />
      <UserMenuItem label="Log out" destructive onClick={() => {}} />
    </UserMenu>
  );

  it("renders a closed avatar trigger with menu semantics", () => {
    render(menu);
    const trigger = screen.getByRole("button", { name: "User menu" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on click and shows the user's identity and items", () => {
    render(menu);
    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Fatih Yalavuz")).toBeInTheDocument();
    expect(screen.getByText("yalavuz@example.com")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Log out" })).toBeInTheDocument();
  });

  it("fires the item handler and closes after a click", () => {
    const onProfile = vi.fn();
    render(
      <UserMenu username="U" initials="U">
        <UserMenuItem label="Profile" onClick={onProfile} />
      </UserMenu>
    );
    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Profile" }));
    expect(onProfile).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape and on outside click", () => {
    render(
      <div>
        <p>outside</p>
        {menu}
      </div>
    );
    const trigger = screen.getByRole("button", { name: "User menu" });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.mouseDown(screen.getByText("outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports a fully custom trigger", () => {
    render(
      <UserMenu username="U" trigger={<span>Custom face</span>}>
        <UserMenuItem label="Item" />
      </UserMenu>
    );
    expect(screen.getByText("Custom face")).toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <UserMenu username="U" initials="U" open={false} onOpenChange={onOpenChange}>
        <UserMenuItem label="Item" />
      </UserMenu>
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "User menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // Still closed — parent owns the state.
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    rerender(
      <UserMenu username="U" initials="U" open onOpenChange={onOpenChange}>
        <UserMenuItem label="Item" />
      </UserMenu>
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders href items as menuitem links", () => {
    render(
      <UserMenu username="U" initials="U" open onOpenChange={() => {}}>
        <UserMenuItem label="Settings" href="/settings" />
      </UserMenu>
    );
    const item = screen.getByRole("menuitem", { name: "Settings" });
    expect(item.tagName).toBe("A");
    expect(item).toHaveAttribute("href", "/settings");
  });

  it("adapts the trigger to dark header themes", () => {
    render(
      <HeaderProvider value={{ theme: "primary" }}>
        <UserMenu username="U" initials="U">
          <UserMenuItem label="Item" />
        </UserMenu>
      </HeaderProvider>
    );
    expect(
      screen.getByRole("button", { name: "User menu" }).className
    ).toContain("hover:ring-white/30");
  });
});
