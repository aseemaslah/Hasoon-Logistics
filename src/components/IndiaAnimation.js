"use client";

import React, { useEffect, useRef } from "react";

export default function IndiaAnimation() {
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

    // Loading Crane State Machine variables
    let craneTrolleyX = 140;
    let craneHookY = 160;
    let containerLoaded = true;
    let loadStage = 0; // 0: crane lowers to train, 1: picks container, 2: lifts container, 3: slides to ship, 4: lowers to ship, 5: drops, 6: lifts hook, 7: slides back
    let activeContainerColor = "#C6A75E";
    const containerColors = ["#C6A75E", "#5C6F8E", "#1F2A44"];

    let trainX = -220;

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
      const scrollSpeed = typeof window !== "undefined" && window.scrollVelocity && !isNaN(window.scrollVelocity) ? Math.min(window.scrollVelocity, 4.0) : 0;
      const speedMult = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);
      time += 0.015 * speedMult;
      animationFrameId = requestAnimationFrame(animate);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Seaport Water background (Top Section)
      const waterHeight = h * 0.38;
      
      // Sea blue base gradient
      const seaGrad = ctx.createLinearGradient(0, 0, 0, waterHeight);
      seaGrad.addColorStop(0, "#0F1A2E");
      seaGrad.addColorStop(0.7, "#1D3252");
      seaGrad.addColorStop(1, "#263D61");
      ctx.fillStyle = seaGrad;
      ctx.fillRect(0, 0, w, waterHeight);

      // Animated Water Waves & Wave Foam
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      const waveSpeed = time * 2;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const amplitude = 3.5 + wave * 1.5;
        const frequency = 0.015 - wave * 0.003;
        const phase = waveSpeed * (1.0 + wave * 0.5);
        const waveOffset = waterHeight - 25 + wave * 8;
        
        ctx.moveTo(0, h);
        ctx.lineTo(0, waveOffset);
        for (let x = 0; x <= w; x += 15) {
          const y = waveOffset + Math.sin(x * frequency + phase) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      }

      // Concrete Dock edge line (Beige-Gold)
      ctx.fillStyle = "#E8DCC8";
      ctx.fillRect(0, waterHeight, w, 8);
      ctx.fillStyle = "rgba(198, 167, 94, 0.45)"; // Gold under-shadow
      ctx.fillRect(0, waterHeight + 8, w, 2.5);

      // Draw Bollards along the pier
      ctx.fillStyle = "#718096";
      for (let bx = 30; bx < w; bx += 85) {
        ctx.fillRect(bx, waterHeight - 5, 8, 5);
        ctx.beginPath();
        ctx.arc(bx + 4, waterHeight - 5, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Docked Container Ship (Top Right)
      const shipX = w - 190;
      const shipY = waterHeight - 24;

      // Draw exhaust puff smoke clouds
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      const smokeOffset = (time * 12) % 30;
      ctx.beginPath();
      ctx.arc(shipX + 45, shipY - 45 - smokeOffset * 0.5, 3 + smokeOffset * 0.3, 0, Math.PI * 2);
      ctx.arc(shipX + 41 - smokeOffset * 0.2, shipY - 55 - smokeOffset * 0.8, 5 + smokeOffset * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Ship Hull (Black and Red industrial coloring)
      ctx.fillStyle = "#B83232"; // Red bottom paint
      ctx.beginPath();
      ctx.moveTo(shipX, shipY + 15);
      ctx.lineTo(shipX + 160, shipY + 15);
      ctx.lineTo(shipX + 155, shipY + 7);
      ctx.lineTo(shipX + 5, shipY + 7);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#1A202C"; // Black top hull
      ctx.beginPath();
      ctx.moveTo(shipX + 5, shipY + 7);
      ctx.lineTo(shipX + 155, shipY + 7);
      ctx.lineTo(shipX + 145, shipY - 14);
      ctx.lineTo(shipX + 15, shipY - 14);
      ctx.closePath();
      ctx.fill();

      // Ship Bridge superstructure (Cabin / Towers)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(shipX + 30, shipY - 35, 25, 21);
      ctx.fillStyle = "#E2E8F0";
      ctx.fillRect(shipX + 33, shipY - 45, 18, 10);
      
      // Radar antenna stack (Gold spinning radar beam)
      ctx.strokeStyle = "#4A5568";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(shipX + 42, shipY - 45);
      ctx.lineTo(shipX + 42, shipY - 52);
      ctx.stroke();

      // Spinning radar bar
      const radarAngle = time * 5;
      ctx.strokeStyle = "#C6A75E";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shipX + 42 - Math.cos(radarAngle) * 8, shipY - 52 - Math.sin(radarAngle) * 2);
      ctx.lineTo(shipX + 42 + Math.cos(radarAngle) * 8, shipY - 52 + Math.sin(radarAngle) * 2);
      ctx.stroke();

      // Glowing cabin window
      ctx.fillStyle = "rgba(198, 167, 94, 0.9)";
      ctx.fillRect(shipX + 36, Math.floor(shipY - 42), 5, 4);

      // Deck Cargo Containers Stack on Ship
      const drawCargoOnShip = (cx, cy, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(cx, cy, 28, 12);
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.lineWidth = 0.75;
        ctx.strokeRect(cx, cy, 28, 12);
        // Container rib highlights
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        for (let rx = cx + 4; rx < cx + 28; rx += 5) {
          ctx.beginPath();
          ctx.moveTo(rx, cy + 1);
          ctx.lineTo(rx, cy + 11);
          ctx.stroke();
        }
      };
      
      // Base layer on ship deck
      drawCargoOnShip(shipX + 65, shipY - 26, "#1F2A44");
      drawCargoOnShip(shipX + 96, shipY - 26, "#5C6F8E");
      drawCargoOnShip(shipX + 127, shipY - 26, "#C6A75E");
      // Second layer
      drawCargoOnShip(shipX + 80, shipY - 38, "#5C6F8E");
      drawCargoOnShip(shipX + 111, shipY - 38, "#1F2A44");

      // 3. Draw Train Tracks (Bottom Zone)
      const tracksY = h * 0.78;
      ctx.strokeStyle = "rgba(74, 85, 104, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, tracksY);
      ctx.lineTo(w, tracksY);
      ctx.moveTo(0, tracksY + 8);
      ctx.lineTo(w, tracksY + 8);
      ctx.stroke();

      // Rail ties
      ctx.strokeStyle = "rgba(45, 55, 72, 0.22)";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let tx = 0; tx < w; tx += 14) {
        ctx.moveTo(tx, tracksY - 2);
        ctx.lineTo(tx, tracksY + 10);
      }
      ctx.stroke();

      // 4. Update & Draw Cargo Train
      const trainSpeed = (isHovered.current ? 3.0 : 1.3) * (1.0 + scrollSpeed * 1.5);
      trainX += trainSpeed;
      if (trainX > w) {
        trainX = -320;
      }

      // Draw Engine locomotive
      const ex = trainX + 220;
      ctx.fillStyle = "#1A202C"; // Industrial black chassis
      ctx.fillRect(ex, tracksY - 5, 55, 6);
      
      // Engine Cab body (Teal-blue design)
      ctx.fillStyle = "#1F2A44";
      ctx.fillRect(ex + 10, tracksY - 24, 42, 20); // nose cab
      ctx.fillRect(ex + 36, tracksY - 32, 14, 9);  // driver tower
      
      // Cab window grid
      ctx.fillStyle = "rgba(198, 167, 94, 0.8)";
      ctx.fillRect(ex + 42, tracksY - 29, 6, 5);

      // Yellow headlight beam
      const lightGrad = ctx.createLinearGradient(ex + 52, tracksY - 14, ex + 130, tracksY - 14);
      lightGrad.addColorStop(0, "rgba(255, 248, 220, 0.4)");
      lightGrad.addColorStop(1, "rgba(255, 248, 220, 0)");
      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.moveTo(ex + 52, tracksY - 16);
      ctx.lineTo(ex + 130, tracksY - 26);
      ctx.lineTo(ex + 130, tracksY + 6);
      ctx.lineTo(ex + 52, tracksY - 10);
      ctx.closePath();
      ctx.fill();

      // Engine wheels
      ctx.fillStyle = "#0D1117";
      for (let wx = 0; wx < 4; wx++) {
        ctx.beginPath();
        ctx.arc(ex + 8 + wx * 13, tracksY + 3, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#718096";
        ctx.beginPath();
        ctx.arc(ex + 8 + wx * 13, tracksY + 3, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#0D1117";
      }

      // Flatbed Wagons carrying containers (2 wagons)
      for (let i = 0; i < 2; i++) {
        const flatX = trainX + i * 100 + 10;
        
        // Wagon frame & wheels
        ctx.fillStyle = "#2D3748";
        ctx.fillRect(flatX, tracksY - 5, 90, 5);
        ctx.fillStyle = "#0D1117";
        ctx.beginPath();
        ctx.arc(flatX + 16, tracksY + 3, 5, 0, Math.PI * 2);
        ctx.arc(flatX + 28, tracksY + 3, 5, 0, Math.PI * 2);
        ctx.arc(flatX + 62, tracksY + 3, 5, 0, Math.PI * 2);
        ctx.arc(flatX + 74, tracksY + 3, 5, 0, Math.PI * 2);
        ctx.fill();

        // Containers
        const col = containerColors[i];
        
        // Let's hide the container on wagon index 1 if it is currently being picked by the crane!
        const containerPickedFromTrain = (loadStage >= 1 && loadStage <= 3 && i === 1);
        if (!containerPickedFromTrain) {
          ctx.fillStyle = col;
          ctx.fillRect(flatX + 12, tracksY - 26, 66, 21);
          ctx.strokeStyle = "rgba(0,0,0,0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(flatX + 12, tracksY - 26, 66, 21);

          // Rib details
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          for (let rx = flatX + 18; rx < flatX + 76; rx += 7) {
            ctx.beginPath();
            ctx.moveTo(rx, tracksY - 24);
            ctx.lineTo(rx, tracksY - 7);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Port Gantry Crane Structure (Realistic Truss Lattice)
      const craneX = w * 0.42;
      const craneY = waterHeight;
      const craneHeight = 110;
      
      // Steel structure legs
      ctx.strokeStyle = "#4A5568";
      ctx.lineWidth = 3.5;
      
      // Draw gantry legs
      ctx.beginPath();
      // Back legs
      ctx.moveTo(craneX - 35, tracksY - 5);
      ctx.lineTo(craneX - 12, craneY);
      // Front legs
      ctx.moveTo(craneX + 55, tracksY - 5);
      ctx.lineTo(craneX + 32, craneY);
      ctx.stroke();

      // Cross trusses (Lattice lines)
      ctx.strokeStyle = "rgba(74, 85, 104, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Back leg diagonals
      ctx.moveTo(craneX - 35, tracksY - 5);
      ctx.lineTo(craneX - 22, craneY + 50);
      ctx.lineTo(craneX - 23, craneY + 50);
      ctx.lineTo(craneX - 12, craneY);
      // Front leg diagonals
      ctx.moveTo(craneX + 55, tracksY - 5);
      ctx.lineTo(craneX + 42, craneY + 50);
      ctx.lineTo(craneX + 43, craneY + 50);
      ctx.lineTo(craneX + 32, craneY);
      ctx.stroke();

      // Top horizontal Gantry beam (spans train to ship)
      const beamY = craneY - 65;
      ctx.strokeStyle = "#1A202C";
      ctx.lineWidth = 5.5;
      ctx.beginPath();
      ctx.moveTo(craneX - 85, beamY);
      ctx.lineTo(craneX + 175, beamY);
      ctx.stroke();

      // Diagonal structural brace support for the beam extension
      ctx.strokeStyle = "#4A5568";
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(craneX + 32, craneY);
      ctx.lineTo(craneX + 105, beamY);
      ctx.stroke();

      // 6. Port Crane Loading State Machine Logic
      const trainPickupX = trainX + 110 + 45; // center of wagon 1 container spot
      const shipDropX = shipX + 78;
      const shipDropY = shipY - 52; // container height offset

      const craneTrolleySpeed = 1.8 * speedMult;
      const craneHookSpeed = 1.5 * speedMult;
      const trolleySlideSpeed = 2.0 * speedMult;
      const trolleySlideBackSpeed = 2.2 * speedMult;

      switch (loadStage) {
        case 0: // Lower hook to pick container from train wagon 1
          if (trainX >= 0 && trainX <= 140) { // wait for train to align
            if (craneTrolleyX > trainPickupX) craneTrolleyX -= craneTrolleySpeed;
            else if (craneTrolleyX < trainPickupX) craneTrolleyX += craneTrolleySpeed;
            
            // Lower hook
            if (Math.abs(craneTrolleyX - trainPickupX) < 6) {
              if (craneHookY < tracksY - 26) {
                craneHookY += craneHookSpeed;
              } else {
                loadStage = 1;
              }
            }
          }
          break;
        case 1: // Pick container
          activeContainerColor = containerColors[Math.floor(time * 0.4) % containerColors.length];
          loadStage = 2;
          break;
        case 2: // Lift container
          if (craneHookY > beamY + 15) {
            craneHookY -= craneHookSpeed;
          } else {
            loadStage = 3;
          }
          break;
        case 3: // Slide trolley horizontally towards the docked container ship
          if (craneTrolleyX < shipDropX) {
            craneTrolleyX += trolleySlideSpeed;
          } else {
            loadStage = 4;
          }
          break;
        case 4: // Lower container onto ship stack
          if (craneHookY < shipDropY) {
            craneHookY += craneHookSpeed;
          } else {
            loadStage = 5;
          }
          break;
        case 5: // Detach container
          loadStage = 6;
          break;
        case 6: // Lift hook back up
          if (craneHookY > beamY + 15) {
            craneHookY -= craneHookSpeed;
          } else {
            loadStage = 7;
          }
          break;
        case 7: // Slide crane trolley back to initial harbor zone
          if (craneTrolleyX > craneX) {
            craneTrolleyX -= trolleySlideBackSpeed;
          } else {
            loadStage = 0; // restart cycle
          }
          break;
      }

      // Draw Trolley block on horizontal beam
      ctx.fillStyle = "#1A202C";
      ctx.fillRect(craneTrolleyX - 14, beamY - 4, 28, 8);

      // Pulley Cable lines
      ctx.strokeStyle = "#2D3748";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(craneTrolleyX - 6, beamY + 4);
      ctx.lineTo(craneTrolleyX - 6, craneHookY);
      ctx.moveTo(craneTrolleyX + 6, beamY + 4);
      ctx.lineTo(craneTrolleyX + 6, craneHookY);
      ctx.stroke();

      // Steel Spreader hook frame
      ctx.fillStyle = "#4A5568";
      ctx.fillRect(craneTrolleyX - 16, craneHookY - 2, 32, 4);

      // Animated Cargo Container carried by Gantry Crane
      const containerCarried = (loadStage >= 2 && loadStage <= 4);
      if (containerCarried) {
        ctx.fillStyle = activeContainerColor;
        ctx.fillRect(craneTrolleyX - 18, craneHookY + 2, 36, 13);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 0.75;
        ctx.strokeRect(craneTrolleyX - 18, craneHookY + 2, 36, 13);

        // Ribs
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        for (let rx = craneTrolleyX - 14; rx < craneTrolleyX + 16; rx += 5) {
          ctx.beginPath();
          ctx.moveTo(rx, craneHookY + 3);
          ctx.lineTo(rx, craneHookY + 13);
          ctx.stroke();
        }
      }

      // Terminal Labels
      ctx.fillStyle = "#1F2A44";
      ctx.font = "bold 9px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("JNPT NHAVA SHEVA PORT OPERATIONS", w * 0.5, h - 18);
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
        <div>DESK: NHAVA SHEVA</div>
        <div>RAIL LINK: SYNCED // MULTI-MODAL: ON-TIME</div>
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
