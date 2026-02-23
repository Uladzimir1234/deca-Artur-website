import Link from "next/link";
import type { Article, ArticleSection } from "@/data/articles";

function RenderSection({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">
          {section.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-text-secondary leading-relaxed mb-4">
          {section.content}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2 mb-6 ml-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-text-secondary leading-relaxed">
              <svg className="w-5 h-5 text-blue-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const colors = {
        info: "bg-blue-50 border-blue-accent/30 text-blue-900",
        tip: "bg-green-50 border-green-500/30 text-green-900",
        warning: "bg-amber-50 border-amber-500/30 text-amber-900",
      };
      const icons = {
        info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
        tip: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
        warning: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
      };
      const variant = section.variant || "info";
      return (
        <div className={`rounded-xl border-l-4 p-5 mb-6 ${colors[variant]}`}>
          <div className="flex gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={icons[variant]} />
            </svg>
            <p className="text-sm leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand text-white">
                {section.headers?.map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium first:rounded-tl-xl last:rounded-tr-xl">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-text-primary" : "text-text-secondary"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function ArticleLayout({
  article,
  relatedArticles,
}: {
  article: Article;
  relatedArticles: Article[];
}) {
  return (
    <>
      {/* Hero Image */}
      <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <span className="inline-block text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-warm-gray border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <span className="font-medium text-text-primary">{article.author}</span>
              <span className="text-text-muted"> · {article.authorRole}</span>
            </div>
          </div>
          <span className="text-text-muted/50">|</span>
          <span>{article.readTime} read</span>
          <span className="text-text-muted/50">|</span>
          <span>{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {article.sections.map((section, i) => (
          <RenderSection key={i} section={section} />
        ))}
      </article>

      {/* CTA */}
      <div className="bg-brand text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Upgrade Your Windows?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Get a free consultation and custom quote. Factory-direct European windows, manufactured in Massachusetts.</p>
          <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors">
            Get Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((ra) => (
              <Link key={ra.slug} href={`/blog/${ra.slug}`} className="group block">
                <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={ra.image}
                      alt={ra.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-semibold text-blue-accent bg-blue-light px-2.5 py-1 rounded mb-2">
                      {ra.category}
                    </span>
                    <h3 className="font-semibold text-text-primary text-sm leading-tight group-hover:text-blue-accent transition-colors">
                      {ra.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2">{ra.readTime} read</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
