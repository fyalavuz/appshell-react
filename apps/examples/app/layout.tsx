import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppShell Examples",
  description: "Fullscreen examples of appshell-react components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
