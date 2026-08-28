"use client";

import {
  AppShell,
  Content,
  Header,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
  NavGroup,
  NavItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  ArrowRight,
  BellRing,
  Building2,
  ChartColumn,
  Cloud,
  Quote,
  Rocket,
  Sparkles,
  Tag,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const productLinks = [
  {
    icon: Workflow,
    name: "Pipelines",
    blurb: "Move data from source to warehouse, on schedule.",
  },
  {
    icon: ChartColumn,
    name: "Metrics",
    blurb: "One definition of revenue the whole team trusts.",
  },
  {
    icon: BellRing,
    name: "Alerts",
    blurb: "Page the table owner, not the whole channel.",
  },
];

const solutionLinks = [
  {
    icon: Rocket,
    name: "For startups",
    blurb: "First dashboard live before your first hire.",
  },
  {
    icon: Building2,
    name: "For enterprise",
    blurb: "SSO, audit logs, and region pinning built in.",
  },
];

const features = [
  {
    icon: Workflow,
    title: "Pipelines that heal themselves",
    blurb:
      "Failed syncs retry with backoff, then backfill the gap — before anyone notices a stale chart.",
  },
  {
    icon: ChartColumn,
    title: "One metric, one definition",
    blurb:
      "Define a metric once and every dashboard, alert, and export agrees with it. No more three answers to one question.",
  },
  {
    icon: BellRing,
    title: "Alerts that find the owner",
    blurb:
      "Anomalies page the person who owns the table, with the failing run attached. Quiet mornings for everyone else.",
  },
];

const stats = [
  { value: "4.2B", label: "rows synced every night" },
  { value: "99.98%", label: "pipeline uptime, trailing 12 months" },
  { value: "182", label: "native connectors and counting" },
];

function DropdownRow({
  icon: Icon,
  name,
  blurb,
}: {
  icon: LucideIcon;
  name: string;
  blurb: string;
}) {
  return (
    <button
      type="button"
      className="flex w-64 items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{name}</span>
        <span className="block text-xs text-muted-foreground">{blurb}</span>
      </span>
    </button>
  );
}

export default function DesktopNavPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Cloud className="size-5 text-purple-600 dark:text-purple-400" />
              Nimbus
            </span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Product">
                {productLinks.map((link) => (
                  <DropdownRow key={link.name} {...link} />
                ))}
              </HeaderNavItem>
              <HeaderNavItem label="Solutions">
                {solutionLinks.map((link) => (
                  <DropdownRow key={link.name} {...link} />
                ))}
              </HeaderNavItem>
              <HeaderNavItem label="Pricing" />
              <HeaderNavItem label="Changelog" />
            </HeaderNav>
          }
          actions={
            <button
              type="button"
              className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
              Start free
            </button>
          }
          mobileMenu={
            <div className="space-y-1">
              <NavGroup title="Product" defaultOpen>
                {productLinks.map((link) => (
                  <NavItem
                    key={link.name}
                    icon={<link.icon className="size-4" />}
                    label={link.name}
                  />
                ))}
              </NavGroup>
              <NavGroup title="Solutions">
                {solutionLinks.map((link) => (
                  <NavItem
                    key={link.name}
                    icon={<link.icon className="size-4" />}
                    label={link.name}
                  />
                ))}
              </NavGroup>
              <NavItem icon={<Tag className="size-4" />} label="Pricing" />
              <NavItem icon={<Sparkles className="size-4" />} label="Changelog" />
            </div>
          }
        />

        <Content className="pb-16">
          <DemoHint>
            On a desktop-width window, hover Product for the dropdown. On a
            phone the whole nav folds into the hamburger menu — tap it.
          </DemoHint>

          {/* Hero */}
          <div className="px-5 pb-12 pt-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-600 dark:text-purple-400">
              Data platform
            </p>
            <h1 className="mx-auto mt-3 max-w-sm text-balance text-3xl font-bold tracking-tight">
              Your dashboards, fresh by 9am
            </h1>
            <p className="mx-auto mt-3 max-w-xs text-balance text-sm leading-relaxed text-muted-foreground">
              Nimbus moves, models, and monitors the data behind your product —
              so the morning numbers are never yesterday&rsquo;s.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
              >
                Start free
                <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Book a demo
              </button>
            </div>
          </div>

          {/* Customer wordmarks (fictional) */}
          <div className="border-y bg-muted/30 px-5 py-6">
            <p className="text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by data teams at
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 text-muted-foreground/80">
              <span className="whitespace-nowrap font-serif text-base font-semibold tracking-tight">
                Fernwood
              </span>
              <span className="whitespace-nowrap font-mono text-sm font-bold">
                halide
              </span>
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em]">
                Mercury Labs
              </span>
              <span className="whitespace-nowrap text-sm font-bold italic tracking-tight">
                Beacon
              </span>
            </div>
          </div>

          {/* Feature cards */}
          <div className="space-y-4 px-4 py-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                  <feature.icon className="size-4" />
                </span>
                <h2 className="mt-3.5 text-sm font-semibold">{feature.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.blurb}
                </p>
              </div>
            ))}
          </div>

          {/* Stats band */}
          <div className="mx-4 grid gap-6 rounded-2xl bg-muted/50 p-6">
            {stats.map((stat) => (
              <div key={stat.value}>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <figure className="px-5 py-12">
            <Quote className="size-5 text-purple-600 dark:text-purple-400" />
            <blockquote className="mt-3 text-sm leading-relaxed">
              We deleted forty of our own alerts and kept the three Nimbus
              sends. Mondays are quiet now, in the good way.
            </blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              Priya Shah · Head of Data, Fernwood
            </figcaption>
          </figure>

          {/* Final CTA */}
          <div className="mx-4 rounded-2xl border bg-card p-6 text-center">
            <h2 className="text-lg font-semibold tracking-tight">
              Put your mornings on autopilot
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Free for 14 days. No credit card, no sales call — connect a
              source and watch the first sync land.
            </p>
            <button
              type="button"
              className="mt-5 w-full rounded-lg bg-purple-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
              Start free
            </button>
            <p className="mt-3 text-[10px] text-muted-foreground">
              SOC 2 Type II · GDPR ready · Data stays in your region
            </p>
          </div>

          <p className="px-4 pt-10 text-center text-xs text-muted-foreground">
            Nimbus is a fictional product, dreamt up for this demo
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
