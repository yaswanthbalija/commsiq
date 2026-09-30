export type Feature = { title: string; body: string };
export type Faq = { q: string; a: string };
export type FeatureGroup = { title: string; items: string[] };

export type ProductPage = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  body?: string;
  features: Feature[];
  groups?: FeatureGroup[];
  journey?: string;
  industries?: string[];
  faqs: Faq[];
  primaryCta?: string;
  secondaryCta?: string;
};

export const products: ProductPage[] = [
  {
    slug: "sms",
    name: "SMS",
    eyebrow: "SMS",
    headline: "Reliable Messaging. Built for Scale.",
    summary: "Reach every customer at every critical moment.",
    body: "commsIQ SMS helps businesses deliver reliable transactional and promotional communication at enterprise scale. From authentication and alerts to acquisition and customer engagement, SMS remains one of the most powerful ways to reach customers instantly.",
    features: [
      {
        title: "Transactional SMS",
        body: "Communication customers cannot afford to miss: OTP, authentication, transaction alerts, payment confirmations, order updates, delivery notifications, account updates, appointment reminders and service notifications.",
      },
      {
        title: "Promotional SMS",
        body: "Turn reach into engagement with product launches, offers, acquisition, cross-sell, seasonal campaigns, reactivation and lead generation.",
      },
      {
        title: "SMS Capabilities",
        body: "API integration, campaign management, personalised messaging, automated triggers, delivery reporting, DLT-enabled workflows, CRM integration and analytics.",
      },
      {
        title: "Do Not Stop at Delivery",
        body: "Connect SMS with the rest of the customer journey: SMS → WhatsApp → Voice → Conversion.",
      },
    ],
    groups: [
      {
        title: "Transactional SMS",
        items: [
          "OTP & Authentication",
          "Transaction Alerts",
          "Payment Confirmations",
          "Order Updates",
          "Delivery Notifications",
          "Account Updates",
          "Appointment Reminders",
          "Service Notifications",
        ],
      },
      {
        title: "Promotional SMS",
        items: [
          "Product Launches",
          "Offers & Promotions",
          "Customer Acquisition",
          "Cross-sell & Upsell",
          "Seasonal Campaigns",
          "Reactivation Campaigns",
          "Lead Generation",
        ],
      },
    ],
    journey: "SMS → WhatsApp → Voice → Conversion",
    faqs: [
      {
        q: "Can SMS connect into other channels?",
        a: "Yes. Use SMS for reach and continue the journey on WhatsApp or Voice when customers engage.",
      },
      {
        q: "Do you support transactional and promotional use cases?",
        a: "Yes. From OTPs and alerts to acquisition and reactivation campaigns.",
      },
    ],
    primaryCta: "Explore SMS",
    secondaryCta: "Talk to an Expert",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Business",
    eyebrow: "WhatsApp Business",
    headline: "Turn Messages Into Conversations.",
    summary: "Build meaningful customer relationships on WhatsApp.",
    body: "commsIQ helps businesses use WhatsApp across marketing, utility, authentication, commerce and customer support. Create rich and personalised conversations while connecting automation with live customer engagement.",
    features: [
      {
        title: "Marketing",
        body: "Offers, product launches, recommendations, customer acquisition and re-engagement.",
      },
      {
        title: "Utility & Authentication",
        body: "Order updates, booking confirmations, payment notifications, delivery updates, appointment reminders, OTP, account verification and secure customer journeys.",
      },
      {
        title: "Conversational Commerce",
        body: "Product discovery, recommendations, enquiries, lead generation, payments and purchase journeys.",
      },
      {
        title: "Customer Support",
        body: "Automated FAQs, chatbots, customer queries, live agent handover and resolution.",
      },
    ],
    groups: [
      {
        title: "Rich Conversational Experiences",
        items: [
          "Images & Videos",
          "Interactive Buttons",
          "Product Discovery",
          "Automated Flows",
          "Chatbots",
          "Live Agents",
          "API Integrations",
          "Campaign Analytics",
        ],
      },
    ],
    journey: "Discover → Engage → Converse → Convert",
    faqs: [
      {
        q: "Can we combine automation with live agents?",
        a: "Yes. Start with bots and flows, then hand over to live agents with full conversation context.",
      },
      {
        q: "Which WhatsApp use cases do you support?",
        a: "Marketing, utility, authentication, commerce and customer support.",
      },
    ],
    primaryCta: "Explore WhatsApp",
    secondaryCta: "Request a Demo",
  },
  {
    slug: "rcs",
    name: "RCS Business Messaging",
    eyebrow: "RCS Business Messaging",
    headline: "Messaging. Reimagined.",
    summary: "Bring app-like experiences into the customer's messaging inbox.",
    body: "RCS Business Messaging transforms traditional mobile messaging into rich, interactive and branded customer experiences. Create communication customers can see, explore and act upon.",
    features: [
      {
        title: "Rich Media",
        body: "Images, videos, GIFs and rich cards that elevate brand storytelling.",
      },
      {
        title: "Interactive Experiences",
        body: "Carousels, suggested replies, suggested actions and interactive CTAs.",
      },
      {
        title: "Verified Brand Experience",
        body: "Create trusted and recognisable brand communication within the customer's native messaging experience.",
      },
      {
        title: "Turn Engagement Into Action",
        body: "Shop Now, Book Now, Apply Now, Call Now, Locate Store and Talk to an Expert.",
      },
    ],
    journey: "RCS → Customer Interest → Click-to-Call → Agent → Conversion",
    industries: [
      "Retail & E-commerce",
      "BFSI",
      "Travel",
      "Automotive",
      "Consumer Electronics",
      "Entertainment",
      "D2C Brands",
    ],
    faqs: [
      {
        q: "What makes RCS different from SMS?",
        a: "RCS adds rich media, interactive actions and verified branding inside the native messaging inbox.",
      },
      {
        q: "Can RCS lead into voice conversations?",
        a: "Yes. High-intent moments can move into click-to-call and agent conversations.",
      },
    ],
    primaryCta: "Explore RCS",
    secondaryCta: "Request a Demo",
  },
  {
    slug: "voice",
    name: "Voice",
    eyebrow: "Voice",
    headline: "Give Every Customer Conversation a Voice.",
    summary: "Intelligent cloud communication for conversations that need the human touch.",
    body: "Messaging can start a conversation. Voice can complete it. commsIQ Voice helps businesses automate, manage and optimise customer conversations across sales, service, customer engagement and support.",
    features: [
      {
        title: "Cloud Contact Centre",
        body: "Inbound and outbound calling, agent management, routing, recording, monitoring, CRM integration and real-time reporting.",
      },
      {
        title: "Smart IVR",
        body: "Multi-level IVR, custom greetings, regional languages, department and skill-based routing with CRM/API integration.",
      },
      {
        title: "Virtual Numbers & Click-to-Call",
        body: "Cloud virtual numbers for routing and tracking, plus click-to-call that turns digital intent into human conversation.",
      },
      {
        title: "Automation, Masking & Analytics",
        body: "Automated outbound, number masking, toll-free numbers, intelligent dialer, call recording and performance analytics.",
      },
    ],
    groups: [
      {
        title: "Automated Outbound Calling",
        items: [
          "Payment Reminders",
          "Renewal Reminders",
          "Appointment Reminders",
          "Delivery Updates",
          "Service Notifications",
          "Customer Surveys",
          "Lead Qualification",
          "Promotional Communication",
        ],
      },
      {
        title: "Voice + Messaging",
        items: [
          "WhatsApp → Complex Query → Voice Agent",
          "RCS → Click-to-Call → Sales Agent",
          "SMS → Payment Reminder → Automated Voice Call",
          "Voice → WhatsApp Payment Link",
          "Voice → SMS Confirmation",
        ],
      },
    ],
    industries: [
      "Insurance",
      "Loans",
      "Automotive",
      "Real Estate",
      "Travel",
      "Healthcare",
      "High-value E-commerce",
    ],
    faqs: [
      {
        q: "Can Voice work with messaging channels?",
        a: "Yes. Move between WhatsApp, RCS, SMS and Voice so one conversation continues across channels.",
      },
      {
        q: "Do you support contact centre and IVR?",
        a: "Yes. Cloud contact centre, smart IVR, virtual numbers, dialer and analytics are part of the Voice stack.",
      },
    ],
    primaryCta: "Explore Voice",
    secondaryCta: "Talk to an Expert",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function allProductSlugs() {
  return products.map((p) => p.slug);
}
