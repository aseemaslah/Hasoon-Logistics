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

  // 2. Global Body Scroll Prevention when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const getLink = (hash) => {
    return isHome ? `#${hash}` : `/#${hash}`;
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
                <li className={activeSection === "about" && isHome ? "active" : ""}>
                  <a href={getLink("about")} id="nav-about">About</a>
                </li>
                <li className={activeSection === "services" && isHome ? "active" : ""}>
                  <a href={getLink("services")} id="nav-services">Services</a>
                </li>
                <li className={activeSection === "mission-vision" && isHome ? "active" : ""}>
                  <a href={getLink("mission-vision")} id="nav-mission-vision">Our Mission</a>
                </li>
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
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(45deg) translate(4px, 4px)" }
                    : {}
                }
              ></span>
              <span style={mobileMenuOpen ? { opacity: 0 } : {}}></span>
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(-45deg) translate(4px, -4px)" }
                    : {}
                }
              ></span>
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
            zIndex: 1040,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Mobile Menu Drawer Content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: mobileMenuOpen ? "0" : "-100%",
          width: "80%",
          maxWidth: "300px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(25px)",
          borderLeft: "1px solid var(--color-border-glass)",
          zIndex: 1050,
          padding: "6rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          transition: "right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-10px 0 30px rgba(31, 42, 68, 0.05)",
        }}
      >
        <ul className="mobile-nav-links">
          <li className={activeSection === "home" && isHome ? "active" : ""}>
            <a href={getLink("home")} onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
          </li>
          <li className={activeSection === "about" && isHome ? "active" : ""}>
            <a href={getLink("about")} onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </li>
          <li className={activeSection === "services" && isHome ? "active" : ""}>
            <a href={getLink("services")} onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
          </li>
          <li className={activeSection === "mission-vision" && isHome ? "active" : ""}>
            <a href={getLink("mission-vision")} onClick={() => setMobileMenuOpen(false)}>
              Our Mission
            </a>
          </li>
          <li className={activeSection === "contact" && isHome ? "active" : ""}>
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
    </>
  );
}
