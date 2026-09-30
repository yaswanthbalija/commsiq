import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = {
  title: "Developers",
  description: "API documentation and integrations for the commsIQ communication platform.",
};

export default function DevelopersPage() {
  return (
    <SimpleContentTemplate
      title="Build Once. Communicate Everywhere."
      eyebrow="Developers"
      summary="Use APIs to trigger customer communication based on real-time business events and customer actions across SMS, WhatsApp, RCS and Voice."
      sections={[
        {
          heading: "API Documentation",
          body: "Integrate messaging and voice into your CRM, applications, websites and business workflows with a consistent API-first approach.",
        },
        {
          heading: "Integrations",
          body: "Connect commsIQ with CRM, ERP, mobile applications, websites, customer support platforms, marketing platforms, payment systems and business applications.",
        },
        {
          heading: "Next step",
          body: "Talk to our team for sandbox access, technical onboarding and integration guidance tailored to your stack.",
        },
      ]}
    />
  );
}
