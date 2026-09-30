import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Legal"
      title="Privacy Policy"
      summary="Placeholder privacy notice describing how demo form data may be handled in a future production deployment."
      sections={[
        {
          heading: "What we collect",
          body: "On this demo site, contact forms are validated in the browser and are not transmitted to a backend. In production, we may collect name, email, phone, designation, and city.",
        },
        {
          heading: "How we use data",
          body: "To respond to enquiries, improve services, and where permitted share relevant product updates.",
        },
        {
          heading: "Your rights",
          body: "Contact support@commsiqdigital.com to request access, correction, or deletion of personal data once production processing is enabled.",
        },
      ]}
    />
  );
}
