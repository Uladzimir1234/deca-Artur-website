import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui";
import StickyCTA from "@/components/StickyCTA";
import ArticleLayout from "@/components/ArticleLayout";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | DECA Windows Blog`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630 }],
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Organization", name: "DECA Windows & Doors" },
    publisher: { "@type": "Organization", name: "DECA Windows & Doors" },
    datePublished: article.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://decawindows.com/blog/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumb items={[{ label: "Resources & Guides", href: "/blog" }, { label: article.title }]} />
      <ArticleLayout article={article} relatedArticles={related} />
      <StickyCTA />
    </>
  );
}
