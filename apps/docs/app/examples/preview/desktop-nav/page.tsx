"use client";

import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  HeaderNav,
  HeaderNavItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Search, ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";

export default function DesktopNavPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Brand</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Products" active />
              <HeaderNavItem label="Solutions" />
              <HeaderNavItem label="Pricing" />
              <HeaderNavItem label="Resources" />
              <HeaderNavItem label="Docs" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 hover:bg-accent transition-colors">
                <Search className="size-5 text-muted-foreground" />
              </button>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </div>
          }
        />

        <Content className="pb-12">
          {/* Hero Section */}
          <div className="px-4 py-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-6">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Now with AI-powered features
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto text-balance">
              Build better products with modern tools
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-balance">
              The complete platform for teams to design, develop, and deploy at scale.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="size-4" />
              </button>
              <button className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="px-4 py-12 bg-muted/30">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Built on edge infrastructure for sub-100ms response times.",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  desc: "SOC 2 compliant with end-to-end encryption.",
                },
                {
                  icon: Globe,
                  title: "Global Scale",
                  desc: "Deploy to 30+ regions with automatic failover.",
                },
              ].map((feature, i) => (
                <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
