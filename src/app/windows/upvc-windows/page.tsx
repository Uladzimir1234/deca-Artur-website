import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Breadcrumb, Section, SectionTitle, CTABlock, ServiceIcons, StatCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import VideoTabs from "@/components/VideoTabs";
import ComponentTabs from "@/components/ComponentTabs";
import GalleryLightbox from "@/components/GalleryLightbox";
import AnimatedStats from "@/components/AnimatedStats";
import PerformanceBars from "@/components/PerformanceBars";
import EnergySavingsCard from "@/components/EnergySavingsCard";
import GlazingComparison from "@/components/GlazingComparison";
import StickyCTA from "@/components/StickyCTA";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import type { Metadata } from "next";
import pageData from "@/data/pages/upvc-windows.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: "/windows/upvc-windows" },
};

/* All images served from public/assets/ */
const a = "/assets";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Are uPVC windows prone to warping or discoloration?", "acceptedAnswer": { "@type": "Answer", "text": "No. DECA uses virgin uPVC with co-extruded GEALAN-acrylcolor acrylic surfaces, engineered for dimensional stability from -30°F to 140°F. The acrylic surface is molecularly bonded to the profile — it cannot fade, yellow, crack, or peel. Proven since 1980." } },
    { "@type": "Question", "name": "How does DECA uPVC compare to imported European windows?", "acceptedAnswer": { "@type": "Answer", "text": "We use the same GEALAN profiles and German Roto/Siegenia hardware as top European manufacturers, but fabricate in Massachusetts. You get identical performance at 30-40% lower cost, plus local warranties, service, and fast delivery (1-5 days to Northeast, 10 days nationwide)." } },
    { "@type": "Question", "name": "Can DECA uPVC windows be recycled?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. uPVC is fully recyclable. At end-of-life, DECA windows can be sent to recycling facilities that process uPVC profiles. This is a significant environmental advantage over aluminum (which requires energy-intensive processing) and wood (which often ends in landfills)." } },
    { "@type": "Question", "name": "How do DECA uPVC windows compare to standard vinyl?", "acceptedAnswer": { "@type": "Answer", "text": "DECA uPVC is superior across every metric: U-values as low as 0.14 vs 0.25-0.35 for standard vinyl, 50-year lifespan vs 25-35 years, 50+ RAL color options vs 5-10, up to 12 lock points vs 2-3 for security, and 42-50 dB sound insulation vs 32-38 dB." } },
  ],
};

export default function UPVCWindowsPage() {
  const d = pageData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Windows", href: "/windows" }, { label: "uPVC Windows" }]} />

      {/* ═══════ HERO — Split with real photo + trust bar ═══════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand mb-3">
                {d.hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5">
                {d.hero.heading}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {d.hero.subheading}
              </p>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {d.hero.trustBadges.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary bg-warm-gray border border-border rounded-full px-3 py-1.5">
                    <svg className="w-3.5 h-3.5 text-brand" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                {d.hero.ctas.map((cta) => (
                  cta.href.startsWith('tel:') ? (
                    <a key={cta.text} href={cta.href} className="border border-border text-text-primary hover:border-brand/30 px-7 py-3.5 rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                      {cta.text}
                    </a>
                  ) : (
                    <Link key={cta.text} href={cta.href} className="bg-brand hover:bg-brand-dark text-white px-7 py-3.5 rounded-lg font-semibold transition-colors shadow-sm">
                      {cta.text}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src={d.hero.image}
                alt={d.hero.imageAlt}
                width={800}
                height={600}
                className="w-full h-[450px] object-cover"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white text-sm font-medium">{d.hero.imageCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS BAR — Animated rings + counters ═══════ */}
      <section className="bg-brand text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedStats
            stats={d.stats.map((stat, i) => {
              const icons = [
                <svg key="s1" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                <svg key="s2" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>,
                <svg key="s3" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
                <svg key="s4" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" /></svg>,
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

      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ CONFIGURATOR ═══════ */}
      <WindowConfigurator />

      {/* ═══════ PROFILE TECHNOLOGY — Interactive component viewer ═══════ */}
      <Section>
        <SectionTitle
          badge={d.profileTechnology.badge}
          title={d.profileTechnology.title}
          subtitle={d.profileTechnology.subtitle}
        />
        <ComponentTabs
          items={d.profileTechnology.components.map((comp, i) => {
            const icons = [
              <svg key="c1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>,
              <svg key="c2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
              <svg key="c3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
              <svg key="c4" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" /></svg>,
              <svg key="c5" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>,
            ];
            return {
              icon: icons[i],
              title: comp.title,
              description: comp.description,
              image: comp.image,
              alt: comp.alt,
            };
          })}
        />
      </Section>

      {/* ═══════ GLAZING — Interactive comparison ═══════ */}
      <Section gray>
        <SectionTitle badge="Energy-Efficient Glass" title="Glazing Configuration" subtitle="Compare glass packages side by side — click any type to highlight its performance." />
        <GlazingComparison />
      </Section>

      {/* ═══════ TECHNICAL SPECS — GEALAN data ═══════ */}
      <Section>
        <SectionTitle badge={d.specs.badge} title={d.specs.title} subtitle={d.specs.subtitle} />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {d.specs.rows.map(([label, value], i) => (
              <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
                <span className="text-sm text-text-primary font-semibold text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Component detail image */}
          <div className="space-y-4">
            <Image
              src={`${a}/components/hardware-detail.png`}
              alt="DECA uPVC window component detail — hardware and seal"
              width={600}
              height={400}
              className="w-full rounded-xl border border-border"
            />
            <div className="bg-brand/5 rounded-xl p-6 border border-brand/10">
              <h2 className="font-semibold text-text-primary mb-2">{d.specs.finishes.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {d.specs.finishes.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {d.specs.finishes.colors.map((c) => (
                  <div key={c.name} className="text-center">
                    <div className="w-full aspect-square rounded-lg border border-border shadow-sm" style={{ backgroundColor: c.color }} />
                    <span className="text-[10px] text-text-muted mt-1 block">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ VIDEO — Interactive Tabs (like decawindows.com) ═══════ */}
      <Section gray>
        <SectionTitle badge={d.videoTabs.badge} title={d.videoTabs.title} />
        <VideoTabs
          tabs={d.videoTabs.tabs.map((tab, i) => {
            const icons = [
              <svg key="v1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              <svg key="v2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
              <svg key="v3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
            ];
            return {
              icon: icons[i],
              title: tab.title,
              description: tab.description,
              video: tab.video,
            };
          })}
        />
      </Section>

      {/* ═══════ PERFORMANCE — DECA vs Traditional ═══════ */}
      <Section>
        <SectionTitle
          badge={d.performance.badge}
          title={d.performance.title}
          subtitle={d.performance.subtitle}
        />
        <PerformanceBars
          metrics={d.performance.metrics.map((m, i) => {
            const icons = [
              <svg key="p1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
              <svg key="p2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
              <svg key="p3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
              <svg key="p4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
            ];
            return {
              label: m.label,
              icon: icons[i],
              deca: m.deca,
              decaLabel: m.decaLabel,
              traditional: m.traditional,
              traditionalLabel: m.traditionalLabel,
            };
          })}
        />
      </Section>

      {/* ═══════ ENERGY SAVINGS INFOGRAPHIC ═══════ */}
      <Section gray>
        <SectionTitle
          badge="Your Investment"
          title="The Economics of Quality Windows"
          subtitle="Energy-efficient windows aren't just better — they pay for themselves."
        />
        <EnergySavingsCard />
      </Section>

      {/* ═══════ GALLERY — Project photos ═══════ */}
      <Section>
        <SectionTitle badge={d.gallery.badge} title={d.gallery.title} subtitle={d.gallery.subtitle} />
        <GalleryLightbox
          alt="DECA window installation project"
          items={d.gallery.items}
        />
      </Section>

      {/* ═══════ MATERIAL COMPARISON ═══════ */}
      <Section gray>
        <SectionTitle title={d.materialComparison.title} subtitle={d.materialComparison.subtitle} />
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-sm">
            <thead>
              <tr className="bg-brand text-white">
                <th className="px-5 py-3.5 text-left font-medium">Feature</th>
                <th className="px-5 py-3.5 text-center font-medium bg-brand-dark">{d.materialComparison.columns[0]} ★</th>
                <th className="px-5 py-3.5 text-center font-medium">{d.materialComparison.columns[1]}</th>
                <th className="px-5 py-3.5 text-center font-medium">{d.materialComparison.columns[2]}</th>
              </tr>
            </thead>
            <tbody>
              {d.materialComparison.rows.map(([label, ...vals], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  <td className="px-5 py-3.5 font-medium text-text-secondary">{label}</td>
                  {vals.map((v, j) => (
                    <td key={j} className={`px-5 py-3.5 text-center ${j === 0 ? "font-semibold text-brand bg-brand/[0.04]" : "text-text-secondary"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ═══════ WINDOW TYPES — Product images ═══════ */}
      <Section>
        <SectionTitle badge={d.windowTypes.badge} title={d.windowTypes.title} subtitle={d.windowTypes.subtitle} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {d.windowTypes.types.map((w) => (
            <div key={w.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group">
              <div className="bg-warm-gray flex items-center justify-center p-4 h-52">
                <Image
                  src={`${a}/images/${w.src}`}
                  alt={`DECA ${w.name}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text-primary text-sm">{w.name}</h3>
                <p className="text-xs text-text-muted">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>


      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* ═══════ FINAL CTA ═══════ */}
      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.btnText}
      />

      {/* ═══════ FAQ ═══════ */}
      <Section>
        <SectionTitle badge={d.faq.badge} title={d.faq.title} />
        <div className="max-w-3xl mx-auto space-y-3">
          {d.faq.items.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* ═══════ STICKY CTA ═══════ */}
      <StickyCTA />
    </>
  );
}
