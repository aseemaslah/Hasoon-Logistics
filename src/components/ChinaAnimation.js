"use client";

import React, { useEffect, useRef } from "react";

export default function ChinaAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const ports = [
      { name: "Shanghai Port", x: 0.22, y: 0.32, coords: "31.2304° N, 121.4737° E", delay: "Clearance: 14h" },
      { name: "Ningbo Port", x: 0.24, y: 0.52, coords: "29.8683° N, 121.5440° E", delay: "Clearance: 18h" },
      { name: "Shenzhen Port", x: 0.14, y: 0.78, coords: "22.5431° N, 114.0579° E", delay: "Clearance: 11h" }
    ];

    const vessels = [
      { port: "Shanghai Port", targetX: 0.9, targetY: 0.18, progress: 0.1, speed: 0.0028, color: "#C6A75E", sizeScale: 1.1 },
      { port: "Ningbo Port", targetX: 0.88, targetY: 0.48, progress: 0.45, speed: 0.0024, color: "#5C6F8E", sizeScale: 1.0 },
      { port: "Shenzhen Port", targetX: 0.82, targetY: 0.82, progress: 0.7, speed: 0.0033, color: "#1F2A44", sizeScale: 0.9 }
    ];

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

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const handleTouchStart = () => {
      isHovered.current = true;
    };

    const handleTouchEnd = () => {
      isHovered.current = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    const animate = () => {
      time += 0.012;
      animationFrameId = requestAnimationFrame(animate);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Radar Screen Backdrop (Dark navy slate with grid)
      ctx.fillStyle = "#0A101D"; // Cyber radar dark navy
      ctx.fillRect(0, 0, w, h);

      // Radar Concentric Range Rings
      const rx = w * 0.48;
      const ry = h * 0.5;
      
      ctx.strokeStyle = "rgba(198, 167, 94, 0.04)";
      ctx.lineWidth = 1;
      for (let r = 50; r < Math.max(w, h); r += 65) {
        ctx.beginPath();
        ctx.arc(rx, ry, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Compass Degree ticks
      ctx.strokeStyle = "rgba(198, 167, 94, 0.08)";
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        const startX = rx + Math.cos(angle) * (h * 0.45);
        const startY = ry + Math.sin(angle) * (h * 0.45);
        const endX = rx + Math.cos(angle) * (h * 0.47);
        const endY = ry + Math.sin(angle) * (h * 0.47);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
      }
      ctx.stroke();

      // Dotted Grid backdrop lines
      ctx.strokeStyle = "rgba(92, 111, 142, 0.03)";
      ctx.lineWidth = 1.0;
      ctx.setLineDash([2, 8]);
      for (let gx = 0; gx < w; gx += 30) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]); // reset

      // 2. Draw Stylized High-Tech Coastline Contour (East China coast)
      ctx.fillStyle = "rgba(31, 42, 68, 0.35)"; // Landmass color fill
      ctx.strokeStyle = "rgba(198, 167, 94, 0.2)"; // Coast edge glow line
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(w * 0.20, -10);
      ctx.quadraticCurveTo(w * 0.23, h * 0.22, w * 0.17, h * 0.42);
      ctx.quadraticCurveTo(w * 0.26, h * 0.62, w * 0.13, h * 0.76);
      ctx.quadraticCurveTo(w * 0.16, h * 0.88, w * 0.08, h + 10);
      ctx.lineTo(-10, h + 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 3. Draw Radar Sweep Line (Rotating beam)
      const sweepAngle = time * 0.9;
      const sweepRadius = Math.max(w, h);
      const sweepGrad = ctx.createRadialGradient(rx, ry, 0, rx, ry, sweepRadius);
      sweepGrad.addColorStop(0, "rgba(198, 167, 94, 0.08)");
      sweepGrad.addColorStop(1, "rgba(198, 167, 94, 0)");
      
      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.arc(rx, ry, sweepRadius, sweepAngle - 0.25, sweepAngle);
      ctx.closePath();
      ctx.fill();

      // Sweep edge line
      ctx.strokeStyle = "rgba(198, 167, 94, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + Math.cos(sweepAngle) * (h * 0.45), ry + Math.sin(sweepAngle) * (h * 0.45));
      ctx.stroke();

      // 4. Update and Draw Cargo Vessel Fleets
      const scrollSpeed = typeof window !== "undefined" && window.scrollVelocity && !isNaN(window.scrollVelocity) ? Math.min(window.scrollVelocity, 4.0) : 0;
      const multiplier = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);
      vessels.forEach((vessel) => {
        const originPort = ports.find((p) => p.name === vessel.port);
        if (!originPort) return;

        const startX = originPort.x * w;
        const startY = originPort.y * h;
        const endX = vessel.targetX * w;
        const endY = vessel.targetY * h;

        // Bezier curve controls for shipping route lanes
        const ctrlX = (startX + endX) / 2 + 45;
        const ctrlY = (startY + endY) / 2 - 30;

        // Draw dotted path shipping lane route
        ctx.strokeStyle = "rgba(198, 167, 94, 0.22)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Update shipping progress
        vessel.progress = (vessel.progress + vessel.speed * multiplier) % 1.0;

        // Cubic/quadratic interpolation for cargo ship coordinates
        const t = vessel.progress;
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

        // Draw actual realistic 2D silhouette container ship vector instead of a dot
        drawVectorShip(ctx, px, py, vessel.color, vessel.sizeScale);

        // Draw destination beacon indicators
        ctx.fillStyle = "rgba(92, 111, 142, 0.5)";
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "italic 8px sans-serif";
        ctx.fillStyle = "rgba(226, 232, 240, 0.5)";
        ctx.fillText("Intercontinental Lane", endX - 80, endY - 6);
      });

      // 5. Draw Ports with high-contrast text and glowing rings
      ports.forEach((port) => {
        const px = port.x * w;
        const py = port.y * h;

        // Pulsing radar rings
        port.pulseRate = ((port.pulseRate || 0) + 0.015) % 1.0;
        const r = 5 + port.pulseRate * 20;
        const alpha = 1.0 - port.pulseRate;
        ctx.strokeStyle = `rgba(198, 167, 94, ${alpha})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.stroke();

        // Port node core dot
        ctx.fillStyle = "#0A101D";
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#C6A75E";
        ctx.lineWidth = 2.0;
        ctx.stroke();
        
        ctx.fillStyle = "#C6A75E";
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Port Labels (Navy/white outline)
        ctx.font = "bold 9px 'Inter', sans-serif";
        ctx.textAlign = "left";
        
        ctx.strokeStyle = "#0A101D";
        ctx.lineWidth = 3.0;
        ctx.lineJoin = "round";
        ctx.strokeText(port.name, px + 12, py - 4);
        ctx.strokeText(port.coords, px + 12, py + 6);
        ctx.strokeText(port.delay, px + 12, py + 15);

        ctx.fillStyle = "#E2E8F0"; // pure white text
        ctx.fillText(port.name, px + 12, py - 4);
        ctx.fillStyle = "#5C6F8E"; // Coordinates slate
        ctx.fillText(port.coords, px + 12, py + 6);
        ctx.fillStyle = "#C6A75E"; // Delay Gold
        ctx.fillText(port.delay, px + 12, py + 15);
      });

      // Title/Coordinate overlay
      ctx.fillStyle = "#E8DCC8";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("EAST CHINA SEA MARITIME HUB MONITOR", w * 0.5, h - 18);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      }
    };
  }, []);

  // Helper to draw a cargo ship shape carrying containers
  const drawVectorShip = (ctx, sx, sy, color, scale) => {
    const w = 24 * scale;
    const h = 8 * scale;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(sx - w / 2, sy + h / 2);
    ctx.lineTo(sx + w / 2 - 4, sy + h / 2);
    ctx.lineTo(sx + w / 2, sy - h / 4); // pointed bow
    ctx.lineTo(sx - w / 2 + 3, sy - h / 2); // stern
    ctx.closePath();
    ctx.fill();
    
    // Draw tiny container box stacks on the ship deck
    ctx.fillStyle = "#C6A75E";
    ctx.fillRect(sx - w / 4, sy - h / 2 - 1.5, 5, 5);
    ctx.fillStyle = "#5C6F8E";
    ctx.fillRect(sx - w / 4 + 6, sy - h / 2 - 1.5, 4, 5);
    ctx.fillStyle = "#E8DCC8";
    ctx.fillRect(sx - w / 4 + 11, sy - h / 2 - 1.5, 5, 5);

    // Glowing coordinate dot on the vessel
    ctx.fillStyle = "rgba(198, 167, 94, 0.95)";
    ctx.beginPath();
    ctx.arc(sx + w / 3, sy, 1.5, 0, Math.PI * 2);
    ctx.fill();
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
        <div>DESK: EAST CHINA SEA</div>
        <div>RADAR SCANNING: ACTIVE // VESSEL COUNT: 88</div>
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
