"use client";

import React, { useEffect, useRef } from "react";

export default function SaudiArabiaAnimation() {
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

    let duneScroll = 0;
    const stars = [];
    const starCount = 30;

    // Generate coordinates for network stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.55,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

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

      // Draw Desert Night Sky (Dark indigo/blue gradient)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#0F172A");
      skyGrad.addColorStop(0.6, "#1E293B");
      skyGrad.addColorStop(1, "#334155");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw constellation network lines
      ctx.strokeStyle = "rgba(198, 167, 94, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < starCount; i += 3) {
        if (i + 1 < starCount) {
          ctx.moveTo(stars[i].x * w, stars[i].y * h);
          ctx.lineTo(stars[i + 1].x * w, stars[i + 1].y * h);
        }
      }
      ctx.stroke();

      // Update and draw stars
      stars.forEach((star) => {
        const pulse = Math.sin(time * star.pulseSpeed * 60) * 0.25;
        ctx.fillStyle = "#C6A75E";
        ctx.globalAlpha = Math.max(0.1, star.alpha + pulse);
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0; // reset

      // Draw distant Riyadh Skyline Silhouettes (Olaya district)
      ctx.fillStyle = "#1E293B";
      const skylineY = h * 0.72;
      
      // Kingdom Centre (Stylized V-cut tower)
      const kX = w * 0.7;
      ctx.beginPath();
      ctx.moveTo(kX, skylineY);
      ctx.lineTo(kX + 15, skylineY - 110);
      ctx.quadraticCurveTo(kX + 25, skylineY - 70, kX + 35, skylineY - 110);
      ctx.lineTo(kX + 50, skylineY);
      ctx.closePath();
      ctx.fill();
      // Kingdom Centre V cutout glow
      ctx.strokeStyle = "rgba(198, 167, 94, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(kX + 25, skylineY - 80);
      ctx.lineTo(kX + 25, skylineY);
      ctx.stroke();

      // Al Faisaliyah (Pointed pyramid tower)
      const fX = w * 0.25;
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.moveTo(fX, skylineY);
      ctx.lineTo(fX + 18, skylineY - 95);
      ctx.lineTo(fX + 36, skylineY);
      ctx.closePath();
      ctx.fill();
      // Golden globe on Al Faisaliyah
      ctx.fillStyle = "#C6A75E";
      ctx.beginPath();
      ctx.arc(fX + 18, skylineY - 75, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Scrolling Dunes (Distant background)
      const speed = isHovered.current ? 2.5 : 1.0;
      duneScroll = (duneScroll + speed * 0.25) % w;

      ctx.fillStyle = "rgba(198, 167, 94, 0.08)";
      for (let offset = -1; offset <= 1; offset++) {
        const startX = -duneScroll + offset * w;
        ctx.beginPath();
        ctx.moveTo(startX, skylineY);
        ctx.quadraticCurveTo(
          startX + w * 0.35, skylineY - 25,
          startX + w * 0.65, skylineY - 10
        );
        ctx.quadraticCurveTo(
          startX + w * 0.85, skylineY - 20,
          startX + w, skylineY
        );
        ctx.lineTo(startX + w, h);
        ctx.lineTo(startX, h);
        ctx.closePath();
        ctx.fill();
      }

      // Draw Road Base
      ctx.fillStyle = "#1F2A44";
      ctx.fillRect(0, skylineY, w, h - skylineY);
      ctx.strokeStyle = "rgba(198, 167, 94, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, skylineY);
      ctx.lineTo(w, skylineY);
      ctx.stroke();

      // Convoy Trucks (2 trucks)
      const convoyX = w * 0.2;
      const truckBounce = Math.sin(time * 10 * speed) * 0.6;

      // Draw Lead Truck
      const tx1 = convoyX + 120;
      const ty1 = skylineY - 20 + truckBounce;
      
      // Chassis
      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(tx1 + 5, ty1 + 16, 85, 4);

      // Cabin (Navy Blue)
      ctx.fillStyle = "#0F172A";
      ctx.beginPath();
      ctx.moveTo(tx1 + 70, ty1 + 18);
      ctx.lineTo(tx1 + 70, ty1 - 12);
      ctx.lineTo(tx1 + 86, ty1 - 12);
      ctx.quadraticCurveTo(tx1 + 92, ty1 - 10, tx1 + 96, ty1);
      ctx.lineTo(tx1 + 96, ty1 + 18);
      ctx.closePath();
      ctx.fill();

      // Yellow Headlight beam
      const beamGrad = ctx.createLinearGradient(tx1 + 96, ty1 + 10, tx1 + 220, ty1 + 10);
      beamGrad.addColorStop(0, "rgba(198, 167, 94, 0.45)");
      beamGrad.addColorStop(1, "rgba(198, 167, 94, 0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(tx1 + 96, ty1 + 8);
      ctx.lineTo(tx1 + 220, ty1 - 15);
      ctx.lineTo(tx1 + 220, ty1 + 35);
      ctx.lineTo(tx1 + 96, ty1 + 14);
      ctx.closePath();
      ctx.fill();

      // Container Box (Gold)
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(tx1 + 8, ty1 - 15, 60, 31);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let rx = tx1 + 14; rx < tx1 + 65; rx += 8) {
        ctx.beginPath();
        ctx.moveTo(rx, ty1 - 13);
        ctx.lineTo(rx, ty1 + 14);
        ctx.stroke();
      }

      // Wheels
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(tx1 + 18, skylineY + 2, 6, 0, Math.PI * 2);
      ctx.arc(tx1 + 30, skylineY + 2, 6, 0, Math.PI * 2);
      ctx.arc(tx1 + 82, skylineY + 2, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw Second Convoy Truck (Trailing)
      const tx2 = convoyX;
      const ty2 = skylineY - 18 + Math.cos(time * 10 * speed) * 0.6;

      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(tx2 + 5, ty2 + 16, 75, 4);

      // Cabin
      ctx.fillStyle = "#0F172A";
      ctx.beginPath();
      ctx.moveTo(tx2 + 60, ty2 + 18);
      ctx.lineTo(tx2 + 60, ty2 - 10);
      ctx.lineTo(tx2 + 74, ty2 - 10);
      ctx.quadraticCurveTo(tx2 + 80, ty2 - 8, tx2 + 84, ty2 + 2);
      ctx.lineTo(tx2 + 84, ty2 + 18);
      ctx.closePath();
      ctx.fill();

      // Container Box (Slate Blue)
      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(tx2 + 8, ty2 - 12, 50, 28);
      
      // Wheels
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(tx2 + 18, skylineY + 2, 6, 0, Math.PI * 2);
      ctx.arc(tx2 + 74, skylineY + 2, 6, 0, Math.PI * 2);
      ctx.fill();

      // Route Label
      ctx.fillStyle = "#E8DCC8";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GHUWAIFAT - BATHA TRANSIT CORRIDOR", w * 0.5, skylineY + 30);
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
