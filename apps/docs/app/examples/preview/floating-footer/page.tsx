"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  Header,
  MotionProvider,
  type FooterPosition,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Disc3, Plus, Check, ShoppingBag } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const records = [
  { title: "Night Drives", artist: "Velvet Era", price: 24, hue: "bg-teal-100 text-teal-500 dark:bg-teal-950/40 dark:text-teal-600" },
  { title: "Glasshouse", artist: "Mono Coast", price: 28, hue: "bg-amber-100 text-amber-500 dark:bg-amber-950/40 dark:text-amber-600" },
  { title: "Low Tide", artist: "Harbor Lights", price: 22, hue: "bg-sky-100 text-sky-500 dark:bg-sky-950/40 dark:text-sky-600" },
  { title: "Paper Moons", artist: "The Cartographers", price: 26, hue: "bg-rose-100 text-rose-500 dark:bg-rose-950/40 dark:text-rose-600" },
  { title: "Static Bloom", artist: "Fern & Wire", price: 30, hue: "bg-violet-100 text-violet-500 dark:bg-violet-950/40 dark:text-violet-600" },
  { title: "Meridian", artist: "South of June", price: 24, hue: "bg-emerald-100 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-600" },
  { title: "Afterglow", artist: "Casa Verde", price: 27, hue: "bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-600" },
  { title: "Northern Room", artist: "Iva & The Pines", price: 25, hue: "bg-indigo-100 text-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-600" },
];

const positions: FooterPosition[] = ["left", "center", "right"];

export default function FloatingFooterPage() {
  const [cart, setCart] = useState<string[]>([]);
  const [position, setPosition] = useState<FooterPosition>("center");

  const toggle = (title: string) =>
    setCart((c) =>
      c.includes(title) ? c.filter((t) => t !== title) : [...c, title]
    );

  const total = records
    .filter((r) => cart.includes(r.title))
    .reduce((sum, r) => sum + r.price, 0);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Disc3 className="size-5 text-teal-600 dark:text-teal-400" />
              Crate
            </span>
          }
          actions={
            <div className="flex items-center rounded-lg bg-muted p-0.5 text-xs font-medium">
              {positions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPosition(p)}
                  className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                    position === p
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          }
        />

        <Content className="pb-28">
          <DemoHint>
            Add records to your bag — the floating pill tracks the total. Use
            the switch above to dock it left, center, or right.
          </DemoHint>

          <div className="grid grid-cols-2 gap-4 px-4">
            {records.map((r) => {
              const inCart = cart.includes(r.title);
              return (
                <div key={r.title} className="group">
                  <div
                    className={`relative flex aspect-square items-center justify-center rounded-xl ${r.hue}`}
                  >
                    <Disc3 className="size-12 opacity-80" strokeWidth={1.25} />
                    <button
                      type="button"
                      aria-label={inCart ? `Remove ${r.title}` : `Add ${r.title}`}
                      onClick={() => toggle(r.title)}
                      className={`absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full shadow-sm transition-colors ${
                        inCart
                          ? "bg-teal-600 text-white"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {inCart ? (
                        <Check className="size-4" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {r.artist} · ${r.price}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-8">
            <p className="text-center text-xs text-muted-foreground">
              Pressed on 180g vinyl · Ships worldwide
            </p>
          </div>
        </Content>

        <Footer variant="floating" position={position}>
          <button
            type="button"
            className={`flex items-center gap-2.5 rounded-full py-3.5 pl-5 pr-6 text-sm font-semibold shadow-lg transition-all ${
              cart.length > 0
                ? "bg-teal-600 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <ShoppingBag className="size-4" />
            {cart.length > 0 ? (
              <>
                {cart.length} {cart.length === 1 ? "record" : "records"} · $
                {total}
              </>
            ) : (
              "Browse the crate"
            )}
          </button>
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
