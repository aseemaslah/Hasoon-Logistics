"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal States
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Tracking Form States
  const [trackingId, setTrackingId] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("idle"); // idle, loading, result
  const [trackingError, setTrackingError] = useState("");

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPasscode, setLoginPasscode] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle"); // idle, authenticating, error
  const [loginMessage, setLoginMessage] = useState("");

  // 1. Scroll and Active Section Spying
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHome) return;

      const sections = ["home", "about", "services", "mission-vision", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // 2. Prevent scroll when drawers/modals are active
  useEffect(() => {
    const modalActive = mobileMenuOpen || trackingModalOpen || loginModalOpen;
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, trackingModalOpen, loginModalOpen]);

  const getLink = (hash) => {
    return isHome ? `#${hash}` : `/#${hash}`;
  };

  const handleTrackingQuery = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setTrackingError("Please enter a consignment ID.");
      return;
    }
    setTrackingError("");
    setTrackingStatus("loading");

    setTimeout(() => {
      setTrackingStatus("result");
    }, 1800);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPasscode.trim()) {
      setLoginMessage("Please complete all credential fields.");
      return;
    }
    setLoginMessage("");
    setLoginStatus("authenticating");

    setTimeout(() => {
      setLoginStatus("error");
      setLoginMessage("ACCESS DENIED: Multi-factor biometric key required. Secure console session cannot be established. Please contact your Hasoon account desk.");
    }, 1500);
  };

  return (
    <>
      {/* Floating 3D Navbar Header */}
      <header className={scrolled ? "scrolled" : ""} id="site-header">
        <div className="container">
          <div className="nav-glass-bar">
            <a href={getLink("home")} className="logo" id="logo-link" style={{ padding: "0.25rem 0" }}>
              <Image
                src="/images/logo.png"
                alt="Hasoon Logistics Logo"
                width={170}
                height={36}
                style={{ objectFit: "contain", height: "auto", width: "auto" }}
                priority
              />
            </a>

            <nav aria-label="Main Navigation">
              <ul className="nav-links">
                <li className={activeSection === "home" && isHome ? "active" : ""}>
                  <a href={getLink("home")} id="nav-home">Home</a>
                </li>

                {/* Company Dropdown */}
                <li className="nav-item-dropdown">
                  <a href="#" className="nav-dropdown-trigger" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }} onClick={(e) => e.preventDefault()}>
                    Company
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" style={{ transition: "transform 0.3s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  <div className="dropdown-menu">
                    <a href={getLink("about")} className="dropdown-item">
                      <div className="dropdown-item-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Corporate Legacy</span>
                        <span className="dropdown-item-desc">Learn about our heritage as Dubai's leading elite logistics operator.</span>
                      </div>
                    </a>
                    <a href={getLink("mission-vision")} className="dropdown-item">
                      <div className="dropdown-item-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Mission Operations</span>
                        <span className="dropdown-item-desc">Explore our horizon strategies and green logistics roadmap.</span>
                      </div>
                    </a>
                  </div>
                </li>

                {/* Services Dropdown */}
                <li className="nav-item-dropdown">
                  <a href="#" className="nav-dropdown-trigger" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }} onClick={(e) => e.preventDefault()}>
                    Services
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" style={{ transition: "transform 0.3s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  <div className="dropdown-menu wide-dropdown">
                    <a href="/services/freight-forwarding" className="dropdown-item">
                      <div className="dropdown-item-icon">F</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Freight Forwarding</span>
                        <span className="dropdown-item-desc">Multi-modal global routes.</span>
                      </div>
                    </a>
                    <a href="/services/air-freight" className="dropdown-item">
                      <div className="dropdown-item-icon">A</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Priority Air Cargo</span>
                        <span className="dropdown-item-desc">Express global charters.</span>
                      </div>
                    </a>
                    <a href="/services/sea-freight" className="dropdown-item">
                      <div className="dropdown-item-icon">S</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Ocean Freight</span>
                        <span className="dropdown-item-desc">High-capacity sea shipping.</span>
                      </div>
                    </a>
                    <a href="/services/road-transportation" className="dropdown-item">
                      <div className="dropdown-item-icon">R</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Overland Trucking</span>
                        <span className="dropdown-item-desc">GCC land linehauls.</span>
                      </div>
                    </a>
                    <a href="/services/warehousing" className="dropdown-item">
                      <div className="dropdown-item-icon">W</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Cold Chain Storage</span>
                        <span className="dropdown-item-desc">GDP pharma-grade vaults.</span>
                      </div>
                    </a>
                    <a href="/services/customs-clearance" className="dropdown-item">
                      <div className="dropdown-item-icon">C</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Customs Brokerage</span>
                        <span className="dropdown-item-desc">FASAH & SABER clearance.</span>
                      </div>
                    </a>
                  </div>
                </li>

                {/* Global Network Dropdown */}
                <li className="nav-item-dropdown">
                  <a href="#" className="nav-dropdown-trigger" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }} onClick={(e) => e.preventDefault()}>
                    Global Network
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" style={{ transition: "transform 0.3s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  <div className="dropdown-menu wide-dropdown" style={{ minWidth: "520px" }}>
                    <a href="/uae" className="dropdown-item">
                      <div className="dropdown-item-icon">AE</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">United Arab Emirates</span>
                        <span className="dropdown-item-desc">Dubai HQ & Jebel Ali operations desk.</span>
                      </div>
                    </a>
                    <a href="/saudi-arabia" className="dropdown-item">
                      <div className="dropdown-item-icon">SA</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Saudi Arabia Hub</span>
                        <span className="dropdown-item-desc">Riyadh Olaya office & customs brokerage.</span>
                      </div>
                    </a>
                    <a href="/india" className="dropdown-item">
                      <div className="dropdown-item-icon">IN</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">India Operations</span>
                        <span className="dropdown-item-desc">Mumbai JNPT port clearance agent.</span>
                      </div>
                    </a>
                    <a href="/china" className="dropdown-item">
                      <div className="dropdown-item-icon">CN</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">China Gateway</span>
                        <span className="dropdown-item-desc">Shanghai & Shenzhen export dispatch.</span>
                      </div>
                    </a>
                  </div>
                </li>

                {/* Client Portal (Session Access) Dropdown */}
                <li className="nav-item-dropdown">
                  <a href="#" className="nav-dropdown-trigger" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }} onClick={(e) => e.preventDefault()}>
                    Portal
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" style={{ transition: "transform 0.3s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  <div className="dropdown-menu" style={{ minWidth: "300px" }}>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setTrackingStatus("idle");
                        setTrackingId("");
                        setTrackingError("");
                        setTrackingModalOpen(true);
                      }}
                      id="nav-item-track"
                    >
                      <div className="dropdown-item-icon">📡</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Track Consignment</span>
                        <span className="dropdown-item-desc">Verify shipping arcs & telemetry.</span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setLoginStatus("idle");
                        setLoginEmail("");
                        setLoginPasscode("");
                        setLoginMessage("");
                        setLoginModalOpen(true);
                      }}
                      id="nav-item-login"
                    >
                      <div className="dropdown-item-icon">🔑</div>
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-title">Client Login</span>
                        <span className="dropdown-item-desc">Secure portal session credentials.</span>
                      </div>
                    </a>
                  </div>
                </li>

                {/* Contact Us direct link */}
                <li className={activeSection === "contact" && isHome ? "active" : ""}>
                  <a href={getLink("contact")} id="nav-contact">Contact Us</a>
                </li>
              </ul>
            </nav>

            <div className="nav-socials">
              <a
                href="https://www.instagram.com/hasoonlogistics/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Hasoon Logistics Instagram"
                id="header-ig"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Hasoon Logistics WhatsApp"
                id="header-wa"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
                </svg>
              </a>
            </div>

            {/* Mobile Nav Hamburger Toggle */}
            <button
              className="mobile-nav-toggle"
              aria-label="Toggle Mobile Navigation"
              id="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span style={mobileMenuOpen ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}}></span>
              <span style={mobileMenuOpen ? { opacity: 0 } : {}}></span>
              <span style={mobileMenuOpen ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(31, 42, 68, 0.2)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 1040,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Mobile Menu Drawer Content */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "mobile-nav-open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: mobileMenuOpen ? "0" : "-100%",
          width: "80%",
          maxWidth: "300px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          borderLeft: "1px solid var(--color-border-glass)",
          zIndex: 1050,
          padding: "6rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          transition: "right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-10px 0 30px rgba(31, 42, 68, 0.05)",
          visibility: mobileMenuOpen ? "visible" : "hidden",
          overflowY: "auto",
        }}
      >
        <ul className="mobile-nav-links">
          <li className={activeSection === "home" && isHome ? "active" : ""} style={{ transitionDelay: "40ms" }}>
            <a href={getLink("home")} onClick={() => setMobileMenuOpen(false)}>
              Home Base
            </a>
          </li>
 
          {/* Services group */}
          <li style={{ transitionDelay: "80ms", marginTop: "1rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "1.5px", color: "var(--color-accent-gold)", textTransform: "uppercase" }}>Services</span>
          </li>
          <li style={{ transitionDelay: "120ms" }}>
            <a href="/services/freight-forwarding" onClick={() => setMobileMenuOpen(false)}>Freight Forwarding</a>
          </li>
          <li style={{ transitionDelay: "160ms" }}>
            <a href="/services/air-freight" onClick={() => setMobileMenuOpen(false)}>Air Cargo</a>
          </li>
          <li style={{ transitionDelay: "200ms" }}>
            <a href="/services/sea-freight" onClick={() => setMobileMenuOpen(false)}>Ocean Shipping</a>
          </li>
          <li style={{ transitionDelay: "240ms" }}>
            <a href="/services/road-transportation" onClick={() => setMobileMenuOpen(false)}>Overland Trucking</a>
          </li>
          <li style={{ transitionDelay: "280ms" }}>
            <a href="/services/warehousing" onClick={() => setMobileMenuOpen(false)}>Cold Chain Vault</a>
          </li>
          <li style={{ transitionDelay: "320ms" }}>
            <a href="/services/customs-clearance" onClick={() => setMobileMenuOpen(false)}>Customs Brokerage</a>
          </li>
 
          {/* Gateways group */}
          <li style={{ transitionDelay: "360ms", marginTop: "1rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "1.5px", color: "var(--color-accent-gold)", textTransform: "uppercase" }}>Global Network</span>
          </li>
          <li style={{ transitionDelay: "400ms" }}>
            <a href="/uae" onClick={() => setMobileMenuOpen(false)}>United Arab Emirates</a>
          </li>
          <li style={{ transitionDelay: "440ms" }}>
            <a href="/saudi-arabia" onClick={() => setMobileMenuOpen(false)}>Saudi Arabia Hub</a>
          </li>
          <li style={{ transitionDelay: "480ms" }}>
            <a href="/india" onClick={() => setMobileMenuOpen(false)}>India Operations</a>
          </li>
          <li style={{ transitionDelay: "520ms" }}>
            <a href="/china" onClick={() => setMobileMenuOpen(false)}>China Gateway</a>
          </li>
 
          {/* Portal group */}
          <li style={{ transitionDelay: "560ms", marginTop: "1rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "1.5px", color: "var(--color-accent-gold)", textTransform: "uppercase" }}>Client Portal</span>
          </li>
          <li style={{ transitionDelay: "600ms" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setTrackingStatus("idle"); setTrackingId(""); setTrackingError(""); setTrackingModalOpen(true); }}>
              Track Consignment
            </a>
          </li>
          <li style={{ transitionDelay: "640ms" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setLoginStatus("idle"); setLoginEmail(""); setLoginPasscode(""); setLoginMessage(""); setLoginModalOpen(true); }}>
              Client Login
            </a>
          </li>
 
          {/* Contact Us */}
          <li style={{ transitionDelay: "680ms", marginTop: "1.5rem" }} className={activeSection === "contact" && isHome ? "active" : ""}>
            <a href={getLink("contact")} onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </a>
          </li>
        </ul>
        <div className="mobile-nav-socials">
          <a
            href="https://www.instagram.com/hasoonlogistics/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram Link"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="WhatsApp Link"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 📡 Interactive Tracking Satellite Telemetry Modal */}
      {trackingModalOpen && (
        <div className="modal-overlay active" style={{ zIndex: 1600 }}>
          <div className="modal-content glass-panel" style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(198, 167, 94, 0.3)", maxWidth: "580px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
              <h3 className="text-gold" style={{ margin: 0, fontSize: "1.2rem", letterSpacing: "2px", textTransform: "uppercase" }}>
                Satellite Cargo Telemetry
              </h3>
              <button
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "1.25rem" }}
                onClick={() => setTrackingModalOpen(false)}
                aria-label="Close Tracking Modal"
              >
                &times;
              </button>
            </div>

            {trackingStatus === "idle" && (
              <form onSubmit={handleTrackingQuery}>
                <p style={{ color: "#E2E8F0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Query real-time shipping corridors, container temperature metrics, and WCO customs clearance handshakes.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <label className="form-label" style={{ fontSize: "0.68rem" }}>Booking or Consignment ID</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., HSN-7042-DXB"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}
                  />
                  {trackingError && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{trackingError}</span>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button type="submit" className="btn-glass-3d" style={{ padding: "0.8rem 1.8rem", fontSize: "0.75rem" }}>
                    Establish Telemetry Link
                  </button>
                </div>
              </form>
            )}

            {trackingStatus === "loading" && (
              <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                <span className="hero-subtitle" style={{ animation: "pulse 1.5s infinite", display: "block" }}>Querying Satellite Arc...</span>
                <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", margin: "1.5rem 0 1rem 0" }}>
                  <div style={{ width: "70%", height: "100%", background: "var(--color-accent-gold)", borderRadius: "2px", animation: "marquee 2s linear infinite" }}></div>
                </div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "var(--font-sans)", margin: 0 }}>
                  [Handshaking secure biometric nodes] // [Loading GPS logs]
                </p>
              </div>
            )}

            {trackingStatus === "result" && (
              <div>
                <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "6px", padding: "1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }}></span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                    CUSTODY SECURED // TRANSMITTING STABLE TELEMETRY
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", fontSize: "0.8rem" }}>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Consignment ID</div>
                    <div style={{ color: "#F8FAFC", fontWeight: 700 }}>{trackingId.toUpperCase()}</div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Carrier / Vessel</div>
                    <div style={{ color: "#F8FAFC", fontWeight: 700 }}>HASOON EMERALD (Voyage 88E)</div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Route Vector</div>
                    <div style={{ color: "#F8FAFC", fontWeight: 700 }}>Jebel Ali (AE) → JNPT Mumbai (IN)</div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Coordinates</div>
                    <div style={{ color: "var(--color-accent-gold)", fontWeight: 700 }}>12.5833&deg; N, 74.8500&deg; E</div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Cold Chain Core Temp</div>
                    <div style={{ color: "#F8FAFC", fontWeight: 700 }}>+4.2&deg;C (GDP Stable)</div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }}>
                    <div style={{ color: "#64748B", fontSize: "0.68rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>Priority Clearance</div>
                    <div style={{ color: "var(--color-accent-gold)", fontWeight: 700 }}>AEO Priority Rank L1</div>
                  </div>
                </div>

                <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "4px", padding: "1rem", fontFamily: "monospace", fontSize: "0.7rem", color: "#94A3B8", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                  <div>[08:12 GST] satellite telemetry link locked on container manifest.</div>
                  <div>[09:44 GST] cargo temperature logged: +4.2&deg;C (GDP compliant).</div>
                  <div>[11:00 GST] customs credentials handshake completed securely via AEO.</div>
                  <div>[13:25 GST] GPS path vector verified. Next sat-pass in 44min.</div>
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                  <button className="btn-glass-3d btn-secondary" onClick={() => setTrackingStatus("idle")} style={{ padding: "0.8rem 1.8rem", fontSize: "0.75rem" }}>
                    New Query
                  </button>
                  <button className="btn-glass-3d" onClick={() => setTrackingModalOpen(false)} style={{ padding: "0.8rem 1.8rem", fontSize: "0.75rem" }}>
                    Terminate Stream
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔑 Interactive Secure Login Modal */}
      {loginModalOpen && (
        <div className="modal-overlay active" style={{ zIndex: 1600 }}>
          <div className="modal-content glass-panel" style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(198, 167, 94, 0.3)", maxWidth: "480px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
              <h3 className="text-gold" style={{ margin: 0, fontSize: "1.2rem", letterSpacing: "2px", textTransform: "uppercase" }}>
                Secure Desk Login
              </h3>
              <button
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "1.25rem" }}
                onClick={() => setLoginModalOpen(false)}
                aria-label="Close Login Modal"
              >
                &times;
              </button>
            </div>

            {loginStatus !== "authenticating" && (
              <form onSubmit={handleLoginSubmit}>
                <p style={{ color: "#E2E8F0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Establish an encrypted portal session to access shipping manifests, customs paperwork, and line-haul schedules.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label className="form-label" style={{ fontSize: "0.68rem" }}>Secure Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="client@corporate.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label className="form-label" style={{ fontSize: "0.68rem" }}>Cryptographic Passcode / Secret Key</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••••••"
                      value={loginPasscode}
                      onChange={(e) => setLoginPasscode(e.target.value)}
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}
                    />
                  </div>
                  {loginMessage && (
                    <div style={{ fontSize: "0.78rem", color: loginStatus === "error" ? "#EF4444" : "#C6A75E", lineHeight: "1.5" }}>
                      {loginMessage}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button type="submit" className="btn-glass-3d" style={{ padding: "0.8rem 1.8rem", fontSize: "0.75rem" }}>
                    Initialize Secure Handshake
                  </button>
                </div>
              </form>
            )}

            {loginStatus === "authenticating" && (
              <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                <span className="hero-subtitle" style={{ animation: "pulse 1.5s infinite", display: "block" }}>Verifying Secure Token...</span>
                <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", margin: "1.5rem 0 1rem 0" }}>
                  <div style={{ width: "50%", height: "100%", background: "var(--color-accent-gold)", borderRadius: "2px", animation: "marquee 2s linear infinite" }}></div>
                </div>
                <p style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "var(--font-sans)", margin: 0 }}>
                  [Decrypting handshake signatures] // [Running server audit logs]
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
