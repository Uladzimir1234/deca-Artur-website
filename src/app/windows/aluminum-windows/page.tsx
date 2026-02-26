import Link from "next/link";
import React from "react";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/aluminum-windows.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: "/windows/aluminum-windows" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a thermal break in aluminum windows?", "acceptedAnswer": { "@type": "Answer", "text": "A thermal break is a polyamide strip (14-20mm thick) that physically separates the exterior and interior aluminum frames. Aluminum conducts heat 200x faster than uPVC, so this barrier interrupts the thermal bridge. DECA's polyamide breaks reduce heat transfer by 200x, achieving U-values of 0.20-0.30 W/m²K." } },
    { "@type": "Question", "name": "How strong are aluminum windows compared to uPVC?", "acceptedAnswer": { "@type": "Answer", "text": "Aluminum is 3-4x stronger than uPVC. This allows for thinner profiles (as narrow as 1.75 inches) while supporting large unsupported spans, heavy tempered glass, and minimal deflection. Perfect for modern floor-to-ceiling glass walls and commercial applications." } },
    { "@type": "Question", "name": "What color options are available for aluminum windows?", "acceptedAnswer": { "@type": "Answer", "text": "Unlimited RAL colors via powder coating plus anodized finishes in matte, brushed, or polished. Two-tone configurations allow different interior/exterior colors. Custom wood-grain laminates are also available. All finishes are UV-stable and maintenance-free." } },
    { "@type": "Question", "name": "How do aluminum windows compare to uPVC in price?", "acceptedAnswer": { "@type": "Answer", "text": "Aluminum windows typically cost 20-40% more than uPVC due to stronger materials and thermal break engineering. However, the slim profiles maximize glass area and architectural impact. Aluminum is ideal for commercial applications and homes prioritizing modern aesthetics." } },
  ],
};

export default function AluminumWindowsPage() {
  const d = pageData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Windows", href: "/windows" }, { label: "Aluminum Windows" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{d.hero.heading}</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {d.hero.subheading}
              </p>
              <div className="flex gap-3 flex-wrap">
                {d.hero.ctas.map((cta) => (
                  <Link key={cta.text} href={cta.href} className={cta.href === "/quote" ? "bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors" : "border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors"}>
                    {cta.text}
                  </Link>
                ))}
              </div>
            </div>
            <img src={d.hero.image} alt={d.hero.imageAlt} className="w-full h-[450px] object-cover rounded-xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={d.stats.map((stat, i) => {
              const icons = [
                <svg key="s1" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
                <svg key="s2" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                <svg key="s3" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" /></svg>,
                <svg key="s4" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              ];
              return {
                value: stat.value,
                suffix: stat.suffix,
                label: stat.label,
                decimals: stat.decimals,
                icon: icons[i],
              };
            })}
          />
        </div>
      </section>

      {/* Configurator */}
      <WindowConfigurator />

      {/* Why Aluminum */}
      <Section>
        <SectionTitle badge={d.advantages.badge} title={d.advantages.title} subtitle={d.advantages.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {d.advantages.items.map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={item.title} height="h-48" className="rounded-none border-0" />
              <div className="p-6">
                <h2 className="font-bold text-lg text-text-primary mb-2">{item.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Thermal Break */}
      <Section gray>
        <SectionTitle badge={d.thermalBreak.badge} title={d.thermalBreak.title} subtitle={d.thermalBreak.subtitle} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              {d.thermalBreak.intro}
            </p>
            <div className="space-y-4">
              {d.thermalBreak.steps.map((s) => (
                <div key={s.step} className="flex gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-blue-accent text-white flex items-center justify-center text-sm font-bold">{s.step}</span>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{s.title}</h3>
                    <p className="text-xs text-text-muted">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src={d.thermalBreak.image} alt={d.thermalBreak.imageAlt} className="w-full h-96 object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8" loading="lazy" />
        </div>
      </Section>

      {/* Technical Specs */}
      <Section>
        <SectionTitle badge={d.specs.badge} title={d.specs.title} />
        <div className="bg-white rounded-xl border border-border overflow-hidden max-w-3xl mx-auto">
          {d.specs.rows.map(([label, value], i) => (
            <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <span className="text-sm text-text-primary font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section gray>
        <SectionTitle title={d.comparison.title} subtitle={d.comparison.subtitle} />
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-sm">
            <thead>
              <tr className="bg-navy-950 text-white">
                <th className="px-5 py-3.5 text-left font-medium">Criterion</th>
                <th className="px-5 py-3.5 text-center font-medium">{d.comparison.columns[0]}</th>
                <th className="px-5 py-3.5 text-center font-medium">{d.comparison.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {d.comparison.rows.map(([label, col1, col2], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  <td className="px-5 py-3.5 font-medium text-text-secondary">{label}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{col1}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionTitle badge={d.gallery.badge} title={d.gallery.title} subtitle={d.gallery.subtitle} />
        <GalleryLightbox
          alt="DECA aluminum window installation"
          items={d.gallery.items}
        />
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section>
        <SectionTitle badge={d.guides.badge} title={d.guides.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.guides.items.map((item, idx) => {
            const hrefs = ["/windows/upvc-windows", "/performance", "/professionals"];
            return (
              <GuideCard key={item.title} title={item.title} desc={item.desc} href={hrefs[idx]} photoDesc={item.title} />
            );
          })}
        </div>
      </Section>

      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.btnText}
      />

      {/* FAQ */}
      <Section gray>
        <SectionTitle badge={d.faq.badge} title={d.faq.title} />
        <div className="max-w-3xl mx-auto space-y-4">
          {d.faq.items.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      <StickyCTA />
    </>
  );
}
