import Link from "next/link";
import { Breadcrumb, Section, SectionTitle } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import B2BContactForm from "@/components/B2BContactForm";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStatCard from "@/components/AnimatedStatCard";

export const metadata: Metadata = {
  title: "For Professionals | Contractors, Architects, Dealers | DECA Windows",
  description: "Premium European-style windows for contractors, architects, builders, and dealers. Volume pricing, custom specifications, and dedicated technical support.",
  alternates: { canonical: "/professionals" },
};

const CDN = "https://assets.brogawindows.com";

/* eslint-disable @next/next/no-img-element */
function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} style={{ transform: "scaleX(-1)" }} loading="lazy" />;
}

export default function ProfessionalsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "For Professionals" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">B2B Partnership</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">Partner with DECA</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Premium European-style windows for contractors, architects, builders, and dealers. Volume pricing, custom specifications, and dedicated technical support.
              </p>
              <Link href="#contact-form" className="inline-block bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">
                Get Professional Pricing
              </Link>
            </div>
            <div className="h-[400px] rounded-xl overflow-hidden">
              <Img src={`${CDN}/images/windows/tilt/gallery/1.webp`} alt="European tilt & turn windows installed in a modern home" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-warm-gray py-8 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedStatCard value="500+" label="Projects Completed" />
          <AnimatedStatCard value="4 wk" label="Production Time" />
          <AnimatedStatCard value="300%" label="Exceeds Codes" />
          <AnimatedStatCard value="15 yr" label="Frame Warranty" />
        </div>
      </section>

      {/* Why Professionals Choose DECA */}
      <Section>
        <SectionTitle badge="Advantages" title="Why Professionals Choose DECA" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Custom to Spec", desc: "Any size, shape, or configuration manufactured to your exact specifications at our MA facility.", img: `${CDN}/images/shared/our-projects/3_cover.webp` },
            { title: "Volume Pricing", desc: "Quantity-based discounts. Larger orders = better pricing. Factory-direct, no middleman.", img: `${CDN}/images/shared/our-projects/1_cover.webp` },
            { title: "Technical Support", desc: "Dedicated project support, detailed specs, and installation guidance throughout.", img: `${CDN}/images/shared/our-projects/5_cover.webp` },
            { title: "Local Manufacturing", desc: "Made in Massachusetts. 4-week production. Reliable delivery across the Northeast.", img: `${CDN}/images/shared/our-projects/4_cover.webp` },
            { title: "Exceed Codes", desc: "Windows exceed building codes by up to 300%. NFRC certified, ENERGY STAR ready, LEED eligible.", img: `${CDN}/images/shared/our-projects/6_cover.webp` },
            { title: "Partnership Program", desc: "Become a DECA dealer or preferred installer. Training, marketing support, priority pricing.", img: `${CDN}/images/banners/allmetrodecor/p2.webp` },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 overflow-hidden">
                <Img src={item.img} alt={item.title} />
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-text-primary mb-2">{item.title}</h2>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Segments — linked to dedicated pages */}
      <Section gray>
        <SectionTitle badge="Segments" title="Solutions for Your Business" subtitle="Explore dedicated resources for your industry." />
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Contractors & Builders", href: "/professionals/contractors", desc: "Volume pricing, on-time delivery, dedicated project manager. Built for your construction schedule.", img: `${CDN}/images/windows/tilt/gallery/2.webp` },
            { title: "Architects & Designers", href: "/professionals/architects", desc: "Custom specs, CAD/BIM data, NFRC reports, and 200+ RAL colors. Design without compromise.", img: `${CDN}/images/shared/our-projects/7_cover.webp` },
            { title: "Dealers & Installers", href: "/professionals/dealers", desc: "Territory exclusivity, dealer pricing, training, and marketing support. Grow your business with DECA.", img: `${CDN}/images/banners/allmetrodecor/p1.webp` },
            { title: "Commercial Projects", href: "/professionals/commercial", desc: "Multi-family, office, retail, historic renovation. Engineering support and phased delivery at scale.", img: `${CDN}/images/shared/our-projects/10_cover.webp` },
          ].map((s) => (
            <Link key={s.title} href={s.href} className="group block bg-white rounded-xl border border-border overflow-hidden transition-all hover:shadow-xl hover:border-blue-accent/20">
              <div className="h-48 overflow-hidden">
                <Img src={s.img} alt={s.title} />
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-2 group-hover:text-blue-accent transition-colors">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-accent/10 flex items-center justify-center group-hover:bg-blue-accent transition-colors mt-1">
                  <svg className="w-5 h-5 text-blue-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      <B2BContactForm title="Get Professional Pricing" subtitle="Tell us about your project and we'll prepare a detailed quote." buttonText="Submit Request" segment="general" projectTypes={["New Construction", "Renovation", "Commercial", "Multi-family", "Dealer Partnership"]} />
      <StickyCTA />
    </>
  );
}
