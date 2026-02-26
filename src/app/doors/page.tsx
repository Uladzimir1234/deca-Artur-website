import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import pageData from "@/data/pages/doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

export default function DoorsPage() {
  const d = pageData;
  return (
    <>
      <Breadcrumb items={d.breadcrumb} />

      {/* Hero — matches Figma Doors page layout */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
                {d.hero.title}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {d.hero.description}
              </p>
              {/* Subcategory links — matches Figma */}
              <div className="space-y-3">
                {d.hero.categories.map((item) => (
                  <Link key={item.href} href={item.href} className="group flex items-center gap-4 p-4 bg-warm-gray rounded-xl border border-border hover:border-blue-accent/30 hover:shadow-md transition-all">
                    <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                      <PhotoPlaceholder description={item.photoDescription} height="h-20" className="rounded-lg border-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-text-primary group-hover:text-blue-accent transition-colors mb-0.5">{item.label}</h2>
                      <p className="text-sm text-text-muted line-clamp-2">{item.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-text-muted group-hover:text-blue-accent shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
            <PhotoPlaceholder description={d.hero.photoDescription} height="h-[500px]" />
          </div>
        </div>
      </section>

      {/* Benefits row — matches Figma "Experience the True Benefits" */}
      <Section gray>
        <SectionTitle title={d.benefits.title} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {d.benefits.items.map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-semibold text-sm text-text-primary mb-1">{b.title}</h3>
              <p className="text-xs text-text-muted">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Profiles — matches Figma uPVC/Aluminum section */}
      <Section>
        <SectionTitle badge={d.profiles.badge} title={d.profiles.title} subtitle={d.profiles.subtitle} />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {d.profiles.items.map((item) => (
          <div key={item.title} className="bg-warm-gray rounded-xl border border-border overflow-hidden">
            <img src={item.image} alt={item.imageAlt} className="w-full h-72 object-contain bg-white p-4" loading="lazy" />
            <div className="p-6">
              <h3 className="font-bold text-lg text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          </div>
          ))}
        </div>
        {/* Specs table — matches Figma */}
        <div className="bg-warm-gray rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-950 text-white">
                <th className="text-left py-3 px-4 font-medium">Specification</th>
                <th className="text-center py-3 px-4 font-medium">uPVC Doors</th>
                <th className="text-center py-3 px-4 font-medium">Aluminum Doors</th>
              </tr>
            </thead>
            <tbody>
              {d.specifications.rows.map(([spec, upvc, alu], i) => (
                <tr key={spec} className={i % 2 === 0 ? "bg-white" : "bg-warm-gray"}>
                  <td className="py-3 px-4 font-medium text-text-primary">{spec}</td>
                  <td className="py-3 px-4 text-center text-text-secondary">{upvc}</td>
                  <td className="py-3 px-4 text-center text-text-secondary">{alu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Door product types — matches Figma grid */}
      <Section gray>
        <SectionTitle badge={d.catalog.badge} title={d.catalog.title} subtitle={d.catalog.subtitle} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.catalog.items.map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <PhotoPlaceholder description={item.photoDescription} height="h-56" className="rounded-none border-0" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:text-blue-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-accent group-hover:gap-2.5 transition-all">
                    View details <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Colors */}
      <Section>
        <SectionTitle badge={d.colors.badge} title={d.colors.title} subtitle={d.colors.subtitle} />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8">
          {d.colors.items.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-full aspect-square rounded-lg border border-border mb-2" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-text-muted">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section gray>
        <SectionTitle badge={d.gallery.badge} title={d.gallery.title} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.gallery.images.map((img) => (
            <img key={img.src} src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded-xl" loading="lazy" />
          ))}
        </div>
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section gray>
        <SectionTitle badge={d.guides.badge} title={d.guides.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.guides.items.map((guide) => (
            <GuideCard key={guide.title} title={guide.title} desc={guide.description} href={guide.href} photoDesc={guide.photoDescription} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionTitle badge={d.faq.badge} title={d.faq.title} />
        <div className="max-w-3xl mx-auto space-y-4">
          {d.faq.items.map((faq) => (
            <details key={faq.q} className="group bg-warm-gray rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {faq.q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.buttonText}
      />

      <StickyCTA />
    </>
  );
}
