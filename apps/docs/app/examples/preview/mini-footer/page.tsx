"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { ListMusic, Pause, Play, SkipForward } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const tracks = [
  { title: "Glasswork", artist: "Marlowe Voss", duration: "3:42" },
  { title: "Sodium Light", artist: "Cascadia", duration: "4:05" },
  { title: "Half Asleep", artist: "Iso Palette", duration: "3:18" },
  { title: "Blue Hour", artist: "Ferry North", duration: "4:47" },
  { title: "Paper Planets", artist: "Ada Lin", duration: "3:56" },
  { title: "Slow Static", artist: "Vantage", duration: "5:12" },
  { title: "Undertow", artist: "Marlowe Voss", duration: "3:33" },
  { title: "Copper Sky", artist: "Nightloop", duration: "4:21" },
  { title: "Fernweh", artist: "Iso Palette", duration: "3:49" },
  { title: "Driftline", artist: "Cascadia", duration: "4:02" },
  { title: "Low Orbit", artist: "Satellite Choir", duration: "5:38" },
  { title: "Windward", artist: "Ferry North", duration: "3:27" },
  { title: "Night Bus", artist: "Vantage", duration: "4:14" },
  { title: "Salt & Signal", artist: "Ada Lin", duration: "3:51" },
  { title: "Parallax", artist: "Nightloop", duration: "4:36" },
  { title: "Cold Spring", artist: "Satellite Choir", duration: "3:22" },
  { title: "Afterimage", artist: "Marlowe Voss", duration: "4:58" },
  { title: "Terminal Glow", artist: "Cascadia", duration: "5:07" },
];

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-3.5 w-4 items-end gap-[2px]" aria-hidden>
      {[0, 0.25, 0.5].map((delay, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-fuchsia-600 dark:bg-fuchsia-400"
          style={{
            height: ["100%", "65%", "85%"][i],
            animation: "tempo-eq 0.9s ease-in-out infinite",
            animationDelay: `${delay}s`,
            animationPlayState: playing ? "running" : "paused",
          }}
        />
      ))}
    </span>
  );
}

export default function MiniFooterPage() {
  const [nowPlaying, setNowPlaying] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const playTrack = (index: number) => {
    setNowPlaying(index);
    setPlaying(true);
  };

  const skipForward = () => {
    if (nowPlaying === null) return;
    setNowPlaying((nowPlaying + 1) % tracks.length);
    setPlaying(true);
  };

  const current = nowPlaying !== null ? tracks[nowPlaying] : null;

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <style>{`@keyframes tempo-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }`}</style>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <span className="flex size-6 items-center justify-center rounded-full bg-fuchsia-600 text-[10px] font-black text-white">
                T
              </span>
              Tempo
            </span>
          }
          title="Late Focus"
          subtitle="18 tracks · 1 hr 12 min"
        />

        <Content className="mx-auto w-full max-w-2xl pb-20 sm:border-x">
          <DemoHint>
            Tap a track — the mini player slides in above the safe area. Play,
            pause, and skip without leaving the list.
          </DemoHint>

          <div className="flex items-center gap-4 px-4 pb-2">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100/70 dark:bg-fuchsia-950/30">
              <ListMusic
                className="size-9 text-fuchsia-300 dark:text-fuchsia-800"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Curated weekly · Updated Tue
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                Downtempo and ambient electronics for long evenings at the desk.
              </p>
              <button
                type="button"
                onClick={() => playTrack(0)}
                className="mt-2.5 flex items-center gap-1.5 rounded-full bg-fuchsia-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-fuchsia-700"
              >
                <Play className="size-3.5 fill-current" />
                Play all
              </button>
            </div>
          </div>

          <ol className="mt-3">
            {tracks.map((track, i) => {
              const isCurrent = nowPlaying === i;
              return (
                <li key={track.title}>
                  <button
                    type="button"
                    onClick={() => playTrack(i)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
                  >
                    <span className="flex w-5 shrink-0 justify-center">
                      {isCurrent ? (
                        <Equalizer playing={playing} />
                      ) : (
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {i + 1}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-medium ${
                          isCurrent
                            ? "text-fuchsia-600 dark:text-fuchsia-400"
                            : ""
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {track.artist}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {track.duration}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Mixed and mastered for headphones
          </p>
        </Content>

        {current && (
          <Footer variant="mini">
            <div className="flex w-full items-center gap-3">
              <Equalizer playing={playing} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-tight">
                  {current.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {current.artist}
                </p>
              </div>
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={() => setPlaying(!playing)}
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                {playing ? (
                  <Pause className="size-5 fill-current" />
                ) : (
                  <Play className="size-5 fill-current" />
                )}
              </button>
              <button
                type="button"
                aria-label="Next track"
                onClick={skipForward}
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <SkipForward className="size-5 fill-current" />
              </button>
            </div>
          </Footer>
        )}
      </AppShell>
    </MotionProvider>
  );
}
