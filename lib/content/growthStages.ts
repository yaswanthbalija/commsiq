import type { ChannelKey } from "@/components/ui/ChannelLogo";

export type GrowthStagePage = {
  slug: string;
  step: string;
  stage: string;
  name: string;
  question: string;
  headline: string;
  summary: string;
  body: string;
  owner: "Mediacorn Digital" | "commsIQ" | "Mediacorn Digital + commsIQ";
  channels: { key: ChannelKey | string; label: string; body: string }[];
  howItWorks: { title: string; body: string }[];
  inputs: string[];
  outputs: string[];
  example: { title: string; steps: string[] };
  faqs: { q: string; a: string }[];
};

export const growthStages: GrowthStagePage[] = [
  {
    slug: "audience-intelligence",
    step: "01",
    stage: "Discover",
    name: "Audience Intelligence",
    question: "Who should I reach?",
    headline: "Know who your next customer is before you spend on reaching them.",
    summary:
      "Build relevant audience cohorts using permitted customer, behavioural, transactional and contextual signals.",
    body: "Most communication starts with a list you already have. Audience Intelligence starts one step earlier: it identifies the segments most likely to need your product, sizes them, and prepares them for activation across media and messaging. Every cohort is built on consented, permitted data and documented so campaign and compliance teams can see exactly how it was assembled.",
    owner: "Mediacorn Digital",
    channels: [
      { key: "audience", label: "First-party data", body: "CRM, app and web events you already own, unified into one customer view." },
      { key: "audience", label: "Behavioural signals", body: "Content, category and intent signals from permitted publisher and platform partners." },
      { key: "audience", label: "Transactional signals", body: "Purchase, renewal and payment patterns that separate active buyers from browsers." },
      { key: "audience", label: "Contextual signals", body: "Location, device, time and content context used to shape relevance without personal identifiers." },
    ],
    howItWorks: [
      { title: "Define the outcome", body: "Start with the conversion you want: a test drive, a loan application, a first order." },
      { title: "Build cohorts", body: "Combine your first-party data with permitted third-party signals to build lookalike and in-market segments." },
      { title: "Size and score", body: "Estimate reachable audience per channel and rank cohorts by expected conversion." },
      { title: "Hand off to activation", body: "Cohorts are pushed to programmatic buying and to commsIQ messaging with consent flags intact." },
    ],
    inputs: ["CRM exports", "Website and app events", "Past campaign responses", "Consent and suppression lists"],
    outputs: ["Named cohorts with size estimates", "Channel reachability per cohort", "Suppression-safe activation lists", "Audience brief for media planning"],
    example: {
      title: "BFSI: personal loan launch",
      steps: [
        "Bank shares existing salaried-customer base and consent flags",
        "Cohorts built: salaried 25 to 40, recent credit enquiry, no active loan",
        "Cohort sized at 1.2M reachable across CTV, video and display",
        "Same cohort exported to commsIQ for RCS and WhatsApp follow-up",
      ],
    },
    faqs: [
      { q: "Do you use customer data without consent?", a: "No. Cohorts are built only from permitted first-party data and consented partner signals. Suppression lists are applied before any activation." },
      { q: "Can this work without our CRM data?", a: "Yes. Cohorts can be built from contextual and behavioural signals alone, then refined as first-party data becomes available." },
    ],
  },
  {
    slug: "programmatic-advertising",
    step: "02",
    stage: "Reach",
    name: "Programmatic Advertising",
    question: "Where should I reach them?",
    headline: "Put the right cohort in front of the right screen, at the right frequency.",
    summary:
      "Activate audiences across premium digital environments through Mediacorn Digital's programmatic buying.",
    body: "Programmatic Advertising takes the cohorts built in Discover and buys inventory against them across Display, Online Video, Mobile, OTT and Connected TV. Buying is managed centrally so frequency, creative and budget are controlled across every screen, and every impression is tagged so the same person can be recognised when they respond on a commsIQ channel.",
    owner: "Mediacorn Digital",
    channels: [
      { key: "advertising", label: "Display", body: "Reach relevant audiences across premium digital environments." },
      { key: "advertising", label: "Online Video", body: "Build awareness and consideration through high-impact video experiences." },
      { key: "advertising", label: "Mobile", body: "Connect with customers across their everyday mobile journey." },
      { key: "advertising", label: "OTT", body: "Reach audiences consuming premium streaming content." },
      { key: "advertising", label: "Connected TV", body: "Build high-impact awareness across premium large-screen digital environments." },
    ],
    howItWorks: [
      { title: "Plan the mix", body: "Allocate budget across CTV, OTT, video, display and mobile based on cohort reachability and cost." },
      { title: "Buy programmatically", body: "Run buys through demand-side platforms with brand-safety, viewability and frequency controls." },
      { title: "Optimise in flight", body: "Shift spend daily towards placements and creatives producing qualified responses, not just clicks." },
      { title: "Connect the response", body: "Landing pages and ad units carry RCS, WhatsApp and click-to-call entry points powered by commsIQ." },
    ],
    inputs: ["Cohorts from Audience Intelligence", "Creative assets per format", "Budget and flight dates", "Brand-safety rules"],
    outputs: ["Reach and frequency by cohort", "Cost per qualified response", "Responders tagged for messaging follow-up", "Placement-level performance report"],
    example: {
      title: "Automotive: EV launch",
      steps: [
        "Prospective buyers cohort activated across CTV and OTT for awareness",
        "Online video and display retarget viewers who watched 50%+",
        "Mobile ad units open an RCS conversation with the vehicle card",
        "Responders handed to Engage with campaign and creative recorded",
      ],
    },
    faqs: [
      { q: "Which platforms do you buy through?", a: "Mediacorn Digital buys through leading demand-side platforms and direct premium publisher deals. The mix is chosen per campaign." },
      { q: "How is this different from running ads ourselves?", a: "The buy is planned against the same cohorts used for messaging, and responders are recognised when they reply on SMS, WhatsApp, RCS or Voice. Advertising and communication share one customer record." },
    ],
  },
  {
    slug: "engage",
    step: "03",
    stage: "Engage",
    name: "Intelligent Communication",
    question: "How can I start a meaningful conversation?",
    headline: "Turn an impression into a two-way conversation on the customer's phone.",
    summary: "Move customers from advertising exposure into direct, personalised messaging journeys.",
    body: "Engage is where the Growth Stack hands over to commsIQ. People who saw or responded to advertising are reached on SMS, WhatsApp and RCS with messages that reference the offer they saw. Journeys are built once and branch on the customer's reply, so a tap on an RCS card, a WhatsApp question or a link click each get a relevant next step instead of a generic follow-up.",
    owner: "commsIQ",
    channels: [
      { key: "sms", label: "SMS", body: "Reach at scale for offers, reminders and links back into the journey. DLT-compliant, with delivery reporting." },
      { key: "whatsapp", label: "WhatsApp", body: "Rich, two-way conversations with media, quick replies, catalogues and bot-to-agent hand-off." },
      { key: "rcs", label: "RCS", body: "Verified brand messaging with rich cards, carousels and suggested actions in the native inbox." },
    ],
    howItWorks: [
      { title: "Recognise the responder", body: "Ad responders arrive with campaign, creative and cohort attached to their customer record." },
      { title: "Pick the channel", body: "Route to RCS where supported, WhatsApp where opted-in, SMS as reliable fallback." },
      { title: "Send the first message", body: "Templates reference the offer the customer saw so the conversation continues rather than restarts." },
      { title: "Branch on reply", body: "Replies, taps and silence each trigger a different next step, up to escalation into Voice." },
    ],
    inputs: ["Responders from advertising", "Opt-in and consent status", "Approved message templates", "Offer and product data"],
    outputs: ["Delivery and read rates by channel", "Reply and intent classification", "Qualified leads flagged for Converse", "Journey drop-off points"],
    example: {
      title: "D2C: product discovery",
      steps: [
        "Video viewers receive an RCS carousel of the three products featured in the ad",
        "Tap on a product opens a WhatsApp thread with sizes, price and delivery time",
        "Bot answers common questions; unanswered ones escalate to an agent",
        "High-intent customers are offered click-to-call in the same thread",
      ],
    },
    faqs: [
      { q: "Do customers need to opt in?", a: "Yes. Promotional messaging follows DLT and platform consent rules. Transactional follow-ups use the customer's existing relationship with your business." },
      { q: "What if RCS is not supported on the handset?", a: "commsIQ falls back automatically to SMS or WhatsApp based on the customer's opt-in, with the same content adapted to the channel." },
    ],
  },
  {
    slug: "converse",
    step: "04",
    stage: "Converse",
    name: "Voice & Human Interaction",
    question: "How can I help the customer make a decision?",
    headline: "Connect high-intent customers to a person or a voice bot at the moment they are ready.",
    summary: "Connect high-intent customers with automated or human conversations.",
    body: "Some decisions need a conversation. Converse brings Voice into the journey: click-to-call from RCS and WhatsApp, IVR that already knows why the customer is calling, and cloud contact centre routing that puts the customer in front of the right agent with the full messaging history visible. Every call is logged back to the same customer record used by advertising and messaging.",
    owner: "commsIQ",
    channels: [
      { key: "voice", label: "Voice", body: "Inbound and outbound calling on virtual, toll-free and DID numbers with recording and analytics." },
      { key: "voice", label: "IVR", body: "Multi-level menus, text-to-speech and DTMF capture, pre-filled with journey context." },
      { key: "voice", label: "Click-to-Call", body: "One-tap calling from RCS cards, WhatsApp buttons, web pages and apps." },
      { key: "contact-centre", label: "Cloud Contact Centre", body: "Skill and time-based routing, agent desktop with messaging history, supervisor dashboards." },
    ],
    howItWorks: [
      { title: "Detect intent", body: "A tap on Call, a question the bot cannot answer, or a scoring threshold flags the customer for Voice." },
      { title: "Offer the call", body: "Click-to-call or a scheduled callback is offered inside the same messaging thread." },
      { title: "Route with context", body: "The agent sees the ad, the messages and the product the customer was looking at before answering." },
      { title: "Close the loop", body: "Outcomes, recordings and next steps are written back so messaging can confirm and follow up." },
    ],
    inputs: ["Qualified leads from Engage", "Agent skills and schedules", "IVR scripts and routing rules", "Callback windows"],
    outputs: ["Connected calls and speed of answer", "Call outcome by agent and campaign", "Recordings and transcripts", "Follow-up triggers for Convert"],
    example: {
      title: "BFSI: loan application",
      steps: [
        "Customer asks about EMI on WhatsApp; bot offers click-to-call",
        "IVR confirms identity with an SMS OTP and routes to a loans specialist",
        "Agent sees the cohort, ad and WhatsApp thread on one screen",
        "Application link is sent on WhatsApp during the call",
      ],
    },
    faqs: [
      { q: "Can we use our existing agents?", a: "Yes. Agents work from the commsIQ cloud contact centre desktop or receive routed calls on their existing numbers." },
      { q: "Is call recording compliant?", a: "Recording is consent-announced, encrypted at rest and retained per your policy." },
    ],
  },
  {
    slug: "convert",
    step: "05",
    stage: "Convert",
    name: "Business Outcomes",
    question: "What outcome are we driving?",
    headline: "Measure the journey by outcomes, then re-engage the customers who did not finish.",
    summary: "Optimise the journey towards measurable business outcomes.",
    body: "Convert defines what success means for the campaign and tracks it across every stage: lead, application, appointment, booking, purchase, transaction or subscription. Because advertising, messaging and voice share one customer record, attribution is by person rather than by channel. Customers who drop off are returned to Engage or to programmatic re-targeting, and converted customers move into retention journeys.",
    owner: "Mediacorn Digital + commsIQ",
    channels: [
      { key: "growth", label: "Lead", body: "A qualified enquiry captured through messaging, voice or a form." },
      { key: "growth", label: "Application", body: "A started or completed application, with SMS and WhatsApp used to finish onboarding." },
      { key: "growth", label: "Appointment or Booking", body: "A scheduled slot, confirmed and reminded on SMS or WhatsApp." },
      { key: "growth", label: "Purchase or Transaction", body: "A completed payment, confirmed with a transactional message." },
      { key: "growth", label: "Subscription", body: "A recurring relationship, supported by renewal and reactivation journeys." },
    ],
    howItWorks: [
      { title: "Define the conversion", body: "Agree the event, the source of truth and the value before the campaign starts." },
      { title: "Track by person", body: "Conversions are matched to the customer record, not to the last channel touched." },
      { title: "Report the funnel", body: "Reached, engaged, conversed and converted are reported together with cost per outcome." },
      { title: "Re-engage and retain", body: "Drop-offs return to messaging or media; converted customers enter cross-sell and renewal journeys." },
    ],
    inputs: ["Conversion events from your systems", "Value per outcome", "Retention and reactivation rules", "Attribution window"],
    outputs: ["Cost per conversion by cohort and channel", "Full-funnel report", "Re-engagement audiences", "Retention journey enrolments"],
    example: {
      title: "Retail: first order to repeat order",
      steps: [
        "Purchase event received from the storefront and matched to the customer",
        "WhatsApp order and delivery updates sent automatically",
        "Non-purchasers re-targeted on display and video for 14 days",
        "Buyers enrolled in a 30-day replenishment reminder journey",
      ],
    },
    faqs: [
      { q: "How do you attribute a conversion?", a: "By customer record across advertising, messaging and voice, within an agreed window. Channel-level views are available alongside person-level attribution." },
      { q: "Can conversion data flow back to our CRM?", a: "Yes. Outcomes are available via API, webhook and scheduled export." },
    ],
  },
];

export function getGrowthStage(slug: string) {
  return growthStages.find((s) => s.slug === slug);
}

export function allGrowthStageSlugs() {
  return growthStages.map((s) => s.slug);
}
