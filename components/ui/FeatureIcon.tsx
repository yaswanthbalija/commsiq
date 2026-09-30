import { createElement, type ComponentType } from "react";
import {
  IconApi,
  IconBrandWhatsapp,
  IconChartBar,
  IconClick,
  IconCloud,
  IconDatabase,
  IconDeviceMobile,
  IconDeviceMobileMessage,
  IconHeadset,
  IconLock,
  IconMail,
  IconMessage,
  IconMessages,
  IconNetwork,
  IconPhone,
  IconPhoneCall,
  IconRobot,
  IconRoute,
  IconSend,
  IconShieldLock,
  IconSpeakerphone,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";

type IconComp = ComponentType<{ size?: number; stroke?: number; className?: string }>;

const byKeyword: { match: RegExp; icon: IconComp }[] = [
  { match: /whatsapp/i, icon: IconBrandWhatsapp },
  { match: /rcs|rich media|carousel|gif|verified brand/i, icon: IconVideo },
  { match: /sms|otp|transactional sms|promotional sms|sender/i, icon: IconDeviceMobileMessage },
  { match: /ivr|contact centre|softphone|headset|dialer|outbound call|voice/i, icon: IconHeadset },
  { match: /click.?to.?call|virtual number|toll.?free|number masking|masking/i, icon: IconPhoneCall },
  { match: /api|integrat|crm|webhook/i, icon: IconApi },
  { match: /auth|secure|verification|shield|lock/i, icon: IconShieldLock },
  { match: /analytics|report|monitor|performance|insight/i, icon: IconChartBar },
  { match: /campaign|promo|offer|launch|acquisition|seasonal|reactivation|lead gen/i, icon: IconSpeakerphone },
  { match: /automation|trigger|robot|chatbot|flow|automated/i, icon: IconRobot },
  { match: /route|journey|omnichannel|connect|network|middleware/i, icon: IconRoute },
  { match: /audience|user|customer support|agent|team|live agent/i, icon: IconUsers },
  { match: /database|cohort|intelligence|data/i, icon: IconDatabase },
  { match: /cloud/i, icon: IconCloud },
  { match: /mobile|device/i, icon: IconDeviceMobile },
  { match: /mail|email|notification|alert|reminder/i, icon: IconMail },
  { match: /send|delivery|order update|payment|confirm/i, icon: IconSend },
  { match: /click|cta|shop now|book now|action/i, icon: IconClick },
  { match: /support|query|faq|enquiry/i, icon: IconMessages },
  { match: /privacy/i, icon: IconLock },
  { match: /phone|call/i, icon: IconPhone },
  { match: /message|chat|convers/i, icon: IconMessage },
];

const fallbacks: IconComp[] = [
  IconMessage,
  IconSend,
  IconNetwork,
  IconCloud,
  IconChartBar,
  IconApi,
];

function pickIcon(label: string, index: number): IconComp {
  for (const row of byKeyword) {
    if (row.match.test(label)) return row.icon;
  }
  return fallbacks[index % fallbacks.length];
}

type Props = {
  label: string;
  index?: number;
  size?: number;
};

/** Tabler Icons — open-source symbols mapped to messaging / voice / data labels. */
export function FeatureIcon({ label, index = 0, size = 36 }: Props) {
  return (
    <span
      aria-hidden
      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ciq-mist)] text-[var(--ciq-pink)]"
    >
      {createElement(pickIcon(label, index), { size, stroke: 1.6 })}
    </span>
  );
}
