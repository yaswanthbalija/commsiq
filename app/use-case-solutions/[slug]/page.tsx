import { notFound } from "next/navigation";
import { getSolution, useCases } from "@/lib/content/solutions";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export function generateStaticParams() {
  return useCases.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution("use-case-solutions", slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.summary };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution("use-case-solutions", slug);
  if (!solution) notFound();
  return <SolutionTemplate solution={solution} />;
}
