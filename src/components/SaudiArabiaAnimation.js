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

    // Star data
    const stars = [];
    const starCount = 45;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.55,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.6 + 0.4,
        pulseSpeed: 0.015 + Math.random() * 0.03
      });
    }

    // Shooting stars data
    const meteors = [];
    const maxMeteors = 2;

    const addMeteor = () => {
      if (meteors.length >= maxMeteors) return;
      meteors.push({
        x: Math.random() * 0.7,
        y: Math.random() * 0.3,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 12 + 8,
        angle: Math.PI / 6 + Math.random() * 0.1, // ~30 degrees downward
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    };

    // Nebula glow points
    const nebulas = [
      { x: 0.3, y: 0.25, r: 150, color: "rgba(198, 167, 94, 0.06)" },
      { x: 0.75, y: 0.15, r: 200, color: "rgba(92, 111, 142, 0.05)" }
    ];

    let duneScroll = 0;

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

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Desert Night Sky (Gradient)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#080C14"); // Dark obsidian night
      skyGrad.addColorStop(0.5, "#0D1527");
      skyGrad.addColorStop(0.85, "#172237"); // Soft amber horizon edge
      skyGrad.addColorStop(1, "#1e293b");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw Soft Nebula Glows
      nebulas.forEach((neb) => {
        const nx = neb.x * w;
        const ny = neb.y * h;
        const radGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.r);
        radGrad.addColorStop(0, neb.color);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      });

      // 3. Draw Constellation Network
      ctx.strokeStyle = "rgba(198, 167, 94, 0.05)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      for (let i = 0; i < starCount; i += 4) {
        if (i + 2 < starCount) {
          ctx.moveTo(stars[i].x * w, stars[i].y * h);
          ctx.lineTo(stars[i + 1].x * w, stars[i + 1].y * h);
          ctx.lineTo(stars[i + 2].x * w, stars[i + 2].y * h);
        }
      }
      ctx.stroke();

      // 4. Update and Draw Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.pulseSpeed * 65) * 0.35;
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = Math.max(0.1, star.alpha + twinkle);
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add tiny gold halos to key stars
        if (star.size > 1.8) {
          ctx.fillStyle = "#C6A75E";
          ctx.globalAlpha = (star.alpha + twinkle) * 0.3;
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0; // reset

      // 5. Update and Draw Shooting Stars (Meteors)
      if (Math.random() < 0.015) addMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > w || m.y > h) {
          meteors.splice(i, 1);
          continue;
        }

        const endX = m.x - Math.cos(m.angle) * m.length;
        const endY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.life})`);
        meteorGrad.addColorStop(0.3, `rgba(198, 167, 94, ${m.life * 0.7})`);
        meteorGrad.addColorStop(1, "rgba(198, 167, 94, 0)");

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 6. Draw distant Riyadh Skyline Silhouettes (Olaya District)
      const skylineY = h * 0.7;
      ctx.fillStyle = "#0c1322"; // Very deep navy silhouette
      
      // Secondary minor buildings
      ctx.fillRect(w * 0.1, skylineY - 30, 25, 30);
      ctx.fillRect(w * 0.15, skylineY - 45, 18, 45);
      ctx.fillRect(w * 0.45, skylineY - 35, 30, 35);
      ctx.fillRect(w * 0.55, skylineY - 50, 20, 50);
      ctx.fillRect(w * 0.82, skylineY - 40, 22, 40);

      // Al Faisaliyah Tower (Pointed spire)
      const fX = w * 0.28;
      ctx.beginPath();
      ctx.moveTo(fX - 18, skylineY);
      ctx.lineTo(fX, skylineY - 100);
      ctx.lineTo(fX + 18, skylineY);
      ctx.closePath();
      ctx.fill();
      
      // Golden sphere glow on Al Faisaliyah
      ctx.fillStyle = "#C6A75E";
      ctx.beginPath();
      ctx.arc(fX, skylineY - 80, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Kingdom Centre (Stylized iconic gap tower)
      const kX = w * 0.65;
      ctx.fillStyle = "#0c1322";
      ctx.beginPath();
      ctx.moveTo(kX - 25, skylineY);
      ctx.lineTo(kX - 15, skylineY - 120);
      ctx.quadraticCurveTo(kX, skylineY - 75, kX + 15, skylineY - 120);
      ctx.lineTo(kX + 25, skylineY);
      ctx.closePath();
      ctx.fill();

      // Kingdom Centre curved arch window glow
      ctx.strokeStyle = "rgba(198, 167, 94, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(kX, skylineY - 96, 7, 0, Math.PI, true);
      ctx.stroke();

      // Window Light Grids inside skyscrapers (Subtle luxury detail)
      ctx.fillStyle = "rgba(198, 167, 94, 0.22)";
      // Building 1 windows
      for (let col = 0; col < 2; col++) {
        for (let row = 0; row < 5; row++) {
          if (Math.sin(row + time * 0.8) > 0) {
            ctx.fillRect(w * 0.16 + col * 6, skylineY - 40 + row * 6, 3, 3);
          }
        }
      }
      // Building 2 windows
      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 6; row++) {
          if (Math.cos(col + row - time * 0.5) > -0.2) {
            ctx.fillRect(w * 0.56 + col * 5, skylineY - 45 + row * 6, 2, 2);
          }
        }
      }

      // 7. Update Dunes Parallax Scroll
      const speedMult = isHovered.current ? 2.5 : 1.0;
      duneScroll += 0.4 * speedMult;

      // Parallax Layer 1: Distant Dunes (Slowest, deep indigo)
      ctx.fillStyle = "#0e1627";
      drawDuneCurve(ctx, w, h, duneScroll * 0.2, skylineY - 8, skylineY + 5, 0.35, 0.75);

      // Parallax Layer 2: Mid-ground Dunes (Medium, deep teal/navy)
      ctx.fillStyle = "#121C30";
      drawDuneCurve(ctx, w, h, duneScroll * 0.5, skylineY - 3, skylineY + 12, 0.25, 0.6);

      // Parallax Layer 3: Foreground Dunes (Fastest, blends into road)
      ctx.fillStyle = "#17233B";
      drawDuneCurve(ctx, w, h, duneScroll * 1.0, skylineY + 2, skylineY + 18, 0.45, 0.8);

      // 8. Draw Highway / Road
      ctx.fillStyle = "#1E2B47"; // Asphalt color
      ctx.fillRect(0, skylineY + 18, w, h - (skylineY + 18));
      
      // Road shoulder lines
      ctx.strokeStyle = "rgba(198, 167, 94, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, skylineY + 20);
      ctx.lineTo(w, skylineY + 20);
      ctx.stroke();

      // Dashboard/highway divider markers (moving dashed line)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([18, 15]);
      ctx.lineDashOffset = (duneScroll * 3.5) % 33;
      ctx.beginPath();
      ctx.moveTo(0, skylineY + 45);
      ctx.lineTo(w, skylineY + 45);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // 9. Draw Highly Detailed Convoys
      const convoyBaseX = w * 0.18;
      const bounce1 = Math.sin(time * 11 * speedMult) * 0.5;
      const bounce2 = Math.cos(time * 9 * speedMult) * 0.4;

      // Draw Trailer 2 (Back)
      drawSemiTruck(ctx, convoyBaseX, skylineY + 14 + bounce2, "#5C6F8E", false, speedMult);

      // Draw Trailer 1 (Lead, ahead)
      drawSemiTruck(ctx, convoyBaseX + 160, skylineY + 14 + bounce1, "#C6A75E", true, speedMult);

      // 10. Route Label Overlay
      ctx.fillStyle = "#F8FAFC";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("BATHA TRANS-GCC HIGHWAY CORRIDOR", w * 0.5, h - 18);
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

  // Helper to draw clean bezier dunes
  const drawDuneCurve = (ctx, w, h, scroll, minY, maxY, bias1, bias2) => {
    const s = scroll % w;
    for (let offset = -1; offset <= 1; offset++) {
      const startX = -s + offset * w;
      ctx.beginPath();
      ctx.moveTo(startX, h);
      ctx.lineTo(startX, minY);
      ctx.quadraticCurveTo(
        startX + w * bias1, minY - 18,
        startX + w * bias2, maxY
      );
      ctx.quadraticCurveTo(
        startX + w * (bias2 + 0.18), maxY + 8,
        startX + w, minY
      );
      ctx.lineTo(startX + w, h);
      ctx.closePath();
      ctx.fill();
    }
  };

  // Helper to draw a realistic detailed 2D Semi Truck
  const drawSemiTruck = (ctx, tx, ty, containerColor, hasHeadlights, speedMult) => {
    const cabColor = "#0A0F1D"; // Sleek dark metallic cab
    
    // Volumetric Headlights (Screen composite blend)
    if (hasHeadlights) {
      const beamStart = tx + 104;
      const beamEnd = tx + 240;
      const beamY = ty + 18;

      const beamGrad = ctx.createLinearGradient(beamStart, beamY, beamEnd, beamY);
      beamGrad.addColorStop(0, "rgba(255, 248, 220, 0.45)"); // Soft warm yellow
      beamGrad.addColorStop(0.3, "rgba(198, 167, 94, 0.22)");
      beamGrad.addColorStop(1, "rgba(198, 167, 94, 0)");
      
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(beamStart, beamY - 3);
      ctx.lineTo(beamEnd, beamY - 16);
      ctx.lineTo(beamEnd, beamY + 28);
      ctx.lineTo(beamStart, beamY + 5);
      ctx.closePath();
      ctx.fill();
    }

    // Trailer Chassis / Wheels Guard
    ctx.fillStyle = "#2D3748";
    ctx.fillRect(tx + 8, ty + 20, 78, 3); // Metal guard
    ctx.fillRect(tx + 90, ty + 21, 14, 2); // Cab link

    // Rear Wheels (3 sets of dual wheels on trailer)
    ctx.fillStyle = "#090D16";
    const drawTire = (wx, wy) => {
      ctx.beginPath();
      ctx.arc(wx, wy, 6.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4A5568"; // Hub cap
      ctx.beginPath();
      ctx.arc(wx, wy, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#090D16"; // reset
    };
    drawTire(tx + 20, ty + 23);
    drawTire(tx + 32, ty + 23);
    drawTire(tx + 76, ty + 23);
    // Cab wheels
    drawTire(tx + 94, ty + 23);
    drawTire(tx + 106, ty + 23);

    // Main Cargo Container (realistic styling with metallic lines)
    ctx.fillStyle = containerColor;
    ctx.fillRect(tx + 10, ty - 12, 76, 31);
    
    // Container outline & shadow
    ctx.strokeStyle = "rgba(10, 15, 29, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(tx + 10, ty - 12, 76, 31);

    // Metal structural rib lines on cargo container
    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.lineWidth = 1.0;
    for (let rx = tx + 16; rx < tx + 84; rx += 7) {
      ctx.beginPath();
      ctx.moveTo(rx, ty - 10);
      ctx.lineTo(rx, ty + 17);
      ctx.stroke();
    }

    // Cab Nose/Body (Left to right driving direction: tx+90 to tx+112)
    ctx.fillStyle = cabColor;
    ctx.beginPath();
    ctx.moveTo(tx + 88, ty + 21);
    ctx.lineTo(tx + 88, ty - 8); // back of cabin tower
    ctx.lineTo(tx + 104, ty - 8); // roof
    ctx.lineTo(tx + 110, ty + 6); // sloping windshield
    ctx.lineTo(tx + 114, ty + 8); // hood nose
    ctx.lineTo(tx + 114, ty + 21);
    ctx.closePath();
    ctx.fill();

    // Windshield window (Glowing cyan/yellow)
    ctx.fillStyle = "rgba(198, 167, 94, 0.55)";
    ctx.beginPath();
    ctx.moveTo(tx + 102, ty - 4);
    ctx.lineTo(tx + 107, ty + 6);
    ctx.lineTo(tx + 99, ty + 6);
    ctx.lineTo(tx + 97, ty - 4);
    ctx.closePath();
    ctx.fill();

    // Cab grill bumper
    ctx.fillStyle = "#718096"; // Silver bumper
    ctx.fillRect(tx + 113, ty + 14, 2.5, 7);

    // Tiny Exhaust stack smoke particles
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    const exhaustX = tx + 90;
    const exhaustY = ty - 8;
    // draw small exhaust pipe
    ctx.strokeStyle = "#4A5568";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(exhaustX, ty + 6);
    ctx.lineTo(exhaustX, exhaustY);
    ctx.stroke();

    // small puffs of exhaust smoke
    for (let p = 0; p < 3; p++) {
      const smokeOffset = (ty + p * 8) % 15;
      ctx.beginPath();
      ctx.arc(exhaustX - smokeOffset * 0.4, exhaustY - smokeOffset * 0.8, 2.0 + smokeOffset * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
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
        <div>DESK: RIYADH HUBS</div>
        <div>SYSTEM: ACTIVE // FASAH CONVOY: VERIFIED</div>
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
