"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface StickyCTAProps {
  text?: string;
  href?: string;
  /** How far user must scroll (px) before the bar appears */
  showAfter?: number;
}

export default function StickyCTA({
  text = "Get Free Quote",
  href = "/quote",
  showAfter = 600,
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const pastThreshold = scrollY > showAfter;

        /* Hide when footer is in view */
        const footer = document.querySelector("footer");
        let nearFooter = false;
        if (footer) {
          const footerTop = footer.getBoundingClientRect().top;
          const barH = barRef.current?.offsetHeight ?? 64;
          nearFooter = footerTop <= window.innerHeight + barH;
        }

        setVisible(pastThreshold && !nearFooter);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      ref={barRef}
      className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="pointer-events-auto bg-white/80 backdrop-blur-lg border-t border-gray-200/60 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          <p className="hidden sm:block text-sm text-text-secondary">
            Custom-made in Massachusetts — Factory-direct pricing
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={href}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-brand/25"
            >
              {text}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:+15082818682"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (508) 281-8682
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
