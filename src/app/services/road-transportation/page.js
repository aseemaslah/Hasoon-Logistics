import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ClientInitializer from "@/components/ClientInitializer";
import BackgroundShader from "@/components/BackgroundShader";
import InteractiveTruck from "@/components/InteractiveTruck";

export const metadata = {
  title: "Road Transportation Services | Hasoon Logistics",
  description: "Cross-border GCC road freight forwarding. Secure temperature-controlled overland dispatch solutions.",
  alternates: {
    canonical: "https://hasoonlogistics.com/services/road-transportation",
  },
};

export default function RoadTransportation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Overland Road Transportation",
    "provider": {
      "@type": "LogisticsBusiness",
      "name": "Hasoon Logistics",
      "url": "https://hasoonlogistics.com/"
    },
    "description": "Cross-border linehaul and secure temperature-sensitive container road dispatch across the GCC network.",
    "areaServed": ["AE", "SA", "OM", "KW", "BH", "QA"]
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
              <span className="hero-subtitle">Overland Dispatch</span>
              <h1>Cross-Border Road Transport</h1>
              <p>
                Our secure trucking networks span the Gulf Cooperation Council (GCC) area, operating direct linehauls between major economic zones in Dubai, Riyadh, Jeddah, Dammam, and beyond.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="services-split" style={{ direction: "rtl" }}>
              <div className="scroll-reveal" style={{ direction: "ltr" }}>
                <span className="hero-subtitle">Telemetry & Control</span>
                <h2>Secure GCC Fleet Logistics</h2>
                <p>
                  We deploy modern GPS tracking telematics, strict container seals, and climate-controlled trailers (reefers) to carry high-value electronics and temperature-sensitive food and chemical loads.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Full Truck Load (FTL) and Less than Truck Load (LTL) overland routing</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Constant temperature tracking with ±0.5°C alert parameters</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Expedited customs clearance at Ghuwaifat and Batha borders</span>
                  </li>
                </ul>
              </div>

              <div className="services-visual-panel scroll-reveal" style={{ direction: "ltr" }}>
                <InteractiveTruck />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" id="contact" style={{ background: "rgba(31, 42, 68, 0.02)" }}>
          <div className="container contact-split">
            <ContactForm />
            <div className="scroll-reveal">
              <span className="hero-subtitle">Consultation</span>
              <h2>Request Overland Dispatch</h2>
              <p>Discuss your regional shipping routes, border compliance clearance needs, and secure fleet options with our road dispatch team.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
