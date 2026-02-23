import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | DECA Windows & Doors",
  description: "Your request has been received. Our team will contact you within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero banner with gradient */}
      <section className="relative bg-gradient-to-br from-brand via-brand to-brand-light pt-48 pb-28 px-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Checkmark */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="absolute w-20 h-20 bg-white/15 rounded-full animate-ping opacity-30" />
            <div className="relative w-16 h-16 bg-white/15 backdrop-blur rounded-full flex items-center justify-center border border-white/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Thank You!
          </h1>
          <p className="text-lg text-white/80 mb-1">
            Your request has been successfully submitted.
          </p>
          <p className="text-white/50 text-sm">
            A DECA consultant will reach out within <strong className="text-white/90">24 hours</strong> to discuss your project.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 px-4 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Timeline + CTA row */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {/* Timeline card */}
            <div className="md:col-span-3 bg-white rounded-xl border border-border shadow-sm p-5">
              <h2 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Happens Next
              </h2>
              <div className="space-y-3">
                {[
                  { step: "1", time: "24h", title: "We Review Your Request" },
                  { step: "2", time: "Day 1-2", title: "Consultation Call" },
                  { step: "3", time: "Day 2-3", title: "Detailed Quote Delivered" },
                  { step: "4", time: "~4 wks", title: "Manufacturing & Install" },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-blue-accent text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    {i < 3 ? (
                      <div className="flex-1 flex items-center justify-between border-b border-dashed border-border pb-3">
                        <span className="text-sm text-text-primary font-medium">{item.title}</span>
                        <span className="text-[10px] font-medium text-blue-accent bg-blue-light px-2 py-0.5 rounded-full shrink-0 ml-2">{item.time}</span>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm text-text-primary font-medium">{item.title}</span>
                        <span className="text-[10px] font-medium text-blue-accent bg-blue-light px-2 py-0.5 rounded-full shrink-0 ml-2">{item.time}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Call CTA card */}
            <div className="md:col-span-2 bg-brand rounded-xl p-5 text-white flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm mb-1">Need It Faster?</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-4">
                  Call us directly — Mon-Fri, 8 AM to 6 PM ET.
                </p>
              </div>
              <a
                href="tel:+14137714457"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand font-bold px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors text-sm w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (413) 771-4457
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-text-muted mb-3">Explore While You Wait</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "Tilt & Turn Windows", href: "/tilt-turn", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { title: "Customer Stories", href: "/cases", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                { title: "FAQ", href: "/faq", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group flex items-center gap-3 bg-warm-gray rounded-lg border border-border px-4 py-3 hover:shadow-sm hover:border-blue-accent/20 transition-all"
                >
                  <svg className="w-5 h-5 text-blue-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                  </svg>
                  <span className="text-sm font-medium text-text-primary group-hover:text-blue-accent transition-colors">{link.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center pb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-accent font-medium text-sm hover:text-blue-hover transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
