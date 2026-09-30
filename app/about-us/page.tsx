import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";
import { brand } from "@/lib/brand";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Company"
      title="Communication With Intelligence."
      summary={`${brand.name} is an intelligent customer communication platform built to help businesses create meaningful conversations across the customer lifecycle.`}
      sections={[
        {
          heading: "Our communication ecosystem",
          body: "Our communication ecosystem brings together SMS, WhatsApp, RCS and Voice, enabling businesses to move beyond fragmented communication and build connected customer experiences.",
        },
        {
          heading: "Across the customer lifecycle",
          body: "From critical transactional communication to customer acquisition, engagement, support and retention, commsIQ helps enterprises create conversations that move customers and businesses forward.",
        },
        {
          heading: "Our Philosophy",
          body: "Communication should not simply be delivered. It should create an outcome. That is why commsIQ brings together communication infrastructure, customer journeys, automation and intelligence within one ecosystem. Connect. Engage. Converse. Convert.",
        },
      ]}
    />
  );
}
