export type NavLink = { label: string; href: string; description?: string };

export type NavGroup = {
  label: string;
  href?: string;
  highlight?: boolean;
  columns: { title: string; links: NavLink[] }[];
};

export const productLinks: NavLink[] = [
  { label: "SMS", href: "/products/sms", description: "Reliable messaging built for scale" },
  {
    label: "WhatsApp Business",
    href: "/products/whatsapp",
    description: "Turn messages into conversations",
  },
  {
    label: "RCS Business Messaging",
    href: "/products/rcs",
    description: "App-like experiences in the inbox",
  },
  { label: "Voice", href: "/products/voice", description: "Intelligent cloud telephony" },
];

export const platformLinks: NavLink[] = [
  {
    label: "Omnichannel Communication",
    href: "/platform/omnichannel",
    description: "One connected experience across channels",
  },
  {
    label: "Journey Orchestration",
    href: "/platform/journey-orchestration",
    description: "Turn interactions into journeys",
  },
  {
    label: "APIs & Integrations",
    href: "/platform/apis-integrations",
    description: "Communication built into your business",
  },
  {
    label: "Analytics & Insights",
    href: "/platform/analytics-insights",
    description: "Delivery, engagement and outcomes",
  },
];

export const solutionLinks: NavLink[] = [
  { label: "Customer Acquisition", href: "/solutions/customer-acquisition" },
  { label: "Transactional Communication", href: "/solutions/transactional-communication" },
  { label: "Customer Engagement", href: "/solutions/customer-engagement" },
  { label: "Customer Support", href: "/solutions/customer-support" },
  { label: "Retention & Reactivation", href: "/solutions/retention-reactivation" },
];

export const industryLinks: NavLink[] = [
  { label: "BFSI", href: "/industry-solutions/bfsi" },
  { label: "Retail & E-commerce", href: "/industry-solutions/retail-ecommerce" },
  { label: "Travel & Hospitality", href: "/industry-solutions/travel" },
  { label: "Automotive", href: "/industry-solutions/automotive" },
  { label: "Healthcare", href: "/industry-solutions/healthcare" },
  { label: "Education", href: "/industry-solutions/education" },
  { label: "Logistics & Mobility", href: "/industry-solutions/logistics" },
];

export const growthStackLinks: NavLink[] = [
  {
    label: "Audience Intelligence",
    href: "/growth-stack/audience-intelligence",
    description: "Discover who to reach",
  },
  {
    label: "Programmatic Advertising",
    href: "/growth-stack/programmatic-advertising",
    description: "Display, video, OTT and CTV",
  },
  {
    label: "Intelligent Communication",
    href: "/growth-stack/engage",
    description: "SMS, WhatsApp and RCS",
  },
  {
    label: "Voice & Human Interaction",
    href: "/growth-stack/converse",
    description: "Voice, IVR and Click-to-Call",
  },
  {
    label: "Business Outcomes",
    href: "/growth-stack/convert",
    description: "Lead, booking, purchase",
  },
  {
    label: "Full-Funnel Growth",
    href: "/growth-stack",
    description: "From impression to conversion",
  },
];

export const developerLinks: NavLink[] = [
  { label: "API Documentation", href: "/developers", description: "Build with commsIQ APIs" },
  {
    label: "Integrations",
    href: "/platform/apis-integrations",
    description: "CRM, apps and workflows",
  },
];

export const companyLinks: NavLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Partners", href: "/partners/become-a-partner" },
  { label: "Contact Us", href: "/#contact" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Partners", href: "/partners/become-a-partner" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-and-conditions" },
];

export const megaMenus: NavGroup[] = [
  {
    label: "Products",
    columns: [{ title: "Channels", links: productLinks }],
  },
  {
    label: "Platform",
    columns: [{ title: "Platform", links: platformLinks }],
  },
  {
    label: "Solutions",
    columns: [{ title: "Outcomes", links: solutionLinks }],
  },
  {
    label: "Industries",
    columns: [{ title: "Industries", links: industryLinks }],
  },
  {
    label: "Growth Stack",
    href: "/growth-stack",
    columns: [{ title: "Growth Stack", links: growthStackLinks }],
  },
  {
    label: "Developers",
    columns: [{ title: "Developers", links: developerLinks }],
  },
  {
    label: "Company",
    columns: [{ title: "Company", links: companyLinks }],
  },
];
