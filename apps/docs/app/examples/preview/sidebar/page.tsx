"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  Sidebar,
  NavGroup,
  NavItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Menu,
  Home,
  Package,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  X,
  Star,
  TrendingUp,
  Calendar,
  Bell,
} from "lucide-react";

const stats = [
  { label: "Active Users", value: "12,847", change: "+12.5%", icon: Users },
  { label: "Revenue", value: "$48.2K", change: "+8.1%", icon: TrendingUp },
  { label: "Orders", value: "1,284", change: "+23%", icon: Package },
  { label: "Rating", value: "4.9", change: "+0.3", icon: Star },
];

const activities = [
  { title: "New order received", description: "Order #4821 from Sarah K.", time: "2m ago", type: "order" },
  { title: "Payment processed", description: "$129.00 - Premium Plan", time: "15m ago", type: "payment" },
  { title: "New review", description: "5 stars from Marcus J.", time: "1h ago", type: "review" },
  { title: "Inventory alert", description: "Low stock: Widget Pro", time: "2h ago", type: "alert" },
  { title: "New subscriber", description: "user@example.com joined", time: "3h ago", type: "user" },
];

export default function SidebarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 hover:bg-accent transition-colors"
            >
              <Menu className="size-5" />
            </button>
          }
          title="Dashboard"
          subtitle="Overview and analytics"
          actions={
            <button
              type="button"
              className="relative rounded-lg p-1.5 hover:bg-accent transition-colors"
            >
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
            </button>
          }
        />

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          side="left"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
              <div>
                <p className="font-semibold text-sm">Acme Inc</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1.5 hover:bg-accent transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <NavGroup title="Overview" defaultOpen>
              <NavItem label="Home" icon={<Home />} active />
              <NavItem label="Analytics" icon={<BarChart2 />} badge={5} />
              <NavItem label="Products" icon={<Package />} />
              <NavItem label="Customers" icon={<Users />} />
              <NavItem label="Calendar" icon={<Calendar />} />
            </NavGroup>
            <NavGroup title="Settings" defaultOpen>
              <NavItem label="Preferences" icon={<Settings />} />
              <NavItem label="Help & Support" icon={<HelpCircle />} />
            </NavGroup>
          </div>

          <div className="p-4 border-t">
            <div className="rounded-xl bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-red-400/20 p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="size-4 text-amber-500" />
                <span className="text-xs font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get unlimited access to all features and premium support.
              </p>
              <button
                type="button"
                className="w-full rounded-lg bg-foreground py-2 text-xs font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        </Sidebar>

        <Content className="bg-muted/30 pb-12">
          <div className="p-4 pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="size-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">{stat.value}</span>
                    <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Recent Activity</h2>
                <p className="text-xs text-muted-foreground">Latest updates from your store</p>
              </div>
              <div className="divide-y">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors">
                    <div className="size-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      {activity.type === "order" && <Package className="size-4 text-blue-500" />}
                      {activity.type === "payment" && <TrendingUp className="size-4 text-emerald-500" />}
                      {activity.type === "review" && <Star className="size-4 text-amber-500" />}
                      {activity.type === "alert" && <Bell className="size-4 text-red-500" />}
                      {activity.type === "user" && <Users className="size-4 text-violet-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
