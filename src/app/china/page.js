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
        <section className="hero" style={{ minHeight: "40vh", padding: "8rem 0 3rem 0" }}>
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
              <h2>Speak To Our China Desks</h2>
              <p>Discuss your factory consolidation schedules, China customs requirements, container reservations, and ocean shipping lines with our regional desks.</p>
              <div className="contact-info-panel" style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                
                {/* Shanghai Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Shanghai Desk (Primary HQ)</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Pudong Kerry Centre, Level 35, Pudong New Area, Shanghai, People's Republic of China</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.sha@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.sha@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+86 21 5678 9012</span>
                    </div>
                  </div>
                </div>

                {/* Shenzhen Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Shenzhen Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Ping An Finance Centre, Level 72, Futian District, Shenzhen, Guangdong, People's Republic of China</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.szx@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.szx@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+86 755 8888 4321</span>
                    </div>
                  </div>
                </div>

                {/* Ningbo Desk */}
                <div className="info-card" style={{ flexDirection: "column", gap: "0.85rem", padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="info-card-icon" style={{ width: "36px", height: "36px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="info-card-title" style={{ fontSize: "0.875rem", margin: 0, letterSpacing: "1px" }}>Ningbo Desk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(198, 167, 94, 0.25)" }}>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", lineHeight: "1.45", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>Ningbo Port Tower, Level 18, Beilun District, Ningbo, Zhejiang, People's Republic of China</span>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--color-accent-gold)" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <a href="mailto:desk.ngb@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }}>desk.ngb@hasoonlogistics.com</a>
                    </div>
                    <div className="info-card-value" style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span>+86 574 8765 4321</span>
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
