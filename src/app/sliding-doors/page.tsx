import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { SlidingDoorConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";

export const metadata: Metadata = {
  title: "Sliding Door Systems | PSk, Lift & Slide | DECA Windows",
  description: "Three innovative sliding door systems for any application — from standard patio doors to panoramic 20-foot openings. Manufactured in Massachusetts.",
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Doors", href: "/doors" }, { label: "Sliding Door Systems" }]} />

      {/* Hero Section - Figma Pattern: Hero with Image Right */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">Our Products</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">Sliding Door Systems</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Three innovative systems for any application — from standard patio doors to panoramic 20-foot openings. Seamless indoor-outdoor living with European engineering.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/quote" className="bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">Get a Quote</Link>
                <Link href="/doors" className="border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors">All Doors</Link>
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
            stats={[
              { value: 21, suffix: " ft", label: "Max Opening Width", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> },
              { value: 0.15, label: "Best U-Factor (W/m²K)", decimals: 2, icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg> },
              { value: 4, label: "GEALAN Systems", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> },
              { value: 50, suffix: "+", label: "Year Lifespan", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ]}
          />
        </div>
      </section>

      {/* Configurator */}
      <SlidingDoorConfigurator />

      {/* GEALAN Systems - Detailed */}
      <Section>
        <SectionTitle badge="Engineered in Germany" title="GEALAN Sliding Systems" subtitle="Built on GEALAN profile technology — German-engineered for decades of smooth, reliable performance." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {[
            {
              title: "GEALAN S 9000 Lift & Slide",
              desc: "Premium panoramic system. Threshold-free floor connection for seamless indoor-outdoor living.",
              tag: "Premium",
              photoDesc: "Фото: подъёмно-сдвижная дверь Lift & Slide — панорамное остекление террасы",
              specs: [["Max Size", "21′4\" × 9′"], ["U-Factor", "0.15–0.23"], ["IGU", "0.9\"–2.3\""], ["Threshold", "Flush / barrier-free"]],
            },
            {
              title: "GEALAN-SMOOVIO",
              desc: "Next-generation sliding with impermeable closure. Space-saving design with exceptional thermal performance.",
              tag: "New",
              photoDesc: "Фото: GEALAN-SMOOVIO раздвижная система — компактный дизайн",
              specs: [["Max Size", "13′1\" × 8′"], ["U-Factor", "0.16–0.23"], ["IGU", "0.8\"–2.0\""], ["Closure", "Impermeable"]],
            },
            {
              title: "GEALAN Multi-Slide",
              desc: "Flexible 2–6 panel configurations for maximum opening possibilities. Multiple stacking directions.",
              tag: "Versatile",
              photoDesc: "Фото: GEALAN Multi-Slide — несколько панелей, различные конфигурации открывания",
              specs: [["Max Size", "11′6\" × 8′2\""], ["U-Factor", "0.27–0.35"], ["IGU", "0.3\"–1.1\""], ["Panels", "2–6"]],
            },
            {
              title: "PSk Parallel Slide",
              desc: "Space-efficient parallel sliding for standard openings. Smooth operation with reliable GEALAN engineering.",
              tag: "Classic",
              photoDesc: "Фото: PSk параллельно-сдвижная дверь — общий вид в интерьере",
              specs: [["Max Width", "Up to 10′"], ["U-Factor", "0.18"], ["Operation", "Parallel slide"], ["Best For", "Standard patios"]],
            },
          ].map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <PhotoPlaceholder description={s.photoDesc} height="h-52" className="rounded-none border-0" />
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
              <h3 className="font-bold text-text-primary mb-1">Plissé Retractable Insect Screens</h3>
              <p className="text-sm text-text-secondary leading-relaxed">All sliding door systems can be equipped with pleated (plissé) insect screens — retractable mesh that folds neatly to the side when not in use. Ideal for large openings where traditional screens are impractical.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Table - Updated with GEALAN data */}
      <Section gray>
        <SectionTitle badge="Comparison" title="System Comparison" />
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr className="bg-brand text-white">
                <th className="px-4 py-3.5 text-left font-medium">Feature</th>
                <th className="px-4 py-3.5 text-center font-medium">PSk Parallel</th>
                <th className="px-4 py-3.5 text-center font-medium bg-brand-dark">S 9000 Lift & Slide ★</th>
                <th className="px-4 py-3.5 text-center font-medium">SMOOVIO</th>
                <th className="px-4 py-3.5 text-center font-medium">Multi-Slide</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Max Width", "Up to 10′", "21′4″", "13′1″", "11′6″"],
                ["Max Height", "8′", "9′", "8′", "8′2″"],
                ["U-Factor", "0.18", "0.15–0.23", "0.16–0.23", "0.27–0.35"],
                ["IGU Range", "Standard", "0.9\"–2.3\"", "0.8\"–2.0\"", "0.3\"–1.1\""],
                ["Panels", "2", "2–3", "2", "2–6"],
                ["Best For", "Standard patios", "Panoramic views", "Space-saving", "Max flexibility"],
              ].map(([label, ...vals], i) => (
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

      {/* Gallery - Figma Pattern: 4-Column Image Grid */}
      <Section>
        <SectionTitle badge="Gallery" title="Sliding Doors in Real Homes" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PhotoPlaceholder description="Фото: панорамные раздвижные двери в гостиной с выходом на террасу" height="h-48" />
          <PhotoPlaceholder description="Фото: Lift & Slide дверь с видом на сад — полностью открыта" height="h-48" />
          <PhotoPlaceholder description="Фото: раздвижная дверь на кухне — стык внутреннего и наружного пространства" height="h-48" />
          <PhotoPlaceholder description="Фото: вечерний вид дома с подсвеченными раздвижными дверями DECA" height="h-48" />
        </div>
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides - Figma Pattern: 3-Column Card Grid */}
      <Section>
        <SectionTitle badge="Resources" title="Expert Guides" />
        <div className="grid md:grid-cols-3 gap-6">
          <GuideCard
            title="Sliding vs French Doors"
            desc="Which door type is right for your home? A practical comparison."
            href="/blog"
            photoDesc="Фото: сравнение раздвижной и французской двери в интерьере"
          />
          <GuideCard
            title="Choosing the Right Sliding System"
            desc="PSk vs Lift & Slide vs Roto Inova — which fits your project?"
            href="/blog"
            photoDesc="Фото: три типа раздвижных систем рядом"
          />
          <GuideCard
            title="Sliding Door Maintenance"
            desc="Simple steps to keep your sliding doors operating smoothly."
            href="/blog"
            photoDesc="Фото: обслуживание раздвижной двери — чистка направляющих"
          />
        </div>
      </Section>

      {/* CTA Block - Figma Pattern: Call-to-Action Section */}
      <CTAWithDocs
        title="Which Sliding System Is Right for You?"
        subtitle="Get your custom order form, door blueprints, and detailed specification — all prepared for your project."
        btnText="Get Expert Advice"
      />

      {/* FAQ - Figma Pattern: Accordion */}
      <Section gray>
        <SectionTitle badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            [
              "What is the maximum opening width?",
              "Our Lift & Slide system supports openings up to 20 feet wide. PSk systems handle up to 10 feet, and Roto Inova up to 15 feet. Custom sizes available.",
            ],
            [
              "Are sliding doors energy efficient?",
              "Yes. With triple glazing and thermal breaks, our sliding doors achieve U-values as low as 0.12 — comparable to our window systems.",
            ],
            [
              "Which system is best for my home?",
              "PSk for standard patio openings, Lift & Slide for dramatic panoramic views, and Roto Inova for maximum security and performance. We'll help you choose.",
            ],
            [
              "Do sliding doors require a lot of maintenance?",
              "Minimal. Clean tracks periodically, lubricate hardware annually. Our systems are engineered for decades of reliable operation.",
            ],
          ].map(([q, a]) => (
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
