"use client";

import React, { useState } from "react";

const LOCATIONS = [
  {
    id: "dubai",
    name: "Dubai Headquarters",
    country: "United Arab Emirates 🇦🇪",
    address: "Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE",
    phone: "+971 50 123 4567",
    email: "desk@hasoonlogistics.com",
    role: "Global Management & Marine Clearing Hub",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785984661814!2d55.2711124!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d0883%3A0x2f77e682e057f9cc!2sSheikh%20Zayed%20Rd%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
  },
  {
    id: "riyadh",
    name: "Saudi Arabia Office",
    country: "Saudi Arabia 🇸🇦",
    address: "Executive Olaya Tower, Level 22, Olaya District, Riyadh, KSA",
    phone: "+966 11 987 6543",
    email: "ksa@hasoonlogistics.com",
    role: "Customs Compliance & GCC Inland Logistics Node",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.404555811053!2d46.6749!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0389de415951%3A0x8673a5a1c1d23b37!2sAl%20Olaya%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
  },
  {
    id: "mumbai",
    name: "India Clearing Gateway",
    country: "India 🇮🇳",
    address: "Port House Commercial Complex, JNPT Port Road, Uran, Mumbai, Maharashtra, India",
    phone: "+91 22 5555 4321",
    email: "india@hasoonlogistics.com",
    role: "Customs Brokerage, FCL/LCL Freight Forwarding",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2185790000000!2d72.9500000!3d18.9500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c5bbaaaaaaab%3A0x11223344556677!2sJawaharlal%20Nehru%20Port!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  {
    id: "shanghai",
    name: "China Logistics Hub",
    country: "China 🇨🇳",
    address: "East Logistics Plaza, Pudong District, Shanghai Port, China",
    phone: "+86 21 8888 7777",
    email: "china@hasoonlogistics.com",
    role: "LCL Cargo Consolidation & Export Forwarding Depot",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3415.5!2d121.8!3d31.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b271b87a8b9815%3A0xb30e8c07e0bbbcbf!2sPort%20of%20Shanghai!5e0!3m2!1sen!2scn!4v1700000000000!5m2!1sen!2scn",
  },
];

export default function InteractiveMap() {
  const [activeLoc, setActiveLoc] = useState(LOCATIONS[0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "100%",
      }}
    >
      {/* Premium Office Tabs Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {LOCATIONS.map((loc) => {
          const isActive = loc.id === activeLoc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setActiveLoc(loc)}
              className="btn-glass-3d"
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "0.72rem",
                borderRadius: "30px",
                transform: isActive ? "translateY(0)" : "translateY(-4px)",
                background: isActive ? "var(--color-text-primary)" : "rgba(255, 255, 255, 0.35)",
                color: isActive ? "var(--color-bg-primary)" : "var(--color-text-primary)",
                border: isActive ? "1px solid var(--color-accent-gold)" : "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: isActive ? "0 0 15px rgba(198, 167, 94, 0.25)" : "var(--shadow-3d)",
              }}
              suppressHydrationWarning
            >
              {loc.name}
            </button>
          );
        })}
      </div>

      {/* Main Map & Contact Layout */}
      <div
        className="glass-panel"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "2.5rem",
          padding: "2rem",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        {/* Real Embedded Google Map Iframe Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "420px",
            borderRadius: "15px",
            overflow: "hidden",
            border: "1px solid var(--color-border-gold)",
            boxShadow: "var(--shadow-organic)",
          }}
        >
          <iframe
            src={activeLoc.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${activeLoc.name} Google Map`}
          />
        </div>

        {/* Office Details Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "left",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-accent-gold)",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {activeLoc.country}
            </span>
            <h3
              style={{
                fontSize: "1.75rem",
                marginBottom: "1rem",
                color: "var(--color-text-primary)",
              }}
            >
              {activeLoc.name}
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
                lineHeight: "1.6",
              }}
            >
              <strong>Capability:</strong> {activeLoc.role}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                borderTop: "1px solid var(--color-border-glass)",
                paddingTop: "1.5rem",
              }}
            >
              {/* Address Row */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(198, 167, 94, 0.08)",
                    border: "1px solid rgba(198, 167, 94, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent-gold)",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "1px" }}>Address</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--color-text-primary)", marginTop: "2px" }}>{activeLoc.address}</div>
                </div>
              </div>

              {/* Phone Row */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(198, 167, 94, 0.08)",
                    border: "1px solid rgba(198, 167, 94, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent-gold)",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "1px" }}>Direct Desk</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--color-text-primary)", marginTop: "2px" }}>{activeLoc.phone}</div>
                </div>
              </div>

              {/* Email Row */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(198, 167, 94, 0.08)",
                    border: "1px solid rgba(198, 167, 94, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent-gold)",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent-gold)", textTransform: "uppercase", letterSpacing: "1px" }}>Business Email</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--color-text-primary)", marginTop: "2px" }}>{activeLoc.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <a
              href="#contact"
              className="btn-glass-3d"
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "0.8rem",
              }}
              id={`map-btn-connect-${activeLoc.id}`}
            >
              Route Cargo via {activeLoc.name}
            </a>
          </div>
        </div>
      </div>

      {/* Embedded CSS overrides to style this panel responsively */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .glass-panel {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
