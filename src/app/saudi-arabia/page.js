import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import SaudiArabiaAnimation from "@/components/SaudiArabiaAnimation";

export const metadata = {
  title: "Best Logistics Company & Customs Clearance in Saudi Arabia | Hasoon Logistics",
  description: "Hasoon Logistics is the best logistics company and certified customs clearance agent in Saudi Arabia. We serve Riyadh, Jeddah Islamic Port, and Dammam with SABER and FASAH compliance.",
  keywords: [
    "saudi customs clearance agent",
    "riyadh logistics company",
    "customs broker saudi arabia",
    "jeddah customs clearance",
    "overland trucking dubai to saudi",
    "saber compliance saudi",
    "hasoon logistics"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/saudi-arabia",
  },
};

export default function SaudiArabiaRegion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "@id": "https://hasoonlogistics.com/saudi-arabia/#branch",
    "name": "Hasoon Logistics - Saudi Operations",
    "url": "https://hasoonlogistics.com/saudi-arabia",
    "telephone": "+966111234567",
    "logo": "https://hasoonlogistics.com/images/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Olaya District",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    },
    "areaServed": "SA"
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
              <span className="hero-subtitle">Saudi Vision 2030</span>
              <h1>Logistics Solutions in Saudi Arabia</h1>
              <p>
                As Saudi Arabia builds the future of regional trade, Hasoon Logistics provides end-to-end customs clearance, local warehousing, and secure GCC overland trucking dispatch to Riyadh, Jeddah, and Dammam.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Riyadh & Jeddah Hubs</span>
                <h2>Saudi Customs & SABER Filings</h2>
                <p>
                  We coordinate with customs checkpoints to clear goods through ports and borders, ensuring full integration with Saudi Arabia's digital clearance platforms (FASAH and SABER).
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>FASAH platform integration for fast customs broker assignments</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>SABER conformity certificate filing assistance for import cargo</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Cross-border overland dispatch from Dubai to Riyadh via Batha checkpoint</span>
                  </li>
                </ul>
              </div>

              <div className="services-visual-panel scroll-reveal">
                <SaudiArabiaAnimation />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Speak To Saudi Desk</h2>
              <p>Discuss your Saudi customs broker assignments, SABER certifications, local storage needs, and overland trucking freight with our Olaya-based desk.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
