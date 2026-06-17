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

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic trade routes
    const routes = [
      { name: "Dubai to Riyadh (Overland)", type: "land", start: { x: 0.5, y: 0.5 }, end: { x: 0.15, y: 0.4 }, progress: 0 },
      { name: "Jebel Ali to Nhava Sheva (Ocean)", type: "sea", start: { x: 0.5, y: 0.5 }, end: { x: 0.85, y: 0.8 }, progress: 0.3 },
      { name: "DXB to Shanghai (Air)", type: "air", start: { x: 0.5, y: 0.5 }, end: { x: 0.9, y: 0.25 }, progress: 0.6 },
      { name: "Dubai to Europe Cargo Charter (Air)", type: "air", start: { x: 0.5, y: 0.5 }, end: { x: 0.1, y: 0.15 }, progress: 0.8 }
    ];

    const animate = () => {
      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Draw Grid Backdrop
      ctx.strokeStyle = "rgba(31, 42, 68, 0.04)";
      ctx.lineWidth = 1;
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

      // Center Node (Dubai Hub) coords
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Draw active hover circle
      if (isHovered.current) {
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.fillStyle = "rgba(198, 167, 94, 0.05)";
          ctx.beginPath();
          ctx.arc(cx, cy, 60 + Math.sin(time * 5) * 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw routes
      routes.forEach((route) => {
        const startX = route.start.x * w;
        const startY = route.start.y * h;
        const endX = route.end.x * w;
        const endY = route.end.y * h;

        // Draw dotted route path
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        if (route.type === "air") {
          // Curved arc for air lines
          const ctrlX = (startX + endX) / 2;
          const ctrlY = Math.min(startY, endY) - 50;
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.strokeStyle = "rgba(92, 111, 142, 0.25)";
          ctx.setLineDash([4, 4]);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);

          // Update & draw glowing airplane node
          route.progress = (route.progress + 0.003) % 1.0;
          const t = route.progress;
          // Bezier interpolation
          const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
          const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;
          
          ctx.fillStyle = "#C6A75E";
          ctx.shadowColor = "#C6A75E";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        } else {
          // Straight line for sea/land
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = route.type === "sea" ? "rgba(31, 42, 68, 0.18)" : "rgba(198, 167, 94, 0.25)";
          ctx.lineWidth = 2;
          ctx.setLineDash(route.type === "land" ? [6, 3] : []);
          ctx.stroke();
          ctx.setLineDash([]);

          // Update & draw vehicle node
          route.progress = (route.progress + 0.004) % 1.0;
          const px = startX + (endX - startX) * route.progress;
          const py = startY + (endY - startY) * route.progress;

          ctx.fillStyle = route.type === "sea" ? "#1F2A44" : "#C6A75E";
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 4;
          ctx.fillRect(px - 3, py - 3, 6, 6);
          ctx.shadowBlur = 0;
        }

        // Draw destination dots
        ctx.fillStyle = "#1F2A44";
        ctx.beginPath();
        ctx.arc(endX, endY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#C6A75E";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label destination text
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "#5C6F8E";
        ctx.fillText(route.name.split(" ")[2], endX + 8, endY + 3);
      });

      // Draw Main Hub (Dubai Center Node)
      ctx.fillStyle = "#1F2A44";
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#C6A75E";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing gold concentric ring
      const pulseRadius = 10 + (time * 18) % 25;
      const alpha = 1.0 - (pulseRadius - 10) / 25;
      ctx.strokeStyle = `rgba(198, 167, 94, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Hub Label
      ctx.fillStyle = "#1F2A44";
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("DUBAI HQ HUB", cx, cy - 18);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

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
        justifyContent: "center"
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
    </div>
  );
}
