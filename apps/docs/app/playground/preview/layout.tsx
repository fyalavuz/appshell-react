import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground preview",
  robots: { index: false },
};

export default function PlaygroundPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
