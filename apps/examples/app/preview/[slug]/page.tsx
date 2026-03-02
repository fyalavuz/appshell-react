import { notFound } from "next/navigation";
import {
  findExample,
  categories,
} from "../../_components/example-data";
import { ExampleLayout } from "../../_components/example-layout";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.flatMap((c) => c.examples.map((e) => ({ slug: e.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = findExample(slug);
  if (!result) return {};
  return {
    title: `${result.example.title} — AppShell`,
    description: result.example.description,
  };
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const result = findExample(slug);
  if (!result) notFound();
  return (
    <ExampleLayout
      slug={result.example.slug}
      title={result.example.title}
      description={result.example.description}
      code={result.example.code}
    />
  );
}
