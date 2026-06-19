"use client";

import React, { useEffect, useRef } from "react";

export default function UaeAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

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
      const height = container.clientHeight || 350;
      if (width <= 0 || height <= 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    };

    const handleTouchStart = (e) => {
      isHovered.current = true;
      handleTouchMove(e);
    };

    const handleTouchEnd = () => {
      isHovered.current = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    // Dynamic trade routes
    const routes = [
      { name: "Dubai to Riyadh (GCC Overland)", type: "truck", start: { x: 0.5, y: 0.5 }, end: { x: 0.15, y: 0.38 }, progress: 0.1, speed: 0.0035 },
      { name: "Jebel Ali to Nhava Sheva (Ocean)", type: "ship", start: { x: 0.5, y: 0.5 }, end: { x: 0.85, y: 0.8 }, progress: 0.45, speed: 0.0028 },
      { name: "DXB to Shanghai Cargo (Air Cargo)", type: "plane", start: { x: 0.5, y: 0.5 }, end: { x: 0.88, y: 0.28 }, progress: 0.75, speed: 0.0045 },
      { name: "DXB to Europe Air Express (Air Cargo)", type: "plane", start: { x: 0.5, y: 0.5 }, end: { x: 0.1, y: 0.15 }, progress: 0.3, speed: 0.0042 }
    ];

    const animate = () => {
      time += 0.012;
      animationFrameId = requestAnimationFrame(animate);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw grid backdrop (Tech-telemetry design)
      ctx.fillStyle = "#0D1321"; // Luxury deep space navy
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(31, 42, 68, 0.35)";
      ctx.lineWidth = 1.0;
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Node (Dubai HQ Hub) coordinates
      const cx = w * 0.5;
      const cy = h * 0.5;

      // 2. Draw rotating orbital rings (Nested futuristic HUD details)
      ctx.strokeStyle = "rgba(198, 167, 94, 0.18)";
      ctx.lineWidth = 1;
      
      // Orbit Ring 1 (Inner)
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.stroke();

      // Orbit Ring 2 (Dashed, rotating)
      ctx.strokeStyle = "rgba(92, 111, 142, 0.22)";
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(cx, cy, 65, time * 0.5, time * 0.5 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Orbit Ring 3 (Outer solid thin)
      ctx.strokeStyle = "rgba(198, 167, 94, 0.08)";
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Route Lanes and Detailed Vehicles
      const scrollSpeed = typeof window !== "undefined" && window.scrollVelocity && !isNaN(window.scrollVelocity) ? Math.min(window.scrollVelocity, 4.0) : 0;
      const multiplier = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);

      routes.forEach((route) => {
        const startX = route.start.x * w;
        const startY = route.start.y * h;
        const endX = route.end.x * w;
        const endY = route.end.y * h;

        // Curved control points for elegant routing arcs
        const ctrlX = (startX + endX) / 2 + (route.type === "plane" ? 25 : -15);
        const ctrlY = (startY + endY) / 2 - (route.type === "plane" ? 50 : 20);

        // Draw curved path
        ctx.strokeStyle = route.type === "plane" ? "rgba(92, 111, 142, 0.22)" : "rgba(198, 167, 94, 0.2)";
        ctx.lineWidth = route.type === "ship" ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.stroke();

        // Update progress
        route.progress = (route.progress + route.speed * multiplier) % 1.0;
        const t = route.progress;

        // Quadratic Bezier coordinates for vehicle vectors
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

        // Draw animated tail/trail (flowing data stream particles leaving glowing tails)
        drawFadingTail(ctx, startX, startY, ctrlX, ctrlY, endX, endY, t);

        // Draw detailed vector vehicle shapes based on routing type
        drawDetailedVehicle(ctx, px, py, route.type, startX, startY, endX, endY, t);

        // Draw destination terminal hubs with pulsing coordinates
        ctx.fillStyle = "#0D1321";
        ctx.beginPath();
        ctx.arc(endX, endY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#C6A75E";
        ctx.lineWidth = 1.75;
        ctx.stroke();

        // Label details with high contrast outline
        ctx.font = "bold 9px 'Inter', sans-serif";
        ctx.textAlign = "left";
        
        ctx.strokeStyle = "#0D1321";
        ctx.lineWidth = 3.0;
        ctx.strokeText(route.name.split(" ")[2], endX + 10, endY + 3);
        
        ctx.fillStyle = "#E2E8F0";
        ctx.fillText(route.name.split(" ")[2], endX + 10, endY + 3);
      });

      // 4. Draw Central Main Hub Node (Dubai HQ Hub)
      ctx.fillStyle = "#0D1321";
      ctx.beginPath();
      ctx.arc(cx, cy, 11, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#C6A75E";
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // Pulsing outer node ring
      const pulseRadius = 11 + (time * 18) % 25;
      const alphaVal = 1.0 - (pulseRadius - 11) / 25;
      ctx.strokeStyle = `rgba(198, 167, 94, ${alphaVal * 0.85})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Golden core accent dot
      ctx.fillStyle = "#C6A75E";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Hub title labels
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      
      ctx.strokeStyle = "#0D1321";
      ctx.lineWidth = 3.0;
      ctx.strokeText("DUBAI HQ HUB", cx, cy - 20);

      ctx.fillStyle = "#F8FAFC";
      ctx.fillText("DUBAI HQ HUB", cx, cy - 20);

      // Bottom bar title
      ctx.fillStyle = "#E8DCC8";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("JEBEL ALI - DWC INTERCONTINENTAL PORT LAYER", w * 0.5, h - 18);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      }
    };
  }, []);

  // Draw a fading tail segment behind the vehicle progress
  const drawFadingTail = (ctx, sx, sy, cx, cy, ex, ey, t) => {
    ctx.strokeStyle = "rgba(198, 167, 94, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    // Draw only a portion of the bezier curve representing the trailing path
    const startT = Math.max(0, t - 0.18);
    const step = 0.02;
    
    const p0x = (1 - startT) * (1 - startT) * sx + 2 * (1 - startT) * startT * cx + startT * startT * ex;
    const p0y = (1 - startT) * (1 - startT) * sy + 2 * (1 - startT) * startT * cy + startT * startT * ey;
    ctx.moveTo(p0x, p0y);
    
    for (let u = startT + step; u <= t; u += step) {
      const px = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * cx + u * u * ex;
      const py = (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * cy + u * u * ey;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  };

  // Helper to draw realistic detailed vector vehicle silhouettes
  const drawDetailedVehicle = (ctx, vx, vy, type, sx, sy, ex, ey, t) => {
    // Calculate angle of motion based on derivative of Bezier curve at t
    const tDelta = 0.005;
    const nextT = Math.min(1.0, t + tDelta);
    const pxNext = (1 - nextT) * (1 - nextT) * sx + 2 * (1 - nextT) * nextT * (sx + ex) / 2 + nextT * nextT * ex;
    const pyNext = (1 - nextT) * (1 - nextT) * sy + 2 * (1 - nextT) * nextT * (sy + ey) / 2 + nextT * nextT * ey;
    
    // Wait, let's just calculate direct dx/dy for simplicity
    const dx = pxNext - vx;
    const dy = pyNext - vy;
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(vx, vy);
    ctx.rotate(angle);

    ctx.fillStyle = "#C6A75E";
    ctx.shadowColor = "#C6A75E";
    ctx.shadowBlur = 4;

    if (type === "plane") {
      // Draw a detailed airplane vector shape
      ctx.beginPath();
      ctx.moveTo(0, -6); // Nose
      ctx.lineTo(3, -2);
      ctx.lineTo(12, -2); // Wing tip right
      ctx.lineTo(13, 0);
      ctx.lineTo(3, 1);
      ctx.lineTo(2, 5); // Tail fin right
      ctx.lineTo(4, 7);
      ctx.lineTo(0, 5); // Tail center
      ctx.lineTo(-4, 7); // Tail fin left
      ctx.lineTo(-2, 5);
      ctx.lineTo(-3, 1);
      ctx.lineTo(-13, 0);
      ctx.lineTo(-12, -2); // Wing tip left
      ctx.lineTo(-3, -2);
      ctx.closePath();
      ctx.fill();
    } else if (type === "ship") {
      // Draw a cargo container ship shape
      ctx.fillStyle = "#5C6F8E";
      ctx.beginPath();
      ctx.moveTo(-10, -3.5);
      ctx.lineTo(7, -3.5);
      ctx.lineTo(12, 0); // bow
      ctx.lineTo(7, 3.5);
      ctx.lineTo(-10, 3.5); // stern rounded
      ctx.closePath();
      ctx.fill();
      
      // Containers on deck
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(-6, -2.5, 4, 5);
      ctx.fillStyle = "#1F2A44";
      ctx.fillRect(-1, -2.5, 4, 5);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(4, -2.5, 3, 5);
    } else {
      // Draw a detailed semi-truck shape
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(-9, -3, 13, 6); // Trailer
      
      // Trailer rib lines
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect(-7, -3, 1, 6);
      ctx.fillRect(-4, -3, 1, 6);
      ctx.fillRect(-1, -3, 1, 6);
      
      ctx.fillStyle = "#0D1321"; // Cab
      ctx.beginPath();
      ctx.moveTo(4, -2.5);
      ctx.lineTo(8, -2.5);
      ctx.lineTo(10, 0);
      ctx.lineTo(8, 2.5);
      ctx.lineTo(4, 2.5);
      ctx.closePath();
      ctx.fill();
      
      // Wheels
      ctx.fillStyle = "#000000";
      ctx.fillRect(-7, -4, 2, 8);
      ctx.fillRect(-2, -4, 2, 8);
      ctx.fillRect(5, -4, 2, 8);
    }

    ctx.restore();
    ctx.shadowBlur = 0; // reset
  };

  return (
    <div
      ref={containerRef}
      className="glass-panel"
      style={{
        width: "100%",
        height: "350px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0
      }}
    >
      {/* HUD Telemetry Overlay */}
      <div style={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        fontFamily: "monospace",
        fontSize: "0.65rem",
        color: "#C6A75E",
        background: "rgba(10, 15, 29, 0.75)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "0.5rem 0.75rem",
        borderRadius: "4px",
        border: "1px solid rgba(198, 167, 94, 0.2)",
        pointerEvents: "none",
        zIndex: 5,
        letterSpacing: "1px",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        textAlign: "left"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981", animation: "pulse 2s infinite" }}></span>
          <span>TELEMETRY ONLINE</span>
        </div>
        <div>DESK: DUBAI GATEWAY</div>
        <div>SAT LINK: STABLE // AEO RANK: L1</div>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }}
      />
    </div>
  );
}
