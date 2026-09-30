import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Company"
      title="Work with us"
      summary="Build the engagement layer enterprises rely on. We’re hiring builders across product, engineering, solutions, and go-to-market."
      sections={[
        {
          heading: "Why join",
          body: "Ship customer-facing impact, work with ambitious brands, and grow with a product-led communications platform.",
        },
        {
          heading: "Open roles (placeholder)",
          body: "Solutions Consultant · Full-stack Engineer · Product Designer · Customer Success Manager. Email careers@commsiq.example with your profile.",
        },
      ]}
    />
  );
}
