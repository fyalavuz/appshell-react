"use client";

import { useState } from "react";
import {
  AppShell,
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Content,
  ContentHeader,
  Header,
  Tab,
  Tabs,
} from "appshell-react";
import {
  Building2,
  CheckCircle2,
  Circle,
  FileText,
  Milestone,
  Plus,
  Share2,
  Users,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

type ProjectId = "website-redesign" | "mobile-app" | "q4-marketing";

interface Task {
  title: string;
  assignee: string;
  done: boolean;
}

interface Milestone_ {
  label: string;
  date: string;
  done: boolean;
}

interface FileItem {
  name: string;
  kind: string;
  size: string;
}

interface Project {
  id: ProjectId;
  title: string;
  due: string;
  tasks: Task[];
  milestones: Milestone_[];
  files: FileItem[];
}

const projects: Project[] = [
  {
    id: "website-redesign",
    title: "Website redesign",
    due: "Oct 3",
    tasks: [
      { title: "Finalize homepage hero copy", assignee: "Priya", done: false },
      { title: "Migrate pricing page to new grid", assignee: "Devon", done: false },
      { title: "Audit color contrast across pages", assignee: "Sana", done: true },
      { title: "Wire up newsletter signup form", assignee: "Priya", done: false },
      { title: "Write redirect map for old URLs", assignee: "Devon", done: true },
    ],
    milestones: [
      { label: "Design freeze", date: "Sep 12", done: true },
      { label: "Content complete", date: "Sep 26", done: false },
      { label: "Launch", date: "Oct 3", done: false },
    ],
    files: [
      { name: "Homepage-v4.fig", kind: "Figma", size: "18.2 MB" },
      { name: "Redirect-map.csv", kind: "Spreadsheet", size: "42 KB" },
      { name: "Brand-guidelines.pdf", kind: "PDF", size: "6.1 MB" },
    ],
  },
  {
    id: "mobile-app",
    title: "Mobile app v2",
    due: "Nov 14",
    tasks: [
      { title: "Ship offline mode for saved lists", assignee: "Devon", done: false },
      { title: "Fix push notification duplicate badge", assignee: "Sana", done: false },
      { title: "App Store screenshots refresh", assignee: "Priya", done: true },
    ],
    milestones: [
      { label: "Beta to TestFlight", date: "Oct 20", done: false },
      { label: "Submission", date: "Nov 7", done: false },
    ],
    files: [
      { name: "Onboarding-flow.fig", kind: "Figma", size: "9.4 MB" },
      { name: "Release-notes-v2.md", kind: "Markdown", size: "3 KB" },
    ],
  },
  {
    id: "q4-marketing",
    title: "Q4 marketing site",
    due: "Dec 1",
    tasks: [
      { title: "Draft landing page copy", assignee: "Sana", done: false },
      { title: "Book photographer for team page", assignee: "Priya", done: true },
    ],
    milestones: [{ label: "Copy review", date: "Nov 18", done: false }],
    files: [{ name: "Campaign-brief.pdf", kind: "PDF", size: "1.8 MB" }],
  },
];

const team = [
  { name: "Priya Chandran", role: "Product designer", initials: "PC" },
  { name: "Devon Walsh", role: "Engineer", initials: "DW" },
  { name: "Sana Okafor", role: "Engineer", initials: "SO" },
];

type Screen = "workspace" | "projects" | "project";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const openTasks = project.tasks.filter((t) => !t.done).length;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between gap-3 rounded-xl border bg-card px-3.5 py-3 text-left transition-colors hover:bg-muted/40"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">
          {project.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {openTasks} open · due {project.due}
        </span>
      </span>
      <span className="shrink-0 text-xs text-muted-foreground">
        {project.tasks.length} tasks
      </span>
    </button>
  );
}

export default function ContentHeaderPage() {
  const [screen, setScreen] = useState<Screen>("project");
  const [projectId, setProjectId] = useState<ProjectId>("website-redesign");
  const [workspaceTab, setWorkspaceTab] = useState("overview");
  const [projectsTab, setProjectsTab] = useState("active");
  const [projectTab, setProjectTab] = useState("tasks");

  const project = projects.find((p) => p.id === projectId)!;
  const totalOpenTasks = projects.reduce(
    (sum, p) => sum + p.tasks.filter((t) => !t.done).length,
    0
  );

  const openProject = (id: ProjectId) => {
    setProjectId(id);
    setScreen("project");
    setProjectTab("tasks");
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem
        label="Bramble"
        onClick={() => setScreen("workspace")}
        current={screen === "workspace"}
      />
      {screen !== "workspace" && (
        <BreadcrumbItem
          label="Projects"
          onClick={() => setScreen("projects")}
          current={screen === "projects"}
        />
      )}
      {screen === "project" && (
        <BreadcrumbItem label={project.title} current />
      )}
    </Breadcrumbs>
  );

  const newProjectAction = (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
    >
      <Plus className="size-4" /> New project
    </button>
  );

  return (
    <AppShell safeArea>
      <Header
        behavior="sticky"
        theme="light"
        logo={
          <span className="flex items-center gap-2 font-bold tracking-tight">
            <Building2 className="size-5 text-orange-500" />
            Bramble
          </span>
        }
        actions={<Avatar initials="JT" size="1.75rem" alt="Jordan Tate" />}
      />

      <Content className="mx-auto w-full max-w-2xl pb-16">
        <DemoHint>
          Click a breadcrumb to jump between screens — the trail, title, and
          tabs below all update to match.
        </DemoHint>

        {screen === "workspace" && (
          <>
            <ContentHeader
              breadcrumbs={breadcrumbs}
              title="Bramble"
              subtitle={`${projects.length} active projects · ${totalOpenTasks} open tasks`}
              actions={newProjectAction}
            />
            <Tabs value={workspaceTab} onValueChange={setWorkspaceTab}>
              <Tab value="overview" label="Overview" />
              <Tab value="projects" label="Projects" />
              <Tab value="team" label="Team" />
            </Tabs>

            {workspaceTab === "overview" && (
              <div className="px-4">
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border p-3.5">
                    <p className="text-xs text-muted-foreground">Open tasks</p>
                    <p className="mt-1 text-xl font-bold tabular-nums">
                      {totalOpenTasks}
                    </p>
                  </div>
                  <div className="rounded-xl border p-3.5">
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="mt-1 text-xl font-bold tabular-nums">
                      {projects.length}
                    </p>
                  </div>
                  <div className="rounded-xl border p-3.5">
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="mt-1 text-xl font-bold tabular-nums">
                      {team.length}
                    </p>
                  </div>
                </div>
                <h2 className="mt-6 text-sm font-semibold">Projects</h2>
                <div className="mt-2 space-y-1.5">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      onOpen={() => openProject(p.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {workspaceTab === "projects" && (
              <div className="mt-4 space-y-1.5 px-4">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onOpen={() => openProject(p.id)}
                  />
                ))}
              </div>
            )}

            {workspaceTab === "team" && (
              <ul className="mt-4 divide-y rounded-xl border">
                {team.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-3 px-3.5 py-3"
                  >
                    <Avatar initials={member.initials} size="2.25rem" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {member.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.role}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {screen === "projects" && (
          <>
            <ContentHeader
              breadcrumbs={breadcrumbs}
              title="Projects"
              subtitle={`${projects.length} projects`}
              actions={newProjectAction}
            />
            <Tabs value={projectsTab} onValueChange={setProjectsTab}>
              <Tab value="active" label="Active" />
              <Tab value="archived" label="Archived" />
            </Tabs>

            {projectsTab === "active" ? (
              <div className="mt-4 space-y-1.5 px-4">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onOpen={() => openProject(p.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                No archived projects yet.
              </p>
            )}
          </>
        )}

        {screen === "project" && (
          <>
            <ContentHeader
              breadcrumbs={breadcrumbs}
              title={project.title}
              subtitle={`${project.tasks.filter((t) => !t.done).length} open tasks · due ${project.due}`}
              actions={
                <>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium"
                  >
                    <Share2 className="size-4" /> Share
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  >
                    <Plus className="size-4" /> New task
                  </button>
                </>
              }
            />
            <Tabs value={projectTab} onValueChange={setProjectTab}>
              <Tab value="tasks" label="Tasks" />
              <Tab value="milestones" label="Milestones" />
              <Tab value="files" label="Files" />
            </Tabs>

            {projectTab === "tasks" && (
              <ul className="mt-4 space-y-1.5 px-4">
                {project.tasks.map((task) => (
                  <li key={task.title}>
                    <div className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3">
                      <span className="shrink-0">
                        {task.done ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Circle className="size-4 text-muted-foreground/50" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-sm font-medium",
                            task.done && "text-muted-foreground line-through"
                          )}
                        >
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {task.assignee}
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {projectTab === "milestones" && (
              <ul className="mt-4 space-y-1.5 px-4">
                {project.milestones.map((m) => (
                  <li
                    key={m.label}
                    className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3"
                  >
                    <Milestone
                      className={cn(
                        "size-4 shrink-0",
                        m.done ? "text-emerald-500" : "text-muted-foreground/50"
                      )}
                    />
                    <span className="min-w-0 flex-1 text-sm font-medium">
                      {m.label}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {m.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {projectTab === "files" && (
              <ul className="mt-4 divide-y rounded-xl border">
                {project.files.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-3 px-3.5 py-3"
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {f.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {f.kind} · {f.size}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <p className="py-8 text-center text-xs text-muted-foreground">
          <Users className="mr-1 inline size-3.5 align-[-2px]" />
          {team.length} people in this workspace
        </p>
      </Content>
    </AppShell>
  );
}
