import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import UaeAnimation from "@/components/UaeAnimation";

export const metadata = {
  title: "Best Logistics Company & Customs Clearance in Dubai, UAE | Hasoon Logistics",
  description: "Hasoon Logistics is the best logistics company and certified customs clearance agent in Dubai, UAE. We streamline Jebel Ali Port (JAFZA), DAFZA, and Abu Dhabi cargo clearance.",
  keywords: [
    "best logistics company in dubai",
    "customs clearance agent dubai",
    "freight forwarder in dubai",
    "jebel ali customs broker",
    "dubai trade customs clearance",
    "shipping company uae",
    "hasoon logistics"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/uae",
  },
};

export default function UaeRegion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "@id": "https://hasoonlogistics.com/uae/#branch",
    "name": "Hasoon Logistics - Dubai HQ",
    "url": "https://hasoonlogistics.com/uae",
    "telephone": "+971501234567",
    "logo": "https://hasoonlogistics.com/images/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Luxury Trade Tower, Level 44, Sheikh Zayed Road",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "areaServed": "AE"
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
              <span className="hero-subtitle">Dubai Global Hub</span>
              <h1>Logistics Solutions in the UAE</h1>
              <p>
                Operating at the crossroads of international commerce, Hasoon Logistics coordinates high-capacity cargo forwarding, climate-controlled storage, and customs brokerage across all emirates.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Gateway Capabilities</span>
                <h2>Dubai & Jebel Ali Operations</h2>
                <p>
                  We coordinate freight lines and bonded warehousing in Jebel Ali Free Zone (JAFZA), Dubai Airport Freezone (DAFZA), and Abu Dhabi. We streamline import/export duties using the UAE-India CEPA framework.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Direct customs clearance via Dubai Trade single-window system</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Bonded warehousing facilities located within JAFZA Jebel Ali</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Air cargo consolidation through Dubai International (DXB) and Al Maktoum (DWC)</span>
                  </li>
                </ul>
              </div>

              <div className="services-visual-panel scroll-reveal">
                <UaeAnimation />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Speak To UAE Desk</h2>
              <p>Discuss your cargo forwarding, custom brokerage, free zone logistics, and GCC trucking operations with our Dubai specialists.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem" }}>
                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Dubai HQ Address</div>
                    <div className="info-card-value">Luxury Trade Tower, Sheikh Zayed Road, Dubai, UAE</div>
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
