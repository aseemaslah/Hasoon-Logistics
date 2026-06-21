"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Simulate luxury loader sequence
    const fadeTimer = setTimeout(() => {
      setFade(true); // Start fade-out transition
    }, 1200);

    const removeTimer = setTimeout(() => {
      setVisible(false); // Remove completely from DOM
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Server-side renders nothing to prevent hydration mismatch
  if (!mounted || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0A101D", // Deep radar navy matching China/Saudi hubs
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999, // Absolute topmost overlay
        opacity: fade ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: fade ? "none" : "all",
      }}
    >
      {/* Decorative radial background glow */}
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(198, 167, 94, 0.08) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Spinner Ring */}
      <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "2rem" }}>
        {/* Outer glowing spinning ring */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid rgba(198, 167, 94, 0.1)",
            borderTop: "2px solid #C6A75E", // Gold
            animation: "spin 1.2s linear infinite",
            boxShadow: "0 0 15px rgba(198, 167, 94, 0.15)",
          }}
        />
        {/* Inner static initials */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#C6A75E",
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          HL
        </div>
      </div>

      {/* Animated Brand Header */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            color: "#F8FAFC",
            letterSpacing: "4px",
            textTransform: "uppercase",
            margin: "0 0 0.5rem 0",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          }}
        >
          Hasoon Logistics
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#C6A75E", // Gold
            margin: 0,
            animation: "pulse 2s infinite ease-in-out",
          }}
        >
          Securing supply chain corridors...
        </p>
      </div>

      {/* Inject Keyframe animations dynamically */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
