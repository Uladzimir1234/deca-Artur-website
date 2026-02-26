import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/aluminium-doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

const faqSchema = pageData.faqSchema;

export default function AluminiumDoorsPage() {
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
                palette: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" /></svg>,
                thermometer: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                expand: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
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

      {/* Advantages */}
      <Section>
        <SectionTitle badge={d.advantages.badge} title={d.advantages.title} subtitle={d.advantages.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {d.advantages.items.map((b) => (
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

      {/* Profiles */}
      <Section gray>
        <SectionTitle badge={d.profiles.badge} title={d.profiles.title} subtitle={d.profiles.subtitle} />
        <div className="grid md:grid-cols-2 gap-8">
          {d.profiles.items.map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-border overflow-hidden">
              <img src={item.image} alt={item.imageAlt} className="w-full h-72 object-contain bg-white p-4" loading="lazy" />
              <div className="p-6">
                <h3 className="font-bold text-lg text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

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
          <img src={d.specs.profileImage} alt={d.specs.profileImageAlt} className="w-full h-[420px] object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6" loading="lazy" />
        </div>
      </Section>

      {/* Applications */}
      <Section gray>
        <SectionTitle badge={d.applications.badge} title={d.applications.title} subtitle={d.applications.subtitle} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.applications.items.map((app) => (
            <div key={app.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={app.photoDescription} height="h-48" className="rounded-none border-0" />
              <div className="p-6">
                <h3 className="font-bold text-text-primary mb-2">{app.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{app.description}</p>
              </div>
            </div>
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
