import { notFound } from "next/navigation";
import { allPlatformSlugs, getPlatformPage } from "@/lib/content/platform";
import { PlatformTemplate } from "@/components/templates/PlatformTemplate";

export function generateStaticParams() {
  return allPlatformSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) return {};
  return { title: page.name, description: page.summary };
}

export default async function PlatformPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();
  return <PlatformTemplate page={page} />;
}
