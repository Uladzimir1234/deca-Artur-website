import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { SlidingDoorConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import MaterialsSection from "@/components/MaterialsSection";
import GalleryLightbox from "@/components/GalleryLightbox";
import pageData from "@/data/pages/sliding-doors.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: "/sliding-doors" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the maximum opening width for sliding doors?", "acceptedAnswer": { "@type": "Answer", "text": "Our Lift & Slide system supports openings up to 21 feet 4 inches wide and 9 feet tall. The PSk Parallel system handles up to 10 feet, and the SMOOVIO system up to 13 feet 1 inch. All systems are GEALAN-engineered for reliable operation at any size." } },
    { "@type": "Question", "name": "Are sliding doors energy efficient?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. DECA sliding doors with triple glazing and thermal breaks achieve U-values as low as 0.15 W/m²K — comparable to our window systems. The Lift & Slide system ranges from 0.15-0.23 W/m²K depending on configuration." } },
    { "@type": "Question", "name": "What track systems does DECA offer?", "acceptedAnswer": { "@type": "Answer", "text": "DECA offers four GEALAN track systems: the premium Lift & Slide (threshold-free, panoramic), SMOOVIO (space-saving with impermeable closure), Multi-Slide (2-6 panels, maximum flexibility), and PSk Parallel (classic sliding). Each engineered for different applications and budgets." } },
    { "@type": "Question", "name": "How much maintenance do sliding doors require?", "acceptedAnswer": { "@type": "Answer", "text": "Minimal. DECA sliding doors are engineered for decades of reliable operation. Simply clean tracks periodically and lubricate hardware annually. Our systems are sealed to prevent debris accumulation, and tracks are designed for easy cleaning." } },
  ],
};

export default function SlidingDoorsPage() {
  const d = pageData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Doors", href: "/doors" }, { label: "Sliding Door Systems" }]} />

      {/* Hero Section - Figma Pattern: Hero with Image Right */}
      <section className="bg-white py-16 md:py-24">
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
                  <Link key={cta.text} href={cta.href} className="bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">{cta.text}</Link>
                ))}
              </div>
            </div>
            <PhotoPlaceholder description="Фото: панорамная раздвижная дверь DECA в современном доме — вид на террасу" height="h-[450px]" />
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
                // Map will be added based on icon names in the JSON
              };
              return {
                value: s.value,
                label: s.label,
                decimals: s.decimals,
                suffix: s.suffix,
                icon: null,
              };
            }).map((s, i) => {
              const iconSets = [
                <svg key="s1" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
                <svg key="s2" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
                <svg key="s3" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
                <svg key="s4" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              ];
              return { ...s, icon: iconSets[i] };
            })}
          />
        </div>
      </section>

      {/* Configurator */}
      <SlidingDoorConfigurator />

      {/* GEALAN Systems - Detailed */}
      <Section>
        <SectionTitle badge={d.systems.badge} title={d.systems.title} subtitle={d.systems.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {d.systems.items.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <PhotoPlaceholder description="Фото: система раздвижных дверей DECA" height="h-52" className="rounded-none border-0" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-bold text-text-primary text-lg">{s.title}</h2>
                  <span className="text-[9px] font-semibold text-brand bg-brand/10 px-1.5 py-0.5 rounded">{s.tag}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{s.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.specs.map(([label, value]) => (
                    <div key={label} className="bg-warm-gray rounded px-2.5 py-1.5 text-xs">
                      <span className="font-medium text-text-secondary">{label}:</span>{" "}
                      <span className="text-text-primary font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plissé screen mention */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-1">{d.systems.plisse.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{d.systems.plisse.description}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Materials */}
      <MaterialsSection />

      {/* Comparison Table - Updated with GEALAN data */}
      <Section gray>
        <SectionTitle badge={d.comparison.badge} title={d.comparison.title} />
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr className="bg-brand text-white">
                <th className="px-4 py-3.5 text-left font-medium">{d.comparison.columns[0]}</th>
                {d.comparison.columns.slice(1).map((col, i) => (
                  <th key={col} className={`px-4 py-3.5 text-center font-medium ${i === 0 ? "bg-brand-dark" : ""}`}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.comparison.rows.map(([label, ...vals], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  <td className="px-4 py-3.5 font-medium text-text-secondary">{label}</td>
                  {vals.map((v, j) => (
                    <td key={j} className={`px-4 py-3.5 text-center ${j === 1 ? "font-semibold text-brand" : "text-text-secondary"}`}>
                      {v}
                    </td>
                  ))}
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
          alt="DECA sliding door installation"
          items={d.gallery.items}
        />
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides - Figma Pattern: 3-Column Card Grid */}
      <Section>
        <SectionTitle badge={d.guides.badge} title={d.guides.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.guides.items.map((guide) => (
            <GuideCard
              key={guide.title}
              title={guide.title}
              desc={guide.desc}
              href="/blog"
              photoDesc={`Фото: ${guide.title.toLowerCase()}`}
            />
          ))}
        </div>
      </Section>

      {/* CTA Block - Figma Pattern: Call-to-Action Section */}
      <CTAWithDocs
        title={d.cta.title}
        subtitle={d.cta.subtitle}
        btnText={d.cta.btnText}
      />

      {/* FAQ - Figma Pattern: Accordion */}
      <Section gray>
        <SectionTitle badge={d.faq.badge} title={d.faq.title} />
        <div className="max-w-3xl mx-auto space-y-4">
          {d.faq.items.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
