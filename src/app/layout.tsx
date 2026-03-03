import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ClientProviders } from "@/components/ClientProviders";
import { GTM_ID, getGTMHeadScript, getGTMBodyNoscript } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "DECA Windows & Doors | European Energy-Efficient Windows Made in USA",
  description:
    "Premium European-style tilt & turn windows and doors manufactured in Massachusetts. Industry-leading U-values, soundproofing, and energy efficiency. Factory-direct pricing.",
  keywords: "european windows, tilt and turn windows, energy efficient windows, Massachusetts windows, DECA windows",
  metadataBase: new URL("https://www.decawindows.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DECA Windows & Doors",
    title: "DECA Windows & Doors | European Energy-Efficient Windows Made in USA",
    description: "Premium European-style tilt & turn windows manufactured in Massachusetts. Factory-direct pricing.",
    url: "https://www.decawindows.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DECA Windows & Doors",
    description: "European tilt & turn windows made in Massachusetts. U-value 0.10.",
  },
  verification: {
    google: "PASTE_GSC_VERIFICATION_CODE_HERE",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DECA Windows & Doors",
  "url": "https://www.decawindows.com",
  "logo": "https://www.decawindows.com/logo.png",
  "description": "USA-based manufacturer of premium European-style tilt & turn windows and doors",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "109 Apremont Way",
    "addressLocality": "Westfield",
    "addressRegion": "MA",
    "postalCode": "01085",
    "addressCountry": "US"
  },
  "telephone": "+14137714457",
  "email": "info@decawindows.com",
  "sameAs": [
    "https://www.facebook.com/decawindows",
    "https://www.instagram.com/decawindows"
  ],
  "knowsAbout": [
    "Tilt and turn windows",
    "European windows",
    "Energy efficient windows",
    "uPVC windows",
    "Aluminum windows"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmHead = getGTMHeadScript();
  const gtmBody = getGTMBodyNoscript();

  return (
    <html lang="en">
      <head>
        {/* GTM — GA4 is configured inside GTM-KRKVVHBM, no manual gtag.js needed */}
        {gtmHead && <script dangerouslySetInnerHTML={{ __html: gtmHead }} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        {gtmBody && GTM_ID !== "GTM-XXXXXXX" && (
          <noscript dangerouslySetInnerHTML={{ __html: gtmBody }} />
        )}
        <ClientProviders>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
