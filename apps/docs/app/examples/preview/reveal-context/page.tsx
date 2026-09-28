"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell, Avatar, Content, Header, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Bookmark,
  Check,
  ChefHat,
  Clock,
  Flame,
  Timer,
  Users,
} from "lucide-react";
import { DemoHint, MediaBlock } from "@/components/demos/demo-ui";

const ingredients = [
  "2¼ cups all-purpose flour",
  "1 tsp baking soda",
  "1 tsp fine sea salt",
  "1 cup unsalted butter",
  "1 cup packed brown sugar",
  "½ cup granulated sugar",
  "2 large eggs",
  "2 tsp vanilla extract",
  "10 oz dark chocolate, chopped",
];

const steps = [
  {
    id: "step-1",
    title: "Brown the butter",
    text: "Melt the butter in a light-colored pan over medium heat, swirling often, until it turns deep amber and smells nutty — about 5 minutes. Pour into a bowl right away so it stops cooking, and let it cool for 10 minutes.",
  },
  {
    id: "step-2",
    title: "Mix the wet ingredients",
    text: "Whisk the cooled brown butter with both sugars until glossy and combined. Beat in the eggs one at a time, then the vanilla, until the mixture lightens in color.",
  },
  {
    id: "step-3",
    title: "Combine the dry ingredients",
    text: "In a separate bowl, whisk together the flour, baking soda, and salt so they're evenly distributed before they meet the wet mixture.",
  },
  {
    id: "step-4",
    title: "Fold together",
    text: "Add the dry ingredients to the wet in two additions, folding gently just until no streaks of flour remain. Overmixing is the only way to ruin this step.",
  },
  {
    id: "step-5",
    title: "Add the chocolate",
    text: "Fold in the chopped dark chocolate and a pinch of flaky salt. Save a few extra pieces to press onto the tops of the dough balls later — purely cosmetic, entirely worth it.",
  },
  {
    id: "step-6",
    title: "Chill the dough",
    text: "Cover the bowl and refrigerate for at least 30 minutes, up to 3 days. The rest deepens the flavor and keeps the cookies from spreading too thin in the oven.",
  },
  {
    id: "step-7",
    title: "Bake",
    text: "Scoop 2-tablespoon portions onto a lined sheet, spaced well apart. Bake at 375°F (190°C) for 11–13 minutes, until the edges are set but the centers still look slightly underdone.",
  },
];

export default function RevealContextPage() {
  const [saved, setSaved] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveStep(entry.target.id);
        }
      },
      // Top margin clears the header; bottom margin keeps the "active" step
      // in the upper third of the viewport as you scroll through the method.
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );

    for (const step of steps) {
      const el = stepRefs.current[step.id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const toggleIngredient = (name: string) =>
    setChecked((c) => ({ ...c, [name]: !c[name] }));

  const activeIndex = steps.findIndex((s) => s.id === activeStep);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-context"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Flame className="size-5 text-amber-600 dark:text-amber-400" />
              Hearth
            </span>
          }
          actions={
            <button
              type="button"
              aria-label={saved ? "Remove bookmark" : "Save recipe"}
              onClick={() => setSaved(!saved)}
              className={`rounded-full p-2 transition-colors ${
                saved
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Bookmark className={`size-5 ${saved ? "fill-current" : ""}`} />
            </button>
          }
          title="Brown-Butter Chocolate Chip Cookies"
          subtitle={
            activeIndex >= 0
              ? `Step ${activeIndex + 1} of ${steps.length} · ${steps[activeIndex].title}`
              : undefined
          }
        />

        <Content className="mx-auto w-full max-w-2xl pb-16">
          <DemoHint>
            Scroll through the method — the title tucks away. Scroll up and
            it&rsquo;s back, showing exactly which step you&rsquo;re on.
          </DemoHint>

          <MediaBlock className="mx-4 h-56 bg-amber-100/70 dark:bg-amber-950/30">
            <ChefHat
              className="size-10 text-amber-400 dark:text-amber-800"
              strokeWidth={1.5}
            />
          </MediaBlock>

          <div className="mx-4 mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              20 min prep
            </span>
            <span className="flex items-center gap-1.5">
              <Timer className="size-4" />
              12 min bake
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              24 cookies
            </span>
          </div>

          <div className="mx-4 mt-4 flex items-center gap-2.5 border-b pb-4">
            <Avatar initials="WC" size="2rem" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Wren Castillo</p>
              <p className="truncate text-xs text-muted-foreground">
                Updated 3 weeks ago
              </p>
            </div>
          </div>

          <section className="px-4 py-5">
            <h2 className="text-sm font-semibold">Ingredients</h2>
            <ul className="mt-3 space-y-2.5">
              {ingredients.map((item) => {
                const isChecked = Boolean(checked[item]);
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggleIngredient(item)}
                      className="flex w-full items-center gap-2.5 text-left text-sm"
                    >
                      <span
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isChecked
                            ? "border-amber-600 bg-amber-600 text-white dark:border-amber-400 dark:bg-amber-400"
                            : "border-muted-foreground/40"
                        }`}
                      >
                        {isChecked && <Check className="size-3" strokeWidth={3} />}
                      </span>
                      <span
                        className={
                          isChecked ? "text-muted-foreground line-through" : ""
                        }
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="border-t px-4 py-5">
            <h2 className="text-sm font-semibold">Steps</h2>
            <ol className="mt-3 space-y-6">
              {steps.map((step, i) => (
                <li
                  key={step.id}
                  id={step.id}
                  ref={(el) => {
                    stepRefs.current[step.id] = el;
                  }}
                  className="flex gap-3 scroll-mt-32"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Makes 24 cookies · Keeps 5 days in an airtight tin
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
