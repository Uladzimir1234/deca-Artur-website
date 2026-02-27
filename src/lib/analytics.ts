/**
 * Analytics & Tag Management for DECA Windows
 *
 * Setup:
 * 1. Replace GA_MEASUREMENT_ID with your GA4 ID (G-XXXXXXXXXX)
 * 2. Replace GTM_ID with your GTM container ID (GTM-XXXXXXX)
 * 3. Configure HubSpot portal ID
 */

// ─── Configuration (replace with real IDs before launch) ───
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KRKVVHBM";
export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID || "XXXXXXX";

// ─── GA4 Event Tracking ───
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (w.gtag) {
    w.gtag("event", eventName, params);
  }
}

// ─── Pre-built Events for DECA ───
export const events = {
  /** User clicks "Request a Quote" CTA */
  requestQuote: (location: string) =>
    trackEvent("generate_lead", {
      event_category: "conversion",
      event_label: `quote_request_${location}`,
    }),

  /** User calls phone number */
  phoneCall: (location: string) =>
    trackEvent("phone_call", {
      event_category: "conversion",
      event_label: `phone_${location}`,
    }),

  /** User submits contact form */
  formSubmit: (formName: string) =>
    trackEvent("form_submission", {
      event_category: "conversion",
      event_label: formName,
    }),

  /** User views a product page */
  viewProduct: (productName: string, category: string) =>
    trackEvent("view_item", {
      event_category: "engagement",
      item_name: productName,
      item_category: category,
    }),

  /** User downloads a resource (brochure, spec sheet) */
  download: (fileName: string) =>
    trackEvent("file_download", {
      event_category: "engagement",
      file_name: fileName,
    }),

  /** User clicks outbound link */
  outboundClick: (url: string) =>
    trackEvent("click", {
      event_category: "outbound",
      link_url: url,
    }),

  /** User engages with energy calculator */
  calculatorUse: (step: string) =>
    trackEvent("calculator_interaction", {
      event_category: "engagement",
      step: step,
    }),
};

// ─── GTM Head Script (inject in layout.tsx <head>) ───
export function getGTMHeadScript(): string {
  if (!GTM_ID || GTM_ID === "GTM-XXXXXXX") return "";
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
}

// ─── GTM Body Noscript (inject after <body>) ───
export function getGTMBodyNoscript(): string {
  if (!GTM_ID || GTM_ID === "GTM-XXXXXXX") return "";
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
}

// ─── GA4 Script (if not using GTM) ───
export function getGA4Script(): string {
  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return "";
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure'
});`;
}
