export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal layout for iframe previews - no header/footer
  return <>{children}</>;
}
