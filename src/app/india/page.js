import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import IndiaAnimation from "@/components/IndiaAnimation";

export const metadata = {
  title: "Best Customs Broker & Freight Forwarder in India | Hasoon Logistics",
  description: "Hasoon Logistics is the best customs broker and international freight forwarder in India. We clear JNPT Nhava Sheva, Mumbai, Chennai, and Mundra cargo efficiently.",
  keywords: [
    "customs broker in mumbai",
    "best freight forwarder in india",
    "jnpt customs clearance agent",
    "shipping company nhava sheva",
    "india to uae logistics",
    "multi-modal transport india",
    "hasoon logistics",
    "Mundra port customs clearance broker",
    "Chennai air cargo forwarding",
    "CEPA tariff rate quotas",
    "dry port ICD clearance India",
    "Mumbai custom house agent CHA"
  ],
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
        <section className="hero" style={{ minHeight: "40vh", padding: "8rem 0 3rem 0" }}>
          <div className="container">
            <div className="hero-content scroll-reveal scroll-revealed" style={{ maxWidth: "800px" }}>
              <span className="hero-subtitle">Multi-Modal Infrastructure</span>
              <h1>Logistics Solutions in India</h1>
              <p>
                Connecting major trade corridors. Hasoon Logistics is the best freight forwarder in india and trusted customs broker in mumbai, coordinating certified customs clearance, multi-modal transport india rail links, and sea-air freight consolidation across India's largest shipping gateways.
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
                  As an authorized Mumbai custom house agent (CHA), we coordinate sea containers through Nhava Sheva (JNPT), Chennai Port, and Mundra, managing custom clearance, dry port ICD clearance India, and direct India to UAE logistics in compliance with regulatory bodies (FFFAI).
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
              <h2>Speak To Our India Desks</h2>
              <p>Discuss your shipping line bookings, Indian customs clearance requirements, CEPA compliance details, and ICD rail dispatch with our regional desks.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* Mumbai HQ Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Mumbai Desk (HQ)</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Maker Chambers VI, Level 12, Nariman Point, Mumbai, Maharashtra, India</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.bom@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.bom@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+91 22 7890 1234</span>
                    </div>
                  </div>
                </div>

                {/* Nhava Sheva (JNPT) Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Nhava Sheva (JNPT) Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Port Logistics Zone, Sector 10, Nhava Sheva, Navi Mumbai, India</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:jnpt@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>jnpt@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+91 22 2724 5678</span>
                    </div>
                  </div>
                </div>

                {/* Mundra Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Mundra Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Adani Port SEZ Tower, Level 4, Mundra, Gujarat, India</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.mundra@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.mundra@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+91 2838 255 123</span>
                    </div>
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
