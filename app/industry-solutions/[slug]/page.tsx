import { notFound } from "next/navigation";
import { getSolution, industries } from "@/lib/content/solutions";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export function generateStaticParams() {
  return industries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution("industry-solutions", slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.summary };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution("industry-solutions", slug);
  if (!solution) notFound();
  return <SolutionTemplate solution={solution} />;
}
