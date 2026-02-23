"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const topBarLinks = [
  { href: "/professionals/contractors", label: "For Contractors" },
  { href: "/professionals/architects", label: "For Architects" },
  { href: "/professionals/dealers", label: "For Dealers" },
  { href: "/professionals/commercial", label: "Commercial" },
];

const topBarRight = [
  { href: "/performance", label: "Technical Specifications" },
  { href: "/quote", label: "Support" },
];

const navItems = [
  {
    label: "Windows",
    children: [
      { href: "/windows", label: "All Windows" },
      { href: "/tilt-turn", label: "Tilt & Turn Windows" },
      { href: "/windows/upvc-windows", label: "uPVC Windows" },
      { href: "/windows/aluminum-windows", label: "Aluminum Windows" },
    ],
  },
  {
    label: "Doors",
    children: [
      { href: "/doors", label: "All Doors" },
      { href: "/doors/entry-doors", label: "Entry Doors" },
      { href: "/doors/french-doors", label: "Swing (French) Doors" },
      { href: "/sliding-doors", label: "Sliding Doors" },
    ],
  },
  {
    label: "Resources",
    children: [
      { href: "/performance", label: "Technology & Performance" },
      { href: "/cases", label: "Customer Stories" },
      { href: "/blog", label: "Expert Guides" },
      { href: "/about", label: "About DECA" },
      { href: "/team", label: "Our Team" },
      { href: "/locations", label: "Service Areas" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { href: "/calculator", label: "Calculator", highlight: true },
  { href: "/professionals", label: "For Pros" },
  { href: "/quote", label: "Contact" },
];

/*
 * Scroll states:
 *  "top"      — page at very top, full header visible, no shadow
 *  "scrolled" — scrolled a bit, top-bar collapses, shadow fades in
 *  "hidden"   — scrolling down fast, entire header slides up
 *  "peek"     — scrolling up, compact header peeks back (no top-bar)
 */
type ScrollPhase = "top" | "scrolled" | "hidden" | "peek";

// Pages with full-bleed hero backgrounds where header should be transparent
const transparentHeroPages = ["/"];

export default function Nav() {
  const pathname = usePathname();
  const hasHeroBg = transparentHeroPages.includes(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [phase, setPhase] = useState<ScrollPhase>("top");
  const lastY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publish header height as CSS custom property so hero can use calc(100svh - var(--header-h))
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty("--header-h", `${headerRef.current.offsetHeight}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const accumulated = useRef(0);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Accumulate scroll direction; reset on direction change
      if ((delta > 0 && accumulated.current < 0) || (delta < 0 && accumulated.current > 0)) {
        accumulated.current = 0;
      }
      accumulated.current += delta;

      if (y <= 10) {
        setPhase("top");
        accumulated.current = 0;
      } else if (accumulated.current > 30 && y > 120) {
        setPhase("hidden");
      } else if (accumulated.current < -20) {
        setPhase("peek");
      } else if (y > 10 && y <= 120 && Math.abs(delta) < 2) {
        setPhase("scrolled");
      }

      lastY.current = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const isTop = phase === "top";
  const isTransparent = isTop && hasHeroBg; // transparent only on hero pages at top
  const isHidden = phase === "hidden";
  const showTopBar = isTop;
  const hasShadow = phase === "scrolled" || phase === "peek";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease",
        boxShadow: hasShadow ? "0 4px 30px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {/* Top bar — B2B links (collapses on scroll) */}
      <div
        className="text-white/50 text-xs hidden lg:block overflow-hidden"
        style={{
          maxHeight: showTopBar ? "2rem" : "0",
          opacity: showTopBar ? 1 : 0,
          backgroundColor: isTransparent ? "transparent" : "var(--color-brand-darker, #2a3f7a)",
          transition: "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, background-color 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-5">
            {topBarLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {topBarRight.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`border-b ${isTransparent ? "border-white/5" : "border-white/10"}`}
        style={{
          backgroundColor: isTransparent ? "transparent" : "rgba(56, 84, 170, 0.95)",
          backdropFilter: isTransparent ? "none" : "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: isTransparent ? "none" : "blur(20px) saturate(1.6)",
          transition: "background-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="text-white font-bold text-xl tracking-tight">DECA</span>
            <span className="hidden sm:block text-white/40 text-[9px] leading-tight border-l border-white/15 pl-2.5">
              Euro Windows<br />and Doors
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={`text-[12px] px-3 py-2 transition-colors flex items-center gap-1 uppercase tracking-wider font-medium ${
                    (item as { highlight?: boolean }).highlight
                      ? "text-white hover:text-white/80"
                      : "text-white/60 hover:text-white"
                  }`}>
                    {item.label}
                    <svg
                      className="w-2.5 h-2.5 opacity-40 transition-transform duration-200"
                      style={{ transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0)" }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className="absolute top-full left-0 pt-1"
                    style={{
                      opacity: openDropdown === item.label ? 1 : 0,
                      transform: openDropdown === item.label ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
                      pointerEvents: openDropdown === item.label ? "auto" : "none",
                      transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                      transformOrigin: "top center",
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-100 py-1.5 w-52">
                      {item.children.map((child, ci) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-[13px] text-gray-600 hover:bg-blue-light hover:text-brand transition-colors"
                          style={{
                            opacity: openDropdown === item.label ? 1 : 0,
                            transform: openDropdown === item.label ? "translateX(0)" : "translateX(-6px)",
                            transition: `opacity 0.2s ease ${ci * 0.04}s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1) ${ci * 0.04}s`,
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="text-[12px] text-white/60 hover:text-white px-3 py-2 transition-colors uppercase tracking-wider font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search icon */}
            <button className="hidden lg:block text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <a
              href="tel:+14137714457"
              className="hidden md:flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (413) 771-4457
            </a>
            <Link
              href="/quote"
              className="group relative overflow-hidden px-4 py-2 rounded text-[12px] font-extrabold flex items-center gap-1.5 uppercase tracking-wider transition-all duration-500 bg-white text-brand hover:text-white hover:shadow-lg hover:shadow-[#e8873a]/30"
            >
              {/* Default white bg */}
              <span className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0" />
              {/* Orange bg with blueprint grid — reveals on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #d94e1a 0%, #f47b2b 40%, #e8873a 100%)" }} />
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.12 }}>
                <defs><pattern id="nav-cta-grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#nav-cta-grid)" />
              </svg>
              <span className="relative z-10">Request a Quote</span>
              <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/80 hover:text-white p-1"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-white/10 py-4 px-4 space-y-1">
            {navItems.flatMap((item) =>
              item.children
                ? item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-white/70 hover:text-white py-2.5 px-3 rounded hover:bg-white/5"
                    >
                      {child.label}
                    </Link>
                  ))
                : [
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm text-white/70 hover:text-white py-2.5 px-3 rounded hover:bg-white/5"
                    >
                      {item.label}
                    </Link>,
                  ]
            )}
            {/* Mobile B2B links */}
            <div className="border-t border-white/10 mt-3 pt-3">
              {topBarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs text-white/40 hover:text-white/70 py-1.5 px-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
