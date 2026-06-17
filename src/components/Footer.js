"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const getLink = (hash) => {
    return isHome ? `#${hash}` : `/#${hash}`;
  };

  return (
    <>
      {/* Antigravity High-Tech Footer */}
      <footer className="antigravity-footer">
        <div className="container">
          <div className="antigravity-footer-brand">
            <h3 className="antigravity-footer-title">Hasoon Logistics</h3>
            <p className="antigravity-footer-subtitle">Secure Enterprise Supply Chains</p>
            <div className="antigravity-footer-badge">
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#C6A75E", boxShadow: "0 0 10px #C6A75E" }}></span>
              secured with Antigravity AI Engine
            </div>
          </div>

          <div className="antigravity-footer-grid">
            <div className="antigravity-footer-col">
              <h4>Direct Desk</h4>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "#94A3B8" }}>
                Engineering world-class shipping, freight forwarding, and warehousing contracts with absolute custody.
              </p>
            </div>

            <div className="antigravity-footer-col">
              <h4>System Links</h4>
              <ul className="antigravity-footer-links">
                <li>
                  <a href={getLink("home")}>Home Base</a>
                </li>
                <li>
                  <a href={getLink("about")}>Corporate Legacy</a>
                </li>
                <li>
                  <a href={getLink("services")}>Global Capabilities</a>
                </li>
                <li>
                  <a href={getLink("mission-vision")}>Mission Operations</a>
                </li>
                <li>
                  <a href={getLink("contact")}>Private Desk</a>
                </li>
              </ul>
            </div>

            <div className="antigravity-footer-col">
              <h4>Coordinates</h4>
              <ul className="antigravity-footer-links" style={{ gap: "0.5rem" }}>
                <li style={{ fontSize: "0.875rem" }}>Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</li>
                <li style={{ fontSize: "0.875rem" }}>desk@hasoonlogistics.com</li>
                <li style={{ fontSize: "0.875rem", color: "var(--color-accent-gold)", fontWeight: 700 }}>+971 50 123 4567</li>
              </ul>
            </div>
          </div>

          <div className="antigravity-footer-bottom">
            <p>&copy; 2026 HASOON LOGISTICS // ENTERPRISE DATA LAYER // CUSTODY SECURED</p>
            <ul className="antigravity-footer-links" style={{ flexDirection: "row", gap: "2rem" }}>
              <li>
                <a href="/sitemap.xml" id="footer-sitemap">
                  Sitemap Node
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="footer-privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    setPrivacyModalOpen(true);
                  }}
                >
                  Privacy Protocol
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Privacy Modal Overlay */}
      <div className={`modal-overlay ${privacyModalOpen ? "active" : ""}`} id="privacy-modal">
        <div className="modal-content glass-panel">
          <h3 className="text-gold" style={{ marginBottom: "1.5rem" }}>
            Privacy &amp; Custody Protocols
          </h3>
          <p style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
            At Hasoon Logistics, secure data stewardship is fundamental to our enterprise solutions.
          </p>
          <p style={{ fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            We implement advanced security databases to keep your logistics records, shipping coordinates, and corporate clearances completely private. No telemetry is shared with external parties except where required for international customs regulations.
          </p>
          <p style={{ fontSize: "0.9375rem", marginBottom: "2rem" }}>
            All GPS monitoring logs, temperature logs, and billing details are encrypted and belong strictly to you.
          </p>
          <div style={{ textAlign: "right" }}>
            <button className="btn-glass-3d" id="close-modal-btn" onClick={() => setPrivacyModalOpen(false)}>
              Close Protocol
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
