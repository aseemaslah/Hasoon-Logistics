import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";

export const metadata = {
  title: "Customs Clearance Agent & Brokerage Services | Hasoon Logistics",
  description: "Hasoon Logistics is the best customs clearance agent in Dubai. WCO AEO certified customs brokerage streamlining international trade compliance and import/export declarations.",
  keywords: [
    "customs clearance agent dubai",
    "saudi customs clearance broker",
    "import export customs clearance",
    "customs broker dubai",
    "aeo certified customs broker",
    "hasoon logistics",
    "HS Code tariff classification audit",
    "duty drawback collection",
    "SABER compliance filing",
    "FASAH customs platform broker"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hasoonlogistics.com/services/customs-clearance",
  },
};

export default function CustomsClearance() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Customs Clearance & Brokerage",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "Certified customs brokerage, HS code classification audits, and border agency coordination.",
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
              <span className="hero-subtitle">Trade Compliance</span>
              <h1>Customs Clearance & Brokerage</h1>
              <p>
                As a WCO AEO Certified Operator, Hasoon Logistics coordinates trade clearances directly with international customs authorities. We verify regulatory paperwork, reduce border delays, and minimize duty exposure.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Compliance Precision</span>
                <h2>Border Clearance Auditing</h2>
                <p>
                  Our customs brokers maintain deep expertise in trade tariff classification, CEPA rules, and import/export documentation frameworks for major trade corridors.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Expedited customs declarations via digital single-window systems</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Detailed HS Code classification audits to avoid tariff penalties</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Import/export permits, SABER system filings, and AEO clearances</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "1.5rem" }} className="text-gold">Certified Auditing</h3>
                <p>
                  We coordinate with customs checkpoints to resolve compliance audits, verify shipping declarations, and manage duty drawback collections to save you overhead capital.
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
              <h2>Speak To A Broker</h2>
              <p>Discuss your cargo classification, custom regulations compliance, import permits, and customs clearance profiles with our certified desk.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
