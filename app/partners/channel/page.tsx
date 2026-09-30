import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Channel Partners" };

export default function ChannelPartnersPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Partner"
      title="Channel Partners"
      summary="Resell and co-sell secure, scalable communication with Mediacorn Digital."
      sections={[
        {
          heading: "Program benefits",
          body: "Deal registration, margin structure, and shared customer success motions (placeholder program details).",
        },
      ]}
    />
  );
}
