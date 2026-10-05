import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Animation = gsap.core.Tween | gsap.core.Timeline;

/**
 * Scroll-bound entrance with hysteresis.
 *
 * - Plays when `el` reaches `start`, whether the user arrives from above or below.
 * - Never reverses while `el` is visible. The animation resets only once `el`
 *   is fully off-screen, so slow back-and-forth scrolling near the threshold
 *   does not flicker, and the entrance replays on every pass.
 */
export function bindReveal(animation: Animation, el: Element, start = "top 85%") {
  const reset = () => animation.pause(0);
  const play = () => animation.play();

  ScrollTrigger.create({
    trigger: el,
    start,
    end: "bottom top",
    onEnter: play,
    onEnterBack: play,
    onLeave: reset,
  });

  ScrollTrigger.create({
    trigger: el,
    start: "top bottom",
    end: "bottom top",
    onLeaveBack: reset,
  });
}
