import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import StickyCTA from "@/components/StickyCTA";
import B2BContactForm from "@/components/B2BContactForm";
import AnimatedStatCard from "@/components/AnimatedStatCard";

export const metadata: Metadata = {
  title: "For Contractors & Builders | Volume Pricing & Reliable Delivery | DECA Windows",
  description: "Bulk ordering with volume pricing, on-time delivery, and dedicated project management. European-quality windows and doors for new construction and renovation.",
  keywords: "contractor windows, builder windows, bulk window orders, volume pricing, construction windows, DECA partner",
};

const benefits = [
  { icon: "💰", title: "Volume Pricing", desc: "Tiered discounts starting from 10+ units. The more you order, the more you save — up to 25% off retail." },
  { icon: "📦", title: "Bulk Ordering", desc: "Streamlined ordering for entire projects. One PO, one shipment, one point of contact. No per-unit hassle." },
  { icon: "🕐", title: "On-Time Delivery", desc: "4-week production cycle with guaranteed delivery dates. We coordinate with your project timeline, not the other way around." },
  { icon: "📋", title: "Technical Documentation", desc: "Complete installation guides, structural calculations, and spec sheets for every product in your order." },
  { icon: "👤", title: "Dedicated Project Manager", desc: "A single point of contact from quote to installation. Direct line, fast answers, no runaround." },
  { icon: "🔧", title: "Installation Support", desc: "On-site training for your crew, video guides, and phone support during installation. We want it done right." },
];

const steps = [
  { num: "01", title: "Request a Quote", desc: "Share your project specs — blueprints, quantities, sizes. We'll prepare a detailed quote within 48 hours." },
  { num: "02", title: "Review & Approve", desc: "We'll walk you through options, pricing tiers, and delivery schedule. Adjustments welcome." },
  { num: "03", title: "Production", desc: "Your order enters our Massachusetts facility. 4-week turnaround, quality-checked at every stage." },
  { num: "04", title: "Delivery & Support", desc: "Shipped to your job site on schedule. Our team stays available for installation questions." },
];

export default function ContractorsPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "For Professionals", href: "/professionals" },
        { label: "Contractors & Builders" },
      ]} />

      {/* Hero */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-3 text-brand">For Contractors & Builders</span>
            <h1 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight mb-4">
              Windows That Arrive On Time, Every Time
            </h1>
            <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
              We know your schedule doesn&apos;t wait. DECA delivers European-quality windows and doors with volume pricing, guaranteed delivery dates, and a dedicated project manager for every order. Built in Massachusetts, shipped direct to your job site.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#contact-form" className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded text-sm font-semibold transition-colors">
                Get Volume Pricing
              </Link>
              <Link href="/performance" className="border border-border hover:border-brand text-text-secondary hover:text-brand px-6 py-3 rounded text-sm font-medium transition-colors">
                View Specs & Testing
              </Link>
            </div>
          </div>
          <PhotoPlaceholder description="Фото: подрядчик на строительной площадке принимает партию окон DECA" height="h-80" />
        </div>
      </Section>

      {/* Stats */}
      <Section gray>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedStatCard value="500+" label="Projects Completed" />
          <AnimatedStatCard value="4 wk" label="Production Cycle" />
          <AnimatedStatCard value="25%" label="Volume Discount" />
          <AnimatedStatCard value="98%" label="On-Time Delivery" />
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionTitle badge="Why DECA" title="Built for Contractors" subtitle="Every aspect of our process is designed around your project needs." />
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
        <SectionTitle badge="Process" title="How We Work Together" subtitle="From quote to delivery — a clear, predictable process." />
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
      <B2BContactForm title="Get Contractor Pricing" subtitle="Share your project details and we'll prepare a volume quote within 48 hours." buttonText="Request Volume Quote" segment="contractors" projectTypes={["New Construction", "Renovation", "Multi-family", "Mixed-Use"]} />
      <StickyCTA />
    </>
  );
}
