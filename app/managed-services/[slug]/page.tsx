import { notFound } from "next/navigation";
import { getSolution, managedServices } from "@/lib/content/solutions";
import { SolutionTemplate } from "@/components/templates/SolutionTemplate";

export function generateStaticParams() {
  return managedServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution("managed-services", slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.summary };
}

export default async function ManagedServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution("managed-services", slug);
  if (!solution) notFound();
  return <SolutionTemplate solution={solution} />;
}
