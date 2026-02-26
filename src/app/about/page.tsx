import Link from "next/link";
import { Breadcrumb, Section, SectionTitle, PhotoPlaceholder } from "@/components/ui";
import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import DeliveryMapSection from "@/components/DeliveryMapSection";
import CTAWithDocs from "@/components/CTAWithDocs";
import StickyCTA from "@/components/StickyCTA";
import AnimatedStatCard from "@/components/AnimatedStatCard";
import pageData from "@/data/pages/about.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

export default function AboutPage() {
  const d = pageData;
  return (
    <>
      <Breadcrumb items={d.breadcrumb.items} />

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-3">{d.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{d.hero.heading}</h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {d.hero.description}
              </p>
              <Link href="/quote" className="inline-block bg-blue-accent hover:bg-blue-hover text-white px-7 py-3.5 rounded font-semibold transition-colors">
                {d.hero.cta}
              </Link>
            </div>
            <PhotoPlaceholder description={d.hero.photoDesc} height="h-[400px]" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section gray>
        <SectionTitle badge={d.mission.badge} title={d.mission.title} />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {d.mission.description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {d.mission.stats.map((stat) => (
            <AnimatedStatCard key={stat.value} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Section>

      {/* What Makes DECA Different */}
      <Section>
        <SectionTitle badge={d.difference.badge} title={d.difference.title} subtitle={d.difference.subtitle} />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img src={d.difference.mainImage} alt={d.difference.imageAlt} className="w-full h-80 object-contain bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6" loading="lazy" />
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{d.difference.heading}</h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              {d.difference.description}
            </p>
            <div className="space-y-4">
              {d.difference.highlights.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-accent/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{item.title}</h3>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section gray>
        <SectionTitle badge={d.values.badge} title={d.values.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {d.values.items.map((v) => (
            <div key={v.title} className="bg-white rounded-xl border border-border overflow-hidden">
              <PhotoPlaceholder description={v.photoDesc} height="h-48" className="rounded-none border-0" />
              <div className="p-6">
                <h3 className="font-bold text-lg text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <SectionTitle badge={d.team.badge} title={d.team.title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {d.team.members.map((m) => (
            <div key={m.name} className="bg-white rounded-xl border border-border overflow-hidden text-center">
              <PhotoPlaceholder description={m.photoDesc} height="h-56" className="rounded-none border-0" />
              <div className="p-6">
                <h3 className="font-semibold text-text-primary text-lg">{m.name}</h3>
                <p className="text-sm text-blue-accent mb-3">{m.role}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Factory */}
      <Section gray>
        <SectionTitle badge={d.factory.badge} title={d.factory.title} subtitle={d.factory.subtitle} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.factory.photos.map((photo, i) => (
            <PhotoPlaceholder key={i} description={photo.photoDesc} height="h-48" />
          ))}
        </div>
      </Section>



      {/* ═══════ REVIEWS ═══════ */}
      <ReviewsSection />

      {/* ═══════ DELIVERY MAP ═══════ */}
      <DeliveryMapSection />

      <CTAWithDocs
        title={d.ctaWithDocs.title}
        subtitle={d.ctaWithDocs.subtitle}
        btnText={d.ctaWithDocs.btnText}
      />

      <StickyCTA />
    </>
  );
}
