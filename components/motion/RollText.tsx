/**
 * Button label that rolls up on hover (the second copy slides in from below).
 * Pure CSS via `.btn-roll`; safe in server components.
 */
export function RollText({ children }: { children: string }) {
  return (
    <span className="btn-roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}
