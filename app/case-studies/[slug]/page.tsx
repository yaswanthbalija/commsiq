import { notFound } from "next/navigation";
import { allCaseStudySlugs, getCaseStudy } from "@/lib/content/caseStudies";
import { CaseStudyTemplate } from "@/components/templates/CaseStudyTemplate";

export function generateStaticParams() {
  return allCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.excerpt };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyTemplate study={study} />;
}
