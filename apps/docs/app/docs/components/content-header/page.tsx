import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { breadcrumbsApi, contentHeaderApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "ContentHeader",
  description:
    "The heading block of a screen: breadcrumbs, title, subtitle, and actions.",
};

const contentHeaderCode = `import { ContentHeader, Breadcrumbs, BreadcrumbItem } from "appshell-react";
import { Plus } from "lucide-react";

<ContentHeader
  breadcrumbs={
    <Breadcrumbs>
      <BreadcrumbItem label="Terra" href="/" />
      <BreadcrumbItem label="Projects" href="/projects" />
      <BreadcrumbItem label="Atlas launch" current />
    </Breadcrumbs>
  }
  title="Atlas launch"
  subtitle="14 open tasks · due Friday"
  actions={
    <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
      <Plus className="size-4" /> New task
    </button>
  }
/>`;

export default async function ContentHeaderPage() {
  const html = await highlight(contentHeaderCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="ContentHeader"
        description="Industrial design systems put the same block at the top of every workspace screen: where you are (breadcrumbs), what you're looking at (title + subtitle), and what you can do (actions). ContentHeader is that block."
      />

      <DocSection title="Anatomy">
        <DocProse>
          Every slot is optional except <InlineCode>title</InlineCode>. The
          breadcrumb trail renders above; actions align to the end of the
          title row and wrap below it on narrow screens.
        </DocProse>
        <ComponentPreview
          name="ContentHeader"
          code={contentHeaderCode}
          previewUrl="/examples/preview/docked-sidebar/"
        />
        <CodePanel
          html={html}
          code={contentHeaderCode}
          filename="project.tsx"
        />
      </DocSection>

      <DocSection title="Breadcrumbs">
        <DocProse>
          <InlineCode>Breadcrumbs</InlineCode> is standalone: an{" "}
          <InlineCode>aria-label=&quot;Breadcrumb&quot;</InlineCode> nav with
          automatic separators. Items with an <InlineCode>href</InlineCode>{" "}
          render through the{" "}
          <Link href="/docs/routing" className="text-brand hover:underline">
            LinkProvider
          </Link>{" "}
          component, so trails navigate client-side in routed apps;{" "}
          <InlineCode>current</InlineCode> marks the page you&rsquo;re on with{" "}
          <InlineCode>aria-current</InlineCode>.
        </DocProse>
        <DocNote>
          The Terra demo linked above shows the full pattern: a docked
          Sidebar, a ContentHeader with a breadcrumb trail, and the task list
          below — the standard workspace frame.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={contentHeaderApi} />
        <PropsTable api={breadcrumbsApi} />
      </DocSection>
    </article>
  );
}
