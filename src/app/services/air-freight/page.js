import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";

export const metadata = {
  title: "Priority Air Cargo & Air Freight Forwarding - Hasoon Logistics",
  description: "Hasoon Logistics is the best air freight forwarding company in Dubai, offering priority air cargo shipping, express charter flights, and global door-to-door transit.",
  keywords: [
    "air freight forwarding dubai",
    "priority air cargo services",
    "best air cargo company",
    "international air shipping",
    "express air cargo charter",
    "hasoon logistics"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/services/air-freight",
  },
};

export default function AirFreight() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Global Air Freight Services",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "Priority air cargo, express consolidated freight, and private cargo charter flights.",
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
              <span className="hero-subtitle">High Velocity</span>
              <h1>Global Air Freight Services</h1>
              <p>
                When time is the deciding variable, our priority air cargo services deliver your high-value assets securely. Connecting key regional hubs in Dubai, Mumbai, Riyadh, and Shanghai with absolute scheduling certainty.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Express Channels</span>
                <h2>Priority Air Cargo Networks</h2>
                <p>
                  We operate direct consolidation services and private aircraft charters to coordinate cargo movement for pharmaceuticals, high-tech parts, and critical industrial supplies.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>12 to 36 hours express global airport-to-airport transit</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>GDP-compliant temperature-controlled air container vaulting</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Secure hazardous materials (HAZMAT) classification compliance</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "1.5rem" }} className="text-gold">Time-Critical Control</h3>
                <p>
                  Our dedicated corporate desk provides real-time updates and expedited ramp clearances, ensuring custom paperwork matches exact IATA rules to bypass terminal holdovers.
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
              <h2>Request Air Cargo Rate</h2>
              <p>Discuss your express shipping volumes, dimensional weights, and private cargo routing options with our specialists.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
