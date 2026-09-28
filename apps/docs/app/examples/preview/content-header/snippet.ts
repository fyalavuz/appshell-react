export const snippet = `import { AppShell, Header, Content, ContentHeader, Breadcrumbs, BreadcrumbItem, Tabs, Tab } from "appshell-react";
import { useState } from "react";

export default function App() {
  // Breadcrumb clicks just move between in-page "screens" — no router needed.
  const [screen, setScreen] = useState<"workspace" | "projects" | "project">("project");
  const [tab, setTab] = useState("tasks");

  return (
    <AppShell safeArea>
      <Header behavior="sticky" logo={<span className="font-bold">Bramble</span>} />

      <Content className="mx-auto max-w-2xl">
        <ContentHeader
          breadcrumbs={
            <Breadcrumbs>
              <BreadcrumbItem label="Bramble" onClick={() => setScreen("workspace")} current={screen === "workspace"} />
              {screen !== "workspace" && (
                <BreadcrumbItem label="Projects" onClick={() => setScreen("projects")} current={screen === "projects"} />
              )}
              {screen === "project" && <BreadcrumbItem label="Website redesign" current />}
            </Breadcrumbs>
          }
          title="Website redesign"
          subtitle="12 open tasks · due Oct 3"
          actions={<button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">New task</button>}
        />

        {/* Tabs dock below the Header via --header-height automatically. */}
        <Tabs value={tab} onValueChange={setTab}>
          <Tab value="tasks" label="Tasks" />
          <Tab value="milestones" label="Milestones" />
          <Tab value="files" label="Files" />
        </Tabs>

        {tab === "tasks" && <TaskList />}
      </Content>
    </AppShell>
  );
}`;
