"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
  NavGroup,
  NavItem,
  Sidebar,
  type SidebarSide,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const stats = [
  { label: "Requests", value: "4.2M", delta: "+12.4%", up: true },
  { label: "Errors", value: "1,208", delta: "-8.1%", up: false },
  { label: "P95 latency", value: "184 ms", delta: "-12 ms", up: false },
  { label: "Uptime", value: "99.98%", delta: "+0.01", up: true },
];

const deploys = [
  { env: "Production", hash: "f3a9c12", message: "Fix rate limiter off-by-one", time: "8m ago", status: "live" as const },
  { env: "Preview", hash: "b71e044", message: "Billing page redesign", time: "24m ago", status: "building" as const },
  { env: "Production", hash: "9dc2f80", message: "Bump node to 22.11", time: "1h ago", status: "live" as const },
  { env: "Staging", hash: "44aa1c7", message: "Migrate sessions to Redis", time: "2h ago", status: "live" as const },
  { env: "Preview", hash: "e0b93d5", message: "Experiment: streamed exports", time: "3h ago", status: "failed" as const },
  { env: "Production", hash: "7f16a29", message: "Rotate webhook signing keys", time: "5h ago", status: "live" as const },
  { env: "Staging", hash: "c85d31b", message: "Add audit-log retention job", time: "8h ago", status: "live" as const },
  { env: "Preview", hash: "12e7f6a", message: "New members table filters", time: "12h ago", status: "live" as const },
  { env: "Production", hash: "a94b208", message: "Hotfix: CSV import encoding", time: "1d ago", status: "live" as const },
  { env: "Staging", hash: "58c0d97", message: "Upgrade Postgres driver", time: "1d ago", status: "failed" as const },
  { env: "Production", hash: "31f8e4c", message: "Ship usage-based invoicing", time: "2d ago", status: "live" as const },
  { env: "Preview", hash: "d267a15", message: "API keys scoping UI", time: "2d ago", status: "live" as const },
];

const statusStyles = {
  live: { dot: "bg-emerald-500", label: "Live" },
  building: { dot: "bg-blue-500 animate-pulse", label: "Building" },
  failed: { dot: "bg-red-500", label: "Failed" },
};

const sides: SidebarSide[] = ["left", "right"];

export default function SidebarPage() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<SidebarSide>("left");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-1 font-bold tracking-tight">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="mr-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Menu className="size-5" />
              </button>
              Console
            </span>
          }
          actions={
            <div className="flex items-center rounded-lg bg-muted p-0.5 text-xs font-medium">
              {sides.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                    side === s
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          }
        />

        <Sidebar open={open} onClose={() => setOpen(false)} side={side}>
          <div className="flex min-h-full flex-col">
            <div className="flex items-center gap-3 border-b px-4 py-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
                NL
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Northstar Labs</p>
                <p className="text-xs text-muted-foreground">
                  console.northstar.dev
                </p>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                Pro
              </span>
            </div>

            <div className="flex-1 px-3 py-3">
              <NavGroup title="Workspace" defaultOpen>
                <NavItem
                  icon={<LayoutDashboard className="size-4" />}
                  label="Dashboard"
                  active
                  className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                />
                <NavItem
                  icon={<BarChart3 className="size-4" />}
                  label="Reports"
                />
                <NavItem
                  icon={<Users className="size-4" />}
                  label="Members"
                  badge={
                    <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      2
                    </span>
                  }
                />
              </NavGroup>

              <NavGroup
                title="Settings"
                icon={<Settings className="size-4" />}
              >
                <NavItem
                  icon={<CreditCard className="size-4" />}
                  label="Billing"
                />
                <NavItem
                  icon={<KeyRound className="size-4" />}
                  label="API keys"
                />
                <NavItem
                  icon={<SlidersHorizontal className="size-4" />}
                  label="Preferences"
                />
              </NavGroup>
            </div>

            <div className="border-t px-3 py-3">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
                Sign out
                <span className="ml-auto text-xs text-muted-foreground">
                  ada@northstar.dev
                </span>
              </button>
            </div>
          </div>
        </Sidebar>

        <Content className="mx-auto w-full max-w-3xl pb-16">
          <DemoHint>
            Open the drawer from either edge — flip the switch above, then
            dismiss with the backdrop or Escape.
          </DemoHint>

          <div className="px-4">
            <h1 className="text-lg font-bold">Overview</h1>
            <p className="text-xs text-muted-foreground">
              Last 24 hours · all regions
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border p-3.5">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-xl font-bold tabular-nums">
                    {s.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    {s.up ? (
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    ) : (
                      <ArrowDownRight className="size-3.5" aria-hidden />
                    )}
                    {s.delta} vs yesterday
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-semibold">Recent deploys</h2>
            <ul className="mt-2 divide-y rounded-xl border">
              {deploys.map((d) => {
                const status = statusStyles[d.status];
                return (
                  <li
                    key={d.hash}
                    className="flex items-center gap-3 px-3.5 py-3"
                  >
                    <span className="w-20 shrink-0 rounded-md border px-1.5 py-0.5 text-center text-[10px] font-medium text-muted-foreground">
                      {d.env}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {d.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono">{d.hash}</span> · {d.time}
                      </p>
                    </div>
                    <span
                      className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"
                      title={status.label}
                    >
                      <span
                        className={`size-2 rounded-full ${status.dot}`}
                        aria-hidden
                      />
                      {status.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="py-8 text-center text-xs text-muted-foreground">
              Deploys are retained for 90 days
            </p>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
