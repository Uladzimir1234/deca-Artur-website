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
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated checkmark */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute w-24 h-24 bg-green-100 rounded-full animate-ping opacity-20" />
            <div className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
            Thank You!
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-2">
            Your request has been successfully submitted.
          </p>
          <p className="text-text-muted mb-10">
            A DECA consultant will reach out within <strong className="text-text-primary">24 hours</strong> to discuss your project.
          </p>

          {/* What happens next — timeline */}
          <div className="bg-warm-gray rounded-2xl border border-border p-8 mb-10 text-left">
            <h2 className="text-lg font-bold text-text-primary mb-6 text-center">What Happens Next</h2>
            <div className="space-y-6">
              {[
                { step: "1", time: "Within 24h", title: "We Review Your Request", desc: "Our team analyzes your project details and prepares a personalized response." },
                { step: "2", time: "Day 1-2", title: "Consultation Call", desc: "We call to discuss specifications, measurements, and your timeline in detail." },
                { step: "3", time: "Day 2-3", title: "Detailed Quote Delivered", desc: "You receive a comprehensive quote with product specs, pricing, and options." },
                { step: "4", time: "~4 weeks", title: "Custom Manufacturing & Install", desc: "Your order is built at our Westfield, MA factory and professionally installed." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-10 h-10 rounded-full bg-blue-accent text-white text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    {item.step !== "4" && <div className="w-0.5 h-6 bg-blue-accent/20 mt-1" />}
                  </div>
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text-primary text-sm">{item.title}</h3>
                      <span className="text-[10px] font-medium text-blue-accent bg-blue-light px-2 py-0.5 rounded-full">{item.time}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency / direct contact */}
          <div className="bg-brand rounded-2xl p-8 text-white mb-10">
            <h3 className="font-bold text-lg mb-2">Need Faster Assistance?</h3>
            <p className="text-white/60 mb-5">Call us directly — we&apos;re available Monday through Friday, 8 AM to 6 PM ET.</p>
            <a
              href="tel:+14137714457"
              className="inline-flex items-center gap-2 bg-white text-brand font-bold px-6 py-3.5 rounded-lg hover:bg-white/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (413) 771-4457
            </a>
          </div>

          {/* Explore while you wait */}
          <div className="mb-10">
            <h3 className="font-semibold text-text-primary mb-6">Explore While You Wait</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Tilt & Turn Windows", desc: "Our flagship European-style windows", href: "/tilt-turn", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { title: "Customer Stories", desc: "See real results from homeowners", href: "/cases", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
                { title: "FAQ", desc: "Common questions answered", href: "/faq", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group bg-warm-gray rounded-xl border border-border p-5 text-left hover:shadow-md hover:border-blue-accent/20 transition-all"
                >
                  <svg className="w-6 h-6 text-blue-accent mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                  </svg>
                  <h4 className="font-semibold text-text-primary text-sm mb-1 group-hover:text-blue-accent transition-colors">{link.title}</h4>
                  <p className="text-xs text-text-muted">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to home */}
          <Link href="/" className="inline-flex items-center gap-2 text-blue-accent font-medium hover:text-blue-hover transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
