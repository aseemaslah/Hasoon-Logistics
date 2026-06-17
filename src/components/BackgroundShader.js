"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    const scale = 0.5;

    const colors = {
      primary: "#E8DCC8",   // Cream / Beige
      secondary: "#1F2A44", // Navy
      accent: "#C6A75E",    // Gold
      white: "#FFFFFF",
    };

    const particleCount = 60;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 0.8 + 0.2,
        speedX: (Math.random() - 0.5) * 0.0001,
        speedY: (Math.random() - 0.5) * 0.0001 - 0.0002,
        size: Math.random() * 5 + 3,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const resize = () => {
      const w = canvas.clientWidth * scale;
      const h = canvas.clientHeight * scale;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.0006;
      const w = canvas.width;
      const h = canvas.height;

      // Base cream color
      ctx.fillStyle = colors.primary;
      ctx.fillRect(0, 0, w, h);

      // Navy Blob
      const navyX = w * (0.5 + Math.sin(time * 2.1) * 0.3);
      const navyY = h * (0.5 + Math.cos(time * 1.5) * 0.25);
      const navyRadius = Math.max(w, h) * 0.75;
      let gradNavy = ctx.createRadialGradient(navyX, navyY, 0, navyX, navyY, navyRadius);
      gradNavy.addColorStop(0, "rgba(31, 42, 68, 0.12)");
      gradNavy.addColorStop(1, "rgba(31, 42, 68, 0)");
      ctx.fillStyle = gradNavy;
      ctx.beginPath();
      ctx.arc(navyX, navyY, navyRadius, 0, Math.PI * 2);
      ctx.fill();

      // Gold Blob
      const goldX = w * (0.5 + Math.cos(time * 1.8) * 0.35);
      const goldY = h * (0.5 + Math.sin(time * 2.4) * 0.2);
      const goldRadius = Math.max(w, h) * 0.65;
      let gradGold = ctx.createRadialGradient(goldX, goldY, 0, goldX, goldY, goldRadius);
      gradGold.addColorStop(0, "rgba(198, 167, 94, 0.15)");
      gradGold.addColorStop(1, "rgba(198, 167, 94, 0)");
      ctx.fillStyle = gradGold;
      ctx.beginPath();
      ctx.arc(goldX, goldY, goldRadius, 0, Math.PI * 2);
      ctx.fill();

      // White Highlight
      const whiteX = w * (0.3 + Math.sin(time * 1.2) * 0.2);
      const whiteY = h * (0.7 + Math.cos(time * 2.0) * 0.2);
      const whiteRadius = Math.max(w, h) * 0.55;
      let gradWhite = ctx.createRadialGradient(whiteX, whiteY, 0, whiteX, whiteY, whiteRadius);
      gradWhite.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradWhite.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradWhite;
      ctx.beginPath();
      ctx.arc(whiteX, whiteY, whiteRadius, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        p.x += p.speedX * p.z;
        p.y += p.speedY * p.z;

        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * w;
        const py = p.y * h;
        const pSize = p.size * p.z;

        ctx.beginPath();
        let grad = ctx.createRadialGradient(px, py, 0, px, py, pSize);
        grad.addColorStop(0, `rgba(198, 167, 94, ${p.alpha * p.z})`);
        grad.addColorStop(1, "rgba(198, 167, 94, 0)");
        ctx.fillStyle = grad;
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="shader-canvas"></canvas>;
}
