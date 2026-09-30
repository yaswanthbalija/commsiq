import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Technology Partners" };

export default function TechPartnersPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Partner"
      title="Technology Partners"
      summary="Integrate and extend the commsIQ engagement stack with complementary platforms."
      sections={[
        {
          heading: "Integration focus",
          body: "CRM, CDP, helpdesk, analytics, and identity providers connected through APIs and event webhooks.",
        },
      ]}
    />
  );
}
