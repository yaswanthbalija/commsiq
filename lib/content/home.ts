export const hero = {
  headline: "Powering Intelligent Customer Conversations.",
  subheadline:
    "One communication ecosystem. Every customer conversation. Connect with customers across SMS, WhatsApp, RCS and Voice through an intelligent communication platform designed to power conversations across the entire customer lifecycle.",
  primaryCta: { label: "Talk to CPaaS expert", action: "expert" as const },
  secondaryCta: { label: "Request a Demo", action: "demo" as const },
} as const;

export const channelCards = [
  {
    title: "SMS",
    href: "/products/sms",
    body: "Reliable and scalable messaging for transactional and promotional communication.",
    image: "/brand/products/sms.jpg",
    imageAlt: "Enterprise SMS messaging",
  },
  {
    title: "WhatsApp",
    href: "/products/whatsapp",
    body: "Build rich, personalised and conversational customer experiences.",
    image: "/brand/products/whatsapp.jpg",
    imageAlt: "WhatsApp business conversations",
  },
  {
    title: "RCS",
    href: "/products/rcs",
    body: "Transform messaging into interactive, app-like branded experiences.",
    image: "/brand/products/rcs.jpg",
    imageAlt: "Rich RCS messaging",
  },
  {
    title: "Voice",
    href: "/products/voice",
    body: "Bring automation and human conversations together through intelligent cloud telephony.",
    image: "/brand/products/voice.jpg",
    imageAlt: "Cloud voice and telephony",
  },
] as const;

export const platformPillars = {
  headline: "One Platform. Multiple Channels. Connected Conversations.",
  lead: "Customers do not think in channels. Neither should your communication strategy.",
  body: "commsIQ enables businesses to connect communication across SMS, WhatsApp, RCS and Voice, creating seamless journeys that move customers from one interaction to the next.",
  pillars: [
    {
      title: "Reach",
      body: "Deliver mission-critical and promotional communication at scale.",
    },
    {
      title: "Engage",
      body: "Create personalised and interactive customer experiences.",
    },
    {
      title: "Converse",
      body: "Move from one-way communication to meaningful two-way conversations.",
    },
    {
      title: "Convert",
      body: "Turn interactions into enquiries, transactions and measurable business outcomes.",
    },
  ],
} as const;

export const journeyStory = {
  headline: "From Communication to Conversation",
  subhead: "Make every interaction part of a journey.",
  body: "A customer may discover an offer through RCS, continue the conversation on WhatsApp and eventually need to speak with an agent. commsIQ connects these moments.",
  steps: [
    {
      channel: "SMS / RCS",
      label: "Customer receives personalised communication",
    },
    {
      channel: "WhatsApp",
      label: "Customer explores the offer or begins an interaction",
    },
    {
      channel: "Voice",
      label: "High-intent customer connects with an agent",
    },
    {
      channel: "Conversion",
      label: "Application | Booking | Purchase | Resolution",
    },
    {
      channel: "SMS / WhatsApp",
      label: "Confirmation and ongoing engagement",
    },
  ],
  closing: "One customer. One connected journey.",
} as const;

export const lifecycle = {
  headline: "Built for the Complete Customer Lifecycle",
  stages: [
    {
      title: "Acquire",
      items: ["Promotional SMS", "WhatsApp Marketing", "RCS Campaigns", "Outbound Voice"],
    },
    {
      title: "Activate",
      items: ["OTP", "Authentication", "Welcome Journeys", "Customer Onboarding"],
    },
    {
      title: "Engage",
      items: [
        "Personalised Communication",
        "Rich Media",
        "Conversational Journeys",
        "Interactive Campaigns",
      ],
    },
    {
      title: "Support",
      items: ["WhatsApp Support", "Cloud Contact Centre", "IVR", "Live Agent"],
    },
    {
      title: "Retain",
      items: ["Renewal Reminders", "Cross-sell & Upsell", "Feedback", "Reactivation"],
    },
  ],
  flow: "Acquire → Activate → Engage → Support → Retain",
} as const;

export const whyCommsiq = {
  headline: "Why commsIQ?",
  subhead: "More than communication infrastructure.",
  points: [
    {
      title: "Omnichannel by Design",
      body: "Bring SMS, WhatsApp, RCS and Voice together within one communication ecosystem.",
    },
    {
      title: "Journey-Led Engagement",
      body: "Connect customer interactions instead of running isolated channel campaigns.",
    },
    {
      title: "Built for Conversations",
      body: "Move seamlessly from automated communication to rich messaging and human interaction.",
    },
    {
      title: "API-First",
      body: "Integrate communication capabilities into your CRM, applications, websites and business workflows.",
    },
    {
      title: "Intelligent Automation",
      body: "Trigger communication based on customer actions and business events.",
    },
    {
      title: "Analytics & Insights",
      body: "Understand delivery, engagement and customer actions across campaigns.",
    },
    {
      title: "Enterprise Ready",
      body: "Designed for high-volume, secure and scalable customer communication.",
    },
  ],
} as const;

export const growthTeaser = {
  eyebrow: "Looking Beyond Customer Communication?",
  headline: "Discover the commsIQ Growth Stack.",
  body: "Extend commsIQ beyond communication and connect Audience Intelligence, Programmatic Advertising, Messaging and Voice into one full-funnel customer growth ecosystem.",
  line: "From Impression to Interaction to Conversion.",
  cta: { label: "Explore Growth Stack", href: "/growth-stack" },
} as const;

/** Sticky scroll offerings: channels → Omnichannel → Growth Stack */
export const platformOfferings = [
  {
    title: "SMS",
    description:
      "Reliable and scalable messaging for transactional and promotional communication. From authentication and alerts to acquisition and engagement, SMS reaches customers instantly at enterprise scale.",
    href: "/products/sms",
    icon: "sms",
    image: "/brand/products/sms.jpg",
    imageAlt: "Enterprise SMS and OTP delivery",
  },
  {
    title: "WhatsApp Business",
    description:
      "Build rich, personalised and conversational customer experiences across marketing, utility, authentication, commerce and support, connecting automation with live engagement.",
    href: "/products/whatsapp",
    icon: "whatsapp",
    image: "/brand/products/whatsapp.jpg",
    imageAlt: "WhatsApp business conversation",
  },
  {
    title: "RCS Business Messaging",
    description:
      "Transform traditional mobile messaging into rich, interactive and branded customer experiences with media, carousels, suggested actions and verified brand presence.",
    href: "/products/rcs",
    icon: "rcs",
    image: "/brand/products/rcs.jpg",
    imageAlt: "Rich RCS messaging experience",
  },
  {
    title: "Voice",
    description:
      "Intelligent cloud communication for conversations that need the human touch. Automate, manage and optimise sales, service and support across IVR, contact centre and click-to-call.",
    href: "/products/voice",
    icon: "voice",
    image: "/brand/products/voice.jpg",
    imageAlt: "Cloud telephony and voice engagement",
  },
  {
    title: "Omnichannel Communication",
    description:
      "Communication becomes more powerful when channels work together. Connect SMS, WhatsApp, RCS and Voice so customers can start anywhere and continue everywhere.",
    href: "/platform/omnichannel",
    icon: "middleware",
    image: "/brand/products/middleware.jpg",
    imageAlt: "Omnichannel connected conversations",
  },
  {
    title: "Growth Stack",
    description:
      "From communication to customer growth. Connect Audience Intelligence, Programmatic Advertising, Messaging and Voice into one full-funnel journey from impression to conversion.",
    href: "/growth-stack",
    icon: "intel",
    image: "/brand/products/intel.jpg",
    imageAlt: "commsIQ Growth Stack full-funnel growth",
  },
] as const;

export const about = {
  headline: "Empowering Modern Brands to Connect, Engage, Converse, and Convert.",
  narrative: [
    "From OTPs and transactional alerts to rich RCS experiences, WhatsApp conversations and intelligent voice interactions, commsIQ helps businesses communicate at scale while creating connected customer experiences.",
    "Our communication ecosystem brings together SMS, WhatsApp, RCS and Voice, enabling businesses to move beyond fragmented communication and build connected customer experiences.",
    "From critical transactional communication to customer acquisition, engagement, support and retention, commsIQ helps enterprises create conversations that move customers and businesses forward.",
  ],
  differentiators: [
    {
      eyebrow: "Connect",
      title: "Reach every customer on the channel they trust",
      body: "Unify SMS, WhatsApp, RCS and Voice so acquisition and alerts land fast across the customer journey.",
      image: "/brand/products/whatsapp.jpg",
      imageAlt: "Customer messaging across WhatsApp and mobile channels",
      channels: ["SMS", "WhatsApp", "RCS", "Voice"],
      metric: { value: "4", label: "Core channels" },
      highlight: "One ecosystem for every conversation",
    },
    {
      eyebrow: "Engage",
      title: "Turn interactions into connected journeys",
      body: "Move customers from one-way blasts to personalised, interactive experiences that feel continuous across channels.",
      image: "/brand/products/rcs.jpg",
      imageAlt: "Rich messaging and conversational engagement",
      channels: ["Journeys", "Automation", "Rich Media", "APIs"],
      metric: { value: "1", label: "Connected journey" },
      highlight: "Journey-led engagement by design",
    },
    {
      eyebrow: "Convert",
      title: "Close the loop with conversation and outcome",
      body: "Escalate high-intent moments to Voice, complete actions digitally, and keep customers engaged after conversion.",
      image: "/brand/products/voice.jpg",
      imageAlt: "Voice and conversion conversations",
      channels: ["Voice", "Click-to-Call", "Support", "Retain"],
      metric: { value: "∞", label: "Lifecycle coverage" },
      highlight: "Connect. Engage. Converse. Convert.",
    },
  ],
} as const;

export const peopleTiles = [
  {
    title: "Mission-critical communication",
    body: "Deliver OTPs, alerts and transactional messages with the reliability enterprises expect, then connect those moments into broader customer journeys.",
    bodyHtml:
      "Deliver <strong>OTPs, alerts and transactional messages</strong> with the reliability enterprises expect, then connect those moments into broader customer journeys.",
    image: "/brand/people/tile-1.jpg",
    imageAlt: "Professional engaging on a mobile device",
    variant: "circles" as const,
  },
  {
    title: "Omnichannel that converses",
    body: "SMS, WhatsApp, RCS and Voice working together so customers can start on one channel and continue on another without losing context.",
    bodyHtml:
      "We bring to life strategies across <strong>SMS, WhatsApp, RCS and Voice</strong> so customers can start on one channel and continue on another without losing context.",
    image: "/brand/people/tile-2.jpg",
    imageAlt: "Customer connecting through digital channels",
    variant: "channels" as const,
  },
  {
    title: "Built for every lifecycle stage",
    body: "From acquisition and activation to engagement, support and retention, commsIQ helps businesses communicate with purpose and measurable outcomes.",
    bodyHtml:
      "From <strong>acquisition and activation to engagement, support and retention</strong>, commsIQ helps businesses communicate with purpose and measurable outcomes.",
    image: "/brand/people/tile-3.jpg",
    imageAlt: "Enterprise leader reviewing communications on a mobile device",
    variant: "wave" as const,
  },
] as const;

export const trustStats = [
  {
    value: 4,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Core Channels",
  },
  {
    value: 1,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Connected Ecosystem",
  },
  {
    value: 5,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Lifecycle Stages",
  },
  {
    value: 24,
    decimals: 0,
    prefix: "",
    suffix: "×7",
    label: "Conversation Ready",
  },
] as const;

export const brandLogos = [
  { file: "aadhaar.webp", name: "Aadhaar" },
  { file: "cipla.webp", name: "Cipla" },
  { file: "bse.webp", name: "BSE" },
  { file: "axis.webp", name: "Axis Bank" },
  { file: "amazon.webp", name: "Amazon" },
  { file: "flipkart.webp", name: "Flipkart" },
  { file: "icici.webp", name: "ICICI Bank" },
  { file: "sbi.webp", name: "SBI" },
  { file: "samsung.webp", name: "Samsung" },
  { file: "zepto.webp", name: "Zepto" },
  { file: "paytm.webp", name: "Paytm" },
  { file: "tata.webp", name: "Tata Motors" },
] as const;

export const products = [
  {
    slug: "sms",
    title: "SMS",
    subtitle: "Reliable Messaging. Built for Scale.",
    href: "/products/sms",
    description:
      "Reach every customer at every critical moment with transactional and promotional SMS.",
    points: [
      "OTP, authentication and mission-critical alerts.",
      "Promotional campaigns that turn reach into engagement.",
      "Connect SMS into WhatsApp, Voice and conversion journeys.",
    ],
  },
  {
    slug: "whatsapp",
    title: "WhatsApp Business",
    subtitle: "Turn Messages Into Conversations.",
    href: "/products/whatsapp",
    description:
      "Marketing, utility, authentication, commerce and support on WhatsApp.",
    points: [
      "Rich conversational experiences with media and automation.",
      "Live agent handover when conversations need a human.",
      "Discover → Engage → Converse → Convert.",
    ],
  },
  {
    slug: "rcs",
    title: "RCS Business Messaging",
    subtitle: "Messaging. Reimagined.",
    href: "/products/rcs",
    description: "Bring app-like experiences into the customer's messaging inbox.",
    points: [
      "Rich media, carousels and interactive CTAs.",
      "Verified brand experience in the native inbox.",
      "Turn engagement into action with click-to-call and conversion.",
    ],
  },
  {
    slug: "voice",
    title: "Voice",
    subtitle: "Give Every Customer Conversation a Voice.",
    href: "/products/voice",
    description: "Intelligent cloud communication for conversations that need the human touch.",
    points: [
      "Cloud contact centre, smart IVR and click-to-call.",
      "Automated outbound, number masking and analytics.",
      "Voice + messaging for one continuous conversation.",
    ],
  },
] as const;

export const industries = [
  {
    name: "BFSI",
    shortName: "BFSI",
    channels: "SMS + WhatsApp + Voice",
    useCase: "OTP, alerts, acquisition, collections and support",
    description:
      "OTP and authentication, transaction alerts, payment reminders, credit and loan engagement, collections and customer support.",
    href: "/industry-solutions/bfsi",
  },
  {
    name: "Retail & E-commerce",
    shortName: "Retail",
    channels: "RCS + WhatsApp + SMS",
    useCase: "Offers, discovery, orders and conversational commerce",
    description:
      "Offers, product discovery, order confirmation, delivery updates, conversational commerce, abandoned cart and support.",
    href: "/industry-solutions/retail-ecommerce",
  },
  {
    name: "Travel & Hospitality",
    shortName: "Travel",
    channels: "WhatsApp + Voice + SMS",
    useCase: "Bookings, updates, offers and assistance",
    description:
      "Booking confirmations, travel updates, offers, customer assistance, voice support, feedback and loyalty.",
    href: "/industry-solutions/travel",
  },
  {
    name: "Automotive",
    shortName: "Auto",
    channels: "RCS + Voice + WhatsApp",
    useCase: "Leads, discovery, test drives and service",
    description:
      "Lead generation, vehicle discovery, test drive booking, dealer connectivity, service reminders and engagement.",
    href: "/industry-solutions/automotive",
  },
  {
    name: "Healthcare",
    shortName: "Health",
    channels: "SMS + WhatsApp",
    useCase: "Appointments, notifications and support",
    description:
      "Appointment reminders, patient communication, customer support, notifications and feedback.",
    href: "/industry-solutions/healthcare",
  },
  {
    name: "Education",
    shortName: "Edu",
    channels: "WhatsApp + SMS + Voice",
    useCase: "Admissions, nurturing and fee reminders",
    description:
      "Admissions, lead nurturing, counselling, fee reminders and student communication.",
    href: "/industry-solutions/education",
  },
  {
    name: "Logistics & Mobility",
    shortName: "Logistics",
    channels: "Voice + SMS + WhatsApp",
    useCase: "Delivery, masking and service updates",
    description:
      "Delivery communication, number masking, driver-customer communication and service notifications.",
    href: "/industry-solutions/logistics",
  },
] as const;

export const contactCopy = {
  headline: "Let's Start a Conversation.",
  body: "Whether you are looking for enterprise communication infrastructure or a complete customer growth solution, our team can help you build the right approach.",
  cta: "Talk to CPaaS expert",
  brandLine: "CommsIQ by Mediacorn Digital",
  domain: "www.commsiqdigital.com",
  channels: [
    "SMS",
    "WhatsApp Business",
    "RCS Business Messaging",
    "Voice",
    "Omnichannel Communication",
    "APIs & Integrations",
    "commsIQ Growth Stack",
    "Programmatic Advertising",
  ] as const,
} as const;

/** Legacy-compatible exports used by leftover section files */
export const solutions = [
  {
    title: "Omnichannel Communication",
    body: "Connect SMS, WhatsApp, RCS and Voice to create consistent customer experiences throughout the lifecycle.",
    points: [
      "Start anywhere. Continue everywhere.",
      "SMS to WhatsApp, RCS to Voice, Voice to WhatsApp.",
      "One customer. Multiple channels. One connected experience.",
    ],
  },
  {
    title: "Journey Orchestration",
    body: "Design communication journeys based on customer behaviour, responses and business rules.",
    points: [
      "Trigger on actions, events and CRM updates.",
      "Decide with context, stage and business rules.",
      "Engage across SMS, WhatsApp, RCS and Voice.",
    ],
  },
] as const;

export const statsPanels = peopleTiles.map((t) => ({
  title: t.title,
  body: t.body,
  highlight: t.title,
}));

export const tabGroups = {
  useCases: [
    { label: "Customer Acquisition", href: "/solutions/customer-acquisition" },
    { label: "Transactional Communication", href: "/solutions/transactional-communication" },
    { label: "Customer Engagement", href: "/solutions/customer-engagement" },
    { label: "Customer Support", href: "/solutions/customer-support" },
    { label: "Retention & Reactivation", href: "/solutions/retention-reactivation" },
  ],
  industries: industries.map((i) => ({ label: i.name, href: i.href })),
  channels: [
    { label: "SMS", href: "/products/sms" },
    { label: "WhatsApp", href: "/products/whatsapp" },
    { label: "RCS", href: "/products/rcs" },
    { label: "Voice", href: "/products/voice" },
  ],
};

export const outcomes: Array<{
  title: string;
  body: string;
  metric: string;
  metricLabel: string;
  proof: string;
  href: string;
}> = [];

export const departments: Array<{ title: string; body: string }> = [];

export const partnerships = [
  "Meta Business Partner",
  "Carrier-Grade Connectivity",
  "DLT / TRAI Aligned",
  "Enterprise Ready",
] as const;
