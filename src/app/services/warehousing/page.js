import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";

export const metadata = {
  title: "Cold Chain Logistics & Temperature Controlled Warehousing - Hasoon Logistics",
  description: "Hasoon Logistics is the best cold chain logistics provider in Dubai, offering GDP-compliant temperature-controlled warehousing, pharmaceutical storage, and bonded logistics.",
  keywords: [
    "cold chain logistics dubai",
    "temperature controlled warehousing",
    "bonded logistics warehouse",
    "pharma warehouse storage",
    "3pl warehousing dubai",
    "hasoon logistics"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/services/warehousing",
  },
};

export default function Warehousing() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Contract Warehousing Solutions",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "Temperature-controlled warehousing, GDP cold chain, and secure bonded cargo storage services.",
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
              <span className="hero-subtitle">Secure Vaults</span>
              <h1>Contract Warehousing Solutions</h1>
              <p>
                Our logistics network features high-security, temperature-controlled warehouse systems. We support pharmaceutical cold chains, bonded logistics, and specialized inventory distribution.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Facility Credentials</span>
                <h2>Climate & Bonded Warehousing</h2>
                <p>
                  Located within critical free zones (like JAFZA in Dubai) and manufacturing corridors, our warehouses are designed for optimal compliance, inventory auditing, and fast cargo dispatch.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>GDP pharma-grade cold chains (+2°C to +8°C and +15°C to +25°C)</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Bonded storage facilities allowing duty-deferred inventory holding</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Integrated inventory management databases with real-time API client access</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "1.5rem" }} className="text-gold">Security Audits</h3>
                <p>
                  Every facility incorporates biometric door access, continuous camera feeds, thermal alarms, and backup generators to ensure zero inventory loss.
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
              <h2>Request Storage Contract</h2>
              <p>Discuss your climate parameters, pallet capacity, bonded logistics requirements, and dispatch schedules with our facility team.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
