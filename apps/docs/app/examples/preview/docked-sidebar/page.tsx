"use client";

import { useEffect, useState } from "react";
import {
  AppShell,
  BreadcrumbItem,
  Breadcrumbs,
  Content,
  ContentHeader,
  Header,
  MotionProvider,
  NavGroup,
  NavItem,
  SearchField,
  SearchModal,
  Sidebar,
  useSearchShortcut,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  CalendarDays,
  Check,
  Circle,
  CircleDashed,
  Menu,
  Mountain,
  Rocket,
  Search,
  Settings,
  Users,
  Globe,
  ClipboardList,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

const tasks = [
  { title: "Finalize launch checklist", owner: "Mara", due: "Today", state: "doing" },
  { title: "Press kit — screenshots and copy", owner: "Jonas", due: "Today", state: "doing" },
  { title: "Rate-limit the beta signup endpoint", owner: "Iris", due: "Tomorrow", state: "todo" },
  { title: "Dry-run the status page failover", owner: "Ansel", due: "Wed", state: "todo" },
  { title: "App Store listing localization (DE, JA)", owner: "Sana", due: "Thu", state: "todo" },
  { title: "Migrate marketing site to new tokens", owner: "Mara", due: "Fri", state: "todo" },
  { title: "Onboarding email sequence", owner: "Jonas", due: "Done", state: "done" },
  { title: "Billing plan matrix sign-off", owner: "Iris", due: "Done", state: "done" },
  { title: "Load test at 5x expected traffic", owner: "Ansel", due: "Done", state: "done" },
];

const stateIcon = {
  doing: <CircleDashed className="size-4 text-amber-500" />,
  todo: <Circle className="size-4 text-muted-foreground/50" />,
  done: <Check className="size-4 text-emerald-500" />,
} as const;

function TerraNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="p-2">
        <NavGroup title="Projects" defaultOpen>
          <NavItem
            icon={<Rocket className="size-4" />}
            label="Atlas launch"
            active
            onClick={onNavigate}
          />
          <NavItem
            icon={<Globe className="size-4" />}
            label="Website refresh"
            onClick={onNavigate}
          />
          <NavItem
            icon={<ClipboardList className="size-4" />}
            label="Q4 planning"
            onClick={onNavigate}
          />
        </NavGroup>
        <NavGroup title="Team" defaultOpen>
          <NavItem
            icon={<Users className="size-4" />}
            label="Members"
            badge={
              <span className="rounded-full bg-teal-100 px-1.5 text-[10px] font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                5
              </span>
            }
            onClick={onNavigate}
          />
          <NavItem
            icon={<CalendarDays className="size-4" />}
            label="Calendar"
            onClick={onNavigate}
          />
        </NavGroup>
      </div>
    </>
  );
}

export default function DockedSidebarPage() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [done, setDone] = useState<string[]>(
    tasks.filter((t) => t.state === "done").map((t) => t.title)
  );

  // Resolve the platform after mount so the static export hydrates cleanly.
  const [hint, setHint] = useState<string>();
  useEffect(() => {
    setHint(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K");
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    setOpen(false);
  };
  useSearchShortcut(openSearch);

  const toggleTask = (title: string) =>
    setDone((d) =>
      d.includes(title) ? d.filter((t) => t !== title) : [...d, title]
    );

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted md:hidden"
              >
                <Menu className="size-5" />
              </button>
              <span className="font-bold tracking-tight">Atlas launch</span>
            </span>
          }
          actions={
            <span className="flex -space-x-1.5" aria-hidden>
              {["M", "J", "I"].map((initial) => (
                <span
                  key={initial}
                  className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground"
                >
                  {initial}
                </span>
              ))}
            </span>
          }
        />

        <Sidebar
          variant="docked"
          breakpoint="md"
          collapsible
          open={open}
          onClose={() => setOpen(false)}
          topContent={
            <div>
              <div className="flex items-center gap-2 p-4 pb-3">
                <Mountain className="size-5 shrink-0 text-teal-600 dark:text-teal-400" />
                <span className="truncate font-bold tracking-tight group-data-[collapsed=true]/sidebar:hidden">
                  Terra
                </span>
              </div>
              {/* Expanded panel and drawer: a real search field. */}
              <div className="px-3 pb-3 group-data-[collapsed=true]/sidebar:hidden">
                <SearchField
                  inset={false}
                  placeholder="Search tasks"
                  shortcutHint={hint}
                  className="py-1.5"
                  onClick={openSearch}
                  onFocus={openSearch}
                />
              </div>
              {/* Collapsed rail: the same search, one icon wide. */}
              <button
                type="button"
                aria-label="Search tasks"
                onClick={openSearch}
                className="mx-auto mb-2 hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground group-data-[collapsed=true]/sidebar:flex"
              >
                <Search className="size-4" />
              </button>
            </div>
          }
          bottomContent={
            <div className="p-2">
              <NavItem
                icon={<Settings className="size-4" />}
                label="Workspace settings"
                onClick={() => setOpen(false)}
              />
            </div>
          }
        >
          <TerraNav onNavigate={() => setOpen(false)} />
        </Sidebar>

        <Content className="mx-auto w-full max-w-3xl pb-16">
          <DemoHint>
            On a desktop window the panel is docked and search lives at its
            top — press <kbd className="rounded border px-1">⌘K</kbd> or
            click the field. Collapse the panel to a rail and search shrinks
            to an icon. On a phone the same nav (search included) opens as a
            drawer.
          </DemoHint>

          <ContentHeader
            breadcrumbs={
              <Breadcrumbs>
                <BreadcrumbItem label="Terra" onClick={() => {}} />
                <BreadcrumbItem label="Projects" onClick={() => {}} />
                <BreadcrumbItem label="Atlas launch" current />
              </Breadcrumbs>
            }
            title="Launch week"
            subtitle={`${done.length} of ${tasks.length} tasks done`}
            actions={
              <span className="font-mono text-xs text-muted-foreground">
                due Friday
              </span>
            }
          />

          <div className="px-4">
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-300"
                style={{ width: `${(done.length / tasks.length) * 100}%` }}
              />
            </div>

            <ul className="mt-4 space-y-1.5">
              {tasks.map((task) => {
                const isDone = done.includes(task.title);
                return (
                  <li key={task.title}>
                    <button
                      type="button"
                      onClick={() => toggleTask(task.title)}
                      className="flex w-full items-center gap-3 rounded-xl border bg-card px-3.5 py-3 text-left transition-colors hover:bg-muted/40"
                    >
                      <span className="shrink-0">
                        {isDone ? stateIcon.done : stateIcon[task.state as "doing" | "todo"]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-sm font-medium",
                            isDone && "text-muted-foreground line-through"
                          )}
                        >
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {task.owner} · {isDone ? "Done" : task.due}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="py-8 text-center text-xs text-muted-foreground">
              Ship it 🚀
            </p>
          </div>
        </Content>

        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          placeholder="Search tasks"
          onSubmit={() => setSearchOpen(false)}
        >
          {(q) => {
            const matches = tasks.filter((t) =>
              `${t.title} ${t.owner}`.toLowerCase().includes(q.toLowerCase())
            );
            if (q && matches.length === 0) {
              return (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Nothing for &ldquo;{q}&rdquo; — try an owner&rsquo;s name.
                </p>
              );
            }
            return (
              <div className="py-1">
                <p className="px-4 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                  {q ? `${matches.length} task${matches.length === 1 ? "" : "s"}` : "All tasks"}
                </p>
                {matches.map((task) => {
                  const isDone = done.includes(task.title);
                  return (
                    <button
                      key={task.title}
                      type="button"
                      onClick={() => {
                        toggleTask(task.title);
                        setSearchOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted/60"
                    >
                      <span className="shrink-0">
                        {isDone
                          ? stateIcon.done
                          : stateIcon[task.state as "doing" | "todo"]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {task.owner} · {isDone ? "Done" : task.due}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          }}
        </SearchModal>
      </AppShell>
    </MotionProvider>
  );
}
