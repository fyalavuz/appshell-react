"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
  SearchField,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Armchair,
  BedDouble,
  Blinds,
  Check,
  Coffee,
  CookingPot,
  Flame,
  Flower2,
  Gem,
  HandPlatter,
  Heart,
  House,
  Lamp,
  Lightbulb,
  Package,
  Palette,
  Plus,
  Search,
  ShoppingBag,
  Sofa,
  Spool,
  User,
  type LucideIcon,
} from "lucide-react";
import { DemoHint, MediaBlock } from "@/components/demos/demo-ui";

interface Product {
  name: string;
  category: string;
  price: string;
  icon: LucideIcon;
  hue: string;
}

const products: Product[] = [
  { name: "Arc floor lamp", category: "Lighting", price: "$189", icon: Lamp, hue: "bg-amber-100/70 text-amber-500 dark:bg-amber-950/30 dark:text-amber-700" },
  { name: "Pendant light trio", category: "Lighting", price: "$265", icon: Lightbulb, hue: "bg-amber-100/70 text-amber-500 dark:bg-amber-950/30 dark:text-amber-700" },
  { name: "Ceramic pendant sconce", category: "Lighting", price: "$132", icon: Lamp, hue: "bg-amber-100/70 text-amber-500 dark:bg-amber-950/30 dark:text-amber-700" },
  { name: "Bentwood lounge chair", category: "Seating", price: "$340", icon: Armchair, hue: "bg-stone-200/60 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500" },
  { name: "Bouclé accent chair", category: "Seating", price: "$410", icon: Sofa, hue: "bg-stone-200/60 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500" },
  { name: "Storage daybed", category: "Seating", price: "$610", icon: BedDouble, hue: "bg-stone-200/60 text-stone-400 dark:bg-stone-800/40 dark:text-stone-500" },
  { name: "Terracotta planter trio", category: "Decor", price: "$58", icon: Flower2, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Amber glass vase", category: "Decor", price: "$44", icon: Gem, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Woven storage baskets", category: "Decor", price: "$76", icon: Package, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Bronze candle trio", category: "Decor", price: "$52", icon: Flame, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Linen window blinds", category: "Decor", price: "$145", icon: Blinds, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Wool yarn bundle", category: "Decor", price: "$38", icon: Spool, hue: "bg-violet-100/70 text-violet-400 dark:bg-violet-950/30 dark:text-violet-800" },
  { name: "Cast-iron dutch oven", category: "Kitchen", price: "$120", icon: CookingPot, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
  { name: "Hand-painted ceramic bowl", category: "Kitchen", price: "$34", icon: Palette, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
  { name: "Marble cheese board", category: "Kitchen", price: "$68", icon: HandPlatter, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
  { name: "Pour-over coffee set", category: "Kitchen", price: "$54", icon: Coffee, hue: "bg-sky-100/70 text-sky-400 dark:bg-sky-950/30 dark:text-sky-800" },
];

export default function RevealCombinedPage() {
  const [tab, setTab] = useState("home");
  const [cart, setCart] = useState<string[]>([]);

  const toggle = (name: string) =>
    setCart((c) => (c.includes(name) ? c.filter((n) => n !== name) : [...c, name]));

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav-search"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <span className="flex size-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                D
              </span>
              Drift
            </span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="All" active />
              <HeaderNavItem label="Lighting" />
              <HeaderNavItem label="Seating" />
              <HeaderNavItem label="Decor" />
              <HeaderNavItem label="Kitchen" />
            </HeaderNav>
          }
          actions={
            <button
              type="button"
              aria-label="Bag"
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ShoppingBag className="size-5" />
              {cart.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  {cart.length}
                </span>
              )}
            </button>
          }
          searchContent={<SearchField variant="full" placeholder="Search Drift" />}
        />

        <Content className="mx-auto w-full max-w-5xl pb-16">
          <DemoHint>
            Scroll deep into the shop, then scroll up — the category row and
            search return together, and the tab bar rises back into view.
          </DemoHint>

          <div className="px-4 pb-2 pt-1">
            <h2 className="text-sm font-semibold">New in home &amp; living</h2>
            <p className="text-xs text-muted-foreground">
              Handpicked pieces, restocked every Friday
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => {
              const added = cart.includes(p.name);
              return (
                <div key={p.name}>
                  <div className="relative">
                    <MediaBlock className={`aspect-square ${p.hue}`}>
                      <p.icon className="size-10" strokeWidth={1.25} />
                    </MediaBlock>
                    <button
                      type="button"
                      aria-label={added ? `Remove ${p.name}` : `Add ${p.name}`}
                      onClick={() => toggle(p.name)}
                      className={`absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full shadow-sm transition-colors ${
                        added
                          ? "bg-indigo-600 text-white"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {added ? <Check className="size-4" /> : <Plus className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.category} · {p.price}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Free shipping over $75 · Returns within 30 days
          </p>
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem
            icon={<House className="size-5" />}
            label="Home"
            active={tab === "home"}
            onClick={() => setTab("home")}
          />
          <FooterItem
            icon={<Search className="size-5" />}
            label="Search"
            active={tab === "search"}
            onClick={() => setTab("search")}
          />
          <FooterItem
            icon={<ShoppingBag className="size-5" />}
            label="Bag"
            badge={cart.length > 0 ? cart.length : undefined}
            active={tab === "bag"}
            onClick={() => setTab("bag")}
          />
          <FooterItem
            icon={<Heart className="size-5" />}
            label="Wishlist"
            active={tab === "wishlist"}
            onClick={() => setTab("wishlist")}
          />
          <FooterItem
            icon={<User className="size-5" />}
            label="Account"
            active={tab === "account"}
            onClick={() => setTab("account")}
          />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
