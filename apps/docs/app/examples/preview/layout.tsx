import type { Metadata } from "next";

// Bare iframe targets: the example pages are the ones worth indexing.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal layout for iframe previews - no header/footer
  return <>{children}</>;
}
