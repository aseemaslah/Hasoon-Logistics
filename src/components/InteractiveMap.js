"use client";

import React, { useEffect, useRef, useState } from "react";

export default function InteractiveMap() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredPort, setHoveredPort] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const isHovered = useRef(false);

  // Geographic Mercator coordinates mapped relative to standard centered world map image background
  const ports = [
    { id: "dxb", name: "Jebel Ali Port (Dubai)", x: 0.58, y: 0.48, details: "Global HQ Hub. WCO AEO Certified operations, connecting marine cargo to overland GCC trucking.", type: "hub" },
    { id: "ruh", name: "Riyadh Dry Port", x: 0.54, y: 0.49, details: "Central Saudi logistics node. Streamlining inland consignments via FASAH declarations.", type: "port" },
    { id: "jed", name: "Jeddah Islamic Port", x: 0.51, y: 0.50, details: "Red Sea shipping hub clearing imports under SABER certification audits.", type: "port" },
    { id: "mun", name: "Mundra Port", x: 0.65, y: 0.48, details: "Indian maritime gateway routing direct bulk cargo to the Arabian Gulf.", type: "port" },
    { id: "bom", name: "JNPT Mumbai", x: 0.66, y: 0.52, details: "Certified customs brokerage and multi-modal container rail ICD connectivity.", type: "port" },
    { id: "sha", name: "Shanghai Port", x: 0.80, y: 0.42, details: "East China container depot routing exports to Middle East trade lanes.", type: "port" },
    { id: "szx", name: "Shenzhen Port", x: 0.78, y: 0.47, details: "South China sourcing consolidation hub for express intercontinental linehauls.", type: "port" }
  ];

  // Routing flows: origin -> destination
  const routes = [
    { from: "sha", to: "dxb", speed: 0.002, progress: 0.1, color: "#C6A75E" },
    { from: "szx", to: "dxb", speed: 0.0025, progress: 0.4, color: "#C6A75E" },
    { from: "mun", to: "dxb", speed: 0.003, progress: 0.6, color: "#C6A75E" },
    { from: "bom", to: "dxb", speed: 0.0028, progress: 0.2, color: "#C6A75E" },
    { from: "dxb", to: "ruh", speed: 0.004, progress: 0.7, color: "#C6A75E" },
    { from: "dxb", to: "jed", speed: 0.0035, progress: 0.3, color: "#C6A75E" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resize = () => {
      if (!container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight || 500;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      setHoveredPort(null);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const w = rect.width;
      const h = rect.height;

      let found = null;
      ports.forEach((port) => {
        const px = port.x * w;
        const py = port.y * h;
        const dist = Math.sqrt((mouseX - px) * (mouseX - px) + (mouseY - py) * (mouseY - py));
        if (dist < 15) {
          found = port;
        }
      });

      if (found) {
        setHoveredPort(found);
        setTooltipPos({ x: found.x * w, y: found.y * h });
      } else {
        setHoveredPort(null);
      }
    };

    const handleTouchStartOrMove = (e) => {
      if (e.touches.length === 0) return;
      isHovered.current = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const mouseX = touch.clientX - rect.left;
      const mouseY = touch.clientY - rect.top;

      const w = rect.width;
      const h = rect.height;

      let found = null;
      ports.forEach((port) => {
        const px = port.x * w;
        const py = port.y * h;
        const dist = Math.sqrt((mouseX - px) * (mouseX - px) + (mouseY - py) * (mouseY - py));
        if (dist < 22) {
          found = port;
        }
      });

      if (found) {
        setHoveredPort(found);
        setTooltipPos({ x: found.x * w, y: found.y * h });
      } else {
        setHoveredPort(null);
      }
    };

    const handleTouchEnd = () => {
      isHovered.current = false;
      setHoveredPort(null);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchstart", handleTouchStartOrMove, { passive: true });
    container.addEventListener("touchmove", handleTouchStartOrMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    const animate = () => {
      time += 0.012;
      animationFrameId = requestAnimationFrame(animate);

      // Read CSS sizes directly to prevent scaling mismatch issues
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw grid lines on top of the world map background for high-tech telemetry styling
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Draw connection routes
      const scrollSpeed = typeof window !== "undefined" ? Math.min(window.scrollVelocity || 0, 4.0) : 0;
      const speedMultiplier = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);
      routes.forEach((route) => {
        const origin = ports.find((p) => p.id === route.from);
        const dest = ports.find((p) => p.id === route.to);
        if (!origin || !dest) return;

        const startX = origin.x * w;
        const startY = origin.y * h;
        const endX = dest.x * w;
        const endY = dest.y * h;

        // Custom Bezier curve calculation to create elegant routing arcs
        const distance = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY));
        const curveOffset = Math.min(80, distance * 0.28);
        const ctrlX = (startX + endX) / 2;
        const ctrlY = Math.min(startY, endY) - curveOffset;

        // Draw curved shipping lane arc
        ctx.strokeStyle = "rgba(198, 167, 94, 0.55)";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.stroke();

        // Update particle cargo flow progress
        route.progress = (route.progress + route.speed * speedMultiplier) % 1.0;

        // Bezier interpolation for cargo particle positions
        const t = route.progress;
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

        // Draw animated gold flow cargo particle with thin dark border for visibility
        ctx.fillStyle = "#C6A75E";
        ctx.strokeStyle = "rgba(31, 42, 68, 0.4)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(px, py, 4.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // 3. Draw ports
      ports.forEach((port) => {
        const px = port.x * w;
        const py = port.y * h;

        const isPortHovered = hoveredPort && hoveredPort.id === port.id;

        // Pulsing background rings (Gold pulsing on light blue)
        const pulseSpeed = isPortHovered ? 0.025 : 0.01;
        port.pulseRate = ((port.pulseRate || 0) + pulseSpeed) % 1.0;
        const r = (isPortHovered ? 7 : 5) + port.pulseRate * 20;
        const alpha = 1.0 - port.pulseRate;
        ctx.strokeStyle = `rgba(198, 167, 94, ${alpha * 0.85})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.stroke();

        // Port Core node
        ctx.fillStyle = "#1F2A44"; // Deep Luxury Navy core
        ctx.beginPath();
        ctx.arc(px, py, isPortHovered ? 8.5 : 6.0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = port.type === "hub" ? "#C6A75E" : "rgba(31, 42, 68, 0.8)";
        ctx.lineWidth = isPortHovered ? 3.0 : 2.0;
        ctx.beginPath();
        ctx.arc(px, py, isPortHovered ? 8.5 : 6.0, 0, Math.PI * 2);
        ctx.stroke();

        // Node center accent dot
        ctx.fillStyle = port.type === "hub" ? "#FFFFFF" : "#C6A75E";
        ctx.beginPath();
        ctx.arc(px, py, isPortHovered ? 3.0 : 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Port Label Text (Navy text with white stroke outline for 100% legibility)
        ctx.font = isPortHovered 
          ? "bold 10px 'Inter', sans-serif"
          : "600 9px 'Inter', sans-serif";
        ctx.textAlign = "center";
        
        // Push labels slightly away from points based on position to avoid overlaps
        const labelOffsetY = port.y > 0.5 ? 20 : -15;
        
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3.0;
        ctx.lineJoin = "round";
        ctx.strokeText(port.name, px, py + labelOffsetY);

        ctx.fillStyle = isPortHovered ? "#C6A75E" : "#1F2A44";
        ctx.fillText(port.name, px, py + labelOffsetY);
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchstart", handleTouchStartOrMove);
        container.removeEventListener("touchmove", handleTouchStartOrMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      }
    };
  }, [hoveredPort]);

  return (
    <div
      ref={containerRef}
      className="map-wrapper"
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        cursor: "crosshair"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }}
      />
      
      {/* Absolute Tooltip Info Card */}
      <div 
        className={`map-tooltip ${hoveredPort ? "active" : ""}`}
        style={{
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y}px`
        }}
      >
        {hoveredPort && (
          <>
            <h4>{hoveredPort.name}</h4>
            <p>{hoveredPort.details}</p>
          </>
        )}
      </div>
    </div>
  );
}
