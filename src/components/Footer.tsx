import Link from "next/link";

const decaRepeat = "DECA   ".repeat(20);

export default function Footer() {
  return (
    <footer className="bg-brand relative overflow-hidden">
      {/* Slow-rotating blueprint pattern — 2% opacity */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[200%] h-[200%]"
          style={{
            animation: "footer-spin 240s linear infinite",
            opacity: 0.02,
          }}
        >
          <svg
            viewBox="0 0 1200 1200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
          >
            {/* Grid */}
            {Array.from({ length: 31 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} strokeWidth="0.4" />
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="1200" strokeWidth="0.4" />
            ))}
            {/* Window frame 1 */}
            <rect x="200" y="150" width="200" height="280" rx="2" strokeWidth="1.5" />
            <line x1="300" y1="150" x2="300" y2="430" strokeWidth="1" />
            <line x1="200" y1="290" x2="400" y2="290" strokeWidth="0.8" />
            <rect x="206" y="156" width="88" height="128" rx="1" strokeWidth="0.5" />
            <rect x="306" y="156" width="88" height="128" rx="1" strokeWidth="0.5" />
            <rect x="206" y="296" width="88" height="128" rx="1" strokeWidth="0.5" />
            <rect x="306" y="296" width="88" height="128" rx="1" strokeWidth="0.5" />
            {/* Handle dots */}
            <circle cx="294" cy="220" r="3" strokeWidth="0.8" />
            <circle cx="312" cy="360" r="3" strokeWidth="0.8" />
            {/* Dimension lines */}
            <line x1="175" y1="150" x2="175" y2="430" strokeWidth="0.5" />
            <line x1="170" y1="150" x2="180" y2="150" strokeWidth="0.5" />
            <line x1="170" y1="430" x2="180" y2="430" strokeWidth="0.5" />
            <line x1="200" y1="455" x2="400" y2="455" strokeWidth="0.5" />
            <line x1="200" y1="450" x2="200" y2="460" strokeWidth="0.5" />
            <line x1="400" y1="450" x2="400" y2="460" strokeWidth="0.5" />

            {/* Window frame 2 — single tilt */}
            <rect x="700" y="600" width="140" height="200" rx="2" strokeWidth="1.5" />
            <rect x="706" y="606" width="128" height="188" rx="1" strokeWidth="0.5" />
            <circle cx="830" cy="700" r="3" strokeWidth="0.8" />
            <path d="M770 630 L770 618 L763 624" strokeWidth="0.8" strokeLinecap="round" />
            {/* Dimension */}
            <line x1="680" y1="600" x2="680" y2="800" strokeWidth="0.5" />
            <line x1="675" y1="600" x2="685" y2="600" strokeWidth="0.5" />
            <line x1="675" y1="800" x2="685" y2="800" strokeWidth="0.5" />

            {/* Sliding door */}
            <rect x="500" y="300" width="300" height="220" rx="2" strokeWidth="1.5" />
            <line x1="650" y1="300" x2="650" y2="520" strokeWidth="1" />
            <rect x="506" y="306" width="138" height="208" rx="1" strokeWidth="0.5" />
            <rect x="656" y="306" width="138" height="208" rx="1" strokeWidth="0.5" />
            <path d="M644 410 L656 410" strokeWidth="1.5" strokeLinecap="round" />

            {/* Circle detail marks */}
            <circle cx="950" cy="200" r="50" strokeWidth="0.5" />
            <circle cx="950" cy="200" r="35" strokeWidth="0.3" />
            <line x1="900" y1="200" x2="1000" y2="200" strokeWidth="0.3" />
            <line x1="950" y1="150" x2="950" y2="250" strokeWidth="0.3" />

            {/* Section mark */}
            <circle cx="150" cy="800" r="25" strokeWidth="0.6" />
            <line x1="125" y1="800" x2="175" y2="800" strokeWidth="0.4" />

            {/* Arc detail */}
            <path d="M 900 900 A 80 80 0 0 1 980 980" strokeWidth="0.6" />
            <path d="M 910 910 A 60 60 0 0 1 970 970" strokeWidth="0.3" />

            {/* Cross marks */}
            <line x1="100" y1="500" x2="120" y2="520" strokeWidth="0.5" />
            <line x1="120" y1="500" x2="100" y2="520" strokeWidth="0.5" />
            <line x1="1050" y1="450" x2="1070" y2="470" strokeWidth="0.5" />
            <line x1="1070" y1="450" x2="1050" y2="470" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* ── DECA marquee on background ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:flex items-center overflow-hidden">
        <div
          className="whitespace-nowrap"
          style={{
            fontSize: "clamp(385px, 46vw, 770px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.02em",
            animation: "footer-marquee 720s linear infinite",
          }}
        >
          {decaRepeat}{decaRepeat}
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 pt-16 md:pt-24 pb-8 md:pb-12">
        {/* ── Top: Brand + Contact ── */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-white font-bold text-2xl tracking-tight">DECA</span>
                <span className="text-white/40 text-[10px] leading-tight border-l border-white/15 pl-3">
                  Euro Windows<br />and Doors
                </span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                USA-based manufacturer of premium European-style tilt&nbsp;&amp;&nbsp;turn windows and doors. Factory-direct from Westfield, Massachusetts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span>109 Apremont Way, Westfield, MA</span>
              </div>
              <a href="tel:+14137714457" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                (413) 771-4457
              </a>
              <a href="mailto:info@decawindows.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                info@decawindows.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            <div className="flex flex-col items-start gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Windows</span>
              <div className="flex flex-col items-start gap-2">
                {[
                  { href: "/windows", label: "All Windows" },
                  { href: "/tilt-turn", label: "Tilt & Turn" },
                  { href: "/windows/upvc-windows", label: "uPVC Windows" },
                  { href: "/windows/aluminum-windows", label: "Aluminum" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Doors</span>
              <div className="flex flex-col items-start gap-2">
                {[
                  { href: "/doors", label: "All Doors" },
                  { href: "/doors/tilt-turn-doors", label: "Tilt & Turn Doors" },
                  { href: "/doors/aluminium-doors", label: "Aluminium Doors" },
                  { href: "/doors/entry-doors", label: "Entry Doors" },
                  { href: "/doors/french-doors", label: "French Doors" },
                  { href: "/sliding-doors", label: "Sliding Doors" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Service Areas</span>
              <div className="flex flex-col items-start gap-2">
                {["Massachusetts", "Boston, MA", "Connecticut", "Rhode Island", "New Hampshire", "New York"].map((area) => (
                  <Link key={area} href="/locations" className="text-sm text-white/60 hover:text-white transition-colors">{area}</Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">Company</span>
              <div className="flex flex-col items-start gap-2">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/performance", label: "Technology" },
                  { href: "/professionals", label: "For Professionals" },
                  { href: "/blog", label: "Blog" },
                  { href: "/quote", label: "Contact" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="max-w-7xl mx-auto mt-10">
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-white font-bold text-sm tracking-tight">DECA Windows</span>
              <p className="text-xs text-white/30">&copy; 2026 DECA Company. All Rights Reserved.</p>
              <span className="hidden sm:block text-white/15">|</span>
              <div className="flex items-center gap-3 text-xs text-white/30">
                <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
              </div>
              <span className="hidden sm:block text-white/15">|</span>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                <span>Licensed &amp; Insured</span>
              </div>
            </div>

            <a
              href="https://bankaiagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bankai-link"
            >
              <span className="text-xs text-white/30 mr-1.5">Design &amp; Development by</span>
              <span className="bankai-icon">
                {/* Mini lightning bolts */}
                <span className="mini-bolts">
                  <svg className="mini-bolt" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15" fill="none"><path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="#ef4444"/></svg>
                  <svg className="mini-bolt" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 15 15" fill="none"><path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="#f87171"/></svg>
                  <svg className="mini-bolt" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 15 15" fill="none"><path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="#fca5a5"/></svg>
                  <svg className="mini-bolt" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 15 15" fill="none"><path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="#ef4444"/></svg>
                  <svg className="mini-bolt" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 15 15" fill="none"><path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="#f87171"/></svg>
                </span>
                {/* Main lightning bolt */}
                <svg className="main-bolt" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M0.530008 4.43966L13.5591 0.442106C13.9327 0.327463 14.2106 0.789407 13.9342 1.06577L7.92691 7.0731C7.73792 7.26208 7.87176 7.58523 8.13904 7.58523H11.1043C11.4395 7.58523 11.6063 7.99129 11.368 8.2269L5.15569 14.3686C4.91884 14.6028 4.51705 14.435 4.51705 14.1019V10.8682C4.51705 10.7025 4.38273 10.5682 4.21705 10.5682H0.75C0.335786 10.5682 0 10.2324 0 9.81818V5.15667C0 4.82719 0.215025 4.5363 0.530008 4.43966Z" fill="white" fillOpacity="0.6"/>
                </svg>
              </span>
              <span className="bankai-text">BANKAI.AGENCY</span>
            </a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes footer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes footer-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ===== BANKAI LIGHTNING ANIMATION ===== */
        .bankai-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: 0.25rem;
          text-decoration: none;
          cursor: pointer;
        }
        .bankai-link .bankai-icon {
          position: relative;
          transition: filter 0.1s ease;
        }
        .bankai-link .bankai-icon svg.main-bolt {
          position: relative;
          z-index: 2;
          transition: filter 0.1s ease, transform 0.2s ease, opacity 0.15s ease;
        }
        .bankai-link .bankai-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2.1875rem;
          height: 2.1875rem;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(239,68,68,0.9) 25%, rgba(220,38,38,0.5) 50%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }
        .bankai-link .mini-bolts {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2.5rem;
          height: 2.5rem;
          pointer-events: none;
          z-index: 0;
        }
        .bankai-link .mini-bolt {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        .bankai-link .mini-bolt:nth-child(1) { top: 0.125rem; left: 50%; transform: translateX(-50%) scale(0.35) rotate(-15deg); }
        .bankai-link .mini-bolt:nth-child(2) { top: 0.5rem; right: 0; transform: scale(0.3) rotate(25deg); }
        .bankai-link .mini-bolt:nth-child(3) { bottom: 0.3125rem; right: 0.125rem; transform: scale(0.28) rotate(45deg); }
        .bankai-link .mini-bolt:nth-child(4) { bottom: 0.125rem; left: 50%; transform: translateX(-50%) scale(0.32) rotate(10deg); }
        .bankai-link .mini-bolt:nth-child(5) { top: 0.625rem; left: 0; transform: scale(0.3) rotate(-30deg); }
        .bankai-link .bankai-text {
          position: relative;
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          background: linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 35%, #fff 45%, #ff6b6b 50%, #fff 55%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.6) 100%);
          background-size: 300% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bankai-link:hover .bankai-icon::before {
          animation: bankai-lightning-flash 0.5s ease-out forwards;
        }
        .bankai-link:hover .bankai-icon svg.main-bolt {
          animation: bankai-lightning-strike-main 0.4s ease-out forwards;
          filter: drop-shadow(0 0 10px rgba(239,68,68,1));
        }
        .bankai-link:hover .bankai-icon svg.main-bolt path {
          fill: #fff;
          fill-opacity: 1;
        }
        .bankai-link:hover .mini-bolt:nth-child(1) { animation: bankai-mini-bolt-flicker 0.6s ease-out 0s forwards; }
        .bankai-link:hover .mini-bolt:nth-child(2) { animation: bankai-mini-bolt-flicker 0.5s ease-out 0.08s forwards; }
        .bankai-link:hover .mini-bolt:nth-child(3) { animation: bankai-mini-bolt-flicker 0.55s ease-out 0.15s forwards; }
        .bankai-link:hover .mini-bolt:nth-child(4) { animation: bankai-mini-bolt-flicker 0.5s ease-out 0.05s forwards; }
        .bankai-link:hover .mini-bolt:nth-child(5) { animation: bankai-mini-bolt-flicker 0.6s ease-out 0.12s forwards; }
        .bankai-link:hover .bankai-text {
          animation: bankai-text-shimmer 1s ease-out 0.1s forwards;
        }
        @keyframes bankai-lightning-flash {
          0%   { transform: translate(-50%, -50%) scale(0);   opacity: 0; }
          20%  { transform: translate(-50%, -50%) scale(2);   opacity: 1; }
          40%  { transform: translate(-50%, -50%) scale(1.5); opacity: 0.7; }
          60%  { transform: translate(-50%, -50%) scale(2);   opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        @keyframes bankai-lightning-strike-main {
          0%   { transform: translate(15px, -15px) scale(0.5) rotate(-10deg); opacity: 0; }
          10%  { transform: translate(10px, -10px) scale(0.7) rotate(-5deg);  opacity: 0.4; }
          25%  { transform: translate(3px, -3px) scale(0.9) rotate(-2deg);    opacity: 0.8; }
          40%  { transform: translate(0, 0) scale(1.15) rotate(0deg);         opacity: 1; }
          60%  { transform: translate(0, 0) scale(1) rotate(0deg);            opacity: 1; }
          100% { transform: translate(0, 0) scale(1) rotate(0deg);            opacity: 1; }
        }
        @keyframes bankai-mini-bolt-flicker {
          0%   { opacity: 0; }
          10%  { opacity: 0.9; }
          20%  { opacity: 0.3; }
          35%  { opacity: 1; }
          50%  { opacity: 0.4; }
          65%  { opacity: 0.8; }
          80%  { opacity: 0.2; }
          100% { opacity: 0; }
        }
        @keyframes bankai-text-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: -150% 0; }
        }
      `}} />
    </footer>
  );
}
