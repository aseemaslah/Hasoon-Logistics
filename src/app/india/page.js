import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import IndiaAnimation from "@/components/IndiaAnimation";

export const metadata = {
  title: "Logistics & Customs Brokerage in India | Hasoon Logistics",
  description: "Certified customs clearance, multi-modal B2B freight forwarding, and supply chain management across Nhava Sheva (JNPT), Mumbai, and Delhi NCR.",
  alternates: {
    canonical: "https://hasoonlogistics.com/india",
  },
};

export default function IndiaRegion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "@id": "https://hasoonlogistics.com/india/#branch",
    "name": "Hasoon Logistics - India Operations",
    "url": "https://hasoonlogistics.com/india",
    "telephone": "+912212345678",
    "logo": "https://hasoonlogistics.com/images/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nariman Point, Marine Drive",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    "areaServed": "IN"
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
              <span className="hero-subtitle">Multi-Modal Infrastructure</span>
              <h1>Logistics Solutions in India</h1>
              <p>
                Connecting major trade corridors. Hasoon Logistics coordinates certified customs clearance, multi-modal rail-road transport, and sea-air freight consolidation across India's largest shipping gateways.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Trade Corridors</span>
                <h2>Nhava Sheva, Mumbai & Delhi NCR</h2>
                <p>
                  We coordinate sea containers through Nhava Sheva (JNPT), Chennai Port, and Mundra, managing custom brokerage in compliance with Indian regulatory bodies (FFFAI).
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Expedited customs brokerage at sea and dry ports (ICDs)</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Multi-modal rail container links from industrial centers to ports</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Specialized export consolidation for UAE and GCC trade corridors</span>
                  </li>
                </ul>
              </div>

              <div className="services-visual-panel scroll-reveal">
                <IndiaAnimation />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Speak To India Desk</h2>
              <p>Discuss your shipping line bookings, Indian customs clearance requirements, CEPA compliance details, and ICD rail dispatch with our team.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
