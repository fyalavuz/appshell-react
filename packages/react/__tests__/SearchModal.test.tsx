import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { SearchModal } from "../src/SearchModal";
import { SearchField } from "../src/SearchField";

describe("SearchModal", () => {
  it("renders nothing while closed", () => {
    render(
      <SearchModal open={false} onClose={() => {}}>
        results
      </SearchModal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens as a dialog portaled to the body with a focused searchbox", async () => {
    render(
      <SearchModal open onClose={() => {}} placeholder="Search anything">
        results
      </SearchModal>
    );
    const dialog = screen.getByRole("dialog", { name: "Search anything" });
    expect(dialog.parentElement).toBe(document.body);
    const input = screen.getByRole("searchbox");
    await waitFor(() => expect(input).toHaveFocus());
  });

  it("seeds the input from defaultQuery on every open", () => {
    const { rerender } = render(
      <SearchModal open={false} onClose={() => {}} defaultQuery="first" />
    );
    rerender(<SearchModal open onClose={() => {}} defaultQuery="first" />);
    expect(screen.getByRole("searchbox")).toHaveValue("first");

    rerender(<SearchModal open={false} onClose={() => {}} defaultQuery="second" />);
    rerender(<SearchModal open onClose={() => {}} defaultQuery="second" />);
    expect(screen.getByRole("searchbox")).toHaveValue("second");
  });

  it("reports query changes and Enter submissions", () => {
    const onQueryChange = vi.fn();
    const onSubmit = vi.fn();
    render(
      <SearchModal
        open
        onClose={() => {}}
        onQueryChange={onQueryChange}
        onSubmit={onSubmit}
      />
    );
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "turbine" } });
    expect(onQueryChange).toHaveBeenCalledWith("turbine");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("turbine");
  });

  it("gives render-prop children the live query", () => {
    render(
      <SearchModal open onClose={() => {}} defaultQuery="pum">
        {(query) => <p>results for {query}</p>}
      </SearchModal>
    );
    expect(screen.getByText("results for pum")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "pump" },
    });
    expect(screen.getByText("results for pump")).toBeInTheDocument();
  });

  it("closes on Escape, backdrop click, and the cancel button", () => {
    const onClose = vi.fn();
    const { container: _c } = render(
      <SearchModal open onClose={onClose} closeLabel="Dismiss" />
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(document.querySelector(".fixed.inset-0")!);
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("locks body scroll while open", () => {
    const { rerender } = render(<SearchModal open onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<SearchModal open={false} onClose={() => {}} />);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("continues a search started in a SearchField trigger", () => {
    function App() {
      const [query, setQuery] = useState("");
      const [open, setOpen] = useState(false);
      return (
        <>
          <SearchField
            placeholder="Quick search"
            value={query}
            onChange={setQuery}
            onClick={() => setOpen(true)}
          />
          <SearchModal
            open={open}
            onClose={() => setOpen(false)}
            defaultQuery={query}
            placeholder="Search everywhere"
          />
        </>
      );
    }
    render(<App />);
    const field = screen.getByRole("searchbox", { name: "Quick search" });
    fireEvent.change(field, { target: { value: "valve" } });
    fireEvent.click(field);
    expect(
      screen.getByRole("searchbox", { name: "Search everywhere" })
    ).toHaveValue("valve");
  });
});
