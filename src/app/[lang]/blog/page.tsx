import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllPosts } from "@/lib/data/queries";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
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
        <h1 className="font-slab text-4xl font-bold tracking-tight text-primary md:text-5xl">
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
        <BlogCarousel posts={posts} locale={lang} dict={dict} />
      )}
    </div>
  );
}
