"use client";

import {
  AppShell,
  Header,
  Content,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import {
  Search,
  Bell,
  User,
  ArrowRight,
  BarChart3,
  Shield,
  Eye,
  Zap,
  Globe,
  Layers,
  Check,
  Code2,
  Cpu,
  Database,
  Lock,
  Cloud,
  Workflow,
  Building2,
  Rocket,
  GraduationCap,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="size-6" />,
    title: "Real-Time Analytics",
    desc: "Monitor your application performance with sub-second latency dashboards and intelligent alerting.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: <Shield className="size-6" />,
    title: "Advanced Security",
    desc: "Enterprise-grade security with SOC 2 compliance, SSO integration, and role-based access controls.",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/10",
  },
  {
    icon: <Zap className="size-6" />,
    title: "Edge Deployment",
    desc: "Deploy to 300+ edge locations worldwide. Your users get sub-50ms response times, everywhere.",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10",
  },
  {
    icon: <Eye className="size-6" />,
    title: "Observability Suite",
    desc: "Unified logs, metrics, and traces in one platform. Debug production issues in minutes, not hours.",
    gradient: "from-violet-500 to-purple-500",
    bgGlow: "bg-violet-500/10",
  },
  {
    icon: <Globe className="size-6" />,
    title: "Global CDN",
    desc: "Automatic asset optimization and caching at the edge. Serve static content at lightning speed.",
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "bg-pink-500/10",
  },
  {
    icon: <Layers className="size-6" />,
    title: "API Gateway",
    desc: "Rate limiting, request transformation, and schema validation built into your API infrastructure.",
    gradient: "from-indigo-500 to-blue-600",
    bgGlow: "bg-indigo-500/10",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Perfect for side projects and experimentation.",
    features: [
      "5 projects",
      "10GB bandwidth",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    desc: "For growing teams building production applications.",
    features: [
      "Unlimited projects",
      "1TB bandwidth",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "For organizations that need scale, security, and compliance.",
    features: [
      "Everything in Pro",
      "Unlimited bandwidth",
      "24/7 dedicated support",
      "SSO & SAML",
      "SLA guarantee",
      "Custom contracts",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const logos = [
  "Vercel",
  "Stripe",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
];

export default function DesktopNavPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Code2 className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Nexus</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Home" href="#" active />
              <HeaderNavItem label="Products">
                <div className="space-y-1">
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <BarChart3 className="size-4 text-blue-500" />
                    <div>
                      <div className="font-medium">Analytics</div>
                      <div className="text-xs text-muted-foreground">
                        Real-time metrics and dashboards
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Eye className="size-4 text-violet-500" />
                    <div>
                      <div className="font-medium">Monitoring</div>
                      <div className="text-xs text-muted-foreground">
                        Logs, traces, and alerting
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Shield className="size-4 text-emerald-500" />
                    <div>
                      <div className="font-medium">Security</div>
                      <div className="text-xs text-muted-foreground">
                        Threat detection and compliance
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Database className="size-4 text-orange-500" />
                    <div>
                      <div className="font-medium">Storage</div>
                      <div className="text-xs text-muted-foreground">
                        Scalable object and block storage
                      </div>
                    </div>
                  </a>
                </div>
              </HeaderNavItem>
              <HeaderNavItem label="Solutions">
                <div className="space-y-1">
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Building2 className="size-4 text-slate-500" />
                    <div>
                      <div className="font-medium">Enterprise</div>
                      <div className="text-xs text-muted-foreground">
                        Scale with confidence
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Rocket className="size-4 text-pink-500" />
                    <div>
                      <div className="font-medium">Startups</div>
                      <div className="text-xs text-muted-foreground">
                        Move fast, ship faster
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <GraduationCap className="size-4 text-indigo-500" />
                    <div>
                      <div className="font-medium">Education</div>
                      <div className="text-xs text-muted-foreground">
                        Free for students and educators
                      </div>
                    </div>
                  </a>
                </div>
              </HeaderNavItem>
              <HeaderNavItem label="Developers">
                <div className="space-y-1">
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Code2 className="size-4 text-muted-foreground" />
                    <span className="font-medium">Documentation</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Workflow className="size-4 text-muted-foreground" />
                    <span className="font-medium">API Reference</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Cloud className="size-4 text-muted-foreground" />
                    <span className="font-medium">Status Page</span>
                  </a>
                </div>
              </HeaderNavItem>
              <HeaderNavItem label="Pricing" href="#pricing" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden sm:inline-flex rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="hidden sm:inline-flex rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          }
        />

        <Content className="pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Hero Section */}
            <section className="relative text-center py-16 sm:py-24 overflow-hidden">
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-indigo-200/40 via-purple-200/30 to-pink-200/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 mb-8">
                  <Zap className="size-3.5" />
                  Now with Edge Functions v2
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
                  Ship faster.
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Scale infinitely.
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                  The modern infrastructure platform for teams who build at scale.
                  Analytics, monitoring, security, and deployment in one unified
                  experience.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button className="w-full sm:w-auto rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center gap-2">
                    Start Building
                    <ArrowRight className="size-4" />
                  </button>
                  <button className="w-full sm:w-auto rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors">
                    View Documentation
                  </button>
                </div>
                <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground/70">
                  <span>Trusted by teams at</span>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                  {logos.map((logo) => (
                    <div
                      key={logo}
                      className="flex items-center justify-center rounded-lg border border-border bg-card/60 px-5 py-2.5 shadow-sm backdrop-blur-sm"
                    >
                      <span className="text-sm font-semibold text-muted-foreground/70 tracking-tight">
                        {logo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-12 sm:py-20">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Everything you need to ship
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                  A complete platform with the tools your team needs, from
                  development to production.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-border/80 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background glow on hover */}
                    <div className={`absolute -top-12 -right-12 size-32 rounded-full ${feature.bgGlow} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />
                    <div className="relative">
                      <div className="mb-5 inline-flex items-center justify-center">
                        <div className={`flex items-center justify-center size-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                      <button className="mt-5 flex items-center gap-1.5 text-sm font-medium text-indigo-600 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Learn more
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats Banner */}
            <section className="relative rounded-2xl overflow-hidden my-8">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100" />
              <div className="absolute inset-[1px] rounded-[15px] bg-gray-900" />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative p-8 sm:p-12 text-white">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "99.99%", label: "Uptime SLA" },
                    { value: "300+", label: "Edge Locations" },
                    { value: "<50ms", label: "Avg Response" },
                    { value: "10M+", label: "Requests/sec" },
                  ].map((stat) => (
                    <div key={stat.label} className="relative">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Integrations */}
            <section className="py-12 sm:py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Built for your stack
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                  First-class integrations with the tools and frameworks you
                  already use.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {[
                  { name: "React", icon: <Code2 className="size-6" />, color: "text-cyan-500" },
                  { name: "Node.js", icon: <Cpu className="size-6" />, color: "text-green-500" },
                  { name: "PostgreSQL", icon: <Database className="size-6" />, color: "text-blue-500" },
                  { name: "Auth", icon: <Lock className="size-6" />, color: "text-amber-500" },
                  { name: "AWS", icon: <Cloud className="size-6" />, color: "text-orange-500" },
                  { name: "CI/CD", icon: <Workflow className="size-6" />, color: "text-violet-500" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-border hover:shadow-md transition-all duration-300"
                  >
                    <div className={`${tech.color} transition-transform duration-300 group-hover:scale-110`}>
                      {tech.icon}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-12 sm:py-20">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Simple, transparent pricing
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                  Start free and scale as you grow. No hidden fees, no surprise
                  charges.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-start">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                      plan.popular
                        ? "border-indigo-300 bg-gradient-to-b from-indigo-50/80 to-white ring-2 ring-indigo-200 shadow-xl shadow-indigo-500/10 scale-[1.03] z-10"
                        : "border-border bg-card shadow-sm hover:shadow-md"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                        <Star className="size-3 fill-current" />
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${plan.popular ? "text-indigo-600" : "text-foreground"}`}>
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{plan.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className={`flex items-center justify-center size-5 rounded-full ${plan.popular ? "bg-indigo-100 text-indigo-600" : "bg-emerald-50 text-emerald-500"}`}>
                            <Check className="size-3 shrink-0" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                          : "border border-border text-foreground hover:bg-accent/50"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="py-12">
              <div className="relative rounded-2xl overflow-hidden p-8 sm:p-14 text-center text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative">
                  <h2 className="text-2xl sm:text-4xl font-bold">
                    Ready to get started?
                  </h2>
                  <p className="mt-4 text-indigo-100 max-w-md mx-auto text-lg">
                    Join thousands of teams already building on Nexus. Start your
                    free trial today.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button className="w-full sm:w-auto rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-lg">
                      Start Free Trial
                    </button>
                    <button className="w-full sm:w-auto rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                      Talk to Sales
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
