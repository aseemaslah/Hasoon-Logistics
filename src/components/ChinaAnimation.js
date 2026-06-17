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
      { name: "Shanghai Port", x: 0.2, y: 0.35, pulse: 0 },
      { name: "Ningbo Port", x: 0.22, y: 0.5, pulse: 0.3 },
      { name: "Shenzhen Port", x: 0.15, y: 0.78, pulse: 0.6 }
    ];

    const vessels = [
      { port: "Shanghai Port", targetX: 0.9, targetY: 0.2, progress: 0.1, speed: 0.0035 },
      { port: "Ningbo Port", targetX: 0.88, targetY: 0.5, progress: 0.4, speed: 0.003 },
      { port: "Shenzhen Port", targetX: 0.85, targetY: 0.8, progress: 0.7, speed: 0.004 }
    ];

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

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      time += 0.015;
      animationFrameId = requestAnimationFrame(animate);

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Draw Grid Backdrop
      ctx.strokeStyle = "rgba(31, 42, 68, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw stylized coast contour (Left column representing China coastline)
      ctx.fillStyle = "rgba(31, 42, 68, 0.04)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w * 0.18, 0);
      ctx.quadraticCurveTo(w * 0.22, h * 0.25, w * 0.16, h * 0.45);
      ctx.quadraticCurveTo(w * 0.25, h * 0.65, w * 0.12, h * 0.85);
      ctx.lineTo(w * 0.15, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Draw shipping lines (sea lanes)
      const multiplier = isHovered.current ? 2.5 : 1.0;
      vessels.forEach((vessel) => {
        const originPort = ports.find((p) => p.name === vessel.port);
        if (!originPort) return;

        const startX = originPort.x * w;
        const startY = originPort.y * h;
        const endX = vessel.targetX * w;
        const endY = vessel.targetY * h;

        // Curve control point
        const ctrlX = (startX + endX) / 2 + 30;
        const ctrlY = (startY + endY) / 2 - 40;

        // Draw dotted path curve
        ctx.strokeStyle = "rgba(92, 111, 142, 0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.stroke();

        // Update shipping progress
        vessel.progress = (vessel.progress + vessel.speed * multiplier) % 1.0;

        // Quadratic Bezier interpolation for vessel node position
        const t = vessel.progress;
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

        // Draw shipping container ship node (Gold)
        ctx.fillStyle = "#C6A75E";
        ctx.shadowColor = "#C6A75E";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw destination coordinates indicator (Right column)
        ctx.fillStyle = "rgba(31, 42, 68, 0.5)";
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "italic 9px sans-serif";
        ctx.fillStyle = "#5C6F8E";
        ctx.fillText("Global Dispatch", endX - 70, endY - 6);
      });

      // Draw Ports
      ports.forEach((port) => {
        const px = port.x * w;
        const py = port.y * h;

        // Pulsing rings from port
        port.pulse = (port.pulse + 0.012) % 1.0;
        const r = 4 + port.pulse * 18;
        const alpha = 1.0 - port.pulse;
        ctx.strokeStyle = `rgba(198, 167, 94, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.stroke();

        // Port dot
        ctx.fillStyle = "#1F2A44";
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#C6A75E";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Port Text Label
        ctx.font = "bold 9px 'Inter', sans-serif";
        ctx.fillStyle = "#1F2A44";
        ctx.textAlign = "left";
        ctx.fillText(port.name, px + 10, py + 3);
      });

      // Coast name tag
      ctx.fillStyle = "#1F2A44";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("EAST CHINA SEA TRADE CORRIDORS", w * 0.5, h - 25);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (container) {
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
