"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  Footer,
} from "react-appshell";
import { framerMotionAdapter } from "react-appshell/motion-framer";
import {
  ShoppingCart,
  Star,
  MoreHorizontal,
  SlidersHorizontal,
} from "lucide-react";

const products = [
  {
    name: "Minimalist Desk Lamp",
    price: "$79",
    rating: 4.8,
    reviews: 124,
    gradient: "from-amber-200 via-orange-100 to-yellow-100",
    accent: "bg-amber-400/20",
    tag: "Best Seller",
  },
  {
    name: "Ceramic Plant Pot",
    price: "$34",
    rating: 4.6,
    reviews: 89,
    gradient: "from-emerald-200 via-green-100 to-teal-100",
    accent: "bg-emerald-400/20",
    tag: null,
  },
  {
    name: "Wireless Charging Pad",
    price: "$49",
    rating: 4.9,
    reviews: 256,
    gradient: "from-slate-200 via-gray-100 to-zinc-100",
    accent: "bg-slate-400/20",
    tag: "New",
  },
  {
    name: "Scented Candle Set",
    price: "$28",
    rating: 4.7,
    reviews: 167,
    gradient: "from-rose-200 via-pink-100 to-fuchsia-100",
    accent: "bg-rose-400/20",
    tag: null,
  },
  {
    name: "Bamboo Notebook Stand",
    price: "$55",
    rating: 4.5,
    reviews: 78,
    gradient: "from-lime-200 via-green-100 to-emerald-100",
    accent: "bg-lime-400/20",
    tag: "Eco",
  },
  {
    name: "Linen Throw Pillow",
    price: "$42",
    rating: 4.8,
    reviews: 203,
    gradient: "from-blue-200 via-sky-100 to-cyan-100",
    accent: "bg-blue-400/20",
    tag: "Popular",
  },
  {
    name: "Glass Water Carafe",
    price: "$36",
    rating: 4.4,
    reviews: 62,
    gradient: "from-cyan-200 via-sky-100 to-blue-100",
    accent: "bg-cyan-400/20",
    tag: null,
  },
  {
    name: "Marble Coaster Set",
    price: "$24",
    rating: 4.6,
    reviews: 145,
    gradient: "from-stone-200 via-neutral-100 to-gray-100",
    accent: "bg-stone-400/20",
    tag: "Sale",
  },
  {
    name: "Copper Desk Organizer",
    price: "$68",
    rating: 4.7,
    reviews: 91,
    gradient: "from-orange-200 via-amber-100 to-yellow-100",
    accent: "bg-orange-400/20",
    tag: null,
  },
  {
    name: "Wool Knit Blanket",
    price: "$89",
    rating: 4.9,
    reviews: 312,
    gradient: "from-violet-200 via-purple-100 to-fuchsia-100",
    accent: "bg-violet-400/20",
    tag: "Top Rated",
  },
];

const tagColors: Record<string, string> = {
  "Best Seller": "bg-amber-500 text-white",
  New: "bg-blue-500 text-white",
  Eco: "bg-emerald-500 text-white",
  Popular: "bg-indigo-500 text-white",
  Sale: "bg-rose-500 text-white",
  "Top Rated": "bg-violet-500 text-white",
};

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm ring-1 ring-black/[0.02] transition-all duration-200 hover:shadow-xl hover:shadow-black/[0.08] hover:-translate-y-0.5">
      <div
        className={`relative aspect-square bg-gradient-to-br ${product.gradient} overflow-hidden`}
      >
        {/* Decorative product silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`size-24 rounded-2xl ${product.accent} rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
          />
          <div
            className={`absolute size-16 rounded-full ${product.accent} -translate-x-4 translate-y-4`}
          />
        </div>
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {product.tag && (
          <span
            className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${tagColors[product.tag] || "bg-foreground/90 text-background"}`}
          >
            {product.tag}
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
        >
          <svg
            className={`size-4 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-500"}`}
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[13px] font-semibold leading-tight tracking-tight">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-semibold">{product.rating}</span>
          <span className="text-[11px] text-muted-foreground/60">
            ({product.reviews})
          </span>
        </div>
        <p className="mt-2 text-[15px] font-bold tracking-tight">
          {product.price}
        </p>
      </div>
    </div>
  );
}

export default function FloatingFooterPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">shopcraft</span>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-full p-2 hover:bg-muted transition-colors"
              >
                <SlidersHorizontal className="size-5 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-muted transition-colors"
              >
                <MoreHorizontal className="size-5 text-muted-foreground" />
              </button>
            </div>
          }
        />

        <Content className="pb-28">
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto px-4 py-3.5 scrollbar-none">
            {[
              "All",
              "Home",
              "Kitchen",
              "Office",
              "Decor",
              "Lighting",
              "Textile",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background shadow-md shadow-foreground/20"
                    : "bg-muted/50 text-muted-foreground ring-1 ring-border/50 hover:bg-muted hover:ring-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3.5 px-4 pb-4 pt-1">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </Content>

        <Footer variant="floating" position="center">
          <button
            aria-label="Show cart"
            className="flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.97] cursor-pointer"
          >
            <ShoppingCart className="size-5" />
            <span>Show Cart</span>
            <span className="flex items-center justify-center size-5 rounded-full bg-white/20 text-[11px] font-bold">3</span>
          </button>
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
