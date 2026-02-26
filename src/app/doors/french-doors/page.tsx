import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard, AnimatedCTA } from "@/components/ui";
import { FrenchDoorConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import ProcessSection from "@/components/ProcessSection";
import LeadMagnet from "@/components/LeadMagnet";
import MaterialsSection from "@/components/MaterialsSection";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/french-doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

const faqSchema = pageData.faqSchema;

export default function FrenchDoorsPage() {
  const d = pageData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={d.breadcrumb} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{d.hero.title}</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {d.hero.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                {d.hero.buttons.map((btn) => (
                  btn.variant === 'animated' ? (
                    <AnimatedCTA key={btn.text} href={btn.href} id="french-hero">{btn.text}</AnimatedCTA>
                  ) : (
                    <Link key={btn.text} href={btn.href} className="border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors">{btn.text}</Link>
                  )
                ))}
              </div>
            </div>
            <img src={d.hero.image} alt={d.hero.imageAlt} className="w-full h-[450px] object-cover rounded-xl" loading="eager" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={d.stats.map((s) => {
              const iconMap: Record<string, React.ReactNode> = {
                expand: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
                thermometer: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                lock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
                clock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              };
              return {
                value: s.value,
                label: s.label,
                decimals: s.decimals,
                suffix: s.suffix,
                icon: iconMap[s.icon] || iconMap.lock,
              };
            })}
          />
        </div>
      </section>

      {/* Configurator */}
      <FrenchDoorConfigurator />

      {/* Benefits */}
      <Section>
        <SectionTitle badge={d.benefits.badge} title={d.benefits.title} subtitle={d.benefits.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {d.benefits.items.map((b) => (
            <div key={b.title} className="group bg-white rounded-xl border border-border p-5 text-center hover:shadow-lg hover:border-blue-accent/20 transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-light flex items-center justify-center mx-auto mb-3 group-hover:bg-brand group-hover:scale-110 transition-all">
                <svg className="w-5 h-5 text-blue-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
              </div>
              <h2 className="font-semibold text-text-primary text-sm mb-1 group-hover:text-blue-accent transition-colors">{b.title}</h2>
              <p className="text-xs text-text-muted leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Configurations */}
      <Section gray>
        <SectionTitle badge={d.configurations.badge} title={d.configurations.title} subtitle={d.configurations.subtitle} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {d.configurations.items.map((config) => (
            <div key={config.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={config.photoDescription} height="h-44" className="rounded-none border-0" />
              <div className="p-4">
                <h2 className="font-bold text-text-primary text-sm mb-1">{config.name}</h2>
                <p className="text-xs text-text-secondary leading-relaxed">{config.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Materials */}
      <MaterialsSection />

      {/* Technical Specs */}
      <Section>
        <SectionTitle badge={d.specs.badge} title={d.specs.title} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {d.specs.specifications.map(([label, value], i) => (
              <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
                <span className="text-sm text-text-primary font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <PhotoPlaceholder description={d.specs.photoDescription} height="h-[400px]" />
        </div>
      </Section>

      {/* French vs Sliding */}
      <Section gray>
        <SectionTitle title={d.comparison.title} />
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-brand text-white">
                {d.comparison.headers.map((header) => (
                  <th key={header} className={header === "Feature" ? "px-5 py-3.5 text-left font-medium" : "px-5 py-3.5 text-center font-medium"}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.comparison.rows.map(([label, french, sliding], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  <td className="px-5 py-3.5 font-medium text-text-secondary">{label}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{french}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{sliding}</td>
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
          alt={d.gallery.alt}
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
          {d.guides.items.map((guide) => (
            <GuideCard
              key={guide.title}
              title={guide.title}
              desc={guide.description}
              href={guide.href}
              photoDesc={guide.photoDescription}
            />
          ))}
        </div>
      </Section>

      {/* ═══════ PROCESS ═══════ */}
      <ProcessSection />

      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.buttonText}
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

      {/* ═══════ LEAD MAGNET ═══════ */}
      <LeadMagnet />

      <StickyCTA />
    </>
  );
}
