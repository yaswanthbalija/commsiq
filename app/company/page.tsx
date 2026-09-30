import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Company Policies" };

export default function CompanyPoliciesPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Company"
      title="Company Policies"
      summary="Placeholder policies for the commsIQ marketing experience. Replace with your formal policy documents before production launch."
      sections={[
        {
          heading: "Code of conduct",
          body: "We expect employees, partners, and vendors to act with integrity, respect, and accountability in every engagement.",
        },
        {
          heading: "Information security",
          body: "Access to systems and customer data is governed by least-privilege controls, monitoring, and continuous improvement.",
        },
        {
          heading: "Responsible AI",
          body: "Automated messaging and decisioning features are designed with human oversight, consent, and auditability in mind.",
        },
      ]}
    />
  );
}
