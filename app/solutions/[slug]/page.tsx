import { notFound } from "next/navigation";
import { allOutcomeSlugs, getOutcomeSolution } from "@/lib/content/solutions";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export function generateStaticParams() {
  return allOutcomeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getOutcomeSolution(slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.summary };
}

export default async function SolutionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getOutcomeSolution(slug);
  if (!solution) notFound();
  return <SolutionTemplate solution={solution} />;
}
