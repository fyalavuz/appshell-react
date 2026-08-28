"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Bookmark } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const moreEssays = [
  {
    title: "What We Lost When We Stopped Linking",
    author: "Tomas Berger",
    readTime: "11 min read",
  },
  {
    title: "A Year Without Recommendations",
    author: "June Park",
    readTime: "8 min read",
  },
  {
    title: "In Praise of the Personal Homepage",
    author: "Marta Silva",
    readTime: "6 min read",
  },
];

export default function StaticHeaderPage() {
  const [saved, setSaved] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="static"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">Journal</span>
          }
          actions={
            <button
              type="button"
              aria-label={saved ? "Remove from saved" : "Save essay"}
              onClick={() => setSaved(!saved)}
              className={`rounded-full p-2 transition-colors ${
                saved
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Bookmark className={`size-5 ${saved ? "fill-current" : ""}`} />
            </button>
          }
          title="The Case for the Slow Web"
          subtitle="Elif Aksoy · 14 min read"
        />

        <Content className="pb-10">
          <DemoHint>
            Scroll down — the header leaves with the page, giving the essay the
            full screen. Scroll back to the top to bring it back.
          </DemoHint>

          <article className="space-y-5 px-5 pt-2 text-[15px] leading-7">
            <p>
              Somewhere between the third refresh and the fourth, I stopped
              being able to say what I was looking for. The feed had an answer
              either way. It always does. That is its central innovation: a
              page that never ends cannot disappoint you, because it never asks
              you to decide whether you are finished. The old web made you
              choose. You reached the bottom of a page, and the page, politely,
              was over.
            </p>

            <p>
              We describe attention as if it were currency — spent, saved,
              stolen — but currency implies an exchange we agreed to. Most
              mornings I do not spend my attention so much as leave it
              unattended, and the feed, which is very good at its job, tidies
              it away. Fifteen minutes evaporates. Nothing terrible was on the
              screen. Nothing much was on it at all, and that is somehow the
              worst review possible: not bad, just gone.
            </p>

            <h2 className="pt-3 text-base font-semibold">
              What the feed optimized away
            </h2>

            <p>
              The slow web is not a nostalgia project, though it is often
              dismissed as one. It is a set of design decisions. Pages that
              end. Archives with a bottom you can actually reach. Publishing on
              a schedule set by a person rather than an algorithm&rsquo;s
              appetite. A blog that updates twice a month is not failing to
              compete with a platform that updates twice a second — it is
              refusing the premise that those are the same activity.
            </p>

            <p>
              Consider what reading felt like before it was measured. No
              read-time estimate, no progress bar, no &ldquo;you&rsquo;re all
              caught up.&rdquo; You read until you were done, or until dinner.
              The metrics did not make us better readers; they made us faster
              ones, and speed turns out to be the one thing prose cannot
              survive. Every writer knows the difference between a reader and a
              skimmer. So does every reader, in the moment before they check
              their phone.
            </p>

            <blockquote className="border-l-2 border-foreground py-1 pl-4 text-lg font-medium leading-relaxed">
              The feed is infinite, but the evening is not.
            </blockquote>

            <h2 className="pt-3 text-base font-semibold">
              The small web never left
            </h2>

            <p>
              The good news is that the small web never went away. It just
              stopped being where the doors open by default. Personal sites
              still publish essays with no analytics attached and comment
              sections with three regulars. Webrings — actual webrings — are
              back, half in irony and wholly in earnest. What they offer is not
              reach but adjacency: the sense of being one link away from a
              particular person, rather than one scroll away from everyone.
            </p>

            <p>
              And underneath it all, RSS still works. It is nearly thirty
              years old, it belongs to no one, and it does precisely one thing:
              when a site you chose publishes something, it appears in a list
              you control. No ranking, no inserted posts, no reason to return
              except that something new exists. An RSS reader in 2026 feels
              almost illicit — a feed with a bottom, assembled by hand, that
              ends when your subscriptions do.
            </p>

            <p>
              None of this requires renunciation. I still use the fast web; it
              is where the people are, and leaving it entirely is its own kind
              of performance. The practice is smaller than that: a folder of
              feeds read with coffee, one long essay finished instead of six
              opened, a homepage of your own that you tend the way you would
              tend a garden bed — occasionally, imperfectly, because it is
              yours.
            </p>

            <p>
              The case for the slow web is not that it is virtuous. It is that
              it gives the evening back. You read a thing, the thing ends, and
              in the quiet after it you get to have a thought of your own —
              which was, all along, the point of reading.
            </p>

            <p className="pt-1 text-sm text-muted-foreground">
              Elif Aksoy writes about technology and attention from Istanbul.
            </p>
          </article>

          <section className="mt-10 border-t px-5 pt-6">
            <h2 className="text-sm font-semibold">More from Journal</h2>
            <div className="divide-y">
              {moreEssays.map((essay) => (
                <button
                  key={essay.title}
                  type="button"
                  className="block w-full py-4 text-left transition-colors hover:bg-muted/50"
                >
                  <p className="text-sm font-semibold leading-snug">
                    {essay.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {essay.author} · {essay.readTime}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
