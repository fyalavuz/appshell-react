import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nProvider } from "../src/I18nContext";
import { Sidebar } from "../src/Sidebar";
import { NavItem } from "../src/NavItem";
import { Breadcrumbs, BreadcrumbItem } from "../src/ContentHeader";
import { SearchModal } from "../src/SearchModal";
import { NotificationsMenu } from "../src/NotificationsMenu";

describe("I18nProvider labels", () => {
  it("uses English defaults with no provider", () => {
    render(
      <Sidebar open onClose={() => {}}>
        <NavItem label="Home" />
      </Sidebar>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Navigation menu"
    );
  });

  it("renames a string the component has no prop for", () => {
    render(
      <I18nProvider labels={{ navigationMenu: "Menü de navigation" }}>
        <Sidebar open onClose={() => {}}>
          <NavItem label="Home" />
        </Sidebar>
      </I18nProvider>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Menü de navigation"
    );
  });

  it("leaves unspecified keys on their default", () => {
    render(
      <I18nProvider labels={{ search: "Ara" }}>
        <Breadcrumbs>
          <BreadcrumbItem label="Home" current />
        </Breadcrumbs>
      </I18nProvider>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Breadcrumb"
    );
  });

  it("lets a component's own prop win over the provider", () => {
    render(
      <I18nProvider labels={{ breadcrumb: "from provider" }}>
        <Breadcrumbs aria-label="from prop">
          <BreadcrumbItem label="Home" current />
        </Breadcrumbs>
      </I18nProvider>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "from prop"
    );
  });

  it("routes through a t function, handing it the English default", () => {
    const t = vi.fn((key: string, defaultValue: string) => `[${key}:${defaultValue}]`);
    render(
      <I18nProvider t={t}>
        <Sidebar open onClose={() => {}}>
          <NavItem label="Home" />
        </Sidebar>
      </I18nProvider>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "[navigationMenu:Navigation menu]"
    );
  });

  it("interpolates {token} variables", () => {
    render(
      <NotificationsMenu unreadCount={7}>
        <div />
      </NotificationsMenu>
    );
    expect(
      screen.getByRole("button", { name: "Notifications (7 unread)" })
    ).toBeInTheDocument();
  });

  it("interpolates into an overridden string too", () => {
    render(
      <I18nProvider labels={{ notificationsUnread: "{count} okunmamış bildirim" }}>
        <NotificationsMenu unreadCount={3}>
          <div />
        </NotificationsMenu>
      </I18nProvider>
    );
    expect(
      screen.getByRole("button", { name: "3 okunmamış bildirim" })
    ).toBeInTheDocument();
  });

  it("localizes the overflow badge cap", () => {
    render(
      <I18nProvider labels={{ badgeOverflow: "{max}٫" }}>
        <NotificationsMenu unreadCount={120}>
          <div />
        </NotificationsMenu>
      </I18nProvider>
    );
    expect(screen.getByText("99٫")).toBeInTheDocument();
  });
});

describe("I18nProvider direction", () => {
  it("defaults to ltr on a portalled overlay", () => {
    render(
      <SearchModal open onClose={() => {}}>
        {() => <div>results</div>}
      </SearchModal>
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("dir", "ltr");
  });

  it("reaches a portal, which cannot inherit dir from the DOM", () => {
    render(
      <I18nProvider dir="rtl">
        <SearchModal open onClose={() => {}}>
          {() => <div>results</div>}
        </SearchModal>
      </I18nProvider>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("dir", "rtl");
    // The portal really is outside the provider's DOM subtree.
    expect(document.body.contains(dialog)).toBe(true);
  });

  it("reaches an anchored menu panel", () => {
    render(
      <I18nProvider dir="rtl">
        <NotificationsMenu unreadCount={0}>
          <div>none</div>
        </NotificationsMenu>
      </I18nProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    expect(screen.getByRole("menu")).toHaveAttribute("dir", "rtl");
  });
});
