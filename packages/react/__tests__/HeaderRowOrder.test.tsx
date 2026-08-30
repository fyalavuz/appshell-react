import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../src/Header";
import { SearchField } from "../src/SearchField";

const rowOrderOf = () => {
  const rows = Array.from(
    document.querySelectorAll("[data-header-context], [data-header-search]")
  );
  return rows.map((el) =>
    el.hasAttribute("data-header-context") ? "context" : "search"
  );
};

describe("Header rowOrder", () => {
  it("stacks the title block above the search row by default", () => {
    render(
      <Header
        title="Home"
        subtitle="Catch up"
        searchContent={<SearchField />}
      />
    );
    expect(rowOrderOf()).toEqual(["context", "search"]);
  });

  it("puts search first when asked", () => {
    render(
      <Header
        title="Home"
        subtitle="Catch up"
        searchContent={<SearchField />}
        rowOrder={["search", "context"]}
      />
    );
    expect(rowOrderOf()).toEqual(["search", "context"]);
  });

  it("keeps rendering both rows' content in either order", () => {
    render(
      <Header
        title="Home"
        searchContent={<SearchField placeholder="Find" />}
        rowOrder={["search", "context"]}
      />
    );
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Find" })).toBeInTheDocument();
  });

  it("omits a row whose content is absent, whatever the order", () => {
    render(<Header searchContent={<SearchField />} rowOrder={["search", "context"]} />);
    expect(rowOrderOf()).toEqual(["search"]);
  });
});

describe("SearchField full variant", () => {
  it("takes the background it sits on rather than painting its own", () => {
    render(<SearchField variant="full" />);
    const field = document.querySelector('[data-search-field="full"]')!;
    expect(field.className).toContain("bg-transparent");
    expect(field.className).not.toContain("bg-muted");
    expect(field.className).not.toContain("bg-white/10");
  });

  it("still fills the pill variant", () => {
    render(<SearchField variant="pill" />);
    const field = document.querySelector('[data-search-field="pill"]')!;
    expect(field.className).toContain("bg-muted");
  });
});
