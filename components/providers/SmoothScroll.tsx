/**
 * Smooth scrolling (Lenis) is disabled for now — this is a passthrough so the
 * app uses native scrolling. GSAP ScrollTrigger works fine on native scroll.
 * To re-enable, restore the Lenis implementation from git history.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
