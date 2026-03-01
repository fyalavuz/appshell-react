"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Image, Compass, Camera, User, Heart, MapPin, Play, Sparkles } from "lucide-react";

const galleryItems = [
  {
    title: "Northern Lights",
    location: "Tromsoe, Norway",
    gradient: "from-emerald-400 via-cyan-500 to-blue-600",
    likes: 2847,
    span: "col-span-2 row-span-2",
    height: "h-80",
  },
  {
    title: "Desert Dunes",
    location: "Sahara, Morocco",
    gradient: "from-amber-400 via-orange-500 to-red-600",
    likes: 1523,
    span: "col-span-1",
    height: "h-48",
  },
  {
    title: "Cherry Blossoms",
    location: "Kyoto, Japan",
    gradient: "from-pink-300 via-rose-400 to-fuchsia-500",
    likes: 3201,
    span: "col-span-1",
    height: "h-48",
  },
  {
    title: "Glacier Lake",
    location: "Banff, Canada",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    likes: 1876,
    span: "col-span-1",
    height: "h-56",
  },
  {
    title: "Volcanic Sunset",
    location: "Bali, Indonesia",
    gradient: "from-red-400 via-orange-500 to-yellow-500",
    likes: 2134,
    span: "col-span-2",
    height: "h-56",
  },
  {
    title: "Rainforest Canopy",
    location: "Amazon, Brazil",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    likes: 987,
    span: "col-span-1",
    height: "h-64",
  },
  {
    title: "Arctic Ice",
    location: "Svalbard, Norway",
    gradient: "from-slate-300 via-blue-200 to-cyan-400",
    likes: 1445,
    span: "col-span-1",
    height: "h-64",
  },
  {
    title: "Lavender Fields",
    location: "Provence, France",
    gradient: "from-violet-400 via-purple-500 to-indigo-500",
    likes: 2678,
    span: "col-span-1",
    height: "h-64",
  },
  {
    title: "Starry Night Sky",
    location: "Atacama, Chile",
    gradient: "from-indigo-900 via-purple-800 to-slate-900",
    likes: 4102,
    span: "col-span-2",
    height: "h-72",
  },
  {
    title: "Coral Reef",
    location: "Great Barrier Reef",
    gradient: "from-cyan-400 via-teal-500 to-emerald-500",
    likes: 1893,
    span: "col-span-1",
    height: "h-52",
  },
];

export default function FooterOnlyPage() {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Content className="pb-20">
          {/* Hero / Featured - improved with layered elements */}
          <div className="px-4 pt-6 mb-6">
            <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 overflow-hidden">
              {/* Decorative background layers */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-black/10 to-transparent rounded-tr-full" />
                <div className="absolute top-8 right-12 size-20 rounded-full border-2 border-white/10" />
                <div className="absolute top-20 right-20 size-32 rounded-full border border-white/5" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Sparkles className="size-3" />
                    Featured Collection
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Play className="size-3" />
                    24 Photos
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Earth in Focus
                </h1>
                <p className="mt-1.5 text-sm sm:text-base text-white/80 max-w-md">
                  Stunning landscapes from around the globe, curated by our community
                </p>
              </div>
              <button
                type="button"
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
                aria-label="Like collection"
              >
                <Heart className="size-5" />
              </button>
            </div>
          </div>

          {/* Gallery Grid - improved with more visual depth */}
          <div className="px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryItems.map((item, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span} ${item.height}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
                  />
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='0.6'/%3E%3C/g%3E%3C/svg%3E\")" }} />
                  {/* Inner light effect */}
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-white/70 mt-1">
                      <MapPin className="size-3" />
                      {item.location}
                    </p>
                  </div>
                  {/* Like button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-90 group-hover:scale-100">
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-xl bg-white/90 backdrop-blur-sm px-2.5 py-1.5 text-gray-700 hover:text-red-500 text-xs font-medium transition-colors shadow-sm"
                    >
                      <Heart className="size-3.5" />
                      {item.likes.toLocaleString()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Content>

        <Footer variant="tab-bar">
          <FooterItem
            icon={<Image className="size-5" />}
            label="Gallery"
            active={activeTab === "gallery"}
            onClick={() => setActiveTab("gallery")}
          />
          <FooterItem
            icon={<Compass className="size-5" />}
            label="Discover"
            active={activeTab === "discover"}
            onClick={() => setActiveTab("discover")}
          />
          <FooterItem
            icon={<Camera className="size-5" />}
            label="Camera"
            active={activeTab === "camera"}
            onClick={() => setActiveTab("camera")}
          />
          <FooterItem
            icon={<User className="size-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </Footer>

        {/* Floating variant indicator */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          footer-only &middot; no header
        </div>
      </AppShell>
    </MotionProvider>
  );
}
