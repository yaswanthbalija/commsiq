/**
 * Conversation scenarios rendered inside phone mockups.
 * One per industry / solution so every page shows messages its buyer would recognise.
 * Brands are fictional. No arrow glyphs anywhere in copy.
 */

export type ScenarioSkin = "sms" | "whatsapp" | "rcs";

export type ScenarioMessage =
  | {
      from: "biz";
      text: string;
      /** Bold title line above the text (rich card). */
      title?: string;
      /** Gradient media block above the text. */
      media?: "pink" | "blue" | "green";
      /** Quick-reply chips shown under the message. */
      chips?: readonly string[];
    }
  | { from: "user"; text: string };

export type Scenario = {
  skin: ScenarioSkin;
  business: string;
  subtitle: string;
  time: string;
  messages: readonly ScenarioMessage[];
};

export const scenarios: Record<string, Scenario> = {
  /* Homepage hero: short enough to fit a phone screen without scrolling. */
  hero: {
    skin: "whatsapp",
    business: "Acme Retail",
    subtitle: "Business account",
    time: "9:40",
    messages: [
      { from: "biz", media: "pink", text: "Hi Priya, your order #A1029 is confirmed. Arrives Tuesday." },
      { from: "biz", title: "Out for delivery", text: "Ravi is 3 stops away.", chips: ["Track order", "Change slot"] },
      { from: "user", text: "Can I change the slot?" },
    ],
  },

  /* ---------------- Industries ---------------- */
  bfsi: {
    skin: "sms",
    business: "NOVABK",
    subtitle: "Nova Bank",
    time: "Today 10:02",
    messages: [
      { from: "biz", text: "482913 is your OTP for Nova NetBanking login. Valid for 10 minutes. Never share it." },
      { from: "biz", text: "Rs 12,500 debited from a/c XX4821 at AMAZON on 21-Sep. Avl bal Rs 84,210. Not you? Call 1800 266 0000." },
      { from: "biz", text: "EMI of Rs 8,240 for loan XX1190 is due on 25-Sep. Pay now: nb.link/emi" },
      { from: "user", text: "PAID" },
    ],
  },
  government: {
    skin: "sms",
    business: "GOVSVC",
    subtitle: "Citizen Services",
    time: "Today 09:15",
    messages: [
      { from: "biz", text: "Your OTP for the e-Services portal is 559104. Do not share it with anyone." },
      { from: "biz", text: "Property tax for ID PT-2231 is due by 30-Sep. Pay online: gov.link/pt2231" },
      { from: "biz", text: "Your application 48812 has moved to Verification. Expected completion 5 working days." },
    ],
  },
  "retail-ecommerce": {
    skin: "whatsapp",
    business: "Acme Retail",
    subtitle: "Business account",
    time: "9:40",
    messages: [
      { from: "biz", media: "pink", text: "Hi Priya, your order #A1029 (Air Runner sneakers, Rs 7,999) is confirmed. Arrives Tuesday." },
      { from: "biz", title: "Out for delivery", text: "Your parcel is on the way with Ravi. Expected by 6 PM.", chips: ["Track order", "Change slot"] },
      { from: "user", text: "Can I change the delivery slot?" },
      { from: "biz", text: "Sure. Pick a slot: Today 6 to 9 PM, or Tomorrow 10 AM to 1 PM." },
    ],
  },
  gaming: {
    skin: "whatsapp",
    business: "Arena Play",
    subtitle: "Business account",
    time: "7:45",
    messages: [
      { from: "biz", media: "blue", text: "Your squad is set. Weekend Cup starts at 8 PM tonight." },
      { from: "biz", text: "Verification code 771204 for your Arena wallet. Valid 5 minutes." },
      { from: "user", text: "Remind me 15 minutes before" },
      { from: "biz", text: "Done. You will get a nudge at 7:45 PM with the lobby link." },
    ],
  },
  travel: {
    skin: "rcs",
    business: "SkyJet Airways",
    subtitle: "Verified business · RCS chat",
    time: "06:10",
    messages: [
      { from: "biz", media: "blue", title: "PNR 8X2K1Q confirmed", text: "DEL to BOM · 21 Sep · 09:45 departure · Seat 14A", chips: ["Web check-in", "Add baggage", "Select meal"] },
      { from: "biz", text: "Gate change: your flight SJ 204 now boards from Gate B12 at 09:05." },
      { from: "user", text: "Send boarding pass" },
      { from: "biz", title: "Boarding pass", text: "Priya Sharma · SJ 204 · 14A · Boarding 09:05 · Gate B12" },
    ],
  },
  automotive: {
    skin: "rcs",
    business: "Nova Motors",
    subtitle: "Verified business · RCS chat",
    time: "11:20",
    messages: [
      { from: "biz", media: "blue", title: "Nova EV · Book a test drive", text: "480 km range · Fast charge · From Rs 14.9L", chips: ["Book test drive", "Call showroom", "View offers"] },
      { from: "user", text: "Book test drive" },
      { from: "biz", text: "Saturday 11:00 at Nova Koramangala is confirmed. Rohan from Sales will call you 30 minutes before." },
      { from: "biz", text: "Service reminder: your Nova Sedan is due for its 20,000 km service. Book a slot: nova.link/svc" },
    ],
  },
  healthcare: {
    skin: "whatsapp",
    business: "CityCare Clinics",
    subtitle: "Business account",
    time: "8:30",
    messages: [
      { from: "biz", text: "Your appointment with Dr. Meera Rao (Cardiology) is confirmed for Tue 10:30 AM, Indiranagar branch." },
      { from: "biz", title: "Lab report ready", text: "Your Lipid Profile report is available.", chips: ["View report", "Book follow-up"] },
      { from: "user", text: "Can I move the appointment to Wednesday?" },
      { from: "biz", text: "Wednesday slots with Dr. Rao: 9:00 AM, 11:30 AM, 4:00 PM. Reply with a time to confirm." },
    ],
  },
  education: {
    skin: "whatsapp",
    business: "Greenwood School",
    subtitle: "Business account",
    time: "7:55",
    messages: [
      { from: "biz", text: "Reminder: Term 2 fee of Rs 42,000 for Aarav (Grade 6B) is due on 30-Sep. Pay: gw.link/fee" },
      { from: "biz", text: "Parent-teacher meeting on Saturday, 9:00 AM. Please confirm attendance.", chips: ["Attending", "Cannot attend"] },
      { from: "user", text: "Attending" },
      { from: "biz", text: "Thank you. Aarav scored 92% in the mid-term assessment. Report card attached in the parent portal." },
    ],
  },
  edtech: {
    skin: "whatsapp",
    business: "LearnLoop",
    subtitle: "Business account",
    time: "6:45",
    messages: [
      { from: "biz", media: "pink", text: "Welcome, Ananya. Your Data Science cohort starts Monday. Here is your onboarding kit." },
      { from: "biz", text: "Live class with Prof. Iyer starts in 15 minutes. Join from the app.", chips: ["Join class", "Set reminder"] },
      { from: "user", text: "Set reminder" },
      { from: "biz", text: "Reminder set. You have completed 64% of Module 3. Keep going." },
    ],
  },
  logistics: {
    skin: "sms",
    business: "SWIFTX",
    subtitle: "SwiftX Logistics",
    time: "Today 08:12",
    messages: [
      { from: "biz", text: "Shipment SX88213 picked up. Expected delivery 21-Sep by 7 PM. Track: sx.link/88213" },
      { from: "biz", text: "Your delivery partner Ravi is 3 stops away. Share OTP 4471 only at your door." },
      { from: "user", text: "Leave with security" },
      { from: "biz", text: "Noted. Package will be handed to building security and a photo proof shared with you." },
    ],
  },

  /* ---------------- Outcome solutions ---------------- */
  "customer-acquisition": {
    skin: "whatsapp",
    business: "Acme Retail",
    subtitle: "Business account",
    time: "5:10",
    messages: [
      { from: "biz", media: "pink", title: "Welcome offer", text: "Hi Priya, thanks for signing up. Get 20% off your first order with code HELLO20." },
      { from: "user", text: "What is the delivery time to Pune?" },
      { from: "biz", text: "Two working days to Pune. Free shipping on your first order." },
      { from: "biz", text: "Your verification code is 648120. It expires in 5 minutes." },
    ],
  },
  "acquisition-activation": {
    skin: "whatsapp",
    business: "Acme Retail",
    subtitle: "Business account",
    time: "5:10",
    messages: [
      { from: "biz", media: "pink", title: "Welcome offer", text: "Hi Priya, thanks for signing up. Get 20% off your first order with code HELLO20." },
      { from: "user", text: "What is the delivery time to Pune?" },
      { from: "biz", text: "Two working days to Pune. Free shipping on your first order." },
      { from: "biz", text: "Your verification code is 648120. It expires in 5 minutes." },
    ],
  },
  "transactional-communication": {
    skin: "sms",
    business: "NOVABK",
    subtitle: "Nova Bank",
    time: "Today 10:02",
    messages: [
      { from: "biz", text: "482913 is your OTP for Nova NetBanking login. Valid for 10 minutes. Never share it." },
      { from: "biz", text: "Rs 4,250 paid to Acme Retail via UPI. Ref 88213A. Avl bal Rs 84,210." },
      { from: "biz", text: "Order #A1029 is out for delivery. Track: cq.link/a1029" },
    ],
  },
  "transactional-messaging": {
    skin: "sms",
    business: "NOVABK",
    subtitle: "Nova Bank",
    time: "Today 10:02",
    messages: [
      { from: "biz", text: "482913 is your OTP for Nova NetBanking login. Valid for 10 minutes. Never share it." },
      { from: "biz", text: "Rs 4,250 paid to Acme Retail via UPI. Ref 88213A. Avl bal Rs 84,210." },
      { from: "biz", text: "Order #A1029 is out for delivery. Track: cq.link/a1029" },
    ],
  },
  "customer-engagement": {
    skin: "rcs",
    business: "Acme Retail",
    subtitle: "Verified business · RCS chat",
    time: "12:30",
    messages: [
      { from: "biz", media: "pink", title: "Festive Sale is live", text: "Up to 40% off on sneakers. Members get early access today.", chips: ["Shop sneakers", "View wishlist", "My offers"] },
      { from: "user", text: "View wishlist" },
      { from: "biz", title: "Air Runner · Rs 7,999", text: "Back in stock in your size (UK 8). Price drops to Rs 5,999 today.", chips: ["Buy now", "Notify me"] },
    ],
  },
  "engagement-retention": {
    skin: "rcs",
    business: "Acme Retail",
    subtitle: "Verified business · RCS chat",
    time: "12:30",
    messages: [
      { from: "biz", media: "pink", title: "Festive Sale is live", text: "Up to 40% off on sneakers. Members get early access today.", chips: ["Shop sneakers", "View wishlist", "My offers"] },
      { from: "user", text: "View wishlist" },
      { from: "biz", title: "Air Runner · Rs 7,999", text: "Back in stock in your size (UK 8). Price drops to Rs 5,999 today.", chips: ["Buy now", "Notify me"] },
    ],
  },
  "customer-support": {
    skin: "whatsapp",
    business: "Acme Support",
    subtitle: "Business account",
    time: "3:12",
    messages: [
      { from: "user", text: "My order #A1029 arrived damaged" },
      { from: "biz", text: "Sorry about that, Priya. I can arrange a replacement or a refund. Which do you prefer?", chips: ["Replacement", "Refund", "Talk to agent"] },
      { from: "user", text: "Talk to agent" },
      { from: "biz", text: "Connecting you to Rohan from Returns. He has your order details and photos already." },
    ],
  },
  "customer-support-and-experience": {
    skin: "whatsapp",
    business: "Acme Support",
    subtitle: "Business account",
    time: "3:12",
    messages: [
      { from: "user", text: "My order #A1029 arrived damaged" },
      { from: "biz", text: "Sorry about that, Priya. I can arrange a replacement or a refund. Which do you prefer?", chips: ["Replacement", "Refund", "Talk to agent"] },
      { from: "user", text: "Talk to agent" },
      { from: "biz", text: "Connecting you to Rohan from Returns. He has your order details and photos already." },
    ],
  },
  "retention-reactivation": {
    skin: "whatsapp",
    business: "Acme Retail",
    subtitle: "Business account",
    time: "6:00",
    messages: [
      { from: "biz", media: "green", title: "We miss you, Priya", text: "It has been 90 days. Here is Rs 500 off your next order, valid for 7 days." },
      { from: "user", text: "Is the Air Runner still available in UK 8?" },
      { from: "biz", text: "Yes, 3 left in UK 8. Your Rs 500 voucher is applied at checkout.", chips: ["Buy now", "Save for later"] },
    ],
  },
  "performance-marketing": {
    skin: "rcs",
    business: "Acme Retail",
    subtitle: "Verified business · RCS chat",
    time: "10:05",
    messages: [
      { from: "biz", media: "blue", title: "You viewed Air Runner", text: "Still thinking? Get free express shipping if you order in the next 2 hours.", chips: ["Complete order", "See similar"] },
      { from: "user", text: "Complete order" },
      { from: "biz", text: "Order #A1042 placed. Rs 7,999 paid via UPI. Delivery on Tuesday." },
    ],
  },
};

export function getScenario(slug: string): Scenario | null {
  return scenarios[slug] ?? null;
}
