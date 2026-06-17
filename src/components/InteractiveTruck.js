"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveTruck() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const truckOffset = useRef(0);
  const initialTruckOffset = useRef(0);
  const suspensionOffset = useRef(0);
  const suspensionVelocity = useRef(0);
  const currentSpeed = useRef(1.0);
  const wheelAngle = useRef(0);
  const roadScroll = useRef(0);
  const duneScroll = useRef(0);
  const skylineScroll = useRef(0);
  const particles = useRef([]);
  const hornActiveTime = useRef(0);
  const dragStartTime = useRef(0);

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
      const height = container.clientHeight || 400;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Event Handlers
    const handleMouseDown = (e) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      initialTruckOffset.current = truckOffset.current;
      dragStartTime.current = Date.now();
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      // Horizontal offset
      truckOffset.current = initialTruckOffset.current + deltaX;

      // Vertical suspension pull
      suspensionOffset.current = Math.max(-15, Math.min(25, deltaY));
    };

    const handleMouseUp = (e) => {
      if (isDragging.current) {
        isDragging.current = false;
        
        // Return spring velocity based on displacement
        suspensionVelocity.current = -suspensionOffset.current * 0.25;

        // Click threshold: either very small drag distance or short click duration
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const duration = Date.now() - dragStartTime.current;

        if (dist < 15 || duration < 250) {
          hornActiveTime.current = 1.0;
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        initialTruckOffset.current = truckOffset.current;
        dragStartTime.current = Date.now();
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - dragStart.current.x;
      const deltaY = e.touches[0].clientY - dragStart.current.y;

      truckOffset.current = initialTruckOffset.current + deltaX;
      suspensionOffset.current = Math.max(-15, Math.min(25, deltaY));
    };

    const handleTouchEnd = (e) => {
      if (isDragging.current) {
        isDragging.current = false;
        suspensionVelocity.current = -suspensionOffset.current * 0.25;

        // Support mobile tap for horn
        if (e.changedTouches && e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - dragStart.current.x;
          const dy = e.changedTouches[0].clientY - dragStart.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const duration = Date.now() - dragStartTime.current;

          if (dist < 15 || duration < 250) {
            hornActiveTime.current = 1.0;
          }
        }
      }
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      if (isDragging.current) {
        isDragging.current = false;
        suspensionVelocity.current = -suspensionOffset.current * 0.25;
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.015;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Target Speed Interpolation
      const targetSpeed = isHovered.current ? 2.5 : 1.0;
      currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.08;

      // Spring Physics for Suspension
      if (!isDragging.current) {
        const k = 0.16; // spring constant
        const damping = 0.82; // damping factor
        const springForce = -k * suspensionOffset.current;
        suspensionVelocity.current += springForce;
        suspensionVelocity.current *= damping;
        suspensionOffset.current += suspensionVelocity.current;
      }

      // Truck Bounce (from road unevenness)
      const roadBounce = isDragging.current 
        ? 0 
        : Math.sin(time * 14 * currentSpeed.current) * 0.7 + Math.cos(time * 20 * currentSpeed.current) * 0.25;

      // Update Scroll Positions
      duneScroll.current = (duneScroll.current + currentSpeed.current * 0.4) % width;
      skylineScroll.current = (skylineScroll.current + currentSpeed.current * 1.1) % width;
      roadScroll.current = (roadScroll.current + currentSpeed.current * 6.5) % 45;

      // Update Wheel Angle
      wheelAngle.current += currentSpeed.current * 0.12;

      // 1. Draw Dunes (Distant background)
      ctx.fillStyle = "rgba(198, 167, 94, 0.08)";
      for (let offset = -1; offset <= 1; offset++) {
        const startX = -duneScroll.current + offset * width;
        ctx.beginPath();
        ctx.moveTo(startX, height * 0.85);
        ctx.quadraticCurveTo(
          startX + width * 0.25, height * 0.62,
          startX + width * 0.5, height * 0.72
        );
        ctx.quadraticCurveTo(
          startX + width * 0.75, height * 0.58,
          startX + width, height * 0.85
        );
        ctx.lineTo(startX + width, height);
        ctx.lineTo(startX, height);
        ctx.closePath();
        ctx.fill();
      }

      // 2. Draw Skyline (Midground)
      ctx.fillStyle = "rgba(31, 42, 68, 0.06)";
      for (let offset = -1; offset <= 1; offset++) {
        const startX = -skylineScroll.current + offset * width;
        
        ctx.beginPath();
        // Draw some building silhouettes
        ctx.rect(startX + 40, height * 0.55, 35, height * 0.25);
        ctx.rect(startX + 110, height * 0.48, 45, height * 0.32);
        ctx.rect(startX + 200, height * 0.58, 25, height * 0.22);
        ctx.rect(startX + 260, height * 0.52, 40, height * 0.28);
        ctx.rect(startX + 340, height * 0.45, 50, height * 0.35);
        ctx.rect(startX + 420, height * 0.56, 30, height * 0.24);
        // Stylized cargo cranes
        ctx.rect(startX + 480, height * 0.5, 8, height * 0.3);
        ctx.rect(startX + 470, height * 0.5, 30, 6);
        ctx.fill();
      }

      // 3. Draw Road
      const roadY = height * 0.72;
      ctx.fillStyle = "rgba(31, 42, 68, 0.08)";
      ctx.fillRect(0, roadY, width, height - roadY);

      ctx.strokeStyle = "rgba(198, 167, 94, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, roadY);
      ctx.lineTo(width, roadY);
      ctx.stroke();

      // Road dashes
      ctx.strokeStyle = "rgba(198, 167, 94, 0.45)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = -roadScroll.current; x < width + 50; x += 45) {
        ctx.moveTo(x, roadY + 18);
        ctx.lineTo(x + 25, roadY + 18);
      }
      ctx.stroke();

      // 4. Update and Draw Exhaust Particles
      // Exhaust coordinates relative to truck
      const truckX = Math.max(30, Math.min(width - 240, width * 0.28 + truckOffset.current));
      const chassisY = roadY - 14 + roadBounce + suspensionOffset.current;
      
      // Exhaust pipe starts at truckX + 152, chassisY - 62
      const exhaustX = truckX + 152;
      const exhaustY = chassisY - 62;

      if (Math.random() < 0.25 * currentSpeed.current) {
        particles.current.push({
          x: exhaustX,
          y: exhaustY,
          vx: -(currentSpeed.current * 2.8 + Math.random() * 1.5),
          vy: -(0.6 + Math.random() * 1.2),
          size: 4 + Math.random() * 4,
          alpha: 0.55,
          life: 1.0,
          decay: 0.018 + Math.random() * 0.012
        });
      }

      particles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.22;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.current.splice(idx, 1);
          return;
        }

        ctx.fillStyle = `rgba(198, 167, 94, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Headlight Cone (Extends from front of cab)
      const headlightX = truckX + 215;
      const headlightY = chassisY + 28;
      const beamLength = 220 + (isHovered.current ? 60 : 0);
      const beamHeight = 70 + (isHovered.current ? 20 : 0);

      const grad = ctx.createLinearGradient(headlightX, headlightY, headlightX + beamLength, headlightY);
      grad.addColorStop(0, "rgba(198, 167, 94, 0.45)");
      grad.addColorStop(0.3, "rgba(198, 167, 94, 0.18)");
      grad.addColorStop(1, "rgba(198, 167, 94, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(headlightX, headlightY - 4);
      ctx.lineTo(headlightX + beamLength, headlightY - beamHeight / 2);
      ctx.lineTo(headlightX + beamLength, headlightY + beamHeight / 2);
      ctx.lineTo(headlightX, headlightY + 4);
      ctx.closePath();
      ctx.fill();

      // 6. Draw Truck Body (Chassis, Cabin, Container)
      // Chassis frame
      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(truckX + 10, chassisY + 32, 190, 6);

      // Gold Cargo Container
      const containerGradient = ctx.createLinearGradient(truckX + 10, chassisY - 45, truckX + 10, chassisY + 32);
      containerGradient.addColorStop(0, "#E6C57E");
      containerGradient.addColorStop(0.5, "#C6A75E");
      containerGradient.addColorStop(1, "#A88B48");

      ctx.fillStyle = containerGradient;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(truckX + 8, chassisY - 45, 142, 77, 4);
      } else {
        ctx.rect(truckX + 8, chassisY - 45, 142, 77);
      }
      ctx.fill();

      // Draw container vertical structural ribs
      ctx.lineWidth = 1;
      for (let rx = truckX + 18; rx < truckX + 145; rx += 11) {
        // Shadow rib
        ctx.strokeStyle = "rgba(31, 42, 68, 0.18)";
        ctx.beginPath();
        ctx.moveTo(rx, chassisY - 43);
        ctx.lineTo(rx, chassisY + 30);
        ctx.stroke();

        // Highlight rib
        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.beginPath();
        ctx.moveTo(rx + 1, chassisY - 43);
        ctx.lineTo(rx + 1, chassisY + 30);
        ctx.stroke();
      }

      // Container brand text
      ctx.fillStyle = "#1F2A44";
      ctx.font = "italic 700 12px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Subtle drop shadow for premium texture
      ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
      ctx.shadowBlur = 1;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText("HASOON LOGISTICS", truckX + 79, chassisY - 6);
      ctx.shadowColor = "transparent"; // Reset shadow

      // Exhaust pipe behind cab
      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(truckX + 150, chassisY - 62, 5, 52);
      // Exhaust curved tip
      ctx.beginPath();
      ctx.arc(truckX + 148, chassisY - 62, 4, 0, Math.PI, true);
      ctx.strokeStyle = "#5C6F8E";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Cabin (Navy Blue)
      ctx.fillStyle = "#1F2A44";
      ctx.beginPath();
      ctx.moveTo(truckX + 150, chassisY + 32);
      ctx.lineTo(truckX + 150, chassisY - 35);
      ctx.lineTo(truckX + 185, chassisY - 35);
      ctx.quadraticCurveTo(truckX + 200, chassisY - 35, truckX + 208, chassisY - 10);
      ctx.lineTo(truckX + 215, chassisY - 10);
      ctx.lineTo(truckX + 215, chassisY + 32);
      ctx.closePath();
      ctx.fill();

      // Cabin windshield & side window
      const windowGrad = ctx.createLinearGradient(truckX + 180, chassisY - 30, truckX + 200, chassisY - 15);
      windowGrad.addColorStop(0, "#FFFFFF");
      windowGrad.addColorStop(1, "#E8DCC8");
      
      ctx.fillStyle = windowGrad;
      ctx.beginPath();
      ctx.moveTo(truckX + 188, chassisY - 30);
      ctx.lineTo(truckX + 198, chassisY - 30);
      ctx.lineTo(truckX + 204, chassisY - 16);
      ctx.lineTo(truckX + 188, chassisY - 16);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(truckX + 162, chassisY - 30, 20, 14);

      // Cabin bumper & grille (Gold accent)
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(truckX + 205, chassisY + 22, 10, 10); // front bumper
      ctx.fillRect(truckX + 210, chassisY + 5, 5, 12);   // grille

      // Chrome wheel guards / fenders
      ctx.fillStyle = "#5C6F8E";
      ctx.beginPath();
      ctx.arc(truckX + 35, chassisY + 32, 18, Math.PI, 0); // Rear left arch
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(truckX + 68, chassisY + 32, 18, Math.PI, 0); // Rear right arch
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(truckX + 188, chassisY + 32, 18, Math.PI, 0); // Front arch
      ctx.stroke();

      // 7. Draw Wheels (Fixed to the road, only rotate!)
      const drawWheel = (wheelX, wheelY) => {
        ctx.save();
        ctx.translate(wheelX, wheelY);
        ctx.rotate(wheelAngle.current);

        // Tire
        ctx.fillStyle = "#111827"; // Dark slate
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        // Rim
        ctx.fillStyle = "#C6A75E"; // Gold Alloy
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        // Rim Cap
        ctx.fillStyle = "#1F2A44"; // Navy Cap
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        // Spokes
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.moveTo(Math.cos(a) * 3, Math.sin(a) * 3);
          ctx.lineTo(Math.cos(a) * 7, Math.sin(a) * 7);
        }
        ctx.stroke();

        ctx.restore();
      };

      // Draw all three wheels relative to roadY
      drawWheel(truckX + 35, roadY + 4);
      drawWheel(truckX + 68, roadY + 4);
      drawWheel(truckX + 188, roadY + 4);

      // 8. Draw Horn Soundwaves (When active)
      if (hornActiveTime.current > 0) {
        hornActiveTime.current -= 0.022;
        const progress = 1.0 - hornActiveTime.current;
        
        ctx.strokeStyle = `rgba(198, 167, 94, ${hornActiveTime.current})`;
        ctx.lineWidth = 2.5;

        // Soundwaves radiating outward
        for (let i = 1; i <= 3; i++) {
          const radius = i * 22 * progress;
          ctx.beginPath();
          ctx.arc(headlightX, headlightY, radius, -Math.PI / 4, Math.PI / 4);
          ctx.stroke();
        }

        // Elegant speech badge above the cab
        ctx.save();
        const bubbleX = truckX + 185;
        const bubbleY = chassisY - 65;
        const bubbleWidth = 100;
        const bubbleHeight = 24;

        ctx.fillStyle = "#1F2A44";
        ctx.strokeStyle = "#C6A75E";
        ctx.lineWidth = 1;
        ctx.shadowColor = "rgba(31, 42, 68, 0.15)";
        ctx.shadowBlur = 8;
        
        // Draw speech bubble
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight, bubbleWidth, bubbleHeight, 5);
        } else {
          ctx.rect(bubbleX - bubbleWidth / 2, bubbleY - bubbleHeight, bubbleWidth, bubbleHeight);
        }
        ctx.fill();
        ctx.stroke();

        // Pointer triangle
        ctx.beginPath();
        ctx.moveTo(bubbleX - 5, bubbleY);
        ctx.lineTo(bubbleX, bubbleY + 5);
        ctx.lineTo(bubbleX + 5, bubbleY);
        ctx.closePath();
        ctx.fillStyle = "#1F2A44";
        ctx.fill();
        ctx.strokeStyle = "#C6A75E";
        ctx.stroke();

        // Text
        ctx.fillStyle = "#C6A75E";
        ctx.font = "bold 9px 'Inter', sans-serif";
        ctx.fillText("VIP EXPRESS", bubbleX, bubbleY - bubbleHeight / 2 + 1);
        ctx.restore();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        userSelect: "none"
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
