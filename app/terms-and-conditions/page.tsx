import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Legal"
      title="Terms of Use"
      summary="These placeholder terms govern use of the commsIQ marketing website. Replace with counsel-approved terms before go-live."
      sections={[
        {
          heading: "Acceptance",
          body: "By accessing this site you agree to these terms and to applicable laws governing online use.",
        },
        {
          heading: "Content",
          body: "Site content is provided for informational purposes and may change without notice.",
        },
        {
          heading: "Liability",
          body: "To the fullest extent permitted by law, Mediacorn Digital disclaims liability for indirect or consequential damages arising from site use.",
        },
      ]}
    />
  );
}
