import { SimpleContentTemplate } from "@/components/templates/SimpleContentTemplate";

export const metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <SimpleContentTemplate
      eyebrow="Resources"
      title="Events"
      summary="Upcoming sessions, webinars, and roundtables with the commsIQ team."
      sections={[
        {
          heading: "Next up",
          body: "Placeholder calendar. Subscribe via the contact form to be notified of upcoming events.",
        },
      ]}
    />
  );
}
