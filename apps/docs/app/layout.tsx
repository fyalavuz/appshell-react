import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteOrigin, siteUrl } from "@/lib/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "AppShell React - Mobile-First Layout Components",
    template: "%s | AppShell",
  },
  description: "A composable layout system for building mobile-first React applications with scroll-aware headers, tab bars, sidebars, and safe area handling.",
  keywords: ["react", "mobile", "layout", "components", "tailwind", "typescript", "app shell"],
  authors: [{ name: "Fırat Yalavuz" }],
  openGraph: {
    title: "AppShell React",
    description:
      "Scroll-aware headers, tab bars, drawers, and safe areas for mobile web apps.",
    type: "website",
    url: `${siteUrl}/`,
    siteName: "AppShell React",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppShell React",
    description:
      "Scroll-aware headers, tab bars, drawers, and safe areas for mobile web apps.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Opt into edge-to-edge so env(safe-area-inset-*) reports real values
  // on notched devices — the platform-standard safe-area mechanism.
  viewportFit: "cover",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
