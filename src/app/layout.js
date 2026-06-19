import "./globals.css";

export const metadata = {
  title: "Best Logistics Company & Freight Forwarding | Hasoon Logistics",
  description: "Hasoon Logistics is the best logistics company and international freight forwarder. Offering priority air cargo, ocean shipping, customs clearance, and cold-chain warehousing in Dubai, Saudi Arabia, India, and China.",
  keywords: [
    "best logistics company in dubai",
    "freight forwarding services",
    "international freight forwarder",
    "customs clearance agent dubai",
    "best shipping company in uae",
    "sea freight forwarding",
    "air cargo services",
    "cold chain logistics dubai",
    "saudi customs clearance broker",
    "china to dubai shipping agent",
    "india to dubai logistics",
    "hasoon logistics",
    "global supply chain solutions",
    "b2b freight forwarding",
    "JAFZA customs broker",
    "SABER compliance",
    "FASAH broker",
    "JNPT custom clearing CHA",
    "pharma-grade cold chain storage"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://hasoonlogistics.com/",
    title: "Best Logistics Company & Freight Forwarding | Hasoon Logistics",
    description: "Experience global supply chain precision with Hasoon Logistics, the leading B2B freight forwarder and customs brokerage operator across UAE, Saudi Arabia, India, and China.",
    images: [
      {
        url: "https://hasoonlogistics.com/images/logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Logistics Company & Freight Forwarding | Hasoon Logistics",
    description: "Experience global supply chain precision with Hasoon Logistics, the leading B2B freight forwarder and customs brokerage operator.",
    images: ["https://hasoonlogistics.com/images/logo.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

