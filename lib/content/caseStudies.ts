export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  industry: string;
  channel: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  approach: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-collections",
    title: "How a leading fintech boosted payment collections using WhatsApp",
    excerpt: "Guided repayment journeys lifted on-time collections without expanding agent headcount.",
    industry: "BFSI",
    channel: "WhatsApp",
    metric: "32%",
    metricLabel: "lift in on-time collections",
    challenge: "Customers ignored SMS reminders and call answer rates were falling.",
    approach: "commsIQ deployed verified WhatsApp templates with in-chat payment links and smart retries.",
    result: "Higher repayment completion and lower cost per recovered account.",
  },
  {
    slug: "qsr-conversions",
    title: "A national QSR turned festive moments into high-intent conversions",
    excerpt: "Seasonal WhatsApp campaigns converted festive browsing into orders.",
    industry: "Retail",
    channel: "WhatsApp",
    metric: "2.4x",
    metricLabel: "campaign conversion vs email",
    challenge: "Festive offers were drowning in crowded inboxes.",
    approach: "Rich WhatsApp journeys with menus, offers, and store locator CTAs.",
    result: "Stronger festive peak performance and reusable playbooks.",
  },
  {
    slug: "bank-rcs-growth",
    title: "A major bank chats its way to growth with RCS",
    excerpt: "RCS cards improved product discovery and click-through for card upgrades.",
    industry: "BFSI",
    channel: "Google RCS",
    metric: "3x",
    metricLabel: "CTR vs plain SMS",
    challenge: "Plain SMS lacked room for rich product storytelling.",
    approach: "Verified RCS with carousels, suggested actions, and SMS fallback.",
    result: "Higher engagement on upgrade campaigns with measurable funnel lift.",
  },
  {
    slug: "ecommerce-collections",
    title: "E-commerce brand cuts engagement cost while growing retention",
    excerpt: "Channel orchestration reduced redundant outreach and improved loyalty metrics.",
    industry: "E-commerce",
    channel: "Omnichannel",
    metric: "18%",
    metricLabel: "lower engagement cost",
    challenge: "Overlapping SMS and email increased cost and fatigue.",
    approach: "Preference-aware orchestration with AI send-time optimisation.",
    result: "Lower TCO and healthier retention cohorts.",
  },
  {
    slug: "banking-trust",
    title: "Largest bank blocks scam patterns at messaging scale",
    excerpt: "Consent, fraud signals, and verified channels restored customer trust.",
    industry: "BFSI",
    channel: "SMS + WhatsApp",
    metric: "6Mn+",
    metricLabel: "suspicious patterns flagged",
    challenge: "Customers feared phishing lookalike messages.",
    approach: "Enterprise controls, verified senders, and anomaly detection hooks.",
    result: "Safer engagement and higher trust in official alerts.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function allCaseStudySlugs() {
  return caseStudies.map((c) => c.slug);
}
