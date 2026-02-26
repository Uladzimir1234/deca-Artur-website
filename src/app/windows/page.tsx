import Link from "next/link";
import React from "react";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import pageData from "@/data/pages/windows.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: "/windows" },
};

export default function WindowsPage() {
  const d = pageData;
  return (
    <>
      <Breadcrumb items={[{ label: "Windows" }]} />

      {/* Hero — matching Figma Windows page */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{d.hero.heading}</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">{d.hero.subheading}</p>
              {/* Subcategory links — matches Figma sidebar */}
              <div className="space-y-3">
                {d.hero.subcategories.map((item) => (
                  <Link key={item.href} href={item.href} className="group flex items-center gap-4 p-4 bg-warm-gray rounded-xl border border-border hover:border-blue-accent/30 hover:shadow-md transition-all">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-blue-accent/10 flex items-center justify-center group-hover:bg-blue-accent transition-colors">
                      <svg className="w-6 h-6 text-blue-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="font-semibold text-text-primary group-hover:text-blue-accent transition-colors">{item.label}</h2>
                        <span className="text-[10px] font-semibold text-blue-accent bg-blue-light px-2 py-0.5 rounded">{item.tag}</span>
                      </div>
                      <p className="text-sm text-text-muted truncate">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <img src={d.hero.image} alt={d.hero.imageAlt} className="w-full h-[500px] object-cover rounded-xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Configurator */}
      <WindowConfigurator />

      {/* GEALAN Profile Systems */}
      <Section gray>
        <SectionTitle badge={d.profileSystems.badge} title={d.profileSystems.title} subtitle={d.profileSystems.subtitle} />
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {d.profileSystems.systems.map((system) => (
            <div key={system.title} className="bg-white rounded-xl border border-border overflow-hidden">
              <img src={system.image} alt={system.title} className="w-full h-64 object-contain bg-white" loading="lazy" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-text-primary">{system.title}</h3>
                  <span className="text-[9px] font-semibold text-brand bg-brand/10 px-1.5 py-0.5 rounded">{system.tag}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{system.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {system.specs.map(([label, value]) => (
                    <div key={label} className="bg-warm-gray rounded px-2.5 py-1.5"><span className="font-medium text-text-secondary">{label}:</span> <span className="text-text-primary font-semibold">{value}</span></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GEALAN-acrylcolor + components */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-text-primary mb-1">{d.profileSystems.surfaceTechnology.title}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{d.profileSystems.surfaceTechnology.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {d.profileSystems.components.map((c) => (
            <div key={c.title} className="bg-white rounded-xl border border-border overflow-hidden">
              <PhotoPlaceholder description={c.title} height="h-32" className="rounded-none border-0" />
              <div className="p-4">
                <h4 className="font-semibold text-sm text-text-primary mb-1">{c.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Window Types Grid — matches Figma */}
      <Section>
        <SectionTitle badge={d.windowTypes.badge} title={d.windowTypes.title} subtitle={d.windowTypes.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {d.windowTypes.types.map((wt) => (
            <div key={wt.name} className="bg-warm-gray rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={wt.name} height="h-40" className="rounded-none border-0" />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-text-primary mb-1">{wt.name}</h4>
                <p className="text-xs text-text-muted">{wt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Colors — matches Figma swatches section */}
      <Section gray>
        <SectionTitle badge={d.colors.badge} title={d.colors.title} subtitle={d.colors.subtitle} />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8">
          {d.colors.swatches.map((c) => (
            <div key={c.name} className="text-center">
              <div className="w-full aspect-square rounded-lg border border-border mb-2" style={{ backgroundColor: c.color }} />
              <span className="text-xs text-text-muted">{c.name}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-muted">{d.colors.note}. <Link href="/quote" className="text-blue-accent hover:text-blue-hover">Contact us for samples →</Link></p>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionTitle badge={d.gallery.badge} title={d.gallery.title} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.gallery.items.map((item) => (
            <img key={item.src} src={item.src} alt={item.alt} className="w-full h-48 object-cover rounded-xl" loading="lazy" />
          ))}
        </div>
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section>
        <SectionTitle badge={d.guides.badge} title={d.guides.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.guides.items.map((item) => (
            <GuideCard key={item.title} title={item.title} desc={item.desc} href="/blog" photoDesc={item.title} />
          ))}
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
          {d.faq.items.map((faq) => (
            <details key={faq.q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {faq.q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <StickyCTA />
    </>
  );
}
