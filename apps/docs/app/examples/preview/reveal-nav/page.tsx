"use client";

import {
  AppShell,
  Content,
  Header,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  ChevronRight,
  Clapperboard,
  Cpu,
  CupSoda,
  Globe,
  Landmark,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { DemoHint, MediaBlock } from "@/components/demos/demo-ui";

interface Article {
  headline: string;
  section: string;
  time: string;
  thumb?: LucideIcon;
}

const articles: Article[] = [
  { headline: "Markets steady as central banks signal a pause on rate moves", section: "Business", time: "25m" },
  { headline: "Typhoon Nari weakens after landfall; Kyushu begins cleanup", section: "World", time: "1h", thumb: Globe },
  { headline: "The quiet comeback of the neighborhood video store", section: "Culture", time: "2h", thumb: Clapperboard },
  { headline: "EU drafts first rules for AI agents that act on users' behalf", section: "Tech", time: "3h", thumb: Cpu },
  { headline: "Wildfire season is ending earlier in the Rockies — scientists say don't celebrate yet", section: "Climate", time: "4h" },
  { headline: "City transit systems bet big on battery-electric buses", section: "Cities", time: "5h" },
  { headline: "A sommelier's guide to the alcohol-free pairing menu", section: "Food", time: "6h", thumb: CupSoda },
  { headline: "Record labels test 'fan pricing' for next summer's stadium tours", section: "Culture", time: "7h" },
  { headline: "Chipmakers shift advanced packaging to new Arizona plants", section: "Tech", time: "8h" },
  { headline: "Museum returns bronze artifacts after a decade-long dispute", section: "World", time: "9h", thumb: Landmark },
  { headline: "Streaming services quietly bring back the rerun", section: "Culture", time: "10h" },
  { headline: "Deep-sea mining vote delayed for a third straight year", section: "World", time: "11h" },
  { headline: "The four-day week reaches the factory floor", section: "Business", time: "12h" },
  { headline: "How a tiny Welsh town became a dark-sky capital", section: "Science", time: "13h" },
  { headline: "Olive oil prices finally cool after a two-year surge", section: "Food", time: "14h" },
  { headline: "Why marathon world records keep falling", section: "Sport", time: "15h" },
];

const briefing = [
  "Fusion's net-gain claim faces peer review within weeks",
  "Kyushu assesses Typhoon Nari damage as flights resume",
  "'Fan pricing' could reshape how concert tickets are sold",
];

function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug">
          {article.headline}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {article.section} · {article.time} ago
        </p>
      </div>
      {article.thumb && (
        <MediaBlock className="size-16 shrink-0 rounded-lg bg-blue-100/70 dark:bg-blue-950/30">
          <article.thumb
            className="size-6 text-blue-400 dark:text-blue-800"
            strokeWidth={1.5}
          />
        </MediaBlock>
      )}
    </article>
  );
}

export default function RevealNavPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav"
          theme="light"
          logo={
            <span className="text-lg font-black tracking-tight">
              Wire
              <span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Top" active />
              <HeaderNavItem label="World" />
              <HeaderNavItem label="Tech" />
              <HeaderNavItem label="Culture" />
            </HeaderNav>
          }
          actions={
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Search className="size-5" />
            </button>
          }
          title="Top Stories"
          subtitle="Thursday, Aug 28"
        />

        <Content className="pb-12">
          <DemoHint>
            Scroll down past the headlines, then scroll up — only the nav row
            comes back. The title stays tucked away.
          </DemoHint>

          <article className="mx-4 overflow-hidden rounded-xl border">
            <MediaBlock className="h-44 rounded-none bg-blue-100/70 dark:bg-blue-950/30">
              <Zap
                className="size-9 text-blue-400 dark:text-blue-800"
                strokeWidth={1.5}
              />
            </MediaBlock>
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Science · 6:40 am
              </p>
              <h2 className="mt-1.5 text-lg font-bold leading-snug">
                Fusion startup claims net-gain milestone in third straight test
                run
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Helion-rival Solstice says its latest shot produced 1.4 times
                the energy it consumed — independent verification is expected
                next month.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Wire Science Desk
              </p>
            </div>
          </article>

          <div className="mt-2 divide-y">
            {articles.slice(0, 7).map((a) => (
              <ArticleRow key={a.headline} article={a} />
            ))}
          </div>

          <section className="mx-4 my-3 rounded-xl border bg-muted/40 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The Briefing
            </p>
            <h3 className="mt-1 text-sm font-semibold">
              Today in three minutes
            </h3>
            <ul className="mt-2.5 space-y-2">
              {briefing.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 flex items-center gap-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400"
            >
              Read the briefing
              <ChevronRight className="size-3.5" />
            </button>
          </section>

          <div className="divide-y border-t">
            {articles.slice(7).map((a) => (
              <ArticleRow key={a.headline} article={a} />
            ))}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Updated every 15 minutes
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
