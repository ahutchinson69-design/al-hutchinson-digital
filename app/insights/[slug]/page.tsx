import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, formatArticleDate, getArticle } from "@/data/articles";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CallToAction } from "@/components/CallToAction";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return pageMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/insights/${slug}`,
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/insights/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-hairline">
          <div aria-hidden="true" className="glow-warm absolute inset-0" />

          <div className="shell relative pt-28 pb-12 sm:pt-32 md:pt-40 md:pb-16">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
              />
              All insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
              <span className="eyebrow">{article.category}</span>
              <span aria-hidden="true">•</span>
              <span>{article.readingMinutes} min read</span>
              <span aria-hidden="true">•</span>
              <span>{formatArticleDate(article.publishedAt)}</span>
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {article.summary}
            </p>

            <p className="mt-8 text-sm text-ink-muted">
              By <span className="text-ink">{site.personName}</span>
            </p>
          </div>
        </header>

        <div className="shell section-y">
          <div className="mx-auto max-w-2xl">
            {article.contentStatus === "placeholder" ? (
              <PlaceholderNotice className="mb-10">
                This article is draft scaffolding written to demonstrate the
                editorial layout. It has no publication date and cites no source
                or study.
              </PlaceholderNotice>
            ) : null}

            <Reveal>
              <Prose blocks={article.body} />
            </Reveal>
          </div>
        </div>

        {more.length > 0 ? (
          <section className="border-t border-hairline bg-canvas-2">
            <div className="shell section-y">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                More insights
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {more.map((item) => (
                  <ArticleCard key={item.slug} article={item} className="h-full" />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <CallToAction
        eyebrow="Discuss this"
        heading="Disagree, or seen it differently?"
        body="If you work in one of these environments and your experience does not match what is written here, I would like to know."
        secondary={{ label: "More Insights", href: "/insights" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: article.title, path: `/insights/${article.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
