import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/tilt-turn-doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

const faqSchema = pageData.faqSchema;

export default function TiltTurnDoorsPage() {
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
                rotate: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
                thermometer: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                lock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
                clock: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              };
              return {
                value: s.value,
                label: s.label,
                decimals: s.decimals,
                suffix: s.suffix,
                icon: iconMap[s.icon] || iconMap.clock,
              };
            })}
          />
        </div>
      </section>

      {/* How It Works */}
      <Section>
        <SectionTitle badge={d.howItWorks.badge} title={d.howItWorks.title} subtitle={d.howItWorks.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {d.howItWorks.modes.map((mode) => (
            <div key={mode.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <PhotoPlaceholder description={mode.photoDescription} height="h-56" className="rounded-none border-0" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    {mode.icon === "turn" ? (
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
                    )}
                  </div>
                  <h2 className="font-bold text-text-primary text-lg">{mode.title}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{mode.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section gray>
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

      {/* Materials */}
      <Section>
        <SectionTitle badge={d.materials.badge} title={d.materials.title} subtitle={d.materials.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {d.materials.items.map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <img src={item.image} alt={item.imageAlt} className="w-full h-72 object-contain bg-white p-4" loading="lazy" />
              <div className="p-6">
                <h3 className="font-bold text-lg text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1 text-xs text-blue-accent bg-blue-light px-2.5 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

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

      {/* Configurations */}
      <Section>
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

      {/* Gallery */}
      <Section gray>
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
            <details key={q} className="group bg-warm-gray rounded-xl border border-border">
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
