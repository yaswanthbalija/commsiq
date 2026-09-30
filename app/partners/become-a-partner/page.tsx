import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Become a Partner" };

export default function BecomePartnerPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Partner"
      title="Become a Partner"
      summary="Grow with commsIQ: co-sell, integrate, and deliver engagement outcomes together."
      sections={[
        {
          heading: "Who we partner with",
          body: "Agencies, ISVs, system integrators, and technology platforms that want a trusted CPaaS layer.",
        },
        {
          heading: "What you get",
          body: "Enablement, joint GTM plays, solution blueprints, and priority technical support.",
        },
      ]}
    />
  );
}
