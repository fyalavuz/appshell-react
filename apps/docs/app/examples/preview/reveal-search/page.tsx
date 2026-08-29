"use client";

import { useState } from "react";
import {
  SearchField,
  AppShell,
  Content,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Apple,
  Banana,
  Beef,
  Carrot,
  Check,
  Cherry,
  Citrus,
  Coffee,
  Croissant,
  CupSoda,
  Egg,
  Fish,
  Grape,
  IceCreamCone,
  Leaf,
  Milk,
  Plus,
  Salad,
  ShoppingBasket,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { DemoHint, MediaBlock } from "@/components/demos/demo-ui";

const chips = ["Produce", "Bakery", "Dairy", "Pantry"];

interface Product {
  name: string;
  unit: string;
  price: string;
  icon: LucideIcon;
  hue: string;
}

const products: Product[] = [
  { name: "Honeycrisp apples", unit: "Bag of 6", price: "$4.90", icon: Apple, hue: "bg-rose-100/70 text-rose-400 dark:bg-rose-950/30 dark:text-rose-800" },
  { name: "Rainbow carrots", unit: "1 lb bunch", price: "$2.60", icon: Carrot, hue: "bg-orange-100/70 text-orange-400 dark:bg-orange-950/30 dark:text-orange-800" },
  { name: "Butter croissants", unit: "Pack of 4", price: "$6.50", icon: Croissant, hue: "bg-amber-100/70 text-amber-500 dark:bg-amber-950/30 dark:text-amber-700" },
  { name: "Whole milk", unit: "64 fl oz", price: "$3.80", icon: Milk, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
  { name: "Pasture-raised eggs", unit: "Dozen", price: "$5.40", icon: Egg, hue: "bg-stone-200/60 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500" },
  { name: "Sourdough boule", unit: "500 g loaf", price: "$5.90", icon: Wheat, hue: "bg-amber-100/70 text-amber-500 dark:bg-amber-950/30 dark:text-amber-700" },
  { name: "Bananas", unit: "Bunch of 5", price: "$1.90", icon: Banana, hue: "bg-yellow-100/70 text-yellow-500 dark:bg-yellow-950/30 dark:text-yellow-700" },
  { name: "Bing cherries", unit: "12 oz", price: "$6.80", icon: Cherry, hue: "bg-red-100/70 text-red-400 dark:bg-red-950/30 dark:text-red-800" },
  { name: "Baby spinach", unit: "5 oz box", price: "$3.40", icon: Salad, hue: "bg-emerald-100/70 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-700" },
  { name: "Sockeye salmon", unit: "8 oz fillet", price: "$11.90", icon: Fish, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
  { name: "Concord grapes", unit: "1 lb", price: "$4.20", icon: Grape, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Cold brew", unit: "32 fl oz", price: "$7.20", icon: Coffee, hue: "bg-stone-200/60 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500" },
  { name: "Meyer lemons", unit: "3 count", price: "$2.80", icon: Citrus, hue: "bg-yellow-100/70 text-yellow-500 dark:bg-yellow-950/30 dark:text-yellow-700" },
  { name: "Sparkling water", unit: "8 pack", price: "$5.00", icon: CupSoda, hue: "bg-cyan-100/70 text-cyan-500 dark:bg-cyan-950/30 dark:text-cyan-800" },
  { name: "Grass-fed ribeye", unit: "12 oz", price: "$14.60", icon: Beef, hue: "bg-red-100/70 text-red-400 dark:bg-red-950/30 dark:text-red-800" },
  { name: "Vanilla bean gelato", unit: "Pint", price: "$5.80", icon: IceCreamCone, hue: "bg-rose-100/70 text-rose-400 dark:bg-rose-950/30 dark:text-rose-800" },
];

export default function RevealSearchPage() {
  const [basket, setBasket] = useState<string[]>([]);

  const toggle = (name: string) =>
    setBasket((b) =>
      b.includes(name) ? b.filter((n) => n !== name) : [...b, name]
    );

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-search"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Leaf className="size-5 text-emerald-600 dark:text-emerald-400" />
              Market
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Basket"
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ShoppingBasket className="size-5" />
              {basket.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                  {basket.length}
                </span>
              )}
            </button>
          }
          title="Fresh today"
          subtitle="Delivery before 6 pm"
          searchContent={<SearchField placeholder="Search 2,400 products" />}
        />

        <Content className="pb-12">
          <DemoHint>
            Scroll deep into the grid, then scroll up — the search row comes
            right back, one gesture away.
          </DemoHint>

          <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium ${
                  i === 0
                    ? "bg-emerald-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
            {products.map((p) => {
              const added = basket.includes(p.name);
              return (
                <div key={p.name}>
                  <div className="relative">
                    <MediaBlock className={`aspect-square ${p.hue}`}>
                      <p.icon className="size-10" strokeWidth={1.25} />
                    </MediaBlock>
                    <button
                      type="button"
                      aria-label={
                        added ? `Remove ${p.name}` : `Add ${p.name}`
                      }
                      onClick={() => toggle(p.name)}
                      className={`absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full shadow-sm transition-colors ${
                        added
                          ? "bg-emerald-600 text-white"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {added ? (
                        <Check className="size-4" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.unit} · {p.price}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Picked this morning · Free delivery over $35
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
