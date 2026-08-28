"use client";

import {
  AppShell,
  Content,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Building2,
  CalendarCheck,
  Fish,
  Footprints,
  Landmark,
  Leaf,
  Plane,
  Sparkles,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import { Avatar, DemoHint, MediaBlock } from "@/components/demos/demo-ui";

const savedPlaces: { name: string; area: string; icon: LucideIcon }[] = [
  { name: "teamLab Planets", area: "Toyosu", icon: Sparkles },
  { name: "Tsukiji Outer Market", area: "Chūō", icon: Fish },
  { name: "Shinjuku Gyoen", area: "Shinjuku", icon: Leaf },
  { name: "Sensō-ji", area: "Asakusa", icon: Landmark },
  { name: "Shibuya Sky", area: "Shibuya", icon: Building2 },
];

interface Stop {
  time: string;
  place: string;
  note: string;
  booked?: boolean;
  media?: LucideIcon;
}

const days: { label: string; date: string; stops: Stop[] }[] = [
  {
    label: "Day 1 · Arrival",
    date: "Apr 14",
    stops: [
      {
        time: "3:40 pm",
        place: "Haneda Airport",
        note: "Land, pick up Suica cards, limousine bus to Shinjuku.",
      },
      {
        time: "6:30 pm",
        place: "Hotel Gracery Shinjuku",
        note: "Check in — two nights, high-floor room confirmed.",
        booked: true,
      },
      {
        time: "8:00 pm",
        place: "Omoide Yokochō",
        note: "Yakitori under the train tracks. Cash only.",
      },
    ],
  },
  {
    label: "Day 2 · Shinjuku west",
    date: "Apr 15",
    stops: [
      {
        time: "9:00 am",
        place: "Meiji Jingū",
        note: "Enter through the cedar gate — quiet before 10.",
        media: Leaf,
      },
      {
        time: "12:30 pm",
        place: "Takeshita Street",
        note: "Crêpes, vintage shops, people-watching in Harajuku.",
      },
      {
        time: "4:20 pm",
        place: "Shibuya Sky",
        note: "Timed entry for the sunset slot — arrive 15 min early.",
        booked: true,
        media: Building2,
      },
    ],
  },
  {
    label: "Day 3 · Old Tokyo",
    date: "Apr 16",
    stops: [
      {
        time: "8:30 am",
        place: "Sensō-ji",
        note: "Beat the tour groups; incense at the Kaminarimon.",
        media: Landmark,
      },
      {
        time: "11:00 am",
        place: "Nakamise-dōri",
        note: "Snack crawl — ningyō-yaki, then fresh melon pan.",
      },
      {
        time: "2:00 pm",
        place: "Sumida River cruise",
        note: "45 minutes on the water down to Odaiba.",
      },
      {
        time: "7:00 pm",
        place: "teamLab Planets",
        note: "Barefoot exhibit — wear pants you can roll up.",
        booked: true,
        media: Sparkles,
      },
    ],
  },
  {
    label: "Day 4 · Market morning",
    date: "Apr 17",
    stops: [
      {
        time: "7:30 am",
        place: "Tsukiji Outer Market",
        note: "The tamagoyaki stand opens at 8 — go early.",
        media: Fish,
      },
      {
        time: "1:00 pm",
        place: "Ginza Itoya",
        note: "Nine floors of stationery. Budget accordingly.",
      },
      {
        time: "6:00 pm",
        place: "Kabukiza Theatre",
        note: "Single-act tickets released at the door, ¥1,500.",
      },
    ],
  },
  {
    label: "Day 5 · Slow goodbye",
    date: "Apr 19",
    stops: [
      {
        time: "9:00 am",
        place: "Shinjuku Gyoen",
        note: "Late cherry blossoms near the teahouse lawn.",
      },
      {
        time: "12:00 pm",
        place: "Afuri, Harajuku",
        note: "Yuzu shio ramen — the line moves fast.",
      },
      {
        time: "3:00 pm",
        place: "Haneda Airport",
        note: "NH 217 departs 5:25 pm. Buy the airport pudding.",
      },
    ],
  },
];

const summary = [
  { icon: Footprints, text: "38 km on foot across five days" },
  { icon: CalendarCheck, text: "6 reservations confirmed" },
  { icon: TrainFront, text: "Suica cards loaded — ¥3,000 each" },
];

export default function FixedHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Plane className="size-5 text-sky-600 dark:text-sky-400" />
              Atlas
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Account"
              className="rounded-full transition-opacity hover:opacity-80"
            >
              <Avatar initials="DK" className="size-8 text-[10px]" />
            </button>
          }
          title="Tokyo in five days"
          subtitle="Apr 14 – 19 · 2 travelers"
        />

        <Content className="pb-4">
          <DemoHint>
            Scroll down — the header never moves. The itinerary slides under
            the pinned bar.
          </DemoHint>

          <section className="pt-1">
            <h2 className="px-4 pb-2.5 text-sm font-semibold">Saved places</h2>
            <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
              {savedPlaces.map((p) => (
                <div key={p.name} className="w-32 shrink-0">
                  <MediaBlock className="h-20 bg-sky-100/70 dark:bg-sky-950/30">
                    <p.icon
                      className="size-6 text-sky-400 dark:text-sky-700"
                      strokeWidth={1.5}
                    />
                  </MediaBlock>
                  <p className="mt-1.5 truncate text-xs font-medium">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{p.area}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 pt-6">
            <h2 className="text-sm font-semibold">Itinerary</h2>
            {days.map((day) => (
              <div key={day.label} className="pt-5">
                <div className="flex items-baseline justify-between pb-3">
                  <h3 className="text-sm font-semibold">{day.label}</h3>
                  <span className="text-xs text-muted-foreground">
                    {day.date}
                  </span>
                </div>
                <div>
                  {day.stops.map((stop) => (
                    <div
                      key={stop.place + stop.time}
                      className="relative border-l pl-5 pb-6 last:pb-2"
                    >
                      <span className="absolute -left-[3.5px] top-1 size-1.5 rounded-full bg-sky-500 ring-4 ring-background" />
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {stop.time}
                      </p>
                      <p className="mt-0.5 text-sm font-medium">
                        {stop.place}
                        {stop.booked && (
                          <span className="ml-2 rounded-full bg-sky-100/70 px-1.5 py-0.5 align-middle text-[10px] font-medium text-sky-700 dark:bg-sky-950/40 dark:text-sky-400">
                            Booked
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {stop.note}
                      </p>
                      {stop.media && (
                        <MediaBlock className="mt-2.5 h-28 bg-sky-100/70 dark:bg-sky-950/30">
                          <stop.media
                            className="size-7 text-sky-400 dark:text-sky-700"
                            strokeWidth={1.5}
                          />
                        </MediaBlock>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mx-4 mt-4 rounded-xl border p-4">
            <h2 className="text-sm font-semibold">Trip summary</h2>
            <ul className="mt-3 space-y-2.5">
              {summary.map((s) => (
                <li
                  key={s.text}
                  className="flex items-center gap-2.5 text-xs text-muted-foreground"
                >
                  <s.icon className="size-4 shrink-0" strokeWidth={1.75} />
                  {s.text}
                </li>
              ))}
            </ul>
          </section>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Itinerary synced 2 hours ago
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
