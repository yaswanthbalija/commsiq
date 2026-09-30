import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Resources"
      title="Blog"
      summary="Insights and playbooks for enterprise engagement leaders."
      sections={[
        {
          heading: "Coming soon",
          body: "Editorial content will land here. Meanwhile, explore case studies for outcome stories.",
        },
      ]}
    />
  );
}
