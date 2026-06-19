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
    "hasoon logistics",
    "FASAH customs clearance portal",
    "ZATCA e-invoicing compliance",
    "Jeddah Islamic Port container forwarding",
    "Dammam King Abdulaziz Port customs clearance",
    "cross border trucking GCC customs"
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
        <section className="hero" style={{ minHeight: "40vh", padding: "8rem 0 3rem 0" }}>
          <div className="container">
            <div className="hero-content scroll-reveal scroll-revealed" style={{ maxWidth: "800px" }}>
              <span className="hero-subtitle">Saudi Vision 2030</span>
              <h1>Logistics Solutions in Saudi Arabia</h1>
              <p>
                As Saudi Arabia builds the future of regional trade, Hasoon Logistics provides end-to-end saudi customs clearance agent support, riyadh logistics company storage, and secure overland trucking dubai to saudi dispatch to Riyadh, Jeddah, and Dammam.
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
                  We coordinate with customs checkpoints to clear goods through Jeddah Islamic Port and King Abdulaziz Port Dammam, ensuring full integration with Saudi Arabia's digital clearance platforms, including FASAH customs clearance portal, ZATCA compliance, and SABER compliance saudi.
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
              <h2>Speak To Our Saudi Desks</h2>
              <p>Discuss your Saudi customs broker assignments, SABER certifications, local storage needs, and overland trucking freight with our regional desks.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* Riyadh Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Riyadh Desk (HQ)</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Al Faisaliah Tower, Level 28, King Fahd Road, Olaya, Riyadh, Kingdom of Saudi Arabia</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.ruh@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.ruh@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+966 11 456 7890</span>
                    </div>
                  </div>
                </div>

                {/* Jeddah Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Jeddah Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Jeddah Commercial Center, Level 14, Madinah Road, Jeddah, Kingdom of Saudi Arabia</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.jed@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.jed@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+966 12 654 3210</span>
                    </div>
                  </div>
                </div>

                {/* Dammam Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Dammam Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Dammam Port Tower, Level 9, King Abdulaziz Road, Dammam, Kingdom of Saudi Arabia</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.dmm@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.dmm@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+966 13 833 2211</span>
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
