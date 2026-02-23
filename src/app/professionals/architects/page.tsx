import Link from "next/link";
import { Breadcrumb, Section, SectionTitle } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import StickyCTA from "@/components/StickyCTA";
import B2BContactForm from "@/components/B2BContactForm";
import AnimatedStatCard from "@/components/AnimatedStatCard";

const CDN = "https://assets.brogawindows.com";

export const metadata: Metadata = {
  title: "For Architects & Designers | Custom Specs & BIM Data | DECA Windows",
  description: "Custom window specifications, CAD/BIM data, NFRC certifications, and sample programs for architects and interior designers. European performance, American manufacturing.",
  keywords: "architect windows, designer windows, custom specifications, BIM data, CAD files, NFRC certified, DECA windows",
};

const benefits = [
  { icon: "📐", title: "Custom Specifications", desc: "Non-standard sizes, custom RAL colors, unique profiles. If you can draw it, we can build it — no minimum order for custom work." },
  { icon: "🖥️", title: "CAD & BIM Resources", desc: "Download-ready Revit families, DWG details, and 3D models. Accurate product data for your documentation packages." },
  { icon: "📊", title: "NFRC Certified Performance", desc: "Full NFRC test reports, U-values, SHGC, VT, and air infiltration data. Third-party verified, code-ready documentation." },
  { icon: "🎨", title: "Finish & Color Library", desc: "200+ RAL colors, woodgrain laminates, dual-color options (different interior/exterior). Samples shipped in 48 hours." },
  { icon: "🏗️", title: "Sample & Mockup Program", desc: "Full-scale product samples for client presentations. Corner cuts showing profile cross-sections for specification meetings." },
  { icon: "🤝", title: "Spec Writing Support", desc: "Our engineers help write window and door specifications for your project documents. CSI 3-part format available." },
];

const steps = [
  { num: "01", title: "Share Your Vision", desc: "Send us drawings, renderings, or just an idea. We'll identify the right products and configurations." },
  { num: "02", title: "Technical Review", desc: "Our engineers review structural requirements, energy codes, and performance targets for your project." },
  { num: "03", title: "Samples & Approval", desc: "Receive physical samples, color swatches, and detailed shop drawings for client sign-off." },
  { num: "04", title: "Production & Delivery", desc: "Custom manufacturing in Massachusetts with quality checkpoints. Coordinated delivery to your schedule." },
];

export default function ArchitectsPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "For Professionals", href: "/professionals" },
        { label: "Architects & Designers" },
      ]} />

      {/* Hero */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-3 text-brand">For Architects & Designers</span>
            <h1 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight mb-4">
              European Performance Meets Your Design Vision
            </h1>
            <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
              Custom sizes, 200+ colors, NFRC-certified performance data, and BIM resources — everything you need to specify with confidence. Our engineering team supports your specification process from concept through construction administration.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#contact-form" className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded text-sm font-semibold transition-colors">
                Request Spec Package
              </Link>
              <Link href="/performance" className="border border-border hover:border-brand text-text-secondary hover:text-brand px-6 py-3 rounded text-sm font-medium transition-colors">
                Performance Data
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="h-80 rounded-xl overflow-hidden">
            <img src={`${CDN}/images/windows/tilt/gallery/5.webp`} alt="Modern European windows in an architectural project" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} loading="lazy" />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section gray>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedStatCard value="200+" label="RAL Colors Available" />
          <AnimatedStatCard value="0.10" label="Best U-Value" />
          <AnimatedStatCard value="50 dB" label="Noise Reduction" />
          <AnimatedStatCard value="48 hr" label="Sample Delivery" />
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionTitle badge="Resources" title="Designed for Design Professionals" subtitle="We speak your language — specs, performance data, and custom solutions." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="bg-warm-gray rounded-xl p-6 border border-border">
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <h2 className="font-bold text-text-primary text-lg mb-2">{b.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section gray>
        <SectionTitle badge="Process" title="From Concept to Installation" subtitle="A collaborative process built around your project workflow." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <span className="text-3xl md:text-5xl font-black text-brand/10 absolute -top-2 -left-1">{s.num}</span>
              <div className="pt-10">
                <h3 className="font-bold text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <ReviewsSection />
      <DeliveryMapSection />
      <B2BContactForm title="Request Specifications" subtitle="Get CAD files, NFRC reports, and custom specifications for your project." buttonText="Request Specifications" segment="architects" projectTypes={["Residential Design", "Commercial Design", "Mixed-Use", "Historic Renovation", "Passive House"]} />
      <StickyCTA />
    </>
  );
}
