/** Shared building blocks for docs pages — server-safe, token-driven. */

export function DocHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header>
      <p className="eyebrow text-brand">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

export function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return (
    <section className="mt-12" id={id}>
      <h2 className="scroll-mt-24 text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function DocProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
      {children}
    </code>
  );
}

export function DocNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-brand/25 bg-brand/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}
