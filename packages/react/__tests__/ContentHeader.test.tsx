import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ComponentProps } from "react";
import { Breadcrumbs, BreadcrumbItem, ContentHeader } from "../src/ContentHeader";
import { LinkProvider } from "../src/LinkContext";

function FakeLink({ href, children, ...rest }: ComponentProps<"a">) {
  return (
    <a href={href} data-router-link {...rest}>
      {children}
    </a>
  );
}

describe("Breadcrumbs", () => {
  it("renders a labelled nav with separators between items", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem label="Terra" href="/" />
        <BreadcrumbItem label="Projects" href="/projects" />
        <BreadcrumbItem label="Atlas launch" current />
      </Breadcrumbs>
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    // n items → n-1 separators.
    expect(nav.querySelectorAll("li[aria-hidden]")).toHaveLength(2);
  });

  it("marks the current page and drops its link styling", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem label="Projects" href="/projects" />
        <BreadcrumbItem label="Atlas launch" current />
      </Breadcrumbs>
    );
    const current = screen.getByText("Atlas launch");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.closest("a")).toBeNull();
  });

  it("routes href items through the LinkProvider component", () => {
    render(
      <LinkProvider component={FakeLink}>
        <Breadcrumbs>
          <BreadcrumbItem label="Projects" href="/projects" />
          <BreadcrumbItem label="Here" current />
        </Breadcrumbs>
      </LinkProvider>
    );
    const link = screen.getByText("Projects").closest("a")!;
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("href", "/projects");
  });
});

describe("ContentHeader", () => {
  it("renders breadcrumbs, title, subtitle and actions", () => {
    render(
      <ContentHeader
        title="Atlas launch"
        subtitle="14 open tasks"
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem label="Projects" href="/projects" />
            <BreadcrumbItem label="Atlas launch" current />
          </Breadcrumbs>
        }
        actions={<button type="button">New task</button>}
      />
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Atlas launch" })
    ).toBeInTheDocument();
    expect(screen.getByText("14 open tasks")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New task" })).toBeInTheDocument();
  });
});
