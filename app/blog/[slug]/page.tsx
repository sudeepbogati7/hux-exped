import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/ui/BlogCard";
import { ArrowIcon } from "@/components/ui/icons";
import { getPost, blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found — HUX EXPED" };
  return { title: `${post.title} — HUX EXPED`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar subpage />
      <main className="pt-20">
        {/* hero */}
        <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[820px] px-5 pb-10 sm:px-8 sm:pb-14">
              <span className="inline-flex rounded-full bg-coral px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink">
                {post.category}
              </span>
              <h1 className="display mt-4 text-3xl leading-tight text-cream sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
                {post.date} · {post.readTime}
              </p>
            </div>
          </div>
        </section>

        {/* body */}
        <section className="paper py-16 sm:py-20">
          <article className="mx-auto max-w-[760px] px-5 sm:px-8">
            <p className="text-xl leading-relaxed text-ink">{post.excerpt}</p>
            {post.content.map((s) => (
              <div key={s.heading} className="mt-10">
                <h2 className="display text-2xl text-ink sm:text-3xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-14 border-t border-line pt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-[#1f6f96]"
              >
                <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                All stories
              </Link>
            </div>
          </article>
        </section>

        {/* keep reading */}
        <section className="bg-cream-deep py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 className="display mb-10 text-3xl text-ink sm:text-4xl">Keep reading</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
