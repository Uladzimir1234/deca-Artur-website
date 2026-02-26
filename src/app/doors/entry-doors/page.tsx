import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { EntryDoorConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import MaterialsSection from "@/components/MaterialsSection";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/entry-doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

const faqSchema = pageData.faqSchema;

export default function EntryDoorsPage() {
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
                  <Link key={btn.text} href={btn.href} className={btn.variant === 'primary' ? "bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors" : "border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors"}>{btn.text}</Link>
                ))}
              </div>
            </div>
            <PhotoPlaceholder
              description={d.hero.photoDescription}
              height="h-[450px]"
            />
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
                lock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
                shield: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
                thermometer: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                clock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              };
              return {
                value: s.value,
                label: s.label,
                decimals: s.decimals,
                suffix: s.suffix,
                prefix: s.prefix,
                icon: iconMap[s.icon] || iconMap.lock,
              };
            })}
          />
        </div>
      </section>

      {/* Configurator */}
      <EntryDoorConfigurator />

      {/* Security */}
      <Section>
        <SectionTitle badge={d.security.badge} title={d.security.title} subtitle={d.security.subtitle} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {d.security.features.map((lp) => (
              <div key={lp.title} className="flex gap-3 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h2 className="font-semibold text-text-primary text-sm">{lp.title}</h2>
                  <p className="text-xs text-text-muted">{lp.description}</p>
                </div>
              </div>
            ))}
            <div className="bg-blue-light rounded-lg p-4 border border-blue-accent/20 mt-4">
              <p className="text-sm font-semibold text-text-primary mb-1">{d.security.certification.title}</p>
              <p className="text-xs text-text-secondary">{d.security.certification.description}</p>
            </div>
          </div>
          <PhotoPlaceholder
            description={d.security.photoDescription}
            height="h-96"
          />
        </div>
      </Section>

      {/* Materials */}
      <MaterialsSection />

      {/* Technical Specs */}
      <Section gray>
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
          <img src={d.specs.profileImage} alt={d.specs.profileImageAlt} className="w-full h-[420px] object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6" loading="lazy" />
        </div>
      </Section>

      {/* Design Options */}
      <Section>
        <SectionTitle badge={d.designOptions.badge} title={d.designOptions.title} subtitle={d.designOptions.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {d.designOptions.options.map((opt) => (
            <div key={opt.title} className="bg-warm-gray rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder
                description={opt.photoDescription}
                height="h-36"
                className="rounded-none border-0"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text-primary text-sm mb-1">{opt.title}</h3>
                <p className="text-xs text-text-muted">{opt.description}</p>
              </div>
            </div>
          ))}
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
      <Section gray>
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

      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.buttonText}
      />

      {/* FAQ */}
      <Section>
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
