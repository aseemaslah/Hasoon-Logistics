import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import ChinaAnimation from "@/components/ChinaAnimation";

export const metadata = {
  title: "China to Dubai Shipping Agent & Export Cargo Logistics | Hasoon Logistics",
  description: "Hasoon Logistics is the best China to Dubai shipping agent and freight forwarder, offering container consolidation and export customs clearance from Shanghai, Ningbo, and Shenzhen.",
  keywords: [
    "china to dubai shipping agent",
    "china to dubai freight forwarder",
    "shanghai export shipping agent",
    "china export customs broker",
    "shipping company china to dubai",
    "container consolidation china",
    "hasoon logistics",
    "Shenzhen Yantian port container shipping",
    "Ningbo Zhoushan cargo forwarding",
    "Guangzhou air cargo logistics",
    "LCL consolidation warehouse China",
    "factory to port logistics China"
  ],
  alternates: {
    canonical: "https://hasoonlogistics.com/china",
  },
};

export default function ChinaRegion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "@id": "https://hasoonlogistics.com/china/#branch",
    "name": "Hasoon Logistics - China Operations",
    "url": "https://hasoonlogistics.com/china",
    "telephone": "+862112345678",
    "logo": "https://hasoonlogistics.com/images/logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pudong New Area",
      "addressLocality": "Shanghai",
      "addressCountry": "CN"
    },
    "areaServed": "CN"
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
              <span className="hero-subtitle">Industrial Export Infrastructure</span>
              <h1>Logistics & Shipping Services in China</h1>
              <p>
                As a leading china to dubai shipping agent and shipping company china to dubai, Hasoon Logistics coordinates B2B container consolidation china services, factory to port logistics China cargo hauling, and china export customs broker clearance.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Consolidation Networks</span>
                <h2>Shanghai, Ningbo & Shenzhen Gateways</h2>
                <p>
                  We coordinate sea containers from China's primary manufacturing ports (including Shanghai export shipping agent depots, Ningbo Zhoushan cargo forwarding hubs, Shenzhen Yantian port container shipping docks, and Guangzhou air cargo logistics centers) with direct allocations on major shipping lines.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Factory-to-port inland transport and customs declarations handling</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Quality inspection storage and LCL consolidation at port warehouses</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Direct ocean freight spaces to Jebel Ali, Riyadh, and Mumbai ports</span>
                  </li>
                </ul>
              </div>

              <div className="services-visual-panel scroll-reveal">
                <ChinaAnimation />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Speak To China Desk</h2>
              <p>Discuss your factory consolidation schedules, China customs requirements, container reservations, and ocean shipping lines with our Shanghai desk.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
