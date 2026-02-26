import { Breadcrumb, Section } from "@/components/ui";
import StickyCTA from "@/components/StickyCTA";
import QuoteForm from "./QuoteForm";
import pageData from "@/data/pages/quote.json";

export const metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
};

export default function QuotePage() {
  return (
    <>
      <Breadcrumb items={pageData.breadcrumb.items} />
      <Section>
        <QuoteForm />
      </Section>

      {/* Google Maps — DECA factory location */}
      <section className="w-full h-[400px] relative">
        <iframe
          src={pageData.map.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={pageData.map.title}
          className="absolute inset-0"
        />
      </section>

      <StickyCTA />
    </>
  );
}
