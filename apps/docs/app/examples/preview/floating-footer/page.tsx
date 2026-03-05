"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  Footer,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  ShoppingBag,
  Search,
  Heart,
  Star,
  Plus,
  Check,
  Filter,
} from "lucide-react";

const products = [
  {
    name: "Classic White Tee",
    price: 45,
    rating: 4.8,
    reviews: 128,
    color: "from-gray-100 to-gray-50",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Organic Cotton Hoodie",
    price: 89,
    rating: 4.9,
    reviews: 342,
    color: "from-slate-200 to-slate-100",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Merino Wool Sweater",
    price: 125,
    rating: 4.7,
    reviews: 86,
    color: "from-amber-100 to-amber-50",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    name: "Denim Jacket",
    price: 145,
    rating: 4.8,
    reviews: 256,
    color: "from-blue-100 to-blue-50",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Linen Shorts",
    price: 65,
    rating: 4.6,
    reviews: 94,
    color: "from-stone-100 to-stone-50",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    name: "Cashmere Scarf",
    price: 195,
    rating: 4.9,
    reviews: 178,
    color: "from-rose-100 to-rose-50",
    sizes: ["One Size"],
  },
];

function ProductCard({
  product,
  inCart,
  onToggle,
}: {
  product: (typeof products)[0];
  inCart: boolean;
  onToggle: () => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className={`relative h-48 bg-gradient-to-br ${product.color}`}>
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 size-8 rounded-full flex items-center justify-center transition-all ${
            liked
              ? "bg-rose-500 text-white"
              : "bg-white/80 text-muted-foreground hover:text-rose-500"
          }`}
        >
          <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <ShoppingBag className="size-20" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-sm">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1.5 mb-3">
          {product.sizes.slice(0, 4).map((size) => (
            <span
              key={size}
              className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-[10px] text-muted-foreground">+{product.sizes.length - 4}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            type="button"
            onClick={onToggle}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              inCart
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-foreground hover:bg-accent/80"
            }`}
          >
            {inCart ? (
              <>
                <Check className="size-3.5" />
                Added
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FloatingFooterPage() {
  const [cart, setCart] = useState<number[]>([]);

  const toggleCart = (idx: number) => {
    setCart((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const totalPrice = cart.reduce((sum, idx) => sum + products[idx].price, 0);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5" />
              <span className="text-lg font-bold tracking-tight">Shop</span>
            </div>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-accent transition-colors"
              >
                <Search className="size-5 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-accent transition-colors"
              >
                <Filter className="size-5 text-muted-foreground" />
              </button>
            </div>
          }
          title="New Arrivals"
          subtitle="Spring 2026 Collection"
        />

        <Content className="pb-28 bg-muted/30">
          <div className="grid grid-cols-2 gap-3 p-4">
            {products.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                inCart={cart.includes(i)}
                onToggle={() => toggleCart(i)}
              />
            ))}
          </div>
        </Content>

        <Footer variant="floating" position="center">
          <button
            type="button"
            disabled={cart.length === 0}
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <ShoppingBag className="size-4" />
            {cart.length > 0
              ? `View Cart (${cart.length} items) • $${totalPrice}`
              : "Your cart is empty"}
          </button>
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
