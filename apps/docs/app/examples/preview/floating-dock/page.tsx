"use client";

import { useRef, useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  Header,
  MotionProvider,
  useScrollDirection,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Clapperboard,
  Heart,
  House,
  LayoutGrid,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

const walls = [
  { name: "Ultramarine", artist: "Studio Kelp", hue: "bg-blue-200 dark:bg-blue-900/60", tall: true },
  { name: "Salt Flats", artist: "M. Okonkwo", hue: "bg-stone-200 dark:bg-stone-800", tall: false },
  { name: "Heatwave", artist: "Vera Lind", hue: "bg-orange-200 dark:bg-orange-900/60", tall: false },
  { name: "Kelp Forest", artist: "Studio Kelp", hue: "bg-emerald-200 dark:bg-emerald-900/60", tall: true },
  { name: "Magenta Hour", artist: "Ito Sana", hue: "bg-fuchsia-200 dark:bg-fuchsia-900/60", tall: false },
  { name: "Glacier Milk", artist: "R. Beaulieu", hue: "bg-sky-200 dark:bg-sky-900/60", tall: true },
  { name: "Night Garden", artist: "Vera Lind", hue: "bg-violet-200 dark:bg-violet-900/60", tall: false },
  { name: "Terracotta", artist: "M. Okonkwo", hue: "bg-amber-200 dark:bg-amber-900/60", tall: false },
  { name: "Deep Field", artist: "Ito Sana", hue: "bg-indigo-200 dark:bg-indigo-900/60", tall: true },
  { name: "Rose Quartz", artist: "R. Beaulieu", hue: "bg-rose-200 dark:bg-rose-900/60", tall: false },
  { name: "Overcast", artist: "Studio Kelp", hue: "bg-slate-200 dark:bg-slate-800", tall: false },
  { name: "Lime Wash", artist: "Vera Lind", hue: "bg-lime-200 dark:bg-lime-900/60", tall: true },
];

const dockItems = [
  { id: "home", label: "Home", icon: House },
  { id: "browse", label: "Browse", icon: LayoutGrid },
  { id: "live", label: "Live", icon: Clapperboard },
  { id: "search", label: "Search", icon: Search },
  { id: "you", label: "You", icon: User },
];

/**
 * Liquid-glass dock: translucent, saturated, with a specular top edge.
 * Condenses to a pill on scroll down; icons magnify near the pointer.
 */
function GlassDock() {
  const scrollDirection = useScrollDirection();
  const condensed = scrollDirection === "down";
  const [active, setActive] = useState("home");
  const [pointerX, setPointerX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const activeItem = dockItems.find((i) => i.id === active) ?? dockItems[0];

  const scaleFor = (index: number) => {
    if (pointerX === null || condensed) return 1;
    const el = dockRef.current;
    if (!el) return 1;
    const slot = el.clientWidth / dockItems.length;
    const center = slot * index + slot / 2;
    const dist = Math.abs(pointerX - center);
    return 1 + 0.3 * Math.max(0, 1 - dist / (slot * 1.6));
  };

  return (
    <div
      className={cn(
        "relative mb-3 overflow-hidden rounded-[26px] border border-white/45 dark:border-white/10",
        "bg-white/55 dark:bg-zinc-900/55 backdrop-blur-2xl backdrop-saturate-150",
        "shadow-xl shadow-black/15 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      )}
    >
      {/* Specular top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
      />
      {condensed ? (
        <div className="flex items-center gap-2 px-4 py-2">
          <activeItem.icon className="size-4" />
          <span className="text-xs font-semibold">{activeItem.label}</span>
        </div>
      ) : (
        <div
          ref={dockRef}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPointerX(e.clientX - rect.left);
          }}
          onMouseLeave={() => setPointerX(null)}
          className="flex items-end gap-1 px-2.5 py-2"
        >
          {dockItems.map((item, i) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => setActive(item.id)}
                style={{ transform: `scale(${scaleFor(i)})` }}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 transition-all duration-150",
                  "origin-bottom",
                  isActive
                    ? "bg-white/70 text-foreground shadow-sm dark:bg-white/15"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                <item.icon className="size-5" strokeWidth={isActive ? 2.25 : 2} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FloatingDockPage() {
  const [liked, setLiked] = useState<string[]>([]);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          className="border-b-0 bg-background/70 backdrop-blur-2xl"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Sparkles className="size-5" />
              Aura
            </span>
          }
          title="Wallpapers"
          subtitle="Curated for depth effect"
        />

        <Content className="mx-auto w-full max-w-5xl pb-8">
          <DemoHint>
            Scroll down — the glass dock condenses into a pill. On a desktop
            window, sweep the pointer across it to magnify the icons.
          </DemoHint>

          <div className="columns-2 gap-3 px-4 [column-fill:balance] sm:columns-3 lg:columns-4">
            {walls.map((w) => (
              <figure key={w.name} className="mb-3 break-inside-avoid">
                <div
                  className={cn(
                    "relative w-full rounded-2xl",
                    w.hue,
                    w.tall ? "aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <button
                    type="button"
                    aria-label={`Like ${w.name}`}
                    onClick={() =>
                      setLiked((l) =>
                        l.includes(w.name)
                          ? l.filter((n) => n !== w.name)
                          : [...l, w.name]
                      )
                    }
                    className="absolute bottom-2 right-2 rounded-full bg-white/60 p-1.5 backdrop-blur-md transition-colors dark:bg-black/30"
                  >
                    <Heart
                      className={cn(
                        "size-3.5",
                        liked.includes(w.name)
                          ? "fill-rose-500 text-rose-500"
                          : "text-foreground/70"
                      )}
                    />
                  </button>
                </div>
                <figcaption className="mt-1.5 px-0.5">
                  <p className="text-xs font-semibold">{w.name}</p>
                  <p className="text-[11px] text-muted-foreground">{w.artist}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="px-4 py-6 text-center text-xs text-muted-foreground">
            New drops every Friday
          </p>
        </Content>

        {/* behavior="static": the dock never leaves — it condenses instead */}
        <Footer variant="floating" position="center">
          <GlassDock />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
