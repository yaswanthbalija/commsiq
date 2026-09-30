export type PlatformPage = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  body: string;
  sections: { title: string; body: string; items?: string[] }[];
};

export const platformPages: PlatformPage[] = [
  {
    slug: "omnichannel",
    name: "Omnichannel Communication",
    eyebrow: "Platform",
    headline: "One Customer. Multiple Channels. One Connected Experience.",
    summary: "Communication becomes more powerful when channels work together.",
    body: "commsIQ enables enterprises to connect SMS, WhatsApp, RCS and Voice to create consistent customer experiences throughout the lifecycle. Customers do not think in channels. Neither should your communication strategy.",
    sections: [
      {
        title: "Start Anywhere. Continue Everywhere.",
        body: "Customers do not need to restart when the channel changes. Continuity is the product.",
      },
      {
        title: "SMS → WhatsApp",
        body: "Start with reach. Continue with conversation.",
      },
      {
        title: "RCS → Voice",
        body: "Start with rich discovery. Continue with human assistance.",
      },
      {
        title: "WhatsApp → Voice",
        body: "Start with automation. Escalate complex requirements to an agent.",
      },
      {
        title: "Voice → WhatsApp",
        body: "Complete the conversation and send payment links, documents or confirmations digitally.",
      },
      {
        title: "Example Journey",
        body: "SMS / RCS personalised communication → WhatsApp interaction → Voice agent → Conversion → SMS / WhatsApp confirmation. One customer. One connected journey.",
        items: [
          "Reach at scale",
          "Engage with conversation",
          "Converse with intent",
          "Convert to outcome",
          "Retain with follow-up",
        ],
      },
    ],
  },
  {
    slug: "journey-orchestration",
    name: "Journey Orchestration",
    eyebrow: "Platform",
    headline: "Turn Customer Interactions Into Connected Journeys.",
    summary: "Every customer action should determine what happens next.",
    body: "commsIQ helps businesses design communication journeys based on customer behaviour, responses and business rules.",
    sections: [
      {
        title: "Trigger",
        body: "Start from customer action, business event, transaction, lead or CRM update.",
        items: ["Customer Action", "Business Event", "Transaction", "Lead", "CRM Update"],
      },
      {
        title: "Decide",
        body: "Use customer context, journey stage, response and business rules to choose the next step.",
        items: ["Customer Context", "Journey Stage", "Response", "Business Rules"],
      },
      {
        title: "Engage",
        body: "Reach customers on the right channel for the moment.",
        items: ["SMS", "WhatsApp", "RCS", "Voice"],
      },
      {
        title: "Respond",
        body: "Listen for the signal that shapes what comes next.",
        items: ["Clicked", "Replied", "Called", "Purchased", "Dropped Off"],
      },
      {
        title: "Next Best Interaction",
        body: "Continue, escalate, remind, convert or retain based on intent and outcome.",
        items: ["Continue", "Escalate", "Remind", "Convert", "Retain"],
      },
    ],
  },
  {
    slug: "apis-integrations",
    name: "APIs & Integrations",
    eyebrow: "Platform",
    headline: "Communication Built Into Your Business.",
    summary: "Connect commsIQ with your existing technology ecosystem.",
    body: "Use APIs to trigger customer communication based on real-time business events and customer actions. Build once. Communicate everywhere.",
    sections: [
      {
        title: "Integrate messaging and voice into",
        body: "Bring communication into the systems your teams already run.",
        items: [
          "CRM",
          "ERP",
          "Mobile Applications",
          "Websites",
          "Customer Support Platforms",
          "Marketing Platforms",
          "Payment Systems",
          "Business Applications",
        ],
      },
      {
        title: "Build Once. Communicate Everywhere.",
        body: "Trigger customer communication from real-time business events and customer actions through a consistent API layer.",
      },
    ],
  },
  {
    slug: "analytics-insights",
    name: "Analytics & Insights",
    eyebrow: "Platform",
    headline: "Understand Delivery, Engagement and Customer Actions.",
    summary: "Turn communication activity into decision-ready insight.",
    body: "See how campaigns and conversations perform across SMS, WhatsApp, RCS and Voice so teams can optimise journeys and outcomes.",
    sections: [
      {
        title: "What you can measure",
        body: "Monitor the signals that matter across channels and journeys.",
        items: [
          "Delivery performance",
          "Engagement actions",
          "Conversation outcomes",
          "Campaign effectiveness",
          "Channel mix insights",
          "Journey drop-off points",
        ],
      },
      {
        title: "Act on insight",
        body: "Use analytics to refine triggers, creative, routing and next-best interactions across the customer lifecycle.",
      },
    ],
  },
];

export function getPlatformPage(slug: string) {
  return platformPages.find((p) => p.slug === slug);
}

export function allPlatformSlugs() {
  return platformPages.map((p) => p.slug);
}
