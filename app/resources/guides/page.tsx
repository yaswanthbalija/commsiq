import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Guides" };

export default function GuidesPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Resources"
      title="Guides"
      summary="How enterprises design omnichannel journeys that convert and retain."
      sections={[
        {
          heading: "Starter guides",
          body: "WhatsApp onboarding · RCS creative patterns · OTP reliability · Consent-first messaging.",
        },
      ]}
    />
  );
}
