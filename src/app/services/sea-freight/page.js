import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import InteractiveShip from "@/components/InteractiveShip";

export const metadata = {
  title: "Global Sea Freight Shipping & Ocean Cargo | Hasoon Logistics",
  description: "Hasoon Logistics is the best sea freight forwarding company in Dubai, offering secure Full Container Load (FCL) and Less than Container Load (LCL) ocean cargo shipping globally.",
  keywords: [
    "sea freight forwarding company",
    "ocean cargo shipping dubai",
    "best shipping company in uae",
    "fcl lcl ocean freight",
    "container shipping services",
    "hasoon logistics",
    "Jebel Ali shipping line agent",
    "reefer shipping services",
    "Verified Gross Mass VGM compliance",
    "port drayage forwarding"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hasoonlogistics.com/services/sea-freight",
  },
};

export default function SeaFreight() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Global Sea Freight Services",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "FCL/LCL ocean shipping container booking, customs port coordination, and direct ocean vessel chartering.",
    "areaServed": ["AE", "IN", "SA", "CN"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientInitializer />
      <BackgroundShader />
      <Header />

      <main>
        <section className="hero" style={{ minHeight: "50vh", padding: "8rem 0 3rem 0", position: "relative" }}>
          <InteractiveShip />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="hero-content scroll-reveal scroll-revealed" style={{ maxWidth: "700px" }}>
              <span className="hero-subtitle">High Capacity</span>
              <h1>Intercontinental Ocean Freight</h1>
              <p>
                Our sea freight network routes secure maritime containers across primary trading lanes. We organize dedicated FCL capacity and cost-effective LCL options to keep bulk supply chains running on time.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Port Integration</span>
                <h2>FCL & LCL Ocean Solutions</h2>
                <p>
                  From Jebel Ali Port in Dubai to Shanghai, Ningbo, Nhava Sheva, and Jeddah Islamic Port, we control local drayage, custom compliance audits, and booking networks.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Full Container Load (FCL) dedicated bookings</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Less than Container Load (LCL) weekly consolidation services</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Specialized reefer and flat-rack shipping configurations</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "1.5rem" }} className="text-gold">Silo Port Security</h3>
                <p>
                  We coordinate with port operators to verify cargo weight checks (VGM), secure storage clearances, and handle direct container transfer to warehouses, avoiding costly demurrage fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Consultation</span>
              <h2>Book Container Space</h2>
              <p>Connect with our ocean freight coordinators to secure container spaces, confirm shipping schedules, and get local port rates.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
