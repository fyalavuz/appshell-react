"use client";

import { useState, useEffect } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  Footer,
  FooterItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Home,
  Compass,
  Plus,
  Heart,
  User,
  Sun,
  Moon,
  Settings,
  Bell,
} from "lucide-react";

const themes = [
  { name: "Light", icon: Sun, value: "light" },
  { name: "Dark", icon: Moon, value: "dark" },
];

export default function DarkModePage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set initial dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme={isDark ? "dark" : "light"}
          logo={<span className="text-lg font-bold tracking-tight">Themed</span>}
          actions={
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-accent transition-colors"
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          }
          title="Theme Settings"
          subtitle="Toggle between light and dark modes"
        />

        <Content className="pb-24">
          <div className="p-4 space-y-6">
            {/* Theme Toggle Card */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="font-semibold mb-4">Appearance</h2>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={toggleTheme}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      (theme.value === "dark") === isDark
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`size-12 rounded-xl flex items-center justify-center ${
                      theme.value === "dark" ? "bg-slate-800" : "bg-amber-100"
                    }`}>
                      <theme.icon className={`size-6 ${
                        theme.value === "dark" ? "text-slate-200" : "text-amber-600"
                      }`} />
                    </div>
                    <span className="text-sm font-medium">{theme.name}</span>
                    {(theme.value === "dark") === isDark && (
                      <span className="text-xs text-primary">Active</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Example Cards */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="font-semibold mb-4">Notifications</h2>
              <div className="space-y-3">
                {[
                  { title: "New follower", desc: "Sarah Chen started following you", time: "2m ago" },
                  { title: "New message", desc: "You have 3 unread messages", time: "1h ago" },
                  { title: "Weekly digest", desc: "Your weekly activity summary", time: "1d ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bell className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Preview */}
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="font-semibold mb-4">Quick Settings</h2>
              <div className="space-y-2">
                {[
                  { label: "Push Notifications", enabled: true },
                  { label: "Email Updates", enabled: false },
                  { label: "Sound Effects", enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <span className="text-sm">{setting.label}</span>
                    <div className={`w-10 h-6 rounded-full transition-colors ${
                      setting.enabled ? "bg-primary" : "bg-muted"
                    }`}>
                      <div className={`size-5 rounded-full bg-white shadow-sm transform transition-transform ${
                        setting.enabled ? "translate-x-[18px]" : "translate-x-0.5"
                      } mt-0.5`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>

        <Footer variant="tab-bar">
          <FooterItem icon={<Home className="size-5" />} label="Home" />
          <FooterItem icon={<Compass className="size-5" />} label="Explore" />
          <FooterItem icon={<Plus className="size-5" />} label="Create" />
          <FooterItem icon={<Heart className="size-5" />} label="Likes" />
          <FooterItem icon={<User className="size-5" />} label="Profile" active />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
