import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchField } from "../src/SearchField";
import { HeaderProvider } from "../src/HeaderContext";

describe("SearchField", () => {
  it("renders the pill variant by default with an accessible searchbox", () => {
    const { container } = render(<SearchField placeholder="Search notes" />);
    expect(
      container.querySelector("[data-search-field='pill']")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: "Search notes" })
    ).toBeInTheDocument();
  });

  it("renders the full variant edge to edge", () => {
    const { container } = render(
      <SearchField variant="full" placeholder="Search" />
    );
    const label = container.querySelector("[data-search-field='full']")!;
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("w-full");
  });

  it("reports changes and Enter submissions", () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    render(
      <SearchField placeholder="Search" onChange={onChange} onSubmit={onSubmit} />
    );
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "espresso" } });
    expect(onChange).toHaveBeenCalledWith("espresso");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("espresso");
  });

  it("supports controlled values", () => {
    render(<SearchField placeholder="Search" value="fixed" onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveValue("fixed");
  });

  it("adapts surfaces to dark header themes", () => {
    const { container } = render(
      <HeaderProvider value={{ theme: "primary" }}>
        <SearchField placeholder="Search" />
      </HeaderProvider>
    );
    const label = container.querySelector("[data-search-field='pill']")!;
    expect(label.className).toContain("bg-white/15");
  });
});
