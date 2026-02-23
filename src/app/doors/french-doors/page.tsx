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

export const metadata: Metadata = {
  title: "European French Doors | Custom Swing Doors in Massachusetts | DECA",
  description: "Factory-direct European French swing doors built in Westfield, MA. Triple glazing, multi-point locking, 15-year warranty. Get a free quote for your home.",
  alternates: { canonical: "/doors/french-doors" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What are the opening modes for French doors?", "acceptedAnswer": { "@type": "Answer", "text": "DECA French doors feature hinged swing operation with 45-degree arc opening. Both doors swing fully open for 100% clear passage and unobstructed airflow. Optional foot bolts hold doors open in wind. Single and double configurations are available." } },
    { "@type": "Question", "name": "What sizes are available for French doors?", "acceptedAnswer": { "@type": "Answer", "text": "Single French doors range from 32-42 inches wide. Double French doors (the classic configuration) range from 60-72 inches total width. Custom sizes are available. All doors are 80 inches standard height, with custom heights up to 108 inches." } },
    { "@type": "Question", "name": "What glass options do you offer for French doors?", "acceptedAnswer": { "@type": "Answer", "text": "Choose from clear, frosted, decorative, textured, or laminated tempered glass. All glass is insulated with argon fill for energy efficiency. Triple-glazing achieves U-values of 0.9-1.3 W/m²K, meeting ENERGY STAR and building codes." } },
    { "@type": "Question", "name": "Are French doors weatherproof in cold climates?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. DECA French doors use compression seals and EPDM gaskets to create watertight, airtight barriers. Triple-glazed insulated units with thermal breaks prevent condensation and drafts even in cold climates like New England winters." } },
    { "@type": "Question", "name": "How do I choose between French and sliding doors?", "acceptedAnswer": { "@type": "Answer", "text": "French doors are ideal for elegance, full opening width, and cross-ventilation in traditional homes. Sliding doors suit large panoramic openings in contemporary spaces. DECA offers both — contact us to discuss your project." } },
  ],
};

export default function FrenchDoorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Doors", href: "/doors" }, { label: "French Doors" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">Classic European Style</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">European French Swing Doors</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Elegant, functional, and classically beautiful. Flood interiors with light while creating seamless transitions to outdoor spaces. Available in single or double configurations.
              </p>
              <div className="flex gap-3 flex-wrap">
                <AnimatedCTA href="/quote" id="french-hero">Get Custom Quote</AnimatedCTA>
                <Link href="/doors" className="border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors">All Doors</Link>
              </div>
            </div>
            <img src="/french_doors.png" alt="European French swing doors by DECA — double door configuration with full glass panels, open to garden terrace" className="w-full h-[450px] object-cover rounded-xl" loading="eager" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={[
              { value: 100, suffix: "%", label: "Opening Width", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> },
              { value: 0.9, label: "Best U-Value (W/m²K)", decimals: 1, icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg> },
              { value: 5, label: "Lock Points", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
              { value: 50, suffix: "+", label: "Year Lifespan", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ]}
          />
        </div>
      </section>

      {/* Configurator */}
      <FrenchDoorConfigurator />

      {/* Benefits */}
      <Section>
        <SectionTitle badge="Benefits" title="Why French Doors?" subtitle="Elegance, light, and seamless indoor-outdoor transitions." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Maximum Natural Light", desc: "Full-height glass panes flood interiors with daylight, reducing artificial lighting needs.", photoDesc: "Фото: гостиная залитая светом через французские двери", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" },
            { title: "Unobstructed Passage", desc: "Both doors swing fully open — 100% clear passage. Move furniture, enjoy full airflow.", photoDesc: "Фото: полностью открытые французские двери — свободный проход на террасу", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
            { title: "Visual Elegance", desc: "Symmetrical glass-paned design is timelessly beautiful. Works in any architectural style.", photoDesc: "Фото: французские двери в классическом интерьере — симметрия и элегантность", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" },
            { title: "Superior Airflow", desc: "Both doors create cross-ventilation. Cool homes naturally with fresh air circulation.", photoDesc: "Фото: открытые французские двери — ветер и свежий воздух в комнате", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Mechanical Simplicity", desc: "Hinged mechanism is reliable for decades. No tracks to clean, no rollers to fail.", photoDesc: "Фото: петли французской двери — надёжный механизм", icon: "M11.42 15.17l-5.658-5.658a1 1 0 010-1.414l5.658-5.658m0 0L15.66 6.9a1 1 0 010 1.414L9.82 14.172" },
            { title: "Flexible Configurations", desc: "Single, double, triple, with sidelights and transoms. Fully customizable.", photoDesc: "Фото: различные конфигурации французских дверей — от одинарной до тройной", icon: "M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" },
          ].map((b) => (
            <div key={b.title} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-blue-accent/20 transition-all">
              <PhotoPlaceholder description={b.photoDesc} height="h-40" className="rounded-none border-0" />
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-light flex items-center justify-center mt-0.5">
                    <svg className="w-4.5 h-4.5 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-text-primary mb-1 group-hover:text-blue-accent transition-colors">{b.title}</h2>
                    <p className="text-sm text-text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Configurations */}
      <Section gray>
        <SectionTitle badge="Configurations" title="Opening Options" subtitle="Flexible designs that match your space and aesthetic." />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Single French Door", desc: "One-panel swing for interior passages and narrow openings. 36-42\" widths.", photoDesc: "Фото: одинарная французская дверь — вид из коридора" },
            { name: "Double French Doors", desc: "Two matching doors swing open from center. 60-72\" total. Classic choice.", photoDesc: "Фото: двойные французские двери — симметричный вход на террасу" },
            { name: "With Sidelights", desc: "Pair flanked by fixed glass panels. Maximum light and architectural presence.", photoDesc: "Фото: двойные французские двери с боковыми стеклянными панелями" },
            { name: "With Transom", desc: "Fixed transom window above extends height. Additional light and ventilation.", photoDesc: "Фото: французские двери с фрамугой сверху — высокий потолок" },
          ].map((config) => (
            <div key={config.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={config.photoDesc} height="h-48" className="rounded-none border-0" />
              <div className="p-6">
                <h2 className="font-bold text-text-primary text-lg mb-2">{config.name}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{config.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Materials */}
      <MaterialsSection />

      {/* Technical Specs */}
      <Section>
        <SectionTitle badge="Specifications" title="Technical Data" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {[
              ["Door Type", "Hinged swing, 45° arc"],
              ["Frame Material", "uPVC, aluminum, or composite"],
              ["Glass Type", "Tempered, insulated, argon fill"],
              ["U-Value", "0.9-1.3 W/m²K"],
              ["Sound Insulation", "STC 30-38 dB"],
              ["Standard Widths", "Single: 32-42\" / Double: 60-72\""],
              ["Lock Points", "3-5 per door"],
              ["Hinge Type", "Concealed or visible"],
              ["Weathersealing", "Compression seals + gaskets"],
              ["Lifespan", "40-50 years"],
            ].map(([label, value], i) => (
              <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
                <span className="text-sm text-text-primary font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <PhotoPlaceholder description="Фото: разрез рамы французской двери — видны уплотнители, стеклопакет, армирование" height="h-[400px]" />
        </div>
      </Section>

      {/* French vs Sliding */}
      <Section gray>
        <SectionTitle title="French Doors vs. Sliding Doors" />
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-brand text-white">
                <th className="px-5 py-3.5 text-left font-medium">Feature</th>
                <th className="px-5 py-3.5 text-center font-medium">French Doors</th>
                <th className="px-5 py-3.5 text-center font-medium">Sliding Doors</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Visual Appeal", "Elegant, symmetrical, timeless", "Contemporary, functional"],
                ["Opening Width", "100% — full open", "50% — one panel slides"],
                ["Mechanism", "Simple hinge", "Track & roller system"],
                ["Maintenance", "Minimal — hinge lube", "Moderate — track cleaning"],
                ["Airflow", "Excellent cross-ventilation", "Good — one side"],
                ["Best For", "Elegance, traditional homes", "Large openings, modern spaces"],
              ].map(([label, french, sliding], i) => (
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
        <SectionTitle badge="Gallery" title="French Doors in Real Homes" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PhotoPlaceholder description="Фото: белые французские двери в загородном доме — выход в сад" height="h-48" />
          <PhotoPlaceholder description="Фото: антрацитовые французские двери — современный интерьер" height="h-48" />
          <PhotoPlaceholder description="Фото: тройная конфигурация французских дверей — панорамный вид" height="h-48" />
          <PhotoPlaceholder description="Фото: интерьерные французские двери между гостиной и столовой" height="h-48" />
        </div>
      </Section>

      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section>
        <SectionTitle badge="Resources" title="Expert Guides" />
        <div className="grid md:grid-cols-3 gap-6">
          <GuideCard title="Entry & Front Doors" desc="Premium security and design for your main entrance." href="/doors/entry-doors" photoDesc="Фото: парадная входная дверь DECA" />
          <GuideCard title="Sliding Patio Doors" desc="Panoramic openings up to 20 feet wide." href="/sliding-doors" photoDesc="Фото: раздвижная панорамная дверь" />
          <GuideCard title="Technology & Performance" desc="Learn about our European engineering and energy efficiency." href="/performance" photoDesc="Фото: технические характеристики окон и дверей DECA" />
        </div>
      </Section>

      {/* ═══════ PROCESS ═══════ */}
      <ProcessSection />

      <CTAWithDocs
        title="Add Elegance with French Doors"
        subtitle="Get your custom order form, door blueprints, and detailed specification — all prepared for your project."
        btnText="Get Custom Quote"
      />

      {/* FAQ */}
      <Section gray>
        <SectionTitle badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            ["Are French doors difficult to operate?", "No. Quality hinges and well-adjusted mechanisms ensure smooth operation. Optional foot bolts hold doors open in wind."],
            ["Can French doors be used in cold climates?", "Absolutely. With insulated glazing and thermal breaks, U-values are competitive with windows. Triple glazing available."],
            ["What glass patterns are available?", "Frosted, decorative, textured, and laminated glass. Preserve elegance while controlling privacy."],
            ["Do French doors meet energy codes?", "Yes. Triple-glazed insulated units achieve U-values of 0.9-1.3, meeting ENERGY STAR and state building codes."],
            ["How do I choose between French and sliding?", "French for elegance and full opening. Sliding for large panoramic openings in contemporary spaces. We'll help you decide."],
          ].map(([q, a]) => (
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
