import { Search, SlidersHorizontal } from "lucide-react";

export function SearchFilter() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
        <input
          type="text"
          placeholder="Search photos, people, or locations..."
          className="w-full rounded-xl border border-input bg-muted/50 py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        />
      </div>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:border-ring transition-all cursor-pointer"
      >
        <SlidersHorizontal className="size-4" />
        <span className="hidden sm:inline">Filters</span>
      </button>
    </div>
  );
}
