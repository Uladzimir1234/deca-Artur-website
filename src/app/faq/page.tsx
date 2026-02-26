import { Breadcrumb, Section, SectionTitle } from "@/components/ui";
import type { Metadata } from "next";
import Link from "next/link";
import StickyCTA from "@/components/StickyCTA";
import pageData from "@/data/pages/faq.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

/* Schema.org FAQPage structured data */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pageData.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb items={pageData.breadcrumb.items} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">{pageData.hero.title}</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {pageData.hero.description}{" "}
            <Link href="/quote" className="text-blue-accent font-semibold hover:underline">Contact us</Link> — we&apos;re happy to help.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-12">
          {pageData.categories.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-bold text-text-primary mb-6 pb-2 border-b border-border">{category.category}</h2>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-semibold text-text-primary mb-2">{item.q}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{pageData.ctaSection.title}</h2>
          <p className="text-white/60 text-lg mb-8">
            {pageData.ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-blue-accent hover:bg-blue-hover text-white px-8 py-3.5 rounded-md font-semibold transition-colors">
              {pageData.ctaSection.ctaPrimary}
            </Link>
            <a href="tel:+14137714457" className="border border-white/20 hover:bg-white/10 text-white px-8 py-3.5 rounded-md font-semibold transition-colors">
              {pageData.ctaSection.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
