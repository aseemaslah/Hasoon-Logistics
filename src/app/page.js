import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import InteractiveShip from "@/components/InteractiveShip";
import InteractiveTruck from "@/components/InteractiveTruck";
import StatCounter from "@/components/StatCounter";

export const metadata = {
  title: "Hasoon Logistics | Global Supply Chain & Customs Brokerage",
  description: "Experience intercontinental precision. WCO AEO certified operator offering elite air freight, ocean charters, overland dispatch, and temperature-controlled warehousing.",
  alternates: {
    canonical: "https://hasoonlogistics.com/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "@id": "https://hasoonlogistics.com/#organization",
    "name": "Hasoon Logistics",
    "url": "https://hasoonlogistics.com/",
    "logo": "https://hasoonlogistics.com/images/logo.svg",
    "sameAs": [
      "https://www.instagram.com/hasoonlogistics/"
    ],
    "areaServed": ["AE", "IN", "SA", "CN"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Luxury Trade Tower, Level 44, Sheikh Zayed Road",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "telephone": "+971501234567"
  };

  return (
    <>
      {/* Injected structured data for search engine E-E-A-T audits */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global premium hover effects and viewport scroll reveals */}
      <ClientInitializer />

      {/* Dynamic Background Shader Canvas */}
      <BackgroundShader />

      <Header />

      <main>
        {/* Section 1: Hero Showcase */}
        <section className="hero" id="home" aria-label="Hasoon Logistics Global Network Banner">
          <InteractiveShip />
          
          <div className="container hero-grid">
            <div className="hero-content scroll-reveal scroll-revealed">
              <span className="hero-subtitle">Intercontinental Precision</span>
              <h1>Engineered Supply Chains</h1>
              <p>
                Welcome to Hasoon Logistics. We establish global paths for security, compliance, and velocity. From specialized climate-controlled warehousing to express intercontinental cargo charters, we carry your assets with absolute care.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn-glass-3d" id="hero-btn-quote">
                  Request Private Quote
                </a>
                <a href="#services" className="btn-glass-3d btn-secondary" id="hero-btn-services">
                  Explore Services
                </a>
              </div>
            </div>
            <div className="hero-spacer"></div>
          </div>
        </section>

        {/* Scrolling Capabilities Marquee */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[1, 2].map((loop) => (
              <React.Fragment key={loop}>
                <div className="marquee-item"><span>✦</span> PRIORITY AIR FREIGHT</div>
                <div className="marquee-item"><span>✦</span> INTERCONTINENTAL OCEAN FREIGHT</div>
                <div className="marquee-item"><span>✦</span> SECURE OVERLAND DISPATCH</div>
                <div className="marquee-item"><span>✦</span> GDP TEMP-CONTROLLED WAREHOUSING</div>
                <div className="marquee-item"><span>✦</span> WCO AEO CERTIFIED OPERATOR</div>
                <div className="marquee-item"><span>✦</span> 24/7 EXECUTIVE COMPLIANCE DESK</div>
                <div className="marquee-item"><span>✦</span> DUBAI ENTERPRISE HQ</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Section 2: About Us */}
        <section className="section-padding" id="about" aria-label="About Hasoon Logistics">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Elite Heritage</span>
                <h2>Our Corporate Legacy</h2>
                <p>
                  At Hasoon Logistics, we believe that cargo is not merely commodities—it is our clients&rsquo; reputation, hard work, and business security. Headquartered in Dubai, the absolute crossroads of international commerce, we connect critical trade lanes between East and West.
                </p>
                <p>
                  Guided by logistics veterans Aseem Aslah Hasoon and our executive compliance desk, we support large-scale industrial cargo movements with complete safety guarantees and strict biometrics.
                </p>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "2rem" }}>Our Core Credentials</h3>
                <ul className="service-list" style={{ margin: 0 }}>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>WCO AEO Certified Operator status</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>ISO 9001:2015 &amp; ISO 28000 Compliance</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>GDP Certified Temperature Cold-Chains</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>24/7 Priority Support Hotlines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Product & Services */}
        <section className="section-padding" id="services" aria-label="Our Services">
          <div className="container">
            <div className="services-split" style={{ direction: "rtl" }}>
              <div className="scroll-reveal" style={{ direction: "ltr" }}>
                <span className="hero-subtitle">Capabilities</span>
                <h2>Global Transport Systems</h2>
                <p>
                  Our shipping capabilities span air charters, oceanic lanes, and overland logistics systems, optimized dynamically by modern tracking systems.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Priority Air Cargo: 12-36 hours express global transit</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Oceanic Freight: High capacity FCL/LCL spaces</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Luxury Warehousing: &plusmn;0.2&deg;C temperature precision vaulting</span>
                  </li>
                </ul>
              </div>

              {/* 2D Cargo Truck Interactive Container */}
              <div className="services-visual-panel scroll-reveal" style={{ direction: "ltr" }}>
                <InteractiveTruck />
              </div>
            </div>

            {/* Global network counter numbers */}
            <div className="stats-container scroll-reveal">
              <div>
                <StatCounter target={150} suffix="+" />
                <div className="stat-label">Global Ports &amp; Hubs</div>
              </div>
              <div>
                <StatCounter target={99} suffix=".9%" />
                <div className="stat-label">On-Time Precision</div>
              </div>
              <div>
                <StatCounter target={25} suffix="M+" />
                <div className="stat-label">Tons Transported</div>
              </div>
              <div>
                <StatCounter target={100} suffix="%" />
                <div className="stat-label">Satisfied Corporates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Global Trade Gateways Navigation Directory */}
        <section className="section-padding" id="gateways" aria-label="Global Trade Corridors">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 5rem auto" }} className="scroll-reveal">
              <span className="hero-subtitle">International Networks</span>
              <h2>Global Trade Gateways & Regional Hubs</h2>
              <p>
                We operate directly inside primary industrial trade gateways, establishing complete compliance and high-performance shipping corridors for corporate consignments.
              </p>
            </div>

            <div className="mission-vision-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
              {/* Card 1: UAE */}
              <a href="/uae" className="glass-panel scroll-reveal gateway-card" style={{ display: "block", textDecoration: "none", color: "inherit", transition: "transform 0.3s ease, border-color 0.3s ease" }}>
                <span className="text-gold" style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>Dubai Head Office</span>
                <h3 style={{ margin: "0.5rem 0 1rem 0" }}>United Arab Emirates</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                  Clearing Jebel Ali Port (JAFZA) and DAFZA cargo via direct Dubai Trade portals. Gateway to overland GCC linehauls.
                </p>
                <span className="text-gold" style={{ fontSize: "0.9rem", fontWeight: 700 }}>Explore Gateway →</span>
              </a>

              {/* Card 2: Saudi Arabia */}
              <a href="/saudi-arabia" className="glass-panel scroll-reveal gateway-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <span className="text-gold" style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>Olaya Riyadh</span>
                <h3 style={{ margin: "0.5rem 0 1rem 0" }}>Saudi Arabia</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                  Streamlining Riyadh and Jeddah Islamic Port cargo via FASAH customs broker systems and SABER compliance.
                </p>
                <span className="text-gold" style={{ fontSize: "0.9rem", fontWeight: 700 }}>Explore Gateway →</span>
              </a>

              {/* Card 3: India */}
              <a href="/india" className="glass-panel scroll-reveal gateway-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <span className="text-gold" style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>JNPT Mumbai</span>
                <h3 style={{ margin: "0.5rem 0 1rem 0" }}>India Operations</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                  Certified customs clearance agent services in Mumbai, Mundra, and Chennai. Exploiting CEPA duty advantages.
                </p>
                <span className="text-gold" style={{ fontSize: "0.9rem", fontWeight: 700 }}>Explore Gateway →</span>
              </a>

              {/* Card 4: China */}
              <a href="/china" className="glass-panel scroll-reveal gateway-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <span className="text-gold" style={{ fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase" }}>Shanghai & Shenzhen</span>
                <h3 style={{ margin: "0.5rem 0 1rem 0" }}>China Operations</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                  Sourcing consolidation and export logistics from Shanghai, Ningbo, and Guangzhou to Middle East markets.
                </p>
                <span className="text-gold" style={{ fontSize: "0.9rem", fontWeight: 700 }}>Explore Gateway →</span>
              </a>
            </div>

            {/* Direct service route links */}
            <div style={{ marginTop: "4rem", textAlign: "center" }} className="scroll-reveal">
              <span className="hero-subtitle">Our Capabilities</span>
              <h3 style={{ marginBottom: "2rem" }}>Dedicated Service Operations</h3>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                <a href="/services/freight-forwarding" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>Freight Forwarding</a>
                <a href="/services/air-freight" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>Priority Air Cargo</a>
                <a href="/services/sea-freight" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>Ocean Freight</a>
                <a href="/services/road-transportation" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>Overland Trucking</a>
                <a href="/services/warehousing" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>GDP Climate Warehousing</a>
                <a href="/services/customs-clearance" className="btn-glass-3d btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem" }}>Customs Brokerage</a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Mission & Vision */}
        <section className="section-padding" id="mission-vision" aria-label="Our Mission and Our Vision">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 5rem auto" }} className="scroll-reveal">
              <span className="hero-subtitle">Strategy &amp; Horizons</span>
              <h2>Securing the Future of Trade</h2>
              <p>We blend daily operational discipline with long-term ecological goals to build a green, sustainable logistics network.</p>
            </div>

            <div className="mission-vision-grid">
              {/* Mission Panel */}
              <div className="glass-panel scroll-reveal">
                <h3 className="text-gold">Our Corporate Mission</h3>
                <p style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
                  &ldquo;To establish the world&rsquo;s most secure, reliable, and high-performance logistics network, prioritizing absolute customer custody and zero-delay execution.&rdquo;
                </p>
                <p>
                  By combining strict compliance security audits with advanced route telemetry, we eliminate uncertainties and ensure seamless cargo handoffs.
                </p>
              </div>

              {/* Vision Horizons Panel */}
              <div className="glass-panel scroll-reveal">
                <h3 className="text-gold">Our Future Vision</h3>
                <p style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
                  &ldquo;Leading the next generation of global supply chain networks through hyper-velocity transit models and green fuel oceanic carriage.&rdquo;
                </p>
                <div style={{ borderTop: "1px solid var(--color-border-glass)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.875rem", margin: 0 }}>
                    <strong>Horizon 2028:</strong> API customs integrations &amp; micro-sensor expansions.
                  </p>
                  <p style={{ fontSize: "0.875rem", margin: "0.5rem 0 0 0" }}>
                    <strong>Horizon 2030:</strong> Carbon-neutral shipping lanes &amp; electric overland linehauls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Contact Us */}
        <section className="section-padding" id="contact" aria-label="Contact Our Corporate Desk">
          <div className="container contact-split">
            {/* Reusable Form Component */}
            <ContactForm />

            {/* HQ Details */}
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Corporate Headquarters</h2>
              <p>Get in touch with our desk directly to secure shipping slots and custom warehousing contracts.</p>

              <div className="contact-info-panel">
                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Dubai HQ</div>
                    <div className="info-card-value">Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Direct Desk</div>
                    <div className="info-card-value">desk@hasoonlogistics.com</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Priority Phone</div>
                    <div className="info-card-value">+971 50 123 4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Widget */}
      <a
        className="whatsapp-widget"
        aria-label="Chat on WhatsApp"
        role="button"
        id="wa-floating-btn"
        href="https://wa.me/971501234567?text=Hello%20Hasoon%20Logistics%20corporate%20desk%2C%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20request%20an%20enterprise%20quote."
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
        </svg>
      </a>

      <Footer />
    </>
  );
}
