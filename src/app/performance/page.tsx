import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStatCard from "@/components/AnimatedStatCard";
import pageData from "@/data/pages/performance.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

export default function PerformancePage() {
  const d = pageData;
  return (
    <>
      <Breadcrumb items={d.breadcrumb.items} />

      {/* Hero Section - Design Pattern: Hero with Image */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{d.hero.heading}</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {d.hero.description}
              </p>
              <Link href="/quote" className="inline-block bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">
                {d.hero.cta}
              </Link>
            </div>
            <PhotoPlaceholder
              description={d.hero.photoDesc}
              height="h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Key Stats - Design Pattern: Stats Grid */}
      <section className="bg-blue-accent py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.keyStats.map((stat) => (
            <AnimatedStatCard key={stat.value} value={stat.value} label={stat.label} light />
          ))}
        </div>
      </section>

      {/* Performance Categories - Design Pattern: Card Grid */}
      <Section>
        <SectionTitle badge="Categories" title="Performance Areas" subtitle="Every aspect of our windows is tested and proven." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.performanceCategories.map((c) => (
            <div key={c.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder
                description={c.photoDesc}
                height="h-40"
                className="rounded-none border-0"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-text-primary">{c.title}</h2>
                  <span className="text-[10px] font-semibold text-blue-accent bg-blue-light px-2 py-0.5 rounded">{c.tag}</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* U-Value Comparison - Design Pattern: Progress Bars */}
      <Section gray>
        <SectionTitle badge={d.uValueComparison.badge} title={d.uValueComparison.title} subtitle={d.uValueComparison.subtitle} />
        <div className="max-w-3xl mx-auto space-y-5">
          {d.uValueComparison.items.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-text-primary">{item.label}</span>
                <span className="font-bold text-text-primary">{item.value} W/m²K</span>
              </div>
              <div className="h-7 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full flex items-center justify-end pr-3 transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                >
                  <span className="text-white text-xs font-medium">{item.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Sound Test - Design Pattern: Two-Column with Image */}
      <Section>
        <SectionTitle badge={d.soundInsulation.badge} title={d.soundInsulation.title} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              {d.soundInsulation.description}
            </p>
            <div className="space-y-3">
              {d.soundInsulation.noiseReductions.map((n) => (
                <div
                  key={n.label}
                  className="flex justify-between bg-warm-gray rounded-lg px-4 py-3 border border-border hover:bg-blue-light/30 transition-colors"
                >
                  <span className="text-sm text-text-secondary">{n.label}</span>
                  <span className="text-sm font-semibold text-blue-accent">{n.result}</span>
                </div>
              ))}
            </div>
          </div>
          <PhotoPlaceholder
            description={d.soundInsulation.photoDesc}
            height="h-80"
          />
        </div>
      </Section>

      {/* Energy Calculator - Design Pattern: Form Card */}
      <Section gray>
        <div className="bg-white border border-border rounded-xl p-8 md:p-10 text-center max-w-2xl mx-auto shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.energySavingsCalculator.badge}</span>
          <h3 className="font-bold text-text-primary text-2xl mb-3">{d.energySavingsCalculator.title}</h3>
          <p className="text-text-secondary mb-6">{d.energySavingsCalculator.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-text-muted block mb-1.5 font-semibold">{d.energySavingsCalculator.form.currentWindows.label}</label>
              <select className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-white hover:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/20 transition-all">
                {d.energySavingsCalculator.form.currentWindows.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1.5 font-semibold">{d.energySavingsCalculator.form.numberOfWindows.label}</label>
              <input
                type="number"
                defaultValue={d.energySavingsCalculator.form.numberOfWindows.defaultValue}
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-white hover:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1.5 font-semibold">{d.energySavingsCalculator.form.region.label}</label>
              <select className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-white hover:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/20 transition-all">
                {d.energySavingsCalculator.form.region.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="bg-blue-accent hover:bg-blue-hover text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-sm hover:shadow-md active:scale-95">
            {d.energySavingsCalculator.form.submitText}
          </button>
        </div>
      </Section>

      {/* Expert Guides - Design Pattern: Content Cards */}
      <Section gray>
        <SectionTitle badge={d.expertGuides.badge} title={d.expertGuides.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.expertGuides.guides.map((guide) => (
            <GuideCard
              key={guide.title}
              title={guide.title}
              desc={guide.desc}
              href={guide.href}
              photoDesc={guide.photoDesc}
            />
          ))}
        </div>
      </Section>

      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* CTA Block - Design Pattern: Call to Action */}
      <CTAWithDocs
        title={d.ctaWithDocs.title}
        subtitle={d.ctaWithDocs.subtitle}
        btnText={d.ctaWithDocs.btnText}
      />

      <StickyCTA />
    </>
  );
}
