"use client";

import { useState } from "react";
import { AppShell, BottomSheet, SafeArea } from "appshell-react";
import {
  Coffee,
  Landmark,
  MapPin,
  Navigation,
  Search,
  Star,
  Trees,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

const places = [
  { name: "Üsküdar Sahili", kind: "Waterfront walk", icon: Waves, rating: 4.8, distance: "350 m" },
  { name: "Kuzguncuk Kahvesi", kind: "Coffee · pastries", icon: Coffee, rating: 4.6, distance: "600 m" },
  { name: "Fethi Paşa Korusu", kind: "Park · viewpoints", icon: Trees, rating: 4.7, distance: "1.1 km" },
  { name: "Maiden's Tower", kind: "Landmark", icon: Landmark, rating: 4.9, distance: "1.4 km" },
  { name: "Balıkçı Lokantası", kind: "Seafood · dinner", icon: UtensilsCrossed, rating: 4.5, distance: "750 m" },
  { name: "Nakkaştepe Parkı", kind: "Park · playgrounds", icon: Trees, rating: 4.4, distance: "1.8 km" },
  { name: "Çengelköy Çınarı", kind: "Historic square", icon: Landmark, rating: 4.6, distance: "2.9 km" },
];

const pins = [
  { top: "22%", left: "30%" },
  { top: "34%", left: "62%" },
  { top: "48%", left: "18%" },
  { top: "55%", left: "74%" },
  { top: "68%", left: "44%" },
];

function PlaceRow({ place }: { place: (typeof places)[number] }) {
  const Icon = place.icon;
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-muted/60"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{place.name}</span>
        <span className="block text-xs text-muted-foreground">{place.kind}</span>
      </span>
      <span className="shrink-0 text-end">
        <span className="flex items-center justify-end gap-1 text-xs font-medium">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {place.rating}
        </span>
        <span className="text-[11px] text-muted-foreground">{place.distance}</span>
      </span>
    </button>
  );
}

export default function BottomSheetPage() {
  const [open, setOpen] = useState(true);

  return (
    <AppShell safeArea>
      {/* The "map" — a full-bleed canvas the sheet floats over */}
      <div className="fixed inset-0 bg-[#e8efe6] dark:bg-[#101713]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(120,150,130,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,150,130,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Water */}
        <div
          aria-hidden
          className="absolute -left-1/4 top-0 h-full w-1/2 -skew-x-12 bg-sky-200/70 dark:bg-sky-950/60"
        />
        {/* Roads */}
        <div aria-hidden className="absolute left-1/3 top-0 h-full w-3 -rotate-6 bg-white/70 dark:bg-white/10" />
        <div aria-hidden className="absolute left-0 top-1/3 h-2.5 w-full rotate-3 bg-white/70 dark:bg-white/10" />
        {pins.map((pin, i) => (
          <span
            key={i}
            className="absolute flex size-7 -translate-x-1/2 -translate-y-full items-center justify-center"
            style={{ top: pin.top, left: pin.left }}
          >
            <MapPin className="size-6 fill-emerald-500 text-emerald-700 drop-shadow" />
          </span>
        ))}
      </div>

      {/* Floating search — padded past the notch by SafeArea */}
      <SafeArea edges={["top"]} className="pointer-events-none fixed inset-x-0 top-0 z-10 flex-none">
        <div className="p-4">
          <div className="pointer-events-auto mx-auto flex max-w-sm items-center gap-2.5 rounded-full border border-black/5 bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur">
            <Search className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Search Üsküdar
            </span>
            <span className="ms-auto flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
              W
            </span>
          </div>
        </div>
      </SafeArea>

      {/* The sheet — non-modal, so the map stays interactive behind it */}
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        modal={false}
        snapPoints={[0.4, 0.85]}
        aria-label="Nearby places"
      >
        <div className="flex items-baseline justify-between px-4 pb-2">
          <h2 className="text-lg font-bold tracking-tight">Nearby</h2>
          <span className="text-xs text-muted-foreground">
            {places.length} places · drag the handle
          </span>
        </div>
        <div className="divide-y">
          {places.map((place) => (
            <PlaceRow key={place.name} place={place} />
          ))}
        </div>
        <p className="px-4 py-6 text-center text-xs text-muted-foreground">
          Drag up for the full list — drag well down to dismiss
        </p>
      </BottomSheet>

      {open ? null : (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-emerald-700"
          >
            <Navigation className="size-4" />
            Show nearby places
          </button>
        </div>
      )}
    </AppShell>
  );
}
