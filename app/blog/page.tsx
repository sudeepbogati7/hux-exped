import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/ui/BlogCard";
import { CompassIcon } from "@/components/ui/icons";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal — HUX EXPED",
  description:
    "Field notes, trek guides and the offbeat corners of Nepal — written by the people who walk them.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {/* header */}
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal variant="up">
              <p className="eyebrow mb-5 inline-flex items-center gap-2">
                <CompassIcon className="h-4 w-4 text-coral" /> Journal
              </p>
              <h1 className="display text-5xl text-ink sm:text-7xl lg:text-8xl">
                Stories from the trail
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Field notes, trek guides and the offbeat corners of Nepal —
                written by the people who walk them.
              </p>
            </Reveal>
          </div>
        </section>

        {/* grid */}
        <section className="paper pb-24 sm:pb-32">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, i) => (
                <Reveal key={post.slug} variant="up" delay={(i % 3) * 0.08}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
