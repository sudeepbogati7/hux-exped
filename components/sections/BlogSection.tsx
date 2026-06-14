import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/icons";
import { blogPosts } from "@/lib/data";

/** Landing "Latest stories" — one featured post + a compact list, links to /blog. */
export default function BlogSection() {
  const [featured, ...rest] = blogPosts;
  const side = rest.slice(0, 3);

  return (
    <section id="journal" className="bg-cream-deep py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* header */}
        <div className="mb-12 flex items-end justify-between gap-6">
          <Reveal variant="up">
            <p className="eyebrow mb-4">From the journal</p>
            <h2 className="display text-5xl text-ink sm:text-6xl lg:text-7xl">
              Stories from <span className="text-coral">the trail</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" className="hidden shrink-0 sm:block">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              View all blog
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* featured */}
          <Reveal variant="up">
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block h-full min-h-[24rem] overflow-hidden rounded-3xl sm:min-h-[28rem]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <span className="inline-flex rounded-full bg-coral px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream">
                  {featured.category}
                </span>
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
                  {featured.date} · {featured.readTime}
                </p>
                <h3 className="display mt-2 text-2xl leading-tight text-cream sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/75 line-clamp-2">
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>

          {/* side list */}
          <div className="flex flex-col">
            {side.map((post, i) => (
              <Reveal key={post.slug} variant="up" delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-5 border-b border-line py-5 first:pt-0"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      {post.date}
                    </p>
                    <h4 className="display mt-1.5 text-lg leading-tight text-ink transition-colors group-hover:text-coral sm:text-xl">
                      {post.title}
                    </h4>
                    <span className="mt-2 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-coral">
                      {post.category}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal variant="fade" className="pt-6 sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink"
              >
                View all blog <ArrowIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
