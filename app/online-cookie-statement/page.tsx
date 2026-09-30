import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Cookie Statement" };

export default function CookieStatementPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Legal"
      title="Online Cookie Statement"
      summary="How cookies may be used on the commsIQ website."
      sections={[
        {
          heading: "Essential cookies",
          body: "Required for basic site functions such as remembering cookie consent preferences in local storage.",
        },
        {
          heading: "Analytics cookies",
          body: "May be enabled in production to understand traffic and improve navigation. This demo does not load third-party analytics.",
        },
        {
          heading: "Your choices",
          body: "Use the cookie banner controls and browser settings to manage preferences.",
        },
      ]}
    />
  );
}
