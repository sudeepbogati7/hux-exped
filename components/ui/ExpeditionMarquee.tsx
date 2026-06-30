import ExpeditionCard from "@/components/ui/ExpeditionCard";
import type { Trek } from "@/lib/data";

/**
 * Seamless right-to-left carousel of expedition cards. The base set is repeated
 * enough to exceed the viewport, then duplicated once more so the -50% loop is
 * gap-free. Pauses on hover; edges fade via a mask.
 */
export default function ExpeditionMarquee({ items }: { items: Trek[] }) {
  if (!items.length) return null;

  const reps = Math.max(1, Math.ceil(6 / items.length));
  const base = Array.from({ length: reps }, () => items).flat();
  const loop = [...base, ...base];
  const duration = `${Math.max(48, base.length * 9)}s`;

  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]">
      <div
        className="marquee-track flex w-max gap-5 sm:gap-6"
        style={{ animationDuration: duration }}
      >
        {loop.map((item, i) => (
          <div
            key={`${item.slug}-${i}`}
            className="w-[84vw] max-w-[23rem] shrink-0 sm:w-[23rem]"
            aria-hidden={i >= base.length}
          >
            <ExpeditionCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
