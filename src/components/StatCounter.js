"use client";

import React, { useState, useEffect, useRef } from "react";

export default function StatCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let timer;
    const currentRef = elementRef.current;

    const startCounter = () => {
      let start = 0;
      const end = target;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / end), 15);

      timer = setInterval(() => {
        start += Math.ceil(end / (duration / stepTime));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
    };

    if (currentRef) {
      if (typeof window !== "undefined" && window.IntersectionObserver) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(currentRef);

        return () => {
          observer.unobserve(currentRef);
          if (timer) clearInterval(timer);
        };
      } else {
        // Immediate fallback count for legacy browsers lacking IntersectionObserver (e.g. iOS < 12.2)
        startCounter();
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [target]);

  return (
    <div ref={elementRef} className="stat-number">
      {count.toLocaleString()}{suffix}
    </div>
  );
}
