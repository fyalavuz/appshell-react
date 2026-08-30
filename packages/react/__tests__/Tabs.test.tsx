import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs, Tab } from "../src/Tabs";

const threeTabs = (
  <>
    <Tab value="posts" label="Posts" />
    <Tab value="replies" label="Replies" badge={<span>3</span>} />
    <Tab value="media" label="Media" />
  </>
);

describe("Tabs", () => {
  it("selects the first tab by default and switches on click", () => {
    const onValueChange = vi.fn();
    render(<Tabs onValueChange={onValueChange}>{threeTabs}</Tabs>);
    expect(screen.getByRole("tab", { name: "Posts" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    fireEvent.click(screen.getByRole("tab", { name: /Replies/ }));
    expect(onValueChange).toHaveBeenCalledWith("replies");
    expect(screen.getByRole("tab", { name: /Replies/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("honors defaultValue and renders badges", () => {
    render(<Tabs defaultValue="media">{threeTabs}</Tabs>);
    expect(screen.getByRole("tab", { name: "Media" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("supports controlled value", () => {
    const onValueChange = vi.fn();
    render(
      <Tabs value="posts" onValueChange={onValueChange}>
        {threeTabs}
      </Tabs>
    );
    fireEvent.click(screen.getByRole("tab", { name: "Media" }));
    expect(onValueChange).toHaveBeenCalledWith("media");
    // Parent owns the state — selection unchanged.
    expect(screen.getByRole("tab", { name: "Posts" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("moves selection with arrow keys, wrapping at the ends", () => {
    render(<Tabs>{threeTabs}</Tabs>);
    const posts = screen.getByRole("tab", { name: "Posts" });
    posts.focus();
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /Replies/ })).toHaveFocus();
    expect(screen.getByRole("tab", { name: /Replies/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Media" })).toHaveFocus();
  });

  it("docks below the header by default and inline with sticky=false", () => {
    const { container, rerender } = render(<Tabs>{threeTabs}</Tabs>);
    const row = container.querySelector("[data-tabs]") as HTMLElement;
    expect(row.className).toContain("sticky");
    expect(row.style.top).toBe("var(--header-height, 0px)");

    rerender(<Tabs sticky={false}>{threeTabs}</Tabs>);
    expect(row.className).not.toContain("sticky");
  });
});
