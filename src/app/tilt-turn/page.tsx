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

      {/* ═══════ WHAT DOES TILT & TURN MEAN? — Educational ═══════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionTitle
              badge="How It Works"
              title="What Does Tilt & Turn Mean?"
              subtitle=""
            />
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Tilt & turn is a dual-function window system engineered in Germany and used as the standard across Europe. A single handle controls two distinct opening modes — giving you ventilation, security, and easy maintenance in one design.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3l7.5 7.5m-15 0v9.75A.75.75 0 0 0 5.25 21h4.5V15h4.5v6h4.5a.75.75 0 0 0 .75-.75V10.5" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Tilt Position — Secure Ventilation</p>
                    <p className="text-sm">Handle up — the window tilts inward from the top, remaining fixed at the base. Opens about 4 inches: enough for fresh air, but too narrow to climb through. Rain-safe, child-safe, and perfect for overnight ventilation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Turn Position — Full Opening</p>
                    <p className="text-sm">Handle horizontal — the window swings fully inward like a door. Maximum airflow, and you can clean the exterior glass from inside your home on any floor. No ladders, no hassle.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Micro-Ventilation — Subtle Airflow</p>
                    <p className="text-sm">A slight handle turn creates a barely perceptible gap — just enough for continuous air exchange without a noticeable draft. Ideal for kitchens, bathrooms, and humid spaces.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-muted">
                All three modes are controlled by a single handle with a multi-point locking mechanism — turn it down to lock, up to tilt, sideways to open fully.
              </p>
            </div>
          </div>
          <div className="bg-warm-gray rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center text-text-muted">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
              <p className="text-sm font-medium">Diagram: Tilt, Turn & Micro-Ventilation positions</p>
              <p className="text-xs mt-1">Photo placeholder — add product diagram showing all 3 handle positions</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ BENEFITS — Key advantages ═══════ */}
      <Section gray>
        <SectionTitle
          badge="Why European Windows"
          title="Benefits of DECA Tilt & Turn"
          subtitle="Every feature is engineered for comfort, security, and long-term value."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
              title: "Lower Energy Bills",
              text: "Multi-chamber profiles with double or triple gasket seals and argon-filled Low-E glass dramatically reduce heat transfer. Homeowners typically see a 40–50% reduction in heating and cooling costs.",
            },
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
              title: "Superior Soundproofing",
              text: "Glass panels of varying thickness absorb street noise, traffic, and weather sounds. The result: a peaceful, quiet home with acoustic comfort rated up to 50 dB reduction.",
            },
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
              title: "Multi-Point Security",
              text: "Up to 12 locking points engage simultaneously around the entire frame perimeter. When you turn the handle, all locks push the sash tightly against the frame — creating a barrier that far exceeds standard window security.",
            },
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
              title: "Safe Ventilation",
              text: "In tilt mode, the window opens just 4 inches — providing steady airflow while remaining child-safe and rain-resistant. Ventilate your home during storms or at night without worry.",
            },
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
              title: "Effortless Cleaning",
              text: "Turn the handle to fully open the window inward — clean the exterior glass from inside your home, even on upper floors. No ladders, no professional window cleaners needed.",
            },
            {
              icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>,
              title: "Emergency Egress",
              text: "In turn mode, the window opens fully inward — making it an excellent emergency exit or fire escape point. Easy to operate even under stress, meeting safety requirements for bedrooms.",
            },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-4">
                {b.icon}
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{b.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

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

      {/* ═══════ 50+ FRAME COLORS & FINISHES ═══════ */}
      <Section gray>
        <SectionTitle
          badge="Customization"
          title="50+ Frame Colors & Wood-Grain Finishes"
          subtitle="Match your windows to any interior or exterior design. Solid colors, textured wood grains, and metallic finishes — all with durable, co-extruded surface technology."
        />
        <div className="space-y-8">
          {/* Standard Colors */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Popular Solid & Wood-Grain Finishes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
              {[
                { name: "White", color: "#FFFFFF", border: true },
                { name: "Anthracite Gray", color: "#3E4347" },
                { name: "Jet Black", color: "#1A1A1A" },
                { name: "Golden Oak", color: "#B8860B" },
                { name: "Walnut", color: "#5C4033" },
                { name: "Sheffield Oak", color: "#A0926B" },
                { name: "Mahogany", color: "#4E2728" },
                { name: "Natural Oak", color: "#C4A265" },
                { name: "Dark Oak", color: "#3B2F2F" },
                { name: "Rosewood", color: "#65000B" },
                { name: "Douglas Fir", color: "#8B6914" },
                { name: "Basalt Gray", color: "#4E5754" },
                { name: "Steel Blue", color: "#4682B4" },
                { name: "Dark Green", color: "#1B4332" },
                { name: "Bordeaux", color: "#6C3461" },
                { name: "Brushed Alu", color: "#A8A9AD" },
                { name: "Slate Gray", color: "#708090" },
                { name: "Cream", color: "#FFFDD0", border: true },
              ].map((c) => (
                <div key={c.name} className="text-center group">
                  <div
                    className={`w-full aspect-square rounded-lg mb-2 shadow-sm group-hover:scale-105 transition-transform ${c.border ? "border border-border" : ""}`}
                    style={{ backgroundColor: c.color }}
                  />
                  <p className="text-[10px] text-text-muted leading-tight">{c.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="bg-white rounded-xl border border-border p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm mb-1">Dual-Color Option Available</p>
              <p className="text-sm text-text-secondary">Choose different colors for interior and exterior surfaces. For example, dark anthracite outside to match modern architecture, warm oak wood-grain inside to complement your living space. All finishes use GEALAN-acrylcolor® co-extrusion technology for decades of UV and weather resistance — no painting or recoating needed.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ WINDOW GRIDS & PATTERNS ═══════ */}
      <Section>
        <SectionTitle
          badge="Design Options"
          title="Window Grids & Patterns"
          subtitle="Add character to your windows with decorative grid patterns. Choose from traditional to contemporary styles, available in multiple colors and widths."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {[
            { name: "No Grid", desc: "Clean, modern look" },
            { name: "Colonial", desc: "Classic symmetrical panes" },
            { name: "Prairie", desc: "Perimeter border pattern" },
            { name: "Heritage", desc: "Traditional European style" },
            { name: "Victorian", desc: "Ornate period design" },
            { name: "Custom", desc: "Your own pattern" },
          ].map((g) => (
            <div key={g.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="bg-warm-gray flex items-center justify-center p-4 h-32">
                <div className="w-16 h-20 border-2 border-text-muted/30 rounded-sm relative">
                  {g.name === "Colonial" && (
                    <>
                      <div className="absolute inset-0 border-r border-text-muted/30" style={{ left: "50%" }} />
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "50%" }} />
                    </>
                  )}
                  {g.name === "Prairie" && (
                    <>
                      <div className="absolute border border-text-muted/30 inset-2 rounded-sm" />
                    </>
                  )}
                  {g.name === "Heritage" && (
                    <>
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "33%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "50%", top: 0, bottom: "67%" }} />
                    </>
                  )}
                  {g.name === "Victorian" && (
                    <>
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "30%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "33%", top: 0, bottom: "70%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "66%", top: 0, bottom: "70%" }} />
                    </>
                  )}
                  {g.name === "Custom" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-text-primary text-sm">{g.name}</h3>
                <p className="text-[11px] text-text-muted">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h4 className="font-semibold text-text-primary text-sm mb-2">Grid Colors</h4>
            <p className="text-sm text-text-secondary mb-3">Grids are available in colors that match your frame finish — white, golden oak, walnut, jet black, and more. The grid color is selected to blend seamlessly with your chosen window color.</p>
            <div className="flex gap-2">
              {["#FFFFFF", "#B8860B", "#5C4033", "#1A1A1A", "#708090"].map((c) => (
                <div key={c} className={`w-6 h-6 rounded-full shadow-sm ${c === "#FFFFFF" ? "border border-border" : ""}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h4 className="font-semibold text-text-primary text-sm mb-2">Grid Widths</h4>
            <p className="text-sm text-text-secondary mb-3">Choose between 3/4&quot; (18mm) narrow grids for a sleek, modern look or 1&quot; (26mm) standard grids for a more traditional aesthetic. Both options are available for all grid patterns.</p>
            <div className="flex items-end gap-4">
              <div className="text-center">
                <div className="w-3 h-12 bg-text-muted/20 rounded-sm mx-auto" />
                <p className="text-[10px] text-text-muted mt-1">3/4&quot;</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-12 bg-text-muted/20 rounded-sm mx-auto" />
                <p className="text-[10px] text-text-muted mt-1">1&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ HARDWARE & FITTINGS ═══════ */}
      <Section gray>
        <SectionTitle
          badge="German Engineering"
          title="Hardware & Fittings"
          subtitle="Every DECA window is equipped with precision hardware from Europe's leading manufacturers — engineered for 40,000+ open/close cycles."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hinges */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
              Hinge Types
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-warm-gray rounded-lg">
                <div className="w-16 h-16 bg-white rounded-lg border border-border flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25Z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Standard Hinges</p>
                  <p className="text-xs text-text-secondary">Classic visible hinges with a colonial or traditional aesthetic. Robust German-made construction ensures smooth operation and durability for decades.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-warm-gray rounded-lg">
                <div className="w-16 h-16 bg-white rounded-lg border border-border flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Concealed Hinges</p>
                  <p className="text-xs text-text-secondary">Hidden within the frame for a clean, minimalist look. All technical features — durability, smooth action, soft closing — are preserved while giving your windows a sleek, modern appearance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Handles */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>
              Handle Designs
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              The window handle is both a functional element and a design accent. DECA offers multiple handle types in aluminum and high-grade plastic, available in traditional and modern designs to match any interior.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Quadro", desc: "Sleek, angular aluminum handle. Modern, minimalist profile." },
                { name: "Dublin", desc: "Ergonomic curved design. Comfortable grip, classic style." },
                { name: "Victory", desc: "Rounded contemporary form. Premium brushed metal finishes." },
                { name: "Secustik", desc: "Anti-break security handle. Built-in locking mechanism." },
              ].map((h) => (
                <div key={h.name} className="p-3 bg-warm-gray rounded-lg">
                  <p className="font-semibold text-text-primary text-xs">{h.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{h.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-text-muted mb-2">Available Handle Colors:</p>
              <div className="flex flex-wrap gap-2">
                {["White", "Brown", "Caramel", "Cream", "Silver", "Titanium", "Jet Black", "Anthracite", "Gold", "Brushed Bronze"].map((c) => (
                  <span key={c} className="text-[10px] px-2 py-1 bg-warm-gray rounded-full text-text-secondary">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Partners */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Trusted Engineering Partners</h3>
              <p className="text-sm text-text-secondary">All hardware and fittings sourced from Europe&apos;s leading manufacturers — lab-tested for 40,000+ opening cycles.</p>
            </div>
            <div className="flex gap-8 items-center">
              {["Roto", "Siegenia", "GEALAN", "Deceuninck"].map((brand) => (
                <div key={brand} className="text-center">
                  <div className="w-14 h-14 bg-warm-gray rounded-lg flex items-center justify-center">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{brand}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ COMFORT IN EVERY SEASON ═══════ */}
      <Section>
        <SectionTitle
          badge="Year-Round Performance"
          title="Comfort in Every Season"
          subtitle="DECA windows are engineered to maintain a consistent, comfortable indoor environment — regardless of what's happening outside."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-border p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Warm in Winter</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Multi-chamber profiles with double and triple gasket seals create an insulating barrier that withstands the coldest New England winters. The triple-pane argon-filled glass and warm-edge spacers prevent cold spots and condensation — keeping your home cozy even when it&apos;s below zero outside.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Cool in Summer</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Low-E glass coatings reflect solar heat away from your interior, keeping rooms cool without overworking your AC. Combined with tilt ventilation for natural airflow, your home stays comfortable in peak summer heat — while your energy bills stay low.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">Zero Drafts</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Modern EPDM seals and precision multi-point locking ensure a perfectly hermetic window closure. The result: no drafts, no air leakage, no cold spots near windows. Just warmth and silence throughout your home — with air tightness ratings that exceed passive house requirements.
            </p>
          </div>
        </div>
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
