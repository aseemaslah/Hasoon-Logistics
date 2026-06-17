import "./globals.css";

export const metadata = {
  title: "Hasoon Logistics | Global Luxury Supply Chain Solutions",
  description: "Discover Hasoon Logistics. Offering elite air cargo, ocean shipping, secure overland dispatch, and specialized temperature-controlled warehousing.",
  keywords: ["Hasoon Logistics", "global supply chain", "premium air freight", "secure ocean cargo", "temperature controlled warehousing", "logistics experts"],
  alternates: {
    canonical: "https://hasoonlogistics.com/",
  },
  openGraph: {
    type: "website",
    url: "https://hasoonlogistics.com/",
    title: "Hasoon Logistics | Global Luxury Supply Chain Solutions",
    description: "Experience intercontinental precision with Hasoon Logistics. High-performance cargo transport engineered for maximum security and luxury care.",
    images: [
      {
        url: "https://hasoonlogistics.com/images/logo.svg",
      },
    ],
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

