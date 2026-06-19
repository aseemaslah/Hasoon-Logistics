"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  const getLink = (hash) => {
    return isHome ? `#${hash}` : `/#${hash}`;
  };

  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeStr(formatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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
              The Best Logistics Company In The World
            </div>
          </div>

          <div className="antigravity-footer-grid">
            {/* Column 1: Brand & Profile */}
            <div className="antigravity-footer-col">
              <h4>Direct Desk</h4>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "#94A3B8", marginBottom: "1.5rem" }}>
                Engineering world-class shipping, freight forwarding, and warehousing contracts with absolute custody.
              </p>
              <div className="antigravity-footer-socials" style={{ display: "flex", gap: "0.75rem" }}>
                <a
                  href="https://www.instagram.com/hasoonlogistics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Hasoon Logistics Instagram"
                  style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", transition: "all 0.3s ease" }}
                  id="footer-ig"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Hasoon Logistics WhatsApp"
                  style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", transition: "all 0.3s ease" }}
                  id="footer-wa"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: System Links */}
            <div className="antigravity-footer-col">
              <h4>System Links</h4>
              <ul className="antigravity-footer-links">
                <li>
                  <a href={getLink("home")} id="footer-link-home">Home Base</a>
                </li>
                <li>
                  <a href={getLink("about")} id="footer-link-about">Corporate Legacy</a>
                </li>
                <li>
                  <a href={getLink("services")} id="footer-link-services">Global Capabilities</a>
                </li>
                <li>
                  <a href={getLink("mission-vision")} id="footer-link-mission">Mission Operations</a>
                </li>
                <li>
                  <a href={getLink("contact")} id="footer-link-contact">Private Desk</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Global Network */}
            <div className="antigravity-footer-col">
              <h4>Global Network</h4>
              <ul className="antigravity-footer-links">
                <li>
                  <a href="/uae" id="footer-link-uae">United Arab Emirates</a>
                </li>
                <li>
                  <a href="/saudi-arabia" id="footer-link-saudi">Saudi Arabia Hub</a>
                </li>
                <li>
                  <a href="/india" id="footer-link-india">India Operations</a>
                </li>
                <li>
                  <a href="/china" id="footer-link-china">China Gateway</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Coordinates */}
            <div className="antigravity-footer-col">
              <h4>Coordinates</h4>
              <ul className="antigravity-footer-links" style={{ gap: "1rem" }}>
                <li style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "flex-start", lineHeight: "1.4" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent-gold)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }} aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span>Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</span>
                </li>
                <li style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--color-accent-gold)" strokeWidth="2" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:desk@hasoonlogistics.com" style={{ textDecoration: "none", color: "inherit" }} id="footer-email">
                    desk@hasoonlogistics.com
                  </a>
                </li>
                <li style={{ fontSize: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--color-accent-gold)", fontWeight: 700 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+971 50 123 4567</span>
                </li>
                {timeStr && (
                  <li style={{ fontSize: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "#64748B", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                    <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", animation: "pulse 2s infinite" }}></span>
                    <span>DUBAI HQ TIME: {timeStr} GST</span>
                  </li>
                )}
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
            <button className="btn-glass-3d" id="close-modal-btn" onClick={() => setPrivacyModalOpen(false)} suppressHydrationWarning>
              Close Protocol
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
