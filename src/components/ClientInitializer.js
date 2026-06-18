"use client";

import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    // 1. Beveled 3D Button Mouse Move Tilt Trackers
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

    links.forEach((link) => {
      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // 2. Scroll Reveal Observer
    const revealElements = document.querySelectorAll(".scroll-reveal");

    if (typeof window === "undefined" || !window.IntersectionObserver) {
      revealElements.forEach((el) => el.classList.add("scroll-revealed"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
      revealElements.forEach((el) => {
        try {
          revealObserver.unobserve(el);
        } catch (e) {}
      });
    };
  }, []);

  return null;
}
