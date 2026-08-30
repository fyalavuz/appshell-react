import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { hooksApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Hooks",
  description:
    "useAppShell, useScrollDirection, useSafeArea, useHeaderTheme, useSearchShortcut — the shell's state and shortcuts, exposed to your own components.",
};

const hookByName = Object.fromEntries(hooksApi.map((h) => [h.name, h]));

function Signature({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-muted/40 px-4 py-2.5 font-mono text-[13px] text-foreground">
      {children}
    </div>
  );
}

const useAppShellCode = `import { useAppShell } from "appshell-react";

export function ScrollStatus() {
  const { scrollDirection, headerVisible } = useAppShell();

  // null until the user scrolls for the first time
  if (scrollDirection === null) return null;

  return (
    <p className="text-xs text-muted-foreground">
      Scrolling {scrollDirection} · header {headerVisible ? "shown" : "hidden"}
    </p>
  );
}`;

const useScrollDirectionCode = `import { useScrollDirection } from "appshell-react";

export function BackToTop() {
  // Only flip after 24px of movement, ignoring tiny jitters
  const direction = useScrollDirection(24);

  if (direction !== "up") return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg"
    >
      Back to top
    </button>
  );
}`;

const useSafeAreaCode = `import { useSafeArea } from "appshell-react";

export function EdgeToEdgeOverlay() {
  // Numbers in px — ideal for canvas work and absolute layouts
  const insets = useSafeArea(["top", "bottom"]);

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* controls stay inside the safe region */}
    </div>
  );
}`;

const useHeaderThemeCode = `import { Header, useHeaderTheme } from "appshell-react";
import { ShoppingCart } from "lucide-react";

function CartButton() {
  const theme = useHeaderTheme();
  const onDark = theme === "primary" || theme === "dark";

  return (
    <button
      type="button"
      aria-label="Cart"
      className={
        onDark
          ? "text-white/90 hover:text-white"
          : "text-muted-foreground hover:text-foreground"
      }
    >
      <ShoppingCart className="size-5" />
    </button>
  );
}

export function AppHeader() {
  return <Header behavior="fixed" theme="primary" actions={<CartButton />} />;
}`;

const useKeyboardInsetCode = `import { useKeyboardInset } from "appshell-react";

function Composer() {
  // Pixels the keyboard covers — 0 when it is down.
  const keyboard = useKeyboardInset();

  return (
    <form style={{ paddingBottom: keyboard }}>
      <input placeholder="Write a reply" />
    </form>
  );
}

// Or stay in CSS: the hook publishes the same value as a variable while
// anything is subscribed, and appshell-react/safe-area.css wraps it.
// <div className="pb-safe-keyboard">…</div>`;

const useBelowBreakpointCode = `import { Sidebar, useBelowBreakpoint } from "appshell-react";

function Shell() {
  const [open, setOpen] = useState(false);
  // The same answer the Sidebar itself uses, so the two never disagree.
  const isPhone = useBelowBreakpoint("md");

  return (
    <Sidebar
      variant="docked"
      breakpoint="md"
      open={open}
      onClose={() => setOpen(false)}
      collapsible={!isPhone}
    >
      …
    </Sidebar>
  );
}`;

const useSearchShortcutCode = `import { SearchModal, useSearchShortcut } from "appshell-react";
import { useState } from "react";

export function AppSearch() {
  const [open, setOpen] = useState(false);

  // ⌘K on macOS, Ctrl+K elsewhere. Add { slash: true } for "/" too.
  useSearchShortcut(() => setOpen(true));

  return (
    <SearchModal open={open} onClose={() => setOpen(false)}>
      {(q) => <Results query={q} />}
    </SearchModal>
  );
}`;

export default async function HooksPage() {
  const [
    appShellHtml,
    scrollDirHtml,
    safeAreaHtml,
    keyboardInsetHtml,
    belowBreakpointHtml,
    headerThemeHtml,
    searchShortcutHtml,
  ] = await Promise.all([
    highlight(useAppShellCode),
    highlight(useScrollDirectionCode),
    highlight(useSafeAreaCode),
    highlight(useKeyboardInsetCode),
    highlight(useBelowBreakpointCode),
    highlight(useHeaderThemeCode),
    highlight(useSearchShortcutCode),
  ]);

  const useAppShellApi = hookByName["useAppShell"];
  const useScrollDirectionApi = hookByName["useScrollDirection"];
  const useSafeAreaApi = hookByName["useSafeArea"];
  const useKeyboardInsetApi = hookByName["useKeyboardInset"];
  const useBelowBreakpointApi = hookByName["useBelowBreakpoint"];
  const useHeaderThemeApi = hookByName["useHeaderTheme"];
  const useSearchShortcutApi = hookByName["useSearchShortcut"];

  return (
    <article>
      <DocHeader
        eyebrow="Advanced"
        title="Hooks"
        description="Seven hooks expose the state the shell already tracks — scroll direction, bar visibility, safe-area insets, how much of the screen the keyboard covers, the active breakpoint, the header theme — plus the desktop search shortcut, so your own components can join in."
      />

      <DocSection title={useAppShellApi.name}>
        <Signature>{useAppShellApi.signature}</Signature>
        <DocProse>{useAppShellApi.description}</DocProse>
        <DocProse>
          This is the shared shell context: what direction the user is
          scrolling, whether the header and footer are currently shown, and
          setters to drive them yourself.{" "}
          <InlineCode>scrollDirection</InlineCode> starts as{" "}
          <InlineCode>null</InlineCode> and stays null until the first scroll
          — branch on it before rendering scroll-dependent UI.
        </DocProse>
        <CodePanel
          html={appShellHtml}
          code={useAppShellCode}
          filename="scroll-status.tsx"
        />
        <DocNote>
          The component calling <InlineCode>useAppShell</InlineCode> must sit
          inside <InlineCode>&lt;AppShell&gt;</InlineCode> (or a bare{" "}
          <InlineCode>&lt;AppShellProvider&gt;</InlineCode>) — outside the
          provider the hook throws.
        </DocNote>
      </DocSection>

      <DocSection title={useScrollDirectionApi.name}>
        <Signature>{useScrollDirectionApi.signature}</Signature>
        <DocProse>{useScrollDirectionApi.description}</DocProse>
        <DocProse>
          Unlike <InlineCode>useAppShell</InlineCode>, this hook needs no
          provider — it listens to the window directly, so it works anywhere.
          The <InlineCode>threshold</InlineCode> (default 10) is how many
          pixels the page must move before the direction flips; raise it to
          keep momentum-scroll wobble from toggling your UI.
        </DocProse>
        <CodePanel
          html={scrollDirHtml}
          code={useScrollDirectionCode}
          filename="back-to-top.tsx"
        />
      </DocSection>

      <DocSection title={useSafeAreaApi.name}>
        <Signature>{useSafeAreaApi.signature}</Signature>
        <DocProse>{useSafeAreaApi.description}</DocProse>
        <DocProse>
          Where{" "}
          <Link
            href="/docs/components/safe-area"
            className="text-brand hover:underline"
          >
            SafeArea
          </Link>{" "}
          applies insets as CSS padding, this hook hands you the numbers —
          for canvas drawing, absolutely positioned overlays, or gesture
          math. Pass an <InlineCode>edges</InlineCode> array to zero out the
          edges you don&rsquo;t care about; values re-measure on window
          resize (rotation included).
        </DocProse>
        <CodePanel
          html={safeAreaHtml}
          code={useSafeAreaCode}
          filename="overlay.tsx"
        />
      </DocSection>

      <DocSection title={useKeyboardInsetApi.name}>
        <Signature>{useKeyboardInsetApi.signature}</Signature>
        <DocProse>{useKeyboardInsetApi.description}</DocProse>
        <DocProse>
          A fixed bar, a bottom sheet or a full-screen search all end up
          underneath the on-screen keyboard, and the web gives you no keyboard
          event to react to. <InlineCode>visualViewport</InlineCode> is what
          works everywhere — the <InlineCode>VirtualKeyboard</InlineCode> API
          is Chromium-only and iOS Safari ignores the{" "}
          <InlineCode>interactive-widget</InlineCode> meta. The shell already
          uses this: a modal BottomSheet and the SearchModal keep their
          content clear, and <InlineCode>&lt;Footer hideOnKeyboard&gt;</InlineCode>{" "}
          steps aside.
        </DocProse>
        <CodePanel
          html={keyboardInsetHtml}
          code={useKeyboardInsetCode}
          filename="composer.tsx"
        />
        <DocNote>
          A shrink smaller than 80px is treated as browser chrome — a URL bar
          sliding back in — rather than a keyboard, so a tab bar does not
          flicker away as you scroll.
        </DocNote>
      </DocSection>

      <DocSection title={useBelowBreakpointApi.name}>
        <Signature>{useBelowBreakpointApi.signature}</Signature>
        <DocProse>{useBelowBreakpointApi.description}</DocProse>
        <DocProse>
          The docked{" "}
          <Link
            href="/docs/components/sidebar"
            className="text-brand hover:underline"
          >
            Sidebar
          </Link>{" "}
          decides with it whether the drawer is the active presentation.
          Rendering stays CSS-gated so there is no hydration mismatch — this
          hook is for the decisions around it, like whether your trigger
          button should be in the header at all.
        </DocProse>
        <CodePanel
          html={belowBreakpointHtml}
          code={useBelowBreakpointCode}
          filename="shell.tsx"
        />
      </DocSection>

      <DocSection title={useHeaderThemeApi.name}>
        <Signature>{useHeaderThemeApi.signature}</Signature>
        <DocProse>{useHeaderThemeApi.description}</DocProse>
        <DocProse>
          Custom content placed in a Header slot —{" "}
          <InlineCode>logo</InlineCode>, <InlineCode>actions</InlineCode>,{" "}
          <InlineCode>nav</InlineCode> — renders on whatever background the
          header&rsquo;s <InlineCode>theme</InlineCode> paints. Read the
          active theme to pick legible colors instead of hard-coding them.
        </DocProse>
        <CodePanel
          html={headerThemeHtml}
          code={useHeaderThemeCode}
          filename="app-header.tsx"
        />
        <DocNote>
          The theme is provided by the Header to its own rows, so the hook is
          only meaningful for components rendered inside a Header slot.
          Elsewhere it does not throw — it just falls back to the default,{" "}
          <InlineCode>&quot;light&quot;</InlineCode>.
        </DocNote>
      </DocSection>

      <DocSection title={useSearchShortcutApi.name}>
        <Signature>{useSearchShortcutApi.signature}</Signature>
        <DocProse>{useSearchShortcutApi.description}</DocProse>
        <DocProse>
          The ⌘/Ctrl combination fires even while an input has focus —
          palette muscle memory — while the opt-in{" "}
          <InlineCode>slash</InlineCode> trigger stays quiet inside editable
          fields. Show the shortcut on the trigger with SearchField&rsquo;s{" "}
          <InlineCode>shortcutHint</InlineCode> prop, and suspend the binding
          without unmounting via <InlineCode>enabled: false</InlineCode>.
        </DocProse>
        <CodePanel
          html={searchShortcutHtml}
          code={useSearchShortcutCode}
          filename="app-search.tsx"
        />
      </DocSection>
    </article>
  );
}
