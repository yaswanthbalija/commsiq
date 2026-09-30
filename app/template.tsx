import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounts per navigation so every page gets an entrance transition. */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
