export type SolutionPage = {
  slug: string;
  name: string;
  pathPrefix: "use-case-solutions" | "managed-services" | "industry-solutions" | "solutions";
  eyebrow: string;
  headline: string;
  summary: string;
  pillars: { title: string; body: string }[];
};

export const outcomeSolutions: SolutionPage[] = [
  {
    slug: "customer-acquisition",
    pathPrefix: "solutions",
    name: "Customer Acquisition",
    eyebrow: "Solutions",
    headline: "Acquire customers across every high-intent channel.",
    summary:
      "Promotional SMS, RCS campaigns, WhatsApp marketing, outbound voice and lead generation built to create demand and start conversations.",
    pillars: [
      { title: "Promotional SMS", body: "Reach new audiences at scale with timely offers and launches." },
      { title: "RCS Campaigns", body: "Showcase products with rich, interactive branded messaging." },
      { title: "WhatsApp Marketing", body: "Start personalised conversations that convert interest into leads." },
      { title: "Outbound Voice", body: "Connect high-intent prospects with sales conversations." },
      { title: "Lead Generation", body: "Capture and qualify demand across messaging and voice." },
    ],
  },
  {
    slug: "transactional-communication",
    pathPrefix: "solutions",
    name: "Transactional Communication",
    eyebrow: "Solutions",
    headline: "Deliver the messages customers cannot afford to miss.",
    summary:
      "OTP, authentication, payment alerts, order updates and service notifications with enterprise reliability.",
    pillars: [
      { title: "OTP", body: "Secure authentication at the moment it matters." },
      { title: "Authentication", body: "Protect accounts and journeys with trusted verification." },
      { title: "Payment Alerts", body: "Confirm transactions and keep customers informed." },
      { title: "Order Updates", body: "Keep every purchase status visible and actionable." },
      { title: "Service Notifications", body: "Operational updates that reduce uncertainty and support load." },
    ],
  },
  {
    slug: "customer-engagement",
    pathPrefix: "solutions",
    name: "Customer Engagement",
    eyebrow: "Solutions",
    headline: "Create personalised and interactive customer experiences.",
    summary:
      "Personalised offers, interactive RCS, WhatsApp conversations and cross-sell journeys that deepen relationships.",
    pillars: [
      { title: "Personalised Offers", body: "Relevant communication based on context and behaviour." },
      { title: "Interactive RCS", body: "Rich experiences customers can explore and act on." },
      { title: "WhatsApp Conversations", body: "Two-way engagement that feels natural and useful." },
      { title: "Cross-sell & Upsell", body: "Grow lifetime value through timely next-best offers." },
    ],
  },
  {
    slug: "customer-support",
    pathPrefix: "solutions",
    name: "Customer Support",
    eyebrow: "Solutions",
    headline: "Support customers with automation and human expertise.",
    summary:
      "WhatsApp bots, live agents, IVR, cloud contact centre and customer notifications working as one support system.",
    pillars: [
      { title: "WhatsApp Bots", body: "Resolve common queries instantly with guided automation." },
      { title: "Live Agents", body: "Escalate complex needs with conversation context intact." },
      { title: "IVR", body: "Route customers to the right conversation faster." },
      { title: "Cloud Contact Centre", body: "Manage inbound and outbound support from the cloud." },
      { title: "Customer Notifications", body: "Keep customers informed before they need to ask." },
    ],
  },
  {
    slug: "retention-reactivation",
    pathPrefix: "solutions",
    name: "Retention & Reactivation",
    eyebrow: "Solutions",
    headline: "Keep customers engaged long after the first conversion.",
    summary:
      "Renewal reminders, reactivation campaigns, loyalty communication, feedback and cross-sell journeys.",
    pillars: [
      { title: "Renewal Reminders", body: "Protect recurring revenue with timely prompts." },
      { title: "Reactivation Campaigns", body: "Bring lapsed customers back into the funnel." },
      { title: "Loyalty Communication", body: "Strengthen relationships with relevant lifecycle messaging." },
      { title: "Customer Feedback", body: "Collect insight and close the experience loop." },
      { title: "Cross-sell Journeys", body: "Grow account value through connected next steps." },
    ],
  },
];

/** Legacy aliases for older use-case routes */
export const useCases: SolutionPage[] = [
  {
    slug: "acquisition-activation",
    pathPrefix: "use-case-solutions",
    name: "Customer Acquisition",
    eyebrow: "Solutions",
    headline: "Acquire and activate customers with connected journeys.",
    summary:
      "Promotional SMS, RCS, WhatsApp marketing, outbound voice, OTP and welcome journeys.",
    pillars: outcomeSolutions[0].pillars,
  },
  {
    slug: "engagement-retention",
    pathPrefix: "use-case-solutions",
    name: "Engagement & Retention",
    eyebrow: "Solutions",
    headline: "Engage, retain and reactivate with purpose.",
    summary:
      "Personalised communication, renewals, loyalty and reactivation across channels.",
    pillars: [
      ...outcomeSolutions[2].pillars.slice(0, 2),
      ...outcomeSolutions[4].pillars.slice(0, 2),
    ],
  },
  {
    slug: "transactional-messaging",
    pathPrefix: "use-case-solutions",
    name: "Transactional Communication",
    eyebrow: "Solutions",
    headline: "Deliver the messages customers cannot afford to miss.",
    summary: outcomeSolutions[1].summary,
    pillars: outcomeSolutions[1].pillars,
  },
  {
    slug: "customer-support-and-experience",
    pathPrefix: "use-case-solutions",
    name: "Customer Support",
    eyebrow: "Solutions",
    headline: "Support customers with automation and human expertise.",
    summary: outcomeSolutions[3].summary,
    pillars: outcomeSolutions[3].pillars,
  },
];

export const managedServices: SolutionPage[] = [
  {
    slug: "performance-marketing",
    pathPrefix: "managed-services",
    name: "Full-Funnel Growth",
    eyebrow: "Growth Stack",
    headline: "From impression to interaction to conversion.",
    summary:
      "Connect Audience Intelligence, Programmatic Advertising, Messaging and Voice into one growth ecosystem.",
    pillars: [
      { title: "Audience Intelligence", body: "Discover who your potential customers are." },
      { title: "Programmatic Advertising", body: "Reach them across display, video, OTT and CTV." },
      { title: "Intelligent Communication", body: "Continue the journey on SMS, WhatsApp and RCS." },
    ],
  },
];

export const industries: SolutionPage[] = [
  {
    slug: "bfsi",
    pathPrefix: "industry-solutions",
    name: "BFSI",
    eyebrow: "Industry",
    headline: "Built for every financial customer conversation.",
    summary:
      "OTP and authentication, transaction alerts, payment reminders, credit and loan engagement, customer acquisition, collections and support.",
    pillars: [
      { title: "OTP & Authentication", body: "Secure verification for critical financial moments." },
      { title: "Transaction Alerts", body: "Keep customers informed when money moves." },
      { title: "Payment Reminders", body: "Drive collections and repayment conversations." },
      { title: "Credit Card & Loan Engagement", body: "Acquire and nurture product interest." },
      { title: "Collections & Support", body: "Combine messaging and voice for resolution." },
    ],
  },
  {
    slug: "retail-ecommerce",
    pathPrefix: "industry-solutions",
    name: "Retail & E-commerce",
    eyebrow: "Industry",
    headline: "From offer to order to ongoing engagement.",
    summary:
      "Offers, product discovery, order confirmation, delivery updates, conversational commerce, abandoned cart and customer support.",
    pillars: [
      { title: "Offers & Discovery", body: "Showcase products through SMS, WhatsApp and RCS." },
      { title: "Order Lifecycle", body: "Confirmations and delivery updates customers expect." },
      { title: "Conversational Commerce", body: "Help shoppers discover, ask and buy in-thread." },
      { title: "Abandoned Cart", body: "Recover intent before it disappears." },
      { title: "Customer Support", body: "Resolve queries across messaging and voice." },
    ],
  },
  {
    slug: "travel",
    pathPrefix: "industry-solutions",
    name: "Travel & Hospitality",
    eyebrow: "Industry",
    headline: "Guide every mile of the traveler journey.",
    summary:
      "Booking confirmations, travel updates, offers, customer assistance, voice support, feedback and loyalty.",
    pillars: [
      { title: "Booking Confirmations", body: "Clear confirmations that reduce uncertainty." },
      { title: "Travel Updates", body: "Keep itineraries and changes visible." },
      { title: "Offers & Assistance", body: "Relevant promotions and timely help." },
      { title: "Voice Support", body: "Escalate complex travel needs to agents." },
      { title: "Feedback & Loyalty", body: "Close the loop and build return visits." },
    ],
  },
  {
    slug: "automotive",
    pathPrefix: "industry-solutions",
    name: "Automotive",
    eyebrow: "Industry",
    headline: "From vehicle discovery to ownership engagement.",
    summary:
      "Lead generation, vehicle discovery, test drive booking, dealer connectivity, service reminders and customer engagement.",
    pillars: [
      { title: "Lead Generation", body: "Identify and capture prospective buyers." },
      { title: "Vehicle Discovery", body: "Showcase models, features and offers with RCS." },
      { title: "Test Drive Booking", body: "Move interest into scheduled dealer conversations." },
      { title: "Dealer Connectivity", body: "Connect prospects through click-to-call and WhatsApp." },
      { title: "Service Reminders", body: "Keep owners engaged after purchase." },
    ],
  },
  {
    slug: "healthcare",
    pathPrefix: "industry-solutions",
    name: "Healthcare",
    eyebrow: "Industry",
    headline: "Patient communication that is timely and clear.",
    summary:
      "Appointment reminders, patient communication, customer support, notifications and feedback.",
    pillars: [
      { title: "Appointment Reminders", body: "Reduce no-shows with timely prompts." },
      { title: "Patient Communication", body: "Keep patients informed across the care journey." },
      { title: "Customer Support", body: "Answer queries through messaging and voice." },
      { title: "Notifications", body: "Deliver important updates when they matter." },
      { title: "Feedback", body: "Collect experience signals after each interaction." },
    ],
  },
  {
    slug: "education",
    pathPrefix: "industry-solutions",
    name: "Education",
    eyebrow: "Industry",
    headline: "Admissions to student communication, connected.",
    summary:
      "Admissions, lead nurturing, counselling, fee reminders and student communication.",
    pillars: [
      { title: "Admissions", body: "Convert interest into applications and enrolments." },
      { title: "Lead Nurturing", body: "Stay present through every decision stage." },
      { title: "Counselling", body: "Connect high-intent prospects with advisors." },
      { title: "Fee Reminders", body: "Reduce drop-offs with timely payment prompts." },
      { title: "Student Communication", body: "Keep students informed throughout the journey." },
    ],
  },
  {
    slug: "edtech",
    pathPrefix: "industry-solutions",
    name: "Education",
    eyebrow: "Industry",
    headline: "Admissions to student communication, connected.",
    summary:
      "Admissions, lead nurturing, counselling, fee reminders and student communication.",
    pillars: [
      { title: "Admissions", body: "Convert interest into applications and enrolments." },
      { title: "Lead Nurturing", body: "Stay present through every decision stage." },
      { title: "Counselling", body: "Connect high-intent prospects with advisors." },
    ],
  },
  {
    slug: "logistics",
    pathPrefix: "industry-solutions",
    name: "Logistics & Mobility",
    eyebrow: "Industry",
    headline: "Keep deliveries and conversations moving.",
    summary:
      "Delivery communication, number masking, driver-customer communication and service notifications.",
    pillars: [
      { title: "Delivery Communication", body: "Status updates that reduce support load." },
      { title: "Number Masking", body: "Protect privacy for drivers, agents and customers." },
      { title: "Driver-Customer Communication", body: "Enable conversations without exposing personal numbers." },
      { title: "Service Notifications", body: "Operational alerts when plans change." },
    ],
  },
  {
    slug: "gaming",
    pathPrefix: "industry-solutions",
    name: "Retail & E-commerce",
    eyebrow: "Industry",
    headline: "Engage digital-first customers across the lifecycle.",
    summary: "Acquisition, engagement and reactivation journeys for digital products and brands.",
    pillars: [
      { title: "Acquisition", body: "Reach and convert high-intent audiences." },
      { title: "Engagement", body: "Keep customers active with relevant messaging." },
      { title: "Reactivation", body: "Bring lapsed users back into the journey." },
    ],
  },
  {
    slug: "government",
    pathPrefix: "industry-solutions",
    name: "BFSI",
    eyebrow: "Industry",
    headline: "Secure, scalable communication for regulated organisations.",
    summary: "Notifications, verification and service communication across trusted channels.",
    pillars: [
      { title: "Service Updates", body: "Broad reach with clear, auditable communication." },
      { title: "Verification", body: "OTP and authentication for secure access." },
      { title: "Support", body: "Help citizens and customers resolve needs faster." },
    ],
  },
];

export const allSolutions = [
  ...outcomeSolutions,
  ...useCases,
  ...managedServices,
  ...industries,
];

export function getSolution(
  pathPrefix: SolutionPage["pathPrefix"],
  slug: string,
) {
  return allSolutions.find((s) => s.pathPrefix === pathPrefix && s.slug === slug);
}

export function getOutcomeSolution(slug: string) {
  return outcomeSolutions.find((s) => s.slug === slug);
}

export function allOutcomeSlugs() {
  return outcomeSolutions.map((s) => s.slug);
}
