"use client";

import { useState } from "react";
import {
  AppShell,
  Header,
  HeaderNav,
  HeaderNavItem,
  Content,
  Footer,
  FooterItem,
  Sidebar,
  NavGroup,
  NavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import {
  Menu,
  User,
  Bell,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  ShoppingCart,
  Eye,
  ArrowUpRight,
  Clock,
  Sparkles,
  CalendarDays,
} from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Active Users",
    value: "2,338",
    change: "+15.3%",
    trend: "up" as const,
    icon: Users,
    gradient: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.1%",
    trend: "down" as const,
    icon: ShoppingCart,
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    title: "Page Views",
    value: "12.5K",
    change: "+8.7%",
    trend: "up" as const,
    icon: Eye,
    gradient: "from-orange-500 to-amber-600",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
  },
];

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "completed onboarding",
    time: "2 min ago",
    color: "bg-emerald-500",
  },
  {
    user: "Marcus Johnson",
    action: "upgraded to Pro plan",
    time: "5 min ago",
    color: "bg-blue-500",
  },
  {
    user: "Emily Rodriguez",
    action: "submitted a support ticket",
    time: "12 min ago",
    color: "bg-amber-500",
  },
  {
    user: "Alex Kim",
    action: "invited 3 team members",
    time: "18 min ago",
    color: "bg-violet-500",
  },
  {
    user: "Jordan Lee",
    action: "exported analytics report",
    time: "25 min ago",
    color: "bg-cyan-500",
  },
  {
    user: "Priya Patel",
    action: "updated billing info",
    time: "32 min ago",
    color: "bg-pink-500",
  },
];

export default function ResponsivePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 rounded-md hover:bg-black/5 transition-colors md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </button>
              <span className="text-lg font-bold tracking-tight">Dashboard</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Dashboard" active />
              <HeaderNavItem label="Analytics" />
              <HeaderNavItem label="Users" />
              <HeaderNavItem label="Settings" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              </button>
              <button
                type="button"
                className="ml-1 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-slate-600 to-zinc-700 text-white"
                aria-label="Profile"
              >
                <User className="size-4" />
              </button>
            </div>
          }
        />

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <div className="p-4 border-b border-gray-100">
            <span className="text-lg font-bold tracking-tight">Dashboard</span>
          </div>
          <div className="p-2">
            <NavGroup title="Menu" defaultOpen>
              <NavItem
                icon={<LayoutDashboard className="size-5" />}
                label="Dashboard"
                active
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                icon={<BarChart3 className="size-5" />}
                label="Analytics"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                icon={<Users className="size-5" />}
                label="Users"
                onClick={() => setSidebarOpen(false)}
              />
              <NavItem
                icon={<Settings className="size-5" />}
                label="Settings"
                onClick={() => setSidebarOpen(false)}
              />
            </NavGroup>
          </div>
        </Sidebar>

        <Content className="pb-20 md:pb-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
            {/* Floating variant indicator */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Responsive
            </div>

            {/* Welcome message */}
            <div className="relative mb-8 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/15 to-transparent rounded-full blur-3xl" />
              <div className="relative p-6 sm:p-8 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="size-4 text-amber-400" />
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Overview
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Welcome back, Alex
                  </h1>
                  <p className="mt-2 text-sm text-gray-400 max-w-md">
                    Here is what is happening with your projects today. Your
                    revenue is up 20% compared to last month.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDays className="size-4" />
                  <span>Feb 23, 2026</span>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle corner accent */}
                  <div className={`absolute -top-6 -right-6 size-16 rounded-full bg-gradient-to-br ${metric.gradient} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex items-center justify-center size-11 rounded-xl bg-gradient-to-br ${metric.gradient} text-white shadow-sm`}
                      >
                        <metric.icon className="size-5" />
                      </div>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          metric.trend === "up"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{metric.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart Placeholder */}
              <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Revenue Overview
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Monthly revenue for the current year
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    View Report
                    <ArrowUpRight className="size-3" />
                  </button>
                </div>
                <div className="flex items-end gap-2 h-48">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                    (h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className="w-full rounded-lg bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 transition-all duration-300 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-500 relative group/bar cursor-pointer"
                          style={{ height: `${h}%` }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-400">
                          {
                            ["J","F","M","A","M","J","J","A","S","O","N","D"][i]
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-900">
                    Recent Activity
                  </h2>
                  <div className="flex items-center justify-center size-8 rounded-lg bg-gray-50">
                    <Activity className="size-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="relative mt-0.5 shrink-0">
                        <div className="flex items-center justify-center size-9 rounded-full bg-gray-100 text-gray-600">
                          <User className="size-4" />
                        </div>
                        {/* Color status indicator */}
                        <span className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ${item.color} ring-2 ring-white`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900 leading-snug">
                          <span className="font-medium">{item.user}</span>{" "}
                          <span className="text-gray-500">{item.action}</span>
                        </p>
                        <p className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <Clock className="size-3" />
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Content>

        {/* Mobile-only tab bar */}
        <div className="md:hidden">
          <Footer variant="tab-bar">
            <FooterItem
              icon={<LayoutDashboard className="size-5" />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <FooterItem
              icon={<BarChart3 className="size-5" />}
              label="Analytics"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
            <FooterItem
              icon={<Users className="size-5" />}
              label="Users"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <FooterItem
              icon={<Settings className="size-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </Footer>
        </div>
      </AppShell>
    </MotionProvider>
  );
}
