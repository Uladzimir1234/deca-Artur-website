import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, Section, SectionTitle, CTABlock, ServiceIcons, StatCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import VideoTabs from "@/components/VideoTabs";
import ComponentTabs from "@/components/ComponentTabs";
import GalleryLightbox from "@/components/GalleryLightbox";
import AnimatedStats from "@/components/AnimatedStats";
import PerformanceBars from "@/components/PerformanceBars";
import EnergySavingsCard from "@/components/EnergySavingsCard";
import GlazingComparison from "@/components/GlazingComparison";
import StickyCTA from "@/components/StickyCTA";
import DeliveryMap from "@/components/DeliveryMap";
import CTAWithDocs from "@/components/CTAWithDocs";

export const metadata: Metadata = {
  title: "Tilt & Turn Windows | European Style | DECA Windows",
  description: "Premium European tilt & turn windows with two opening modes. GEALAN profiles, U-values as low as 0.14, noise reduction up to 50 dB, manufactured in Massachusetts.",
  alternates: { canonical: "/tilt-turn" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long do tilt and turn windows last?", "acceptedAnswer": { "@type": "Answer", "text": "With proper maintenance, DECA tilt and turn windows have a service life of 50+ years. We back this with a 15-year frame warranty and 10-year glass warranty." } },
    { "@type": "Question", "name": "Are tilt and turn windows more expensive than double hung?", "acceptedAnswer": { "@type": "Answer", "text": "Initial cost is typically 15-30% higher, but the energy savings, durability, and superior performance make them significantly more cost-effective over the window's lifetime." } },
    { "@type": "Question", "name": "Can I get custom sizes and shapes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We manufacture every window to order at our Massachusetts factory. Arched, circular, triangular, and any custom dimensions are available." } },
    { "@type": "Question", "name": "How energy efficient are they?", "acceptedAnswer": { "@type": "Answer", "text": "Our triple-glazed tilt and turn windows achieve U-values as low as 0.14 W/m²K — significantly exceeding ENERGY STAR requirements of 0.30." } },
    { "@type": "Question", "name": "Do they meet US building codes?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All DECA windows are NFRC certified and meet or exceed all US building code requirements." } },
  ],
};

/* All images served from public/assets/ */
const a = "/assets";

export default function TiltTurnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="hero-fullscreen flex flex-col">
        <Breadcrumb items={[{ label: "Windows", href: "/windows" }, { label: "Tilt & Turn Windows" }]} />

        {/* ═══════ HERO — Title + VideoTabs (like decawindows.com) ═══════ */}
        <section className="bg-white flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">
            {/* Top spacer — smaller so content sits slightly above true center */}
            <div className="flex-[2]" />
          {/* Hero heading */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand mb-3">Most Popular in Europe</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5">Tilt & Turn Windows</h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              The most versatile window system in the world. Two opening modes,
              exceptional performance, and German GEALAN engineering —
              manufactured in Massachusetts.
            </p>
          </div>

          {/* VideoTabs as hero content */}
          <VideoTabs
            tabs={[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
                title: "Tilt to Vent",
                description: "Just turn handle up to air out your home. Secure, rain-safe airflow perfect for sleep and child safety.",
                video: `${a}/videos/ventilation.mp4`,
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                ),
                title: "Easy to Clean",
                description: "Opens inward, making cleaning more convenient. Clean exterior glass from inside your home, on any floor.",
                video: `${a}/videos/easy-to-clean.mp4`,
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
                title: "Air-Tight & Secure",
                description: "Up to 12 locking points engage with a single handle turn. Compression seals create an airtight, watertight barrier.",
                video: `${a}/videos/airtight-secure.mp4`,
              },
            ]}
          />
            {/* Bottom spacer — larger so content shifts slightly upward */}
            <div className="flex-[3]" />
          </div>
        </section>
      </div>

      {/* ═══════ STATS BAR — Animated rings + counters ═══════ */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={[
              {
                value: 0.14, label: "Best U-Value (W/m²K)", decimals: 2,
                icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>,
              },
              {
                value: 50, suffix: " dB", label: "Noise Reduction",
                icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
              },
              {
                value: 12, label: "Lock Points",
                icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
              },
              {
                value: 50, suffix: "+", label: "Year Lifespan",
                icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              },
            ]}
          />
        </div>
      </section>

      {/* ═══════ CONFIGURATOR ═══════ */}
      <WindowConfigurator />

      {/* ═══════ PROFILE TECHNOLOGY — Interactive component viewer ═══════ */}
      <Section gray>
        <SectionTitle
          badge="GEALAN Engineering"
          title="Profile Technology"
          subtitle="See what's inside every DECA window — German-engineered GEALAN profiles built for decades of performance."
        />
        <ComponentTabs
          items={[
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
                </svg>
              ),
              title: "Profile Cross-Section",
              description: "Multi-chamber uPVC profile with galvanized steel reinforcement for structural rigidity.",
              image: `${a}/components/profile-cross-section.png`,
              alt: "GEALAN profile cross-section — multi-chamber uPVC window profile",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              ),
              title: "Chamber Structure",
              description: "5–6 insulating chambers trap air, creating a thermal barrier that outperforms standard vinyl by 40%.",
              image: `${a}/components/chamber-structure.png`,
              alt: "GEALAN chamber structure — 5-6 insulating chambers highlighted in green",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              ),
              title: "Triple Seal System",
              description: "Three continuous EPDM gaskets block air, water, and sound at every point of the frame.",
              image: `${a}/components/triple-seal-system.png`,
              alt: "GEALAN triple seal system — three EPDM gasket contours visible on profile",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                </svg>
              ),
              title: "Glazing Package",
              description: "Triple-pane argon-filled glass unit with warm-edge spacer for maximum thermal and acoustic insulation.",
              image: `${a}/components/glazing-package.png`,
              alt: "GEALAN triple-pane glazing package with argon fill and warm-edge spacer",
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              ),
              title: "Hardware Detail",
              description: "Precision Roto/Siegenia hardware with up to 12 locking points for maximum security.",
              image: `${a}/components/hardware-detail.png`,
              alt: "Tilt & turn window hardware — Roto/Siegenia multi-point locking system",
            },
          ]}
        />
      </Section>

      {/* ═══════ TECHNICAL SPECS TABLE ═══════ */}
      <Section>
        <SectionTitle
          badge="Specifications"
          title="Technical Data"
          subtitle="Professional-grade GEALAN profiles with NFRC-certified performance."
        />
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border overflow-hidden">
          {[
            ["Profile System", "GEALAN-LINEAR® / S 8000"],
            ["Profile Depth", "74mm – 83mm"],
            ["Material", "uPVC + galvanized steel reinforcement"],
            ["Chamber Count", "5–6 chambers"],
            ["Surface", "GEALAN-acrylcolor® (co-extruded)"],
            ["Glass Package", "Triple-pane, argon-filled, up to 52mm"],
            ["U-Factor", "As low as 0.14 W/m²K"],
            ["Max Size", "Up to 11′6″ × 11′6″"],
            ["Sound Insulation", "STC 42–50 dB"],
            ["Lock Points", "8–12 multi-point (Roto/Siegenia)"],
            ["Security Rating", "RC2 / RC3 certified"],
            ["Insect Screen", "FlexScreen® (virtually invisible)"],
          ].map(([label, value], i) => (
            <div key={label} className={`flex justify-between px-6 py-4 border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <span className="text-sm text-text-primary font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ GLAZING — Interactive comparison ═══════ */}
      <Section>
        <SectionTitle badge="Energy-Efficient Glass" title="Glazing Configuration" subtitle="Compare glass packages side by side — click any type to highlight its performance." />
        <GlazingComparison />
      </Section>

      {/* ═══════ PERFORMANCE — DECA vs Traditional ═══════ */}
      <Section>
        <SectionTitle
          badge="Why Upgrade"
          title="DECA vs. Traditional Windows"
          subtitle="See how European tilt & turn technology outperforms standard American vinyl windows."
        />
        <PerformanceBars
          metrics={[
            {
              label: "Thermal Insulation",
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
              deca: 95,
              decaLabel: "U-Factor 0.14",
              traditional: 40,
              traditionalLabel: "U-Factor 0.30",
            },
            {
              label: "Sound Reduction",
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
              deca: 90,
              decaLabel: "42–50 dB",
              traditional: 55,
              traditionalLabel: "25–30 dB",
            },
            {
              label: "Air Tightness",
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
              deca: 98,
              decaLabel: "12-point lock",
              traditional: 35,
              traditionalLabel: "2-point lock",
            },
            {
              label: "Lifespan",
              icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              deca: 100,
              decaLabel: "50+ years",
              traditional: 40,
              traditionalLabel: "15–20 years",
            },
          ]}
        />
      </Section>

      {/* ═══════ ENERGY SAVINGS INFOGRAPHIC ═══════ */}
      <Section gray>
        <SectionTitle
          badge="Your Investment"
          title="The Economics of Quality Windows"
          subtitle="Energy-efficient windows aren't just better — they pay for themselves."
        />
        <EnergySavingsCard />
      </Section>

      {/* ═══════ GALLERY ═══════ */}
      <Section>
        <SectionTitle badge="Our Work" title="Tilt & Turn in Real Homes" subtitle="DECA windows installed across New England." />
        <GalleryLightbox
          alt="DECA tilt & turn window installation"
          items={[
            { src: `${a}/gallery/gallery-1.webp`, tall: true },
            { src: `${a}/gallery/gallery-2.webp`, tall: true },
            { src: `${a}/gallery/gallery-3.webp` },
            { src: `${a}/gallery/gallery-4.webp` },
            { src: `${a}/gallery/gallery-5.webp` },
            { src: `${a}/gallery/gallery-6.webp` },
            { src: `${a}/gallery/gallery-7.webp` },
            { src: `${a}/gallery/gallery-8.webp` },
          ]}
        />
      </Section>

      {/* ═══════ REVIEWS — hidden until real testimonials are collected ═══════ */}
      <section className="py-20 overflow-visible">
        {/* Reviews hidden — awaiting real customer testimonials */}

        {/* ── Service ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <SectionTitle title="Exceptional Service in Massachusetts" subtitle="From consultation to installation, we're with you every step." />
          <ServiceIcons />
        </div>
      </section>

      {/* ═══════ DELIVERY MAP ═══════ */}
      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-white/60 mb-3">Nationwide Delivery</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Factory-Direct Shipping Across the U.S.
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Every DECA window is manufactured in Westfield, Massachusetts and shipped
              directly to your project site. Northeast states enjoy same-day to 5-day
              delivery, while we reach the entire continental U.S. within 10 days.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  value: "1–2",
                  label: "days to CT, RI",
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
                },
                {
                  value: "3–5",
                  label: "days to PA, NJ",
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h3.86c.26 0 .515-.086.72-.24l3.3-2.48a1.125 1.125 0 0 1 1.38.06l2.24 2a1.126 1.126 0 0 0 .75.29H21" /></svg>,
                },
                {
                  value: "8–10",
                  label: "days coast-to-coast",
                  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m-3.414 1.082A9 9 0 0 1 3.75 12c0-1.18.227-2.306.641-3.34" /></svg>,
                },
              ].map((item) => (
                <div key={item.value} className="bg-white/10 rounded-xl border border-white/15 p-4 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white mb-2">
                    {item.icon}
                  </div>
                  <p className="text-xl font-extrabold text-white leading-tight">{item.value}</p>
                  <p className="text-[11px] text-white/50 mt-0.5 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <DeliveryMap />
        </div>
      </Section>

      {/* ═══════ WINDOW TYPES ═══════ */}
      <Section>
        <SectionTitle badge="Configurations" title="Available Styles" subtitle="Every window is custom-made to your specifications." />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { src: "style-single-casement.png", name: "Single Tilt & Turn", desc: "Classic single-panel operation" },
            { src: "style-hopper.png", name: "Hopper / Awning", desc: "Top-hinged ventilation window" },
            { src: "style-double-casement.png", name: "Double Section", desc: "Side-by-side tilt & turn panels" },
            { src: "style-triple-casement.png", name: "Triple Section", desc: "Panoramic three-panel system" },
            { src: "style-arched.png", name: "Arched / Custom", desc: "Any shape — curved, round, triangular" },
          ].map((w) => (
            <div key={w.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group">
              <div className="bg-warm-gray flex items-center justify-center p-4 h-52">
                <Image src={`${a}/images/${w.src}`} alt={`DECA ${w.name}`} width={400} height={300} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text-primary text-sm">{w.name}</h3>
                <p className="text-xs text-text-muted">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ CTA ═══════ */}
      <CTAWithDocs
        title="Ready for Tilt & Turn?"
        subtitle="Get your custom order form, window blueprints, and detailed specification — all prepared for your project."
        btnText="Get Free Quote"
      />

      {/* ═══════ FAQ ═══════ */}
      <Section gray>
        <SectionTitle badge="FAQ" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            { q: "How long do tilt and turn windows last?", a: "With proper maintenance, DECA tilt and turn windows last 50+ years. We back this with a 15-year frame warranty, 10-year glass warranty, and 5-year hardware warranty." },
            { q: "Are tilt and turn windows more expensive than double hung?", a: "Initial cost is typically 15-30% higher, but the energy savings ($1,500-2,500/year for a typical home), durability, and superior performance make them significantly more cost-effective over their lifetime." },
            { q: "Can I get custom sizes and shapes?", a: "Yes. We manufacture every window to order in Massachusetts. Arched, circular, triangular, and any custom dimensions. 50+ RAL colors plus wood-grain laminates." },
            { q: "What energy savings can I expect?", a: "Our triple-glazed tilt & turn windows achieve U-values as low as 0.14 — far exceeding ENERGY STAR requirements. Homeowners typically save 40-50% on heating/cooling. Federal tax credits up to $3,200 available." },
            { q: "What about insect screens?", a: "We offer FlexScreen® — a virtually invisible, spring-steel insect screen that snaps into place without hardware. It doesn't block your view or airflow like traditional screens." },
            { q: "Do they meet US building codes?", a: "Absolutely. All DECA windows are NFRC certified and meet or exceed all US building code requirements, including ENERGY STAR criteria." },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* ═══════ STICKY CTA ═══════ */}
      <StickyCTA />
    </>
  );
}
