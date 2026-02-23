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
  title: "For Dealers & Installers | Partnership Program | DECA Windows",
  description: "Become a DECA dealer. Territory exclusivity, training, marketing support, priority pricing, and co-branding opportunities for window and door professionals.",
  keywords: "window dealer program, installer partnership, DECA dealer, window distributor, territory exclusivity, dealer pricing",
};

const benefits = [
  { icon: "🗺️", title: "Territory Exclusivity", desc: "Protected geographic territory with no competing dealers. Your area, your customers, your growth." },
  { icon: "💲", title: "Dealer Pricing", desc: "Preferred wholesale pricing with tiered discounts based on annual volume. Margins that make your business profitable." },
  { icon: "🎓", title: "Training & Certification", desc: "Comprehensive product training for your sales and installation teams. DECA-certified installer program with ongoing education." },
  { icon: "📢", title: "Marketing Support", desc: "Co-branded brochures, digital assets, showroom displays, and lead generation support. We invest in your success." },
  { icon: "🏪", title: "Showroom Program", desc: "Discounted display units, point-of-sale materials, and sample kits. Create a compelling in-store experience." },
  { icon: "🛡️", title: "Warranty Backing", desc: "15-year manufacturer warranty on all products. Your customers get peace of mind, you get fewer callbacks." },
];

const steps = [
  { num: "01", title: "Apply", desc: "Fill out the partnership application. We'll review your business, territory, and experience." },
  { num: "02", title: "Onboarding", desc: "Product training, pricing setup, marketing materials, and showroom planning — we set you up for success." },
  { num: "03", title: "Launch", desc: "Start selling with full support. Dedicated account manager, marketing co-op funds, and lead referrals." },
  { num: "04", title: "Grow Together", desc: "Quarterly business reviews, new product previews, and volume incentives. We grow when you grow." },
];

export default function DealersPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "For Professionals", href: "/professionals" },
        { label: "Dealers & Installers" },
      ]} />

      {/* Hero */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-3 text-brand">Dealer Partnership</span>
            <h1 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight mb-4">
              Sell Premium European Windows in Your Market
            </h1>
            <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
              Join the DECA dealer network. Exclusive territory, wholesale pricing, comprehensive training, and marketing support — everything you need to build a profitable window and door business with products that sell themselves.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#contact-form" className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded text-sm font-semibold transition-colors">
                Apply for Partnership
              </Link>
              <Link href="/windows" className="border border-border hover:border-brand text-text-secondary hover:text-brand px-6 py-3 rounded text-sm font-medium transition-colors">
                Explore Products
              </Link>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="h-80 rounded-xl overflow-hidden">
            <img src={`${CDN}/images/banners/allmetrodecor/p1.webp`} alt="Window and door showroom display" className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} loading="lazy" />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section gray>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedStatCard value="40+" label="Active Dealers" />
          <AnimatedStatCard value="15 yr" label="Warranty Coverage" />
          <AnimatedStatCard value="4 wk" label="Order to Delivery" />
          <AnimatedStatCard value="100%" label="Territory Protected" />
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionTitle badge="Partnership" title="Why Dealers Choose DECA" subtitle="A partnership program designed to grow your business." />
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
        <SectionTitle badge="Process" title="Becoming a DECA Dealer" subtitle="From application to your first sale — we make it straightforward." />
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
      <B2BContactForm title="Apply for Dealer Program" subtitle="Join the DECA dealer network. Territory exclusivity, training, and competitive pricing." buttonText="Apply Now" segment="dealers" projectTypes={["Showroom Dealer", "Installation Partner", "Distribution", "Online Retail"]} />
      <StickyCTA />
    </>
  );
}
