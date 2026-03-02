"use client";

import { useState } from "react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer = (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer || [];
      (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer.push({ event: 'form_submit_success', form_name: 'lead_magnet' });
      setSubmitted(true);
      setEmail("");
      // Reset after 5 seconds for demo purposes
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with subtle gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-25 to-white">
        {/* Subtle dot pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern id="dot-pattern" x="40" y="40" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>

        {/* Decorative blur circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Brochure Preview */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm">
              {/* 3D Brochure Card - Tilted */}
              <div
                className="relative w-full aspect-[3/4] bg-gradient-to-br from-brand to-brand-dark rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 hover:shadow-3xl"
                style={{
                  transform: "perspective(1200px) rotateY(-8deg) rotateX(2deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Brochure Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                  {/* Window/document icon */}
                  <div className="mb-6">
                    <svg
                      className="w-16 h-16 opacity-90"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-center leading-tight mb-3">
                    DECA Product Catalog
                  </h3>
                  <p className="text-sm font-medium text-blue-100 mb-1">2026</p>

                  {/* Specs */}
                  <div className="text-center mt-8 space-y-2 border-t border-white/20 pt-6">
                    <p className="text-sm font-medium text-blue-100">48 Pages</p>
                    <p className="text-sm font-medium text-blue-100">Full Specifications</p>
                    <p className="text-sm font-medium text-blue-100">Color Options</p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30" />
                </div>

                {/* Glossy effect overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>

              {/* Shadow beneath for depth */}
              <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/5 rounded-full blur-lg" />
            </div>
          </div>

          {/* Right: Form & Copy */}
          <div className="flex flex-col justify-center">
            {!submitted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 leading-tight">
                  Get Our Free Product Catalog
                </h2>

                <p className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed">
                  Download your copy of the DECA Product Catalog and discover:
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-text-secondary">Complete product specifications & dimensions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-text-secondary">Available color options & finishes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-text-secondary">Pricing guides & bulk discounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-text-secondary">Installation guides & support resources</span>
                  </li>
                </ul>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30"
                  >
                    Download Free Catalog
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                  </button>

                  <p className="text-xs text-text-muted text-center">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </>
            ) : (
              /* Thank You Message */
              <div className="text-center py-12">
                <div className="mb-6 flex justify-center">
                  <svg
                    className="w-16 h-16 text-green-500 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  Thank You!
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Your free catalog is on its way. Check your inbox for a download link and exclusive offers.
                </p>
                <p className="text-sm text-text-muted">
                  In the meantime, explore our full product range on the website.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
