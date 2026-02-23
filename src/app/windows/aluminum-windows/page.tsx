import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder, GuideCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStats from "@/components/AnimatedStats";
import GalleryLightbox from "@/components/GalleryLightbox";

export const metadata: Metadata = {
  title: "Aluminum Windows | Modern European Design | DECA Windows",
  description: "Contemporary aluminum windows with thermal break technology. Slim profiles, maximum glass area, modern aesthetics. Ideal for commercial and modern residential.",
  alternates: { canonical: "/windows/aluminum-windows" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a thermal break in aluminum windows?", "acceptedAnswer": { "@type": "Answer", "text": "A thermal break is a polyamide strip (14-20mm thick) that physically separates the exterior and interior aluminum frames. Aluminum conducts heat 200x faster than uPVC, so this barrier interrupts the thermal bridge. DECA's polyamide breaks reduce heat transfer by 200x, achieving U-values of 0.20-0.30 W/m²K." } },
    { "@type": "Question", "name": "How strong are aluminum windows compared to uPVC?", "acceptedAnswer": { "@type": "Answer", "text": "Aluminum is 3-4x stronger than uPVC. This allows for thinner profiles (as narrow as 1.75 inches) while supporting large unsupported spans, heavy tempered glass, and minimal deflection. Perfect for modern floor-to-ceiling glass walls and commercial applications." } },
    { "@type": "Question", "name": "What color options are available for aluminum windows?", "acceptedAnswer": { "@type": "Answer", "text": "Unlimited RAL colors via powder coating plus anodized finishes in matte, brushed, or polished. Two-tone configurations allow different interior/exterior colors. Custom wood-grain laminates are also available. All finishes are UV-stable and maintenance-free." } },
    { "@type": "Question", "name": "How do aluminum windows compare to uPVC in price?", "acceptedAnswer": { "@type": "Answer", "text": "Aluminum windows typically cost 20-40% more than uPVC due to stronger materials and thermal break engineering. However, the slim profiles maximize glass area and architectural impact. Aluminum is ideal for commercial applications and homes prioritizing modern aesthetics." } },
  ],
};

export default function AluminumWindowsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[{ label: "Windows", href: "/windows" }, { label: "Aluminum Windows" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">Modern Design</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">Aluminum Windows</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Contemporary aesthetics meets European engineering. Slim profiles, maximum glass area, and architectural flexibility for modern residential and commercial applications.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/quote" className="bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">Get Custom Quote</Link>
                <Link href="/professionals" className="border border-border text-text-primary hover:border-blue-accent/30 px-7 py-3.5 rounded font-semibold transition-colors">Architect Resources</Link>
              </div>
            </div>
            <img src="https://gealanwindows.com/app/uploads/2024/09/GEALAN-LINEAR-15.webp" alt="Modern aluminum window with slim profiles and panoramic glazing in contemporary home" className="w-full h-[450px] object-cover rounded-xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={[
              { value: 92, suffix: "%", label: "Glass Area", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> },
              { value: 0.20, label: "Best U-Value (W/m²K)", decimals: 2, icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg> },
              { value: 1.75, suffix: '"', label: "Slimmest Profile", decimals: 2, icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" /></svg> },
              { value: 50, suffix: "+", label: "Year Lifespan", icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
            ]}
          />
        </div>
      </section>

      {/* Configurator */}
      <WindowConfigurator />

      {/* Why Aluminum */}
      <Section>
        <SectionTitle badge="Advantages" title="Why Choose Aluminum?" subtitle="The cutting edge of modern window design." />
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Architectural Freedom", desc: "Thinner profiles (as narrow as 1.75 inches) maximize glass area. Corner-to-corner glass is achievable only with aluminum.", photoDesc: "Фото: угловое остекление алюминиевым профилем — минималистичный дизайн" },
            { title: "Modern Aesthetics", desc: "Crisp lines, precision-welded corners. Matte, brushed, anodized, or powder-coated finishes in unlimited colors.", photoDesc: "Фото: крупный план алюминиевого профиля — тонкая рамка, чистые линии" },
            { title: "Structural Strength", desc: "3-4x stronger than uPVC. Large unsupported spans, heavy tempered glass, minimal deflection.", photoDesc: "Фото: панорамное окно от пола до потолка — алюминиевый каркас" },
            { title: "Commercial Applications", desc: "Storefronts, curtain walls, modular assembly. Commercial-grade systems for retail, office, hospitality.", photoDesc: "Фото: коммерческое здание с алюминиевым фасадным остеклением DECA" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <PhotoPlaceholder description={item.photoDesc} height="h-48" className="rounded-none border-0" />
              <div className="p-6">
                <h2 className="font-bold text-lg text-text-primary mb-2">{item.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Thermal Break */}
      <Section gray>
        <SectionTitle badge="Engineering" title="Thermal Break Technology" subtitle="How DECA achieves energy efficiency with aluminum." />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">
              Aluminum conducts heat 200x faster than uPVC. DECA's solution: polyamide thermal breaks — synthetic strips that physically separate interior and exterior frames, interrupting the thermal bridge.
            </p>
            <div className="space-y-4">
              {[
                { step: "1", title: "Polyamide Barrier", desc: "15-25mm strips between exterior and interior aluminum" },
                { step: "2", title: "Thermal Interruption", desc: "Conducts heat 1/200th as efficiently as aluminum" },
                { step: "3", title: "Interior Warmth", desc: "Prevents condensation, improves comfort" },
                { step: "4", title: "Energy Savings", desc: "U-values of 0.20-0.30 with triple glazing" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-blue-accent text-white flex items-center justify-center text-sm font-bold">{s.step}</span>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{s.title}</h3>
                    <p className="text-xs text-text-muted">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://gealanwindows.com/app/uploads/2024/09/7001x7072x7242_00163072_GK-grau.webp" alt="Aluminum window profile cross-section showing polyamide thermal break inserts and chambers" className="w-full h-96 object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8" loading="lazy" />
        </div>
      </Section>

      {/* Technical Specs */}
      <Section>
        <SectionTitle badge="Specifications" title="Technical Data" />
        <div className="bg-white rounded-xl border border-border overflow-hidden max-w-3xl mx-auto">
          {[
            ["Frame Profile", "50-80mm depth, 1.75-2.25\" slim profiles"],
            ["Material", "6063-T5 aluminum + polyamide thermal breaks"],
            ["Thermal Break", "14-20mm polyamide strips"],
            ["Glass Area", "Up to 92% coverage"],
            ["U-Value", "0.20-0.30 W/m²K (thermally broken)"],
            ["Corner Welding", "Precision 45° mitered corners"],
            ["Lock Points", "6-10 multi-point locking"],
            ["Glass Options", "Double, triple, laminated, tempered"],
            ["Finish Options", "RAL anodized, powder-coat, brushed, matte"],
            ["Fire Rating", "Up to 2-hour rated assemblies"],
          ].map(([label, value], i) => (
            <div key={label} className={`flex justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <span className="text-sm text-text-primary font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section gray>
        <SectionTitle title="Aluminum vs. uPVC" subtitle="Which is right for your project?" />
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-sm">
            <thead>
              <tr className="bg-navy-950 text-white">
                <th className="px-5 py-3.5 text-left font-medium">Criterion</th>
                <th className="px-5 py-3.5 text-center font-medium">Aluminum</th>
                <th className="px-5 py-3.5 text-center font-medium">uPVC</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["U-Value", "0.20-0.30", "0.10-0.25"],
                ["Profile Width", "1.75-2.25\" (slim)", "2.75-3.5\""],
                ["Glass Area", "Up to 92%", "Up to 70%"],
                ["Strength", "Superior — large spans", "Good — moderate"],
                ["Aesthetics", "Minimalist, contemporary", "Traditional options"],
                ["Sound Insulation", "32-40 dB", "42-50 dB"],
                ["Cost", "Higher", "Lower"],
                ["Best For", "Modern / Commercial", "Residential"],
              ].map(([label, alum, upvc], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                  <td className="px-5 py-3.5 font-medium text-text-secondary">{label}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{alum}</td>
                  <td className="px-5 py-3.5 text-center text-text-primary">{upvc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionTitle badge="Our Work" title="Aluminum Windows in Projects" subtitle="DECA aluminum windows in residential and commercial applications." />
        <GalleryLightbox
          alt="DECA aluminum window installation"
          items={[
            { src: "/assets/gallery/gallery-1.webp", tall: true },
            { src: "/assets/gallery/gallery-2.webp", tall: true },
            { src: "/assets/gallery/gallery-3.webp" },
            { src: "/assets/gallery/gallery-4.webp" },
            { src: "/assets/gallery/gallery-5.webp" },
            { src: "/assets/gallery/gallery-6.webp" },
            { src: "/assets/gallery/gallery-7.webp" },
            { src: "/assets/gallery/gallery-8.webp" },
          ]}
        />
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* Expert Guides */}
      <Section>
        <SectionTitle badge="Resources" title="Expert Guides" />
        <div className="grid md:grid-cols-3 gap-6">
          <GuideCard title="uPVC vs Aluminum: Full Guide" desc="Complete material comparison for your project." href="/windows/upvc-windows" photoDesc="Фото: два профиля рядом — uPVC и алюминий" />
          <GuideCard title="Thermal Break Technology" desc="How polyamide strips transform aluminum performance." href="/performance" photoDesc="Фото: схема работы термомоста в алюминиевом профиле" />
          <GuideCard title="Architect Resources" desc="BIM data, specs, and support for professionals." href="/professionals" photoDesc="Фото: архитектор за работой с чертежами окон DECA" />
        </div>
      </Section>

      <CTAWithDocs
        title="Ready for Contemporary Aluminum Windows?"
        subtitle="Get your custom order form, window blueprints, and detailed specification — all prepared for your project."
        btnText="Get Custom Quote"
      />

      {/* FAQ */}
      <Section gray>
        <SectionTitle badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            ["Aren't aluminum windows cold and inefficient?", "Not with thermal breaks. DECA's polyamide breaks achieve U-values of 0.20-0.30 — equivalent to uPVC. The key is specifying thermally-broken systems."],
            ["Can aluminum handle large, heavy glass?", "Yes — aluminum's primary advantage. Large tempered panes, full-height glass walls are feasible only with aluminum's strength."],
            ["What about condensation?", "Thermal-break systems keep interior surfaces warm, minimizing condensation. Always specify thermal breaks for heated spaces."],
            ["Are custom colors available?", "Unlimited RAL colors via powder coating, plus anodized finishes. Two-tone configurations with different interior/exterior colors."],
            ["What's the cost difference vs uPVC?", "Typically 20-40% more, but slim profiles maximize glass area and architectural impact often justifies the premium."],
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
