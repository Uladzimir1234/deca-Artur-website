import Link from "next/link";

/* ===== Animated CTA Button (white → orange gradient + blueprint grid on hover) ===== */
export function AnimatedCTA({ href, children, className = "", size = "md", id, variant = "orange" }: { href: string; children: React.ReactNode; className?: string; size?: "sm" | "md" | "lg"; id?: string; variant?: "orange" | "blue" }) {
  const patternId = id ? `cta-grid-${id}` : `cta-grid-${Math.random().toString(36).slice(2, 8)}`;
  const pad = size === "sm" ? "px-5 py-2.5 text-sm" : size === "lg" ? "px-8 py-3.5 text-base" : "px-6 py-3 text-sm";
  const isBlue = variant === "blue";
  const textColor = isBlue ? "text-[#e8873a]" : "text-brand";
  const hoverGradient = isBlue
    ? "linear-gradient(135deg, #2a3f7a 0%, #3854AA 40%, #4a6abf 100%)"
    : "linear-gradient(135deg, #d94e1a 0%, #f47b2b 40%, #e8873a 100%)";
  const hoverShadow = isBlue ? "hover:shadow-[#3854AA]/30" : "hover:shadow-[#e8873a]/30";
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded font-semibold inline-flex items-center gap-2 transition-all duration-500 bg-white border border-blue-accent/30 ${textColor} hover:text-white hover:border-transparent hover:shadow-lg ${hoverShadow} ${pad} ${className}`}
    >
      <span className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0" />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: hoverGradient }} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.12 }}>
        <defs><pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="relative z-10">{children}</span>
      <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

/* ===== Photo Placeholder (Russian description) ===== */
export function PhotoPlaceholder({
  description,
  height = "h-64",
  className = "",
}: {
  description: string;
  height?: string;
  className?: string;
}) {
  return (
    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl ${height} flex flex-col items-center justify-center text-center p-6 border border-border ${className}`}>
      <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
      <span className="text-gray-400 text-xs leading-relaxed max-w-[200px]">{description}</span>
    </div>
  );
}

/* ===== Video Placeholder ===== */
export function VideoPlaceholder({ description }: { description: string }) {
  return (
    <div className="bg-black/90 rounded-xl aspect-video flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/50 to-brand/30" />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto backdrop-blur">
          <svg className="w-8 h-8 text-white/80 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-white/40 text-xs">{description}</span>
      </div>
    </div>
  );
}

/* ===== Section wrapper ===== */
export function Section({ children, className = "", dark = false, gray = false, id }: { children: React.ReactNode; className?: string; dark?: boolean; gray?: boolean; id?: string }) {
  const bg = dark ? "bg-brand text-white" : gray ? "bg-warm-gray" : "bg-white";
  return (
    <section id={id} className={`py-28 ${bg} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

/* ===== Section Title ===== */
export function SectionTitle({ badge, title, subtitle, light = false, align = "center" }: { badge?: string; title: string; subtitle?: string; light?: boolean; align?: "center" | "left" }) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${textAlign} mb-10`}>
      {badge && <span className={`inline-block text-[10px] font-semibold tracking-widest uppercase mb-2 ${light ? "text-brand-lighter" : "text-brand"}`}>{badge}</span>}
      <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${light ? "text-white" : "text-text-primary"}`}>{title}</h2>
      {subtitle && <p className={`max-w-2xl text-[15px] leading-relaxed ${align === "center" ? "mx-auto" : ""} ${light ? "text-white/60" : "text-text-secondary"}`}>{subtitle}</p>}
    </div>
  );
}

/* ===== Feature Card ===== */
export function FeatureCard({ icon, title, description, href, tag }: { icon?: React.ReactNode; title: string; description: string; href?: string; tag?: string }) {
  const inner = (
    <div className={`bg-white rounded-xl border border-border p-6 h-full transition-all hover:shadow-lg hover:border-blue-accent/30 ${href ? "cursor-pointer group" : ""}`}>
      {icon && <div className="text-3xl mb-4">{icon}</div>}
      {tag && <span className="inline-block text-xs font-semibold text-blue-accent bg-blue-light px-2.5 py-1 rounded mb-3">{tag}</span>}
      <h3 className="font-semibold text-text-primary text-lg mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      {href && <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-accent group-hover:gap-2.5 transition-all">Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>}
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

/* ===== Product Card (matches Figma "Our Products") ===== */
export function ProductCard({ title, subtitle, href, photoDesc }: { title: string; subtitle: string; href: string; photoDesc: string }) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl border border-border overflow-hidden transition-all hover:shadow-xl hover:border-blue-accent/20">
        <PhotoPlaceholder description={photoDesc} height="h-56" className="rounded-none border-0" />
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-blue-accent transition-colors">{title}</h3>
            <p className="text-sm text-text-secondary">{subtitle}</p>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full bg-blue-accent/10 flex items-center justify-center group-hover:bg-blue-accent transition-colors">
            <svg className="w-5 h-5 text-blue-accent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ===== Stat Card ===== */
export function StatCard({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div className={`text-center py-6 px-4 rounded-xl ${light ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-border"}`}>
      <div className={`text-3xl md:text-4xl font-bold mb-1 ${light ? "text-white" : "text-blue-accent"}`}>{value}</div>
      <div className={`text-sm ${light ? "text-white/60" : "text-text-secondary"}`}>{label}</div>
    </div>
  );
}

/* ===== CTA Block ("Got Questions?" from Figma) ===== */
export function CTABlock({ title, subtitle, btnText, btnHref = "/quote", variant = "navy" }: { title: string; subtitle: string; btnText: string; btnHref?: string; variant?: "navy" | "blue" }) {
  const bg = variant === "blue" ? "bg-brand-light" : "bg-brand";
  return (
    <section className={`${bg} text-white py-20`}>
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-white/60 text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedCTA href={btnHref} size="lg" id="ctablock">{btnText}</AnimatedCTA>
          <a href="tel:+14137714457" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            (413) 771-4457
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Service Icons Row ("Exceptional Service" from Figma) ===== */
export function ServiceIcons() {
  const items = [
    { title: "Faster Delivery", desc: "Local manufacturing means shorter lead times", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /> },
    { title: "Localized Support", desc: "On-site consultations and after-sale service", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /> },
    { title: "Made in the USA", desc: "Quality manufacturing in Westfield, MA", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /> },
    { title: "Ease of Collaboration", desc: "Streamlined process from quote to installation", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /> },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item) => (
        <div key={item.title} className="text-center">
          <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4 text-brand">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
          </div>
          <h3 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h3>
          <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ===== Expert Guide Card ===== */
export function GuideCard({ title, desc, href, photoDesc }: { title: string; desc: string; href: string; photoDesc: string }) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
        <PhotoPlaceholder description={photoDesc} height="h-40" className="rounded-none border-0" />
        <div className="p-5">
          <h4 className="font-semibold text-text-primary mb-2 group-hover:text-blue-accent transition-colors">{title}</h4>
          <p className="text-sm text-text-muted leading-relaxed line-clamp-2">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

/* ===== Breadcrumb ===== */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.decawindows.com/" },
    ...items.map((item, i) => ({ "@type": "ListItem", position: i + 2, name: item.label, item: item.href ? `https://www.decawindows.com${item.href}` : undefined })),
  ];
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems };
  return (
    <div className="bg-warm-gray border-b border-border">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-blue-accent transition-colors">Home</Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-text-muted/50">/</span>
            {item.href ? <Link href={item.href} className="hover:text-blue-accent transition-colors">{item.label}</Link> : <span className="text-text-primary font-medium">{item.label}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===== Page Hero ===== */
export function PageHero({ title, subtitle, badge, children }: { title: string; subtitle?: string; badge?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-brand relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand to-brand-light opacity-80" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          {badge && <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-accent mb-4">{badge}</span>}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ===== ImagePlaceholder (legacy compat) ===== */
export function ImagePlaceholder({ label = "Image", height = "h-64" }: { label?: string; height?: string }) {
  return <PhotoPlaceholder description={label} height={height} />;
}
