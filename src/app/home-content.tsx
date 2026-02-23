"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Section, SectionTitle, PhotoPlaceholder, ProductCard, ServiceIcons, GuideCard, AnimatedCTA } from "@/components/ui";
import AnimatedStatCard from "@/components/AnimatedStatCard";
import { cases } from "@/data/cases";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import ProcessSection from "@/components/ProcessSection";
import LeadMagnet from "@/components/LeadMagnet";

/* ===== Feature Tabs Data (Figma: Silence, Warmth, Convenience, Lifespan, Safety) ===== */
const featureTabs = [
  {
    id: "silence", label: "Silence",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>,
    title: "Engineered for Silence",
    description: "Our windows reduce noise by up to 95%, turning your home into a peaceful sanctuary. Robust 2.75-inch frames with six internal chambers effectively dampen sound waves, while advanced EPDM seals create a tight barrier against external noise. Multi-layered glass panels with soundproofing properties and multi-point locking systems ensure exceptional noise reduction.",
    photoDesc: "Фото: демонстрация шумоизоляции — разрез профиля с 6 камерами, звуковые волны, dB-шкала",
  },
  {
    id: "warmth", label: "Warmth",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>,
    title: "Warmth and Comfort",
    description: "Reduce heat loss by up to 35% with triple-pane glass and multi-chambered frames. These innovations maintain a comfortable environment regardless of the weather, ensuring energy efficiency even in extreme climates.",
    photoDesc: "Фото: тепловизионный снимок окна, сравнение температур снаружи и внутри",
  },
  {
    id: "convenience", label: "Convenience",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: "Convenience Made Simple",
    description: "DECA windows and doors are easy to use and require minimal maintenance. Intuitive handles and hardware provide smooth, straightforward operation, while inward-opening windows make cleaning effortless. Ventilation features allow fresh air to flow in while maintaining security and comfort.",
    photoDesc: "Фото: демонстрация режимов открывания — поворотно-откидное окно в двух положениях",
  },
  {
    id: "lifespan", label: "Lifespan",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Built to Last",
    description: "uPVC frames reinforced with galvanized steel and durable materials ensure a lifespan of over 50 years. Inspired by the reliability of German-engineered windows still in use since 1972, our thick frames and up to 12 locking points guarantee unmatched strength and longevity.",
    photoDesc: "Фото: крупный план усиленного стального армирования внутри uPVC профиля",
  },
  {
    id: "safety", label: "Safety",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: "Maximum Protection",
    description: "Up to 12 locking points, reinforced frames, and impact-resistant glass provide maximum security for your home. Rest assured, your loved ones are safe, and your home remains protected at all times.",
    photoDesc: "Фото: крупный план многоточечного замка с 12 точками запирания",
  },
];

export default function HomeContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("silence");
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const activeFeature = featureTabs.find((t) => t.id === activeTab)!;

  return (
    <>
      {/* ===== HERO with YouTube Video Background ===== */}
      <section className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/noGgLNCpZGM?autoplay=1&mute=1&loop=1&playlist=noGgLNCpZGM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&start=0&cc_load_policy=0&fs=0"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 border-0"
            title="DECA Windows & Doors"
            style={{
              transform: "translate(-50%, -50%) scale(1.25)",
              width: "max(100%, 177.78vh)",
              height: "max(100%, 56.25vw)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-40 min-h-[85vh] flex items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-white/50 text-[11px] font-medium tracking-widest uppercase mb-5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              Westfield, Massachusetts
            </span>
            <h1 className="text-3xl md:text-[44px] font-bold text-white leading-[1.15] mb-4 tracking-tight">
              European Energy-Efficient Windows & Doors Built in USA
            </h1>
            <p className="text-sm md:text-base text-white/50 mb-8 leading-relaxed max-w-md">
              Factory-direct PVC & Aluminum systems. 15-year warranty, U-value&nbsp;0.10, noise reduction up to&nbsp;50&nbsp;dB.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <AnimatedCTA href="/windows" id="hero">Explore Products</AnimatedCTA>
              <Link href="/quote" className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/80 px-6 py-3 rounded text-sm font-medium transition-colors">
                Request a Quote
              </Link>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-white/80 text-xs font-medium">Energy Star Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-white/80 text-xs font-medium">NFRC Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5">
                <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <span className="text-white/80 text-xs font-medium">Passive House Ready</span>
              </div>
            </div>
          </div>
          {/* Hero quick-quote form */}
          <div className="hidden lg:block absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 w-80">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-1">Get a Free Quote</h2>
              <p className="text-white/50 text-xs mb-4">Tell us about your project</p>
              <form className="space-y-3" onSubmit={async (e) => {
                e.preventDefault();
                setHeroSubmitting(true);
                const fd = new FormData(e.currentTarget);
                try {
                  const res = await fetch("/api/quote", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firstName: fd.get("heroName") as string,
                      lastName: "",
                      email: fd.get("heroEmail") as string,
                      phone: fd.get("heroPhone") as string,
                      projectType: `Hero: ${fd.get("heroProject") as string}`,
                      message: "",
                      configuration: "",
                    }),
                  });
                  if (!res.ok) throw new Error("Failed");
                  router.push("/thank-you");
                } catch { setHeroSubmitting(false); }
              }}>
                <input name="heroName" type="text" placeholder="Your name" aria-label="Your name" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40" />
                <input name="heroEmail" type="email" placeholder="Email address" aria-label="Email address" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40" />
                <input name="heroPhone" type="tel" placeholder="Phone number" aria-label="Phone number" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40" />
                <select name="heroProject" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white/60 text-sm focus:outline-none focus:border-white/40 appearance-none">
                  <option value="">Project type</option>
                  <option value="new">New Construction</option>
                  <option value="replacement">Window Replacement</option>
                  <option value="renovation">Full Renovation</option>
                  <option value="commercial">Commercial Project</option>
                </select>
                <button type="submit" disabled={heroSubmitting} className="w-full bg-[#e8873a] hover:bg-[#d4792f] disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
                  {heroSubmitting ? "Sending..." : "Get Free Estimate"}
                </button>
              </form>
              <p className="text-white/30 text-[10px] mt-3 text-center">Response within 24 hours • No obligation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Product Cards (Figma: 2x2 grid) ===== */}
      <Section className="relative z-10 -mt-16 rounded-t-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductCard title="Tilt & Turn European Windows" subtitle="Premium tilt & turn system with triple glazing" href="/tilt-turn" photoDesc="Фото: поворотно-откидное окно в интерьере, вид на открытое окно в режиме поворота" />
          <ProductCard title="Sliding Doors" subtitle="PSk, Lift & Slide, and DECA Roto systems" href="/sliding-doors" photoDesc="Фото: панорамная раздвижная дверь с видом на сад/террасу" />
          <ProductCard title="Swing (French) Doors" subtitle="Classic elegance with European hardware" href="/doors/french-doors" photoDesc="Фото: распашные французские двери в светлом интерьере" />
          <ProductCard title="Entry Doors" subtitle="Secure, insulated, custom-designed entrance" href="/doors/entry-doors" photoDesc="Фото: парадная входная дверь DECA в фасаде дома" />
        </div>
      </Section>

      {/* ===== FEATURE TABS (Figma: Silence, Warmth, Convenience, Lifespan, Safety) ===== */}
      <Section gray>
        <div className="flex justify-center gap-1 mb-12 border-b border-border flex-wrap">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id ? "border-blue-accent text-blue-accent" : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="py-2">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{activeFeature.title}</h2>
            <p className="text-text-secondary leading-relaxed text-[15px] mb-5">{activeFeature.description}</p>
            <Link href="/performance" className="inline-flex items-center gap-2 text-blue-accent font-medium hover:text-blue-hover transition-colors">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <PhotoPlaceholder description={activeFeature.photoDesc} height="h-72" />
        </div>
      </Section>

      {/* ===== Customer Stories / Use Cases — Horizontal Scroll ===== */}
      <Section>
        <SectionTitle badge="Customer Stories" title="Real Homes. Real Results." subtitle="See how DECA windows transform comfort, energy bills, and everyday living." />
        <div className="relative -mx-4 sm:-mx-6">
          {/* Scrollable container */}
          <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {cases.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group flex-none w-[85vw] sm:w-[420px] snap-start bg-white rounded-xl border border-border overflow-hidden transition-all hover:shadow-xl hover:border-blue-accent/20"
              >
                <PhotoPlaceholder description={c.photoDesc} height="h-44" className="rounded-none border-0" />
                <div className="p-5">
                  {/* Tags + CTA row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex gap-1.5">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-brand bg-brand/10 px-2 py-0.5 rounded-full">{c.type}</span>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted bg-warm-gray px-2 py-0.5 rounded-full">{c.location}</span>
                    </div>
                    <span className="text-blue-accent text-xs font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary text-[15px] leading-snug mb-1.5 group-hover:text-blue-accent transition-colors">{c.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">{c.summary}</p>
                  {/* Compact stats row */}
                  <div className="flex items-center gap-1">
                    {c.results.slice(0, 3).map((r, i) => (
                      <div key={r.label} className="flex items-center gap-1">
                        {i > 0 && <span className="text-border mx-1">·</span>}
                        <span className="text-sm font-bold text-brand">{r.value}</span>
                        <span className="text-[10px] text-text-muted">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            {/* "View all" card */}
            <Link
              href="/cases"
              className="group flex-none w-[200px] snap-start bg-warm-gray rounded-xl border border-border flex flex-col items-center justify-center text-center p-6 hover:border-blue-accent/20 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-blue-accent/10 flex items-center justify-center mb-3 group-hover:bg-blue-accent/20 transition-colors">
                <svg className="w-5 h-5 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
              <span className="text-sm font-semibold text-text-primary group-hover:text-blue-accent transition-colors">View All Stories</span>
              <span className="text-xs text-text-muted mt-1">{cases.length} case studies</span>
            </Link>
          </div>
          {/* Scroll fade hints */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
      </Section>

      {/* ===== Exceptional Service (Figma: 4 icons row) ===== */}
      <Section gray>
        <SectionTitle badge="Why DECA" title="Exceptional Service in Massachusetts" subtitle="Local manufacturing, expert support, and a seamless experience from quote to installation." />
        <ServiceIcons />
      </Section>

      {/* ===== CTA Block (Figma: blue bg — "Got Questions?") ===== */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Got Questions? We&apos;re Here to Help!</h2>
          <p className="text-white/60 text-[15px] mb-6">Call us directly or request a callback — our team responds within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedCTA href="/quote" size="lg" id="warranty">Request a Quote</AnimatedCTA>
            <a href="tel:+14137714457" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              (413) 771-4457
            </a>
          </div>
        </div>
      </section>

      {/* ===== Warranty (Figma) ===== */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle align="left" badge="Peace of Mind" title="Warranty Commitments & Free Technical Support" subtitle="Every DECA product comes with a 15-year transferable warranty covering frames, glass units, and all hardware. Our in-house team provides free technical support for the lifetime of your windows." />
            <div className="grid grid-cols-2 gap-6">
              <AnimatedStatCard value="15 yr" label="Transferable Warranty" />
              <AnimatedStatCard value="Free" label="Technical Support" />
              <AnimatedStatCard value="48 hr" label="Response Time" />
              <AnimatedStatCard value="100%" label="Parts Coverage" />
            </div>
          </div>
          <PhotoPlaceholder description="Фото: сертификат гарантии DECA, или техник на объекте у заказчика" height="h-96" />
        </div>
      </Section>

      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection showServiceIcons={false} />

      {/* ===== Professionals (Figma: 3 cards — Contractors, Architects, Dealers) ===== */}
      <Section>
        <SectionTitle badge="B2B" title="Solutions Built for Professionals" subtitle="Special programs, pricing, and support for industry professionals." />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "For Building Contractors", desc: "Volume pricing, priority delivery, and dedicated project support. Streamline your builds with factory-direct European windows.", href: "/professionals#contractors", photoDesc: "Фото: подрядчик/строитель на объекте, монтаж окон DECA" },
            { title: "For Architects", desc: "Custom configurations, CAD drawings, technical specifications, and sample programs. Design without compromise.", href: "/professionals#architects", photoDesc: "Фото: архитектор за рабочим столом с чертежами, окно DECA на фоне" },
            { title: "For Dealers", desc: "Become a DECA dealer. Competitive margins, marketing support, showroom displays, and training programs.", href: "/professionals#dealers", photoDesc: "Фото: шоурум DECA с образцами окон и дверей" },
          ].map((p) => (
            <Link key={p.title} href={p.href} className="group block">
              <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <PhotoPlaceholder description={p.photoDesc} height="h-44" className="rounded-none border-0" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:text-blue-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== About DECA — Founder story ===== */}
      <section className="py-28 bg-brand text-white relative overflow-hidden">
        {/* Blueprint grid texture */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.04 }}>
          <defs><pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Photo column */}
          <div className="md:col-span-2 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <PhotoPlaceholder description="Фото: Владимир, основатель DECA — портрет на фоне производства или шоурума" height="h-full" className="rounded-2xl border-0 absolute inset-0" />
              {/* Gradient overlay at bottom for name */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <p className="text-white font-bold text-lg">Vladimir</p>
                <p className="text-white/60 text-sm">Founder & CEO, DECA Windows</p>
              </div>
            </div>
          </div>
          {/* Text column */}
          <div className="md:col-span-3">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-accent/80 mb-4">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">&ldquo;We didn&rsquo;t come to America to sell windows. We came to change what American homeowners expect from a window.&rdquo;</h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-xl">Born and raised in Europe, Vladimir spent 20+ years in the window industry before founding DECA in Westfield, Massachusetts. His mission: bring true European engineering — triple-pane glass, multi-point locks, thermal-break frames — to every home in New England, at a fair price, with a personal touch.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <AnimatedStatCard value="500+" label="Homes Fitted" light />
              <AnimatedStatCard value="0.10" label="Best U-Value" light />
              <AnimatedStatCard value="15 yr" label="Full Warranty" light />
              <AnimatedStatCard value="50+" label="Years Lifespan" light />
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-blue-accent hover:text-blue-accent/80 font-medium transition-colors">
              Learn about our story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* ===== Expert Guides (Figma: 3 cards) ===== */}
      <Section gray>
        <SectionTitle badge="Resources" title="Expert Guides and Instructions" subtitle="In-depth articles to help you make informed decisions about windows and doors." />
        <div className="grid md:grid-cols-3 gap-6">
          <GuideCard title="Tilt & Turn vs Double-Hung: Complete Comparison" desc="Which window type is right for your home? We compare performance, cost, and lifespan." href="/blog" photoDesc="Фото: сравнение двух типов окон рядом — tilt&turn и double-hung" />
          <GuideCard title="Understanding U-Values and Energy Efficiency" desc="What U-value means for your energy bills and comfort. A homeowner's guide." href="/blog" photoDesc="Фото: инфографика с диаграммой U-value и стрелками теплопотерь" />
          <GuideCard title="Window Replacement Guide for Massachusetts" desc="When to replace, what to look for, and how to maximize your investment." href="/blog" photoDesc="Фото: процесс замены старого окна на новое DECA в доме в Массачусетсе" />
        </div>
      </Section>

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      {/* ═══════ CTA WITH DOCS ═══════ */}
      <CTAWithDocs
        title="Let's Work Together to Build Better Spaces"
        subtitle="Get your custom order form, window blueprints, and detailed specification — all prepared for your project."
        btnText="Get a Free Quote"
      />

      {/* ===== FAQ (Figma: accordion) ===== */}
      <Section>
        <SectionTitle badge="FAQ" title="Your Questions — Answered" />
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "What makes DECA windows different from standard American windows?", a: "DECA windows use European tilt & turn technology with multi-chamber uPVC or aluminum frames, triple glazing, and multi-point locking. This delivers significantly better energy efficiency (U-value 0.10 vs 0.30+ for standard windows), noise reduction (45-50 dB vs 25-30 dB), and security." },
            { q: "Do you manufacture in the United States?", a: "Yes. All DECA windows and doors are manufactured in our facility in Westfield, Massachusetts. We use European engineering principles and hardware (Roto, Siegenia) with American-made profiles." },
            { q: "What is a tilt & turn window?", a: "A tilt & turn window has two opening modes: 'tilt' inward from the top for secure ventilation, and 'turn' fully inward like a door for maximum airflow and easy cleaning. This versatile design is standard across Europe and offers superior performance over traditional American window styles." },
            { q: "What areas do you serve?", a: "We serve all of Massachusetts, Connecticut, Rhode Island, New Hampshire, and the greater New York area. For large commercial projects, we can deliver nationwide." },
            { q: "How long does delivery take?", a: "Standard residential orders are typically delivered in 4-6 weeks from measurement confirmation. Rush orders and commercial projects can be expedited — contact us for specifics." },
          ].map((faq) => (
            <details key={faq.q} className="group bg-warm-gray rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {faq.q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* ═══════ PROCESS ═══════ */}
      <ProcessSection />

      {/* ═══════ LEAD MAGNET ═══════ */}
      <LeadMagnet />

      <StickyCTA />
    </>
  );
}
