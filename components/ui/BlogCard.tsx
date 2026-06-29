import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/data";

/** Card used on the /blog listing and the "keep reading" rail. */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-line hover:shadow-[0_30px_60px_-30px_rgba(20,20,20,0.45)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {post.date} · {post.readTime}
        </p>
        <h3 className="display mt-2 text-xl leading-tight text-ink transition-colors group-hover:text-[#6b8e1f]">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b8e1f]">
          Read more →
        </span>
      </div>
    </Link>
  );
}
