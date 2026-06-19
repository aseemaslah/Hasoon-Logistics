"use client";

import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    // 1. Beveled 3D Button Mouse Move & Touch Tilt Trackers
    const links = document.querySelectorAll(".nav-links a, .btn-glass-3d, .gateway-card");

    const handleMouseMove = (e) => {
      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const rotateX = ((yc - y) / yc) * 15;
      const rotateY = ((x - xc) / xc) * 15;

      link.style.setProperty("--rx", `${rotateX}deg`);
      link.style.setProperty("--ry", `${rotateY}deg`);
    };

    const handleMouseLeave = (e) => {
      const link = e.currentTarget;
      link.style.setProperty("--rx", `0deg`);
      link.style.setProperty("--ry", `0deg`);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const rotateX = ((yc - y) / yc) * 15;
        const rotateY = ((x - xc) / xc) * 15;
        link.style.setProperty("--rx", `${rotateX}deg`);
        link.style.setProperty("--ry", `${rotateY}deg`);
      } else {
        link.style.setProperty("--rx", `0deg`);
        link.style.setProperty("--ry", `0deg`);
      }
    };

    const handleTouchEnd = (e) => {
      const link = e.currentTarget;
      link.style.setProperty("--rx", `0deg`);
      link.style.setProperty("--ry", `0deg`);
    };

    links.forEach((link) => {
      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);
      link.addEventListener("touchmove", handleTouchMove, { passive: true });
      link.addEventListener("touchend", handleTouchEnd, { passive: true });
      link.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    });

    // 2. Scroll Reveal Observer with MutationObserver for dynamic page transitions
    let revealObserver;
    let mutationObserver;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("scroll-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: "0px 0px -10px 0px" }
      );

      // Observe existing elements
      const revealElements = document.querySelectorAll(".scroll-reveal");
      revealElements.forEach((el) => revealObserver.observe(el));

      // Observe newly added page elements via MutationObserver
      if (window.MutationObserver) {
        mutationObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList.contains("scroll-reveal")) {
                  revealObserver.observe(node);
                }
                node.querySelectorAll(".scroll-reveal").forEach((el) => {
                  revealObserver.observe(el);
                });
              }
            });
          });
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    } else {
      // Fallback
      const revealElements = document.querySelectorAll(".scroll-reveal");
      revealElements.forEach((el) => el.classList.add("scroll-revealed"));
    }

    // 3. Scroll velocity tracking for scroll-linked animations
    let lastScrollTop = typeof window !== "undefined" ? (window.pageYOffset || document.documentElement.scrollTop) : 0;
    let lastScrollTime = Date.now();
    if (typeof window !== "undefined") {
      window.scrollVelocity = 0;
    }

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const now = Date.now();
      const dt = now - lastScrollTime;
      if (dt > 0) {
        const dist = Math.abs(st - lastScrollTop);
        const rawVel = dist / dt; // pixels per ms
        const currentVel = (window.scrollVelocity && !isNaN(window.scrollVelocity)) ? window.scrollVelocity : 0;
        window.scrollVelocity = currentVel * 0.85 + rawVel * 0.15;
      }
      lastScrollTop = st;
      lastScrollTime = now;
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Decay velocity loop
    let decayFrameId;
    const decayVelocity = () => {
      const now = Date.now();
      if (typeof window !== "undefined" && window.scrollVelocity !== undefined) {
        if (now - lastScrollTime > 50) {
          const currentVel = (!isNaN(window.scrollVelocity)) ? window.scrollVelocity : 0;
          window.scrollVelocity = currentVel * 0.9;
          if (window.scrollVelocity < 0.01) {
            window.scrollVelocity = 0;
          }
        }
      }
      decayFrameId = requestAnimationFrame(decayVelocity);
    };
    decayVelocity();

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
        link.removeEventListener("touchmove", handleTouchMove);
        link.removeEventListener("touchend", handleTouchEnd);
        link.removeEventListener("touchcancel", handleTouchEnd);
      });
      if (revealObserver) {
        revealObserver.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
      if (decayFrameId) {
        cancelAnimationFrame(decayFrameId);
      }
    };
  }, []);

  return null;
}
