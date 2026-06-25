import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://malpassbrickwork.co.uk"),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name}. Professional bricklaying covering ${site.serviceArea}. Extensions, garden walls, repointing, chimney repairs and more. Call ${site.phoneDisplay} for a free, no-obligation quote.`,
  keywords: [
    "bricklayer",
    "brickwork",
    "bricklaying",
    "repointing",
    "garden walls",
    "house extensions",
    "chimney repairs",
    site.serviceArea,
    site.name,
  ],
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: `Professional bricklaying covering ${site.serviceArea}. Free quotes, call ${site.phoneDisplay}.`,
    type: "website",
    locale: "en_GB",
    siteName: site.name,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  description: `Brickwork specialists covering ${site.serviceArea}.`,
  telephone: site.phoneDial,
  areaServed: site.serviceArea,
  sameAs: [site.instagram, site.facebook, site.googleReviews].filter(Boolean),
  priceRange: "££",
  openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Add `js` class before paint so reveal elements hide only when JS can animate them */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
