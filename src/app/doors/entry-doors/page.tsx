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

export const metadata: Metadata = {
  title: "Entry Doors & Front Doors | Secure European Design | DECA Windows",
  description: "Premium entry doors with multi-point locking (5-7 points), RC2/RC3 security, and U-value 0.8-1.2. Sidelights, transoms, custom options.",
  alternates: { canonical: "/doors/entry-doors" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How secure are multi-point locking entry doors?", "acceptedAnswer": { "@type": "Answer", "text": "Multi-point locking distributes force across 5-7 points on the entire frame, making forced entry virtually impossible. DECA entry doors are RC2/RC3 certified — RC2 resists 3-5 minutes of attack, RC3 resists 10+ minutes. This is far superior to single deadbolts." } },
    { "@type": "Question", "name": "What are the energy efficiency benefits of premium entry doors?", "acceptedAnswer": { "@type": "Answer", "text": "DECA entry doors achieve U-values of 0.8-1.2 W/m²K, compared to standard doors at 1.5-2.5. This typically saves $200-400 annually in heating/cooling costs. Triple compression seals prevent drafts and heat loss." } },
    { "@type": "Question", "name": "Can I customize entry doors with sidelights and transoms?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. DECA offers fixed glass sidelights and transom windows in matching materials and finishes. All glass is tempered safety glass. Configurations can be single, double, or triple panel with full customization." } },
    { "@type": "Question", "name": "What materials are available for entry doors?", "acceptedAnswer": { "@type": "Answer", "text": "DECA manufactures entry doors in uPVC, aluminum, and composite materials. All offer 40-50 year lifespans with multi-point locking, RC security certification, and customizable colors. Choose based on your aesthetic preferences and climate." } },
  ],
};

export default function EntryDoorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Doors", href: "/doors" }, { label: "Entry Doors" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">Secure Entry</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">Entry & Front Doors</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                First impressions matter. European-engineered entry doors with multi-point locking, weather seals, and timeless design. Security, thermal performance, and elegance.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/quote" className="bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">Get Custom Quote</Link>
                <Link href="/doors" className="border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors">All Doors</Link>
              </div>
            </div>
            <PhotoPlaceholder 
              description="Фото: входная дверь DECA — современный дизайн, боковые стеклянные панели, вечернее освещение" 
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
            stats={[
              { value: 7, label: "Lock Points", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
              { value: 3, prefix: "RC", label: "Security Rating", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
              { value: 0.8, label: "Best U-Value (W/m²K)", decimals: 1, icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg> },
              { value: 50, suffix: "+", label: "Year Lifespan", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ]}
          />
        </div>
      </section>

      {/* Configurator */}
      <EntryDoorConfigurator />

      {/* Security */}
      <Section>
        <SectionTitle badge="Security" title="Multi-Point Locking System" subtitle="5-7 lock points engage simultaneously across the entire frame." />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {[
              { title: "Top Lock Points", desc: "Secure upper frame, prevent top prying" },
              { title: "Center Deadbolt", desc: "Primary lock, centrally located" },
              { title: "Bottom Lock Points", desc: "2-3 points secure lower frame against forcing" },
              { title: "Compression Seals", desc: "All lock points compress frame seals when engaged" },
            ].map((lp) => (
              <div key={lp.title} className="flex gap-3 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h2 className="font-semibold text-text-primary text-sm">{lp.title}</h2>
                  <p className="text-xs text-text-muted">{lp.desc}</p>
                </div>
              </div>
            ))}
            <div className="bg-blue-light rounded-lg p-4 border border-blue-accent/20 mt-4">
              <p className="text-sm font-semibold text-text-primary mb-1">RC2/RC3 Certification</p>
              <p className="text-xs text-text-secondary">RC2 resists 3-5 min of attack; RC3 resists 10+ min. DECA doors available in both.</p>
            </div>
          </div>
          <PhotoPlaceholder 
            description="Фото: схема многоточечного замка входной двери — все точки запирания обозначены" 
            height="h-96"
          />
        </div>
      </Section>

      {/* Materials */}
      <MaterialsSection />

      {/* Technical Specs */}
      <Section gray>
        <SectionTitle badge="Performance" title="Technical Specifications" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {[
              ["Construction", "Solid core / foam-insulated + steel"],
              ["U-Value", "0.8-1.2 W/m²K"],
              ["Weathersealing", "Triple compression seals"],
              ["Lock Points", "5-7 depending on size"],
              ["Security", "RC2/RC3 certified"],
              ["Width", "32-48\" (custom to 60\")"],
              ["Height", "80\" standard (custom available)"],
              ["Material", "uPVC, aluminum, or composite"],
              ["Glass", "Tempered safety glass"],
              ["Lifespan", "40-50 years"],
            ].map(([label, value], i) => (
              <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
                <span className="text-sm text-text-primary font-semibold">{value}</span>
              </div>
            ))}
          </div>
          <img src="https://gealanwindows.com/app/uploads/2024/09/S-8000-2595x8001x8081_00191668-scaled.webp" alt="Entry door profile cross-section showing foam insulation, steel reinforcement, and weather seals" className="w-full h-[420px] object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6" loading="lazy" />
        </div>
      </Section>

      {/* Design Options */}
      <Section>
        <SectionTitle badge="Customization" title="Design Options" subtitle="Customize your entry to match your home's architecture." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Panel Configurations", desc: "Single, double, triple. Solid or glazed.", photoDesc: "Фото: варианты конфигураций входных дверей — одна, две, три створки" },
            { title: "Sidelights & Transoms", desc: "Fixed glass panels for natural light.", photoDesc: "Фото: входная дверь с боковыми стеклянными панелями и фрамугой сверху" },
            { title: "Glass Styles", desc: "Clear, frosted, decorative, laminated.", photoDesc: "Фото: образцы стёкол для входных дверей — матовое, декоративное, прозрачное" },
            { title: "Hardware Styles", desc: "Contemporary pulls, classic handles, Euro levers.", photoDesc: "Фото: различная фурнитура для входных дверей — ручки, замки, петли" },
            { title: "Colors & Finishes", desc: "50+ RAL colors, wood-grain, anodized.", photoDesc: "Фото: палитра цветов для входных дверей — образцы профилей" },
            { title: "Material Options", desc: "uPVC, aluminum, or composite.", photoDesc: "Фото: три материала входных дверей — uPVC, алюминий, композит — рядом" },
          ].map((opt) => (
            <div key={opt.title} className="bg-warm-gray rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder 
                description={opt.photoDesc} 
                height="h-36" 
                className="rounded-none border-0"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-text-primary text-sm mb-1">{opt.title}</h3>
                <p className="text-xs text-text-muted">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section gray>
        <SectionTitle badge="Gallery" title="Entry Doors in Real Homes" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PhotoPlaceholder 
            description="Фото: парадная входная дверь с боковыми панелями — классический стиль" 
            height="h-48"
          />
          <PhotoPlaceholder 
            description="Фото: современная входная дверь — антрацит, минималистичная ручка" 
            height="h-48"
          />
          <PhotoPlaceholder 
            description="Фото: двустворчатая входная дверь с декоративным остеклением" 
            height="h-48"
          />
          <PhotoPlaceholder 
            description="Фото: входная дверь с фрамугой — вечернее освещение крыльца" 
            height="h-48"
          />
        </div>
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section gray>
        <SectionTitle badge="Resources" title="Expert Guides" />
        <div className="grid md:grid-cols-3 gap-6">
          <GuideCard
            title="Entry Door Security Guide"
            desc="Multi-point locking vs deadbolts — a complete comparison."
            href="/blog"
            photoDesc="Фото: сравнение многоточечного замка и обычного дедболта"
          />
          <GuideCard
            title="French Swing Doors"
            desc="Classic elegance for indoor-outdoor transitions."
            href="/doors/french-doors"
            photoDesc="Фото: французские двери в интерьере — свет и простор"
          />
          <GuideCard
            title="Sliding Patio Doors"
            desc="Panoramic openings for modern living."
            href="/sliding-doors"
            photoDesc="Фото: панорамная раздвижная дверь с видом на террасу"
          />
        </div>
      </Section>

      <CTAWithDocs
        title="Ready to Upgrade Your Entry?"
        subtitle="Get your custom order form, door blueprints, and detailed specification — all prepared for your project."
        btnText="Get Custom Quote"
      />

      {/* FAQ */}
      <Section>
        <SectionTitle badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            ["How secure are multi-point locking doors?", "Significantly more secure than single deadbolts. 5-7 lock points distribute force across the frame, making forced entry virtually impossible. RC2/RC3 tested."],
            ["Will entry doors reduce energy costs?", "Yes. U-values of 0.8-1.2 (vs 1.5-2.5 standard) typically save $200-400 annually in heating/cooling."],
            ["Can I get sidelights and transoms?", "Absolutely. Fixed glass sidelights and transom windows in matching materials and finishes. All glass is tempered."],
            ["What's the difference between RC2 and RC3?", "RC2: 3-5 min resistance. RC3: 10+ min. RC3 for high-value homes; RC2 meets typical residential needs."],
            ["How long do entry doors last?", "40-50 years with minimal maintenance. Backed by comprehensive DECA warranties."],
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

      <StickyCTA />
    </>
  );
}
