import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";

export const metadata = {
  title: "Best Freight Forwarding & Cargo Services | Hasoon Logistics",
  description: "Hasoon Logistics is a premier international freight forwarder. We provide custom B2B cargo forwarding, air/sea shipping, and customs brokerage globally.",
  keywords: [
    "best freight forwarder in dubai",
    "freight forwarding services",
    "international freight forwarder",
    "cargo forwarding dubai",
    "b2b logistics solutions",
    "multi-modal cargo shipping",
    "hasoon logistics",
    "LCL container consolidation",
    "project cargo shipping agent",
    "air ocean multi-modal transit",
    "AEO priority freight forwarding"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hasoonlogistics.com/services/freight-forwarding",
  },
};

export default function FreightForwarding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "B2B Freight Forwarding Services",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "Premium international multi-modal freight forwarding by air, sea, and road.",
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
        <section className="hero" style={{ minHeight: "60vh", padding: "10rem 0 6rem 0" }}>
          <div className="container">
            <div className="hero-content scroll-reveal scroll-revealed" style={{ maxWidth: "800px" }}>
              <span className="hero-subtitle">Capabilities</span>
              <h1>Global Freight Forwarding</h1>
              <p>
                Hasoon Logistics establishes direct supply chain corridors across ocean lanes, priority air charts, and cross-border road networks. We route your cargo with optimal speed, security, and full customs compliance.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">End-to-End Solutions</span>
                <h2>Integrated Cargo Forwarding</h2>
                <p>
                  Our certified logistics networks bridge complex supply chain channels. We handle documentation, container consolidation, multi-modal routing, and tracking.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Multi-modal documentation (BOL, AWB, Certificate of Origin)</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Consolidated less-than-container (LCL) forwarding</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Large-scale project cargo and industrial transport charters</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "1.5rem" }} className="text-gold">Silo Benefits</h3>
                <p>
                  By bypassing intermediaries, our direct contract lanes guarantee cargo slots, reduce transport risks, and lower customs clearance delays at major trade hubs.
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
              <h2>Book A Cargo Slot</h2>
              <p>Contact our global corporate desk to discuss shipping corridors, freight tariffs, and private contract rates.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem" }}>
                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Corporate Desk</div>
                    <div className="info-card-value">desk@hasoonlogistics.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
