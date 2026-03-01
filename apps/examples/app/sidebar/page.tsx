"use client";

import { useState } from "react";
import {
  AppShell,
  Header,
  Content,
  Sidebar,
  NavGroup,
  NavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import {
  Menu,
  Search,
  ShoppingCart,
  Heart,
  ShoppingBag,
  Sparkles,
  Grid3X3,
  Tag,
  User,
  Package,
  Settings,
  HelpCircle,
  MessageCircle,
  Star,
  Clock,
  Truck,
  X,
  ArrowRight,
  Flame,
  Gift,
  Zap,
} from "lucide-react";

const products = [
  {
    name: "Merino Wool Sweater",
    price: "$128",
    originalPrice: "$160",
    image: "from-amber-200 to-orange-300",
    rating: 4.8,
    reviews: 234,
    tag: "Best Seller",
  },
  {
    name: "Leather Crossbody Bag",
    price: "$89",
    originalPrice: null,
    image: "from-stone-300 to-stone-400",
    rating: 4.6,
    reviews: 187,
    tag: null,
  },
  {
    name: "Slim Fit Chinos",
    price: "$64",
    originalPrice: "$80",
    image: "from-sky-200 to-blue-300",
    rating: 4.5,
    reviews: 312,
    tag: "Sale",
  },
  {
    name: "Canvas Sneakers",
    price: "$95",
    originalPrice: null,
    image: "from-emerald-200 to-teal-300",
    rating: 4.9,
    reviews: 456,
    tag: "New",
  },
  {
    name: "Linen Button-Down Shirt",
    price: "$72",
    originalPrice: null,
    image: "from-violet-200 to-purple-300",
    rating: 4.7,
    reviews: 198,
    tag: null,
  },
  {
    name: "Recycled Nylon Jacket",
    price: "$145",
    originalPrice: "$195",
    image: "from-zinc-300 to-gray-400",
    rating: 4.4,
    reviews: 89,
    tag: "Eco",
  },
  {
    name: "Cotton Crew Socks (3-Pack)",
    price: "$24",
    originalPrice: null,
    image: "from-rose-200 to-pink-300",
    rating: 4.3,
    reviews: 521,
    tag: null,
  },
  {
    name: "Denim Trucker Jacket",
    price: "$110",
    originalPrice: null,
    image: "from-indigo-300 to-blue-400",
    rating: 4.8,
    reviews: 143,
    tag: "Popular",
  },
  {
    name: "Ribbed Tank Top",
    price: "$32",
    originalPrice: "$40",
    image: "from-lime-200 to-green-300",
    rating: 4.2,
    reviews: 267,
    tag: "Sale",
  },
  {
    name: "Suede Chelsea Boots",
    price: "$178",
    originalPrice: null,
    image: "from-yellow-700/30 to-amber-800/40",
    rating: 4.9,
    reviews: 92,
    tag: "Premium",
  },
];

const tagColors: Record<string, string> = {
  Sale: "bg-rose-500 text-white",
  New: "bg-emerald-500 text-white",
  Eco: "bg-green-600 text-white",
  Premium: "bg-amber-600 text-white",
  "Best Seller": "bg-gray-900 text-white",
  Popular: "bg-indigo-600 text-white",
};

export default function SidebarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          className="bg-white/80 backdrop-blur-xl border-b border-gray-100"
          logo={
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Thread &amp; Co
              </span>
            </div>
          }
          actions={
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="size-5" />
                <span className="absolute top-1 right-1 flex items-center justify-center size-4 rounded-full bg-gray-900 text-[10px] font-bold text-white ring-2 ring-white">
                  3
                </span>
              </button>
            </div>
          }
        />

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          side="left"
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                T
              </div>
              <span className="text-base font-bold text-gray-900">Navigation</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Nav groups */}
          <div className="p-2">
            <NavGroup
              title="Shopping"
              icon={<ShoppingBag className="size-4" />}
              defaultOpen
            >
              <NavItem
                label="New Arrivals"
                icon={<Sparkles className="size-4" />}
                active
              />
              <NavItem
                label="Categories"
                icon={<Grid3X3 className="size-4" />}
              />
              <NavItem
                label="Deals"
                icon={<Tag className="size-4" />}
                badge={
                  <span className="text-xs bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full font-medium ring-1 ring-rose-500/10">
                    Hot
                  </span>
                }
              />
              <NavItem
                label="Best Sellers"
                icon={<Star className="size-4" />}
              />
            </NavGroup>

            <NavGroup
              title="Account"
              icon={<User className="size-4" />}
              defaultOpen
            >
              <NavItem
                label="Profile"
                icon={<User className="size-4" />}
              />
              <NavItem
                label="Orders"
                icon={<Package className="size-4" />}
                badge={
                  <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium ring-1 ring-blue-500/10">
                    2
                  </span>
                }
              />
              <NavItem
                label="Wishlist"
                icon={<Heart className="size-4" />}
              />
              <NavItem
                label="Settings"
                icon={<Settings className="size-4" />}
              />
            </NavGroup>

            <NavGroup
              title="Support"
              icon={<HelpCircle className="size-4" />}
            >
              <NavItem
                label="Help Center"
                icon={<HelpCircle className="size-4" />}
                href="#help"
              />
              <NavItem
                label="Contact Us"
                icon={<MessageCircle className="size-4" />}
                href="#contact"
              />
              <NavItem
                label="Shipping Info"
                icon={<Truck className="size-4" />}
                href="#shipping"
              />
              <NavItem
                label="Returns"
                icon={<Clock className="size-4" />}
                href="#returns"
              />
            </NavGroup>
          </div>

          {/* Sidebar promo card */}
          <div className="mt-auto border-t border-gray-100 p-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-5 text-white">
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 size-16 rounded-full bg-white/10" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="size-4 text-amber-300" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Limited Offer
                  </span>
                </div>
                <p className="text-base font-bold leading-tight">Spring Collection</p>
                <p className="mt-1.5 text-sm text-white/70 leading-snug">
                  Up to 40% off on new seasonal arrivals
                </p>
                <button className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/30 transition-colors">
                  Shop Now
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </Sidebar>

        <Content className="pb-12 bg-gray-50/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">

            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-6 sm:p-10 text-white mb-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-black/10 to-transparent rounded-tr-full" />
              <div className="absolute top-1/2 right-1/4 size-32 rounded-full bg-white/5 blur-2xl" />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 mb-4 ring-1 ring-white/20">
                  <Flame className="size-3.5 text-amber-300" />
                  <span className="text-xs font-semibold text-white/90">New Collection</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                  Spring
                  <br />
                  Essentials
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
                  Refresh your wardrobe with our curated selection of lightweight
                  fabrics and timeless silhouettes.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-black/10 hover:bg-white/95 hover:shadow-xl hover:shadow-black/15 active:scale-[0.98] transition-all">
                    Browse Collection
                  </button>
                  <button className="rounded-xl px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/10 transition-colors">
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                "All",
                "Tops",
                "Bottoms",
                "Outerwear",
                "Footwear",
                "Accessories",
              ].map((cat, i) => (
                <button
                  key={cat}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    i === 0
                      ? "bg-gray-900 text-white shadow-sm shadow-gray-900/20"
                      : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="group rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-gray-200 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative">
                    <div
                      className={`aspect-[4/5] bg-gradient-to-br ${product.image} relative overflow-hidden`}
                    >
                      {/* Product silhouette placeholder */}
                      <div className="absolute inset-0 flex items-end justify-center">
                        <div className="h-[70%] w-[70%] rounded-t-xl bg-white/20 backdrop-blur-[2px] shadow-inner" />
                      </div>
                      {/* Subtle pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    {product.tag && (
                      <span
                        className={`absolute top-2.5 left-2.5 rounded-lg px-2 py-0.5 text-[11px] font-bold tracking-wide shadow-sm ${
                          tagColors[product.tag] ?? "bg-gray-900 text-white"
                        }`}
                      >
                        {product.tag}
                      </span>
                    )}
                    <button
                      className="absolute top-2.5 right-2.5 flex items-center justify-center size-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm hover:bg-white hover:scale-110 shadow-sm"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart className="size-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex items-center">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-300">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Banners */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 ring-1 ring-amber-100/50">
                <div className="absolute -top-8 -right-8 size-28 rounded-full bg-amber-200/30" />
                <div className="relative">
                  <div className="flex items-center justify-center size-12 rounded-xl bg-amber-100 mb-4">
                    <Truck className="size-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Free Shipping
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                    On all orders over $75. Fast delivery within 2-4 business
                    days.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 ring-1 ring-emerald-100/50">
                <div className="absolute -top-8 -right-8 size-28 rounded-full bg-emerald-200/30" />
                <div className="relative">
                  <div className="flex items-center justify-center size-12 rounded-xl bg-emerald-100 mb-4">
                    <Gift className="size-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Easy Returns
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                    30-day return policy with free return shipping. No questions
                    asked.
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10 mb-6 relative overflow-hidden rounded-2xl bg-gray-900 p-6 sm:p-8 text-white">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-violet-500/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-tr-full" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="size-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">Stay in the loop</span>
                  </div>
                  <h3 className="text-lg font-bold">Get early access to drops</h3>
                  <p className="mt-1 text-sm text-white/50">Join 50k+ subscribers. No spam, ever.</p>
                </div>
                <button className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-white/90 active:scale-[0.98] transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Content>

        {/* Variant indicator pill */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          variant=&quot;sidebar&quot;
        </div>
      </AppShell>
    </MotionProvider>
  );
}
