import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { PropsTable } from "@/components/docs/props-table";
import { i18nProviderApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Internationalization",
  description:
    "Localize the strings the library renders itself, and set the writing direction — with any i18n library, or none.",
};

const labelsCode = `import { I18nProvider, AppShell } from "appshell-react";

// Override any subset; the rest keep their English defaults.
<I18nProvider
  labels={{
    navigationMenu: "Menu de navigation",
    search: "Rechercher",
    cancel: "Annuler",
    notificationsUnread: "Notifications ({count} non lues)",
  }}
>
  <AppShell safeArea>{children}</AppShell>
</I18nProvider>`;

const tCode = `// react-i18next / react-intl / Lingui — hand the provider your
// translate function. It receives the English default, so it works
// before the keys exist in your catalogue.
const { t } = useTranslation();

<I18nProvider
  t={(key, defaultValue, vars) =>
    t(\`appshell.\${key}\`, { defaultValue, ...vars })
  }
>
  <App />
</I18nProvider>`;

const serverCode = `// next-intl: resolve on the server, hand plain strings to the client.
// This is why label values are strings and not functions — functions
// would not cross the server/client boundary.
import { getTranslations } from "next-intl/server";

export default async function Layout({ children }) {
  const t = await getTranslations("appshell");
  return (
    <I18nProvider
      dir={t("dir") === "rtl" ? "rtl" : "ltr"}
      labels={{ navigationMenu: t("navigationMenu"), search: t("search") }}
    >
      {children}
    </I18nProvider>
  );
}`;

export default async function I18nPage() {
  const [labelsHtml, tHtml, serverHtml] = await Promise.all([
    highlight(labelsCode),
    highlight(tCode),
    highlight(serverCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Advanced"
        title="Internationalization"
        description="The library ships no translations and no i18n dependency. What it ships is the seam: one provider that renames the handful of strings it renders on its own, and sets the writing direction for everything — including the overlays that render through portals."
      />

      <DocSection title="Labels">
        <DocProse>
          Most user-facing text is yours already — it arrives as children or as
          a prop. What is left is the text the library writes itself: the
          drawer&rsquo;s landmark name, the rail&rsquo;s expand and collapse
          buttons, the header&rsquo;s menu toggle, the breadcrumb trail&rsquo;s
          name, a search placeholder, an overflow badge. Override any subset;
          unspecified keys keep their English default, so adding the provider
          never blanks a string.
        </DocProse>
        <CodePanel
          html={labelsHtml}
          code={labelsCode}
          filename="app/layout.tsx"
        />
        <DocProse>
          Values interpolate <InlineCode>{"{token}"}</InlineCode> placeholders:{" "}
          <InlineCode>notificationsUnread</InlineCode> gets{" "}
          <InlineCode>{"{count}"}</InlineCode> and{" "}
          <InlineCode>badgeOverflow</InlineCode> gets{" "}
          <InlineCode>{"{max}"}</InlineCode>. Precedence runs{" "}
          <strong>component prop → provider → English default</strong>, so a
          one-off <InlineCode>aria-label</InlineCode> still wins locally.
        </DocProse>
      </DocSection>

      <DocSection title="Bringing your own i18n library">
        <DocProse>
          Pass <InlineCode>t</InlineCode> instead of a dictionary and the
          provider asks your catalogue for every key. It hands you the key, the
          English default, and any interpolation variables — so nothing breaks
          on the day a key is still missing.
        </DocProse>
        <CodePanel html={tHtml} code={tCode} filename="providers.tsx" />
        <DocProse>
          Compiled-message libraries such as Paraglide have no key-based{" "}
          <InlineCode>t</InlineCode> at all; for those, build the dictionary
          instead. Either door works, and a server component can resolve the
          strings before they reach the client:
        </DocProse>
        <CodePanel
          html={serverHtml}
          code={serverCode}
          filename="app/[locale]/layout.tsx"
        />
      </DocSection>

      <DocSection title="Writing direction">
        <DocProse>
          Direction is an explicit <InlineCode>dir</InlineCode> prop rather than
          something inferred from a locale — the same choice Radix, Base UI and
          Mantine make. It matters more here than in most libraries: the
          SearchModal, BottomSheet and the anchored menus render through
          portals, and a portal does <strong>not</strong> inherit{" "}
          <InlineCode>dir</InlineCode> from its React parent. The provider
          threads direction through context and sets it on each portal root, so
          an RTL layout stays RTL inside every overlay.
        </DocProse>
        <DocNote>
          Inside components, directional spacing already uses CSS logical
          properties, so <InlineCode>dir=&quot;rtl&quot;</InlineCode> mirrors
          padding, margins and badge offsets without extra work. The
          Sidebar&rsquo;s <InlineCode>side</InlineCode> prop stays physical by
          design — a docked panel on the right is a layout decision, not a
          language one.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={i18nProviderApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The other integration seam is{" "}
          <Link href="/docs/routing" className="text-brand hover:underline">
            Routing
          </Link>
          , which plugs your router into every component that renders an{" "}
          <InlineCode>href</InlineCode>. Custom components of your own can read
          both: <InlineCode>useLabel()</InlineCode> and{" "}
          <InlineCode>useDirection()</InlineCode> are exported.
        </DocProse>
      </DocSection>
    </article>
  );
}
