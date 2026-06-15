import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllPosts } from "@/lib/data/queries";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.blog.title, description: dict.blog.subtitle };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {dict.blog.title}
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
          {dict.blog.subtitle}
        </p>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
          {dict.blog.intro}
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">{dict.blog.empty}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 60, 360)}>
              <PostCard post={post} locale={lang} dict={dict} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
