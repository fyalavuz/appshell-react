"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell, Content, Header, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Compass, Lightbulb } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const sections = [
  {
    id: "basics",
    label: "Basics",
    heading: "Before you leave the house",
    paragraphs: [
      "Every good trip starts at the kitchen table. Check the forecast for the range, not the trailhead — valley weather lies. Write down your route, your bail-out points, and when you expect to be back, then leave the note with someone who will actually notice if you're late.",
      "Pack for the night you don't plan to spend out: insulation, a headlamp with fresh batteries, a way to treat water, and enough food to be bored. The ten essentials are boring right up until they're the whole trip.",
    ],
    tip: "Weigh your pack once, item by item. You will never un-know that the camp chair costs 1.1 kg — and your knees will thank you for it.",
  },
  {
    id: "camp-setup",
    label: "Camp Setup",
    heading: "Making camp before dark",
    paragraphs: [
      "Arrive with daylight to spare. A site that looks flat at dusk has a way of developing a slope by midnight, and the pretty hollow beside the creek is a bathtub waiting for rain. Look for ground that drains, above the waterline, away from dead limbs.",
      "Pitch the tent with the low end into the wind and the door out of it. Set the kitchen a good sixty paces downwind — cooking smells belong far from where you sleep, especially anywhere bears do their shopping.",
      "Before the light goes, stage the small things: headlamp in the tent pocket, water filtered for the morning, tomorrow's socks somewhere dry.",
    ],
    tip: "Guy out every line even on a calm evening. Wind rarely sends a calendar invite.",
  },
  {
    id: "knots",
    label: "Knots",
    heading: "Three knots, ninety percent of jobs",
    paragraphs: [
      "You can get through most trips on three knots. The bowline makes a loop that will not slip and still unties after being loaded — it is the knot for anything that matters. The trucker's hitch gives you a three-to-one purchase for ridgelines and tarps that must stay drum-tight.",
      "The clove hitch is the adjustable workhorse for tying off to a post, a tree, or a carabiner. Practice all three at home, with cold hands, in the dark — that is the exam condition.",
    ],
    tip: "A knot you can't untie is just a bad splice. If it jams under load, you tied the wrong one.",
  },
  {
    id: "weather",
    label: "Weather",
    heading: "Reading the sky",
    paragraphs: [
      "Clouds publish the schedule if you learn to read it. High wisps of cirrus mean a front inside a day or so. Lens-shaped caps sitting on peaks mean the wind aloft is serious. Cauliflower towers building by late morning mean your afternoon plans should become morning plans.",
      "Count the seconds between flash and thunder and divide by three for kilometres. If the gap drops below thirty seconds, get off ridgelines, ditch the poles, and spread the group out.",
    ],
    tip: "The 30/30 rule: under 30 seconds flash-to-thunder, take shelter — and stay sheltered for 30 minutes after the last rumble.",
  },
  {
    id: "first-aid",
    label: "First Aid",
    heading: "Small problems, handled small",
    paragraphs: [
      "Feet first, always. A hot spot at kilometre three is a strip of tape; a blister at kilometre eighteen is surgery in the dirt. Stop early, dry the foot, tape wide, keep walking.",
      "For a rolled ankle, get the boot off before the swelling makes that decision for you, wrap it snug, and prop it on your pack while you decide whether the trip has changed shape.",
      "Most backcountry complaints are dehydration wearing a costume. Headache, short temper, wobbly legs — pour water on them before diagnosing anything more dramatic.",
    ],
    tip: "Check your feet at every long break. A two-minute habit that saves entire trips.",
  },
];

export default function InPageNavPage() {
  const [active, setActive] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Top margin clears the header + pill row; bottom margin keeps the
      // "active" band in the upper third of the viewport.
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  const jumpTo = (id: string) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Compass className="size-5 text-green-600 dark:text-green-400" />
              Handbook
            </span>
          }
          title="The Overnight"
          subtitle="Field guide · Issue 04"
        />

        {/* Anchor pills dock directly below the header via --header-height */}
        <div
          style={{ top: "var(--header-height)" }}
          className="sticky z-40 border-b bg-background/95 backdrop-blur"
        >
          <nav
            aria-label="Sections"
            className="flex gap-2 overflow-x-auto px-4 py-2.5 scrollbar-hide"
          >
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  ref={(el) => {
                    pillRefs.current[section.id] = el;
                  }}
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "border-green-200 bg-green-100 text-green-800 dark:border-green-900 dark:bg-green-950/60 dark:text-green-300"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        <Content className="pb-16">
          <DemoHint>
            Scroll — the active pill follows the section under the header. Tap
            a pill to jump straight to its chapter.
          </DemoHint>

          <div className="px-4 pb-2 pt-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
              Issue 04
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              The Overnight
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Everything you need for your first night out, in five short
              chapters. Read it at home; remember it out there.
            </p>
          </div>

          <div className="space-y-12 px-4 pt-6">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="scroll-mt-28"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.label}
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="mt-4 flex gap-2.5 rounded-xl border border-green-200/70 bg-green-50 p-3.5 dark:border-green-900/50 dark:bg-green-950/30">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
                  <p className="text-xs leading-relaxed text-green-900 dark:text-green-200">
                    <span className="font-semibold">Field tip.</span>{" "}
                    {section.tip}
                  </p>
                </div>
              </section>
            ))}
          </div>

          <p className="px-4 pt-12 text-center text-xs text-muted-foreground">
            End of issue 04 · Next issue: river crossings
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
