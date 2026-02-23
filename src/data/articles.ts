import articlesData from "./articles.json";

export interface Article {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
}

export interface ArticleSection {
  type: "paragraph" | "heading" | "list" | "callout" | "table" | "image";
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  src?: string;
  alt?: string;
  variant?: "info" | "tip" | "warning";
}

export const articles: Article[] = articlesData as Article[];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as Article[];
}
