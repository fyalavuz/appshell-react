import "./globals.css";
import "nextra-theme-docs/style.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "AppShell React - Mobile-First Layout Components",
    template: "%s | AppShell React",
  },
  description:
    "A composable layout system for building mobile-first React applications with scroll-aware headers, tab bars, sidebars, and safe area handling.",
  keywords: [
    "react",
    "mobile",
    "layout",
    "components",
    "tailwind",
    "typescript",
    "app shell",
  ],
  authors: [{ name: "Furkan Yalavuz" }],
  openGraph: {
    title: "AppShell React",
    description: "Mobile-first layout components for React",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
