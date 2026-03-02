import { cn } from "appshell-react";

export function IndicatorPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 rounded-full bg-foreground/90 px-4 py-2 text-[11px] font-mono text-background/90 shadow-2xl backdrop-blur-md border border-background/10",
      className
    )}>
      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {children}
    </div>
  );
}
