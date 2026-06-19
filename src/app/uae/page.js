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
    "hasoon logistics",
    "dubai customs clearance online",
    "JAFZA bonded warehousing",
    "DAFZA priority air cargo consolidation",
    "cargo forwarding company in UAE",
    "best shipping line agent in Dubai"
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
        <section className="hero" style={{ minHeight: "40vh", padding: "8rem 0 3rem 0" }}>
          <div className="container">
            <div className="hero-content scroll-reveal scroll-revealed" style={{ maxWidth: "800px" }}>
              <span className="hero-subtitle">Dubai Global Hub</span>
              <h1>Logistics Solutions in the UAE</h1>
              <p>
                Operating as the best logistics company in Dubai and certified customs clearance agent in Dubai, UAE, Hasoon Logistics coordinates high-capacity cargo forwarding, climate-controlled storage, JAFZA bonded warehousing, and Dubai Trade customs brokerage across all emirates.
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
                  We coordinate freight lines, shipping company UAE solutions, and bonded warehousing in Jebel Ali Free Zone (JAFZA) and Dubai Airport Freezone (DAFZA). We offer certified Dubai customs clearance online and streamline import/export duties using the UAE-India CEPA framework.
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
              <h2>Speak To Our UAE Desks</h2>
              <p>Discuss your cargo forwarding, customs brokerage, free zone logistics, and GCC trucking operations with our regional desks.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* Dubai HQ Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Dubai HQ Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.dxb@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.dxb@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+971 4 123 4567</span>
                    </div>
                  </div>
                </div>

                {/* Jebel Ali Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Jebel Ali Port Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>JAFZA One, Office 1402, Jebel Ali Free Zone, Dubai, UAE</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:jafza@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>jafza@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+971 4 888 7654</span>
                    </div>
                  </div>
                </div>

                {/* Abu Dhabi Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Abu Dhabi Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Al Khatem Tower, Level 15, ADGM Square, Al Maryah Island, Abu Dhabi, UAE</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.auh@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.auh@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+971 2 666 5432</span>
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
