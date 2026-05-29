import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SectionIndex from "@/components/SectionIndex";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["800"],
});

const SITE_URL = "https://horizonrelevance.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07031a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Horizon Relevance — AI + Cloud + DevSecOps Platform",
    template: "%s | Horizon Relevance",
  },
  description:
    "Next-gen cloud solutions powered by AI — reduce costs, automate security, and scale confidently. DevSecOps as a Service for engineering teams.",
  keywords: [
    "cloud cost optimization",
    "DevSecOps",
    "AI monitoring",
    "cloud migration",
    "AI DevOps platform",
    "serverless framework",
    "cloud engineering",
    "Horizon Relevance",
  ],
  authors: [{ name: "Horizon Relevance", url: SITE_URL }],
  creator: "Horizon Relevance",
  publisher: "Horizon Relevance LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Horizon Relevance",
    title: "Horizon Relevance — AI + Cloud + DevSecOps Platform",
    description:
      "Next-gen cloud solutions powered by AI — reduce costs, automate security, and scale confidently.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Horizon Relevance — AI + Cloud + DevSecOps Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Relevance — AI + Cloud + DevSecOps Platform",
    description:
      "Next-gen cloud solutions powered by AI — reduce costs, automate security, and scale confidently.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horizon Relevance",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Next-gen AI, Cloud, and DevSecOps platform for engineering teams.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16 Homes Park Avenue",
    addressLocality: "Iselin",
    addressRegion: "NJ",
    postalCode: "08830",
    addressCountry: "US",
  },
  telephone: "+1-908-656-2114",
  email: "info@horizonrelevance.com",
  foundingDate: "2024",
  sameAs: ["https://www.linkedin.com/company/horizonrelevance/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <SectionIndex />
        {children}
      </body>
    </html>
  );
}
