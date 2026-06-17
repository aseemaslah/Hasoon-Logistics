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

    // Train and Crane positions
    let trainX = -200;
    let craneArmX = 160;
    let containerLoadProgress = 0;
    let loadStage = 0; // 0: crane goes down, 1: crane lifts up, 2: crane moves to ship, 3: crane drops, 4: crane returns
    let blockY = 220;
    let blockX = 160;

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
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Seaport Water background (Top Section)
      const waterY = 110;
      ctx.fillStyle = "rgba(31, 42, 68, 0.05)";
      ctx.fillRect(0, 0, w, waterY);
      ctx.fillStyle = "rgba(198, 167, 94, 0.1)";
      ctx.fillRect(0, waterY, w, 6); // Coast dock line

      // Draw Dock Bollards
      ctx.fillStyle = "#5C6F8E";
      for (let bx = 30; bx < w; bx += 80) {
        ctx.fillRect(bx, waterY - 4, 8, 4);
      }

      // Draw Docked Cargo Ship (Top Right)
      const shipX = w - 180;
      const shipY = waterY - 30;
      
      // Hull
      ctx.fillStyle = "#1F2A44";
      ctx.beginPath();
      ctx.moveTo(shipX, shipY + 20);
      ctx.lineTo(shipX + 150, shipY + 20);
      ctx.lineTo(shipX + 135, shipY - 5);
      ctx.lineTo(shipX + 15, shipY - 5);
      ctx.closePath();
      ctx.fill();

      // Ship Cabin
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(shipX + 25, shipY - 20, 20, 15);
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(shipX + 45, shipY - 10, 4, 3); // Window

      // Draw train tracks (Bottom Section)
      const tracksY = 240;
      ctx.strokeStyle = "rgba(92, 111, 142, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, tracksY);
      ctx.lineTo(w, tracksY);
      ctx.moveTo(0, tracksY + 8);
      ctx.lineTo(w, tracksY + 8);
      ctx.stroke();

      // Track Ties (Ties lines)
      ctx.strokeStyle = "rgba(31, 42, 68, 0.15)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let tx = 0; tx < w; tx += 15) {
        ctx.moveTo(tx, tracksY - 2);
        ctx.lineTo(tx, tracksY + 10);
      }
      ctx.stroke();

      // Update & Draw Cargo Train
      const trainSpeed = isHovered.current ? 3.0 : 1.2;
      trainX += trainSpeed;
      if (trainX > w) {
        trainX = -320;
      }

      // Draw Train Engine
      ctx.fillStyle = "#1F2A44";
      ctx.fillRect(trainX + 220, tracksY - 22, 45, 20); // main cab
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(trainX + 255, tracksY - 15, 8, 8);  // window
      ctx.fillStyle = "#5C6F8E";
      ctx.fillRect(trainX + 215, tracksY - 10, 5, 8);  // bumper
      
      // Train Wheels
      ctx.fillStyle = "#111827";
      for (let wx = 0; wx < 5; wx++) {
        ctx.beginPath();
        ctx.arc(trainX + 225 + wx * 9, tracksY + 2, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cargo flatbeds & containers (3 wagons)
      const containerColors = ["#C6A75E", "#5C6F8E", "#1F2A44"];
      for (let i = 0; i < 3; i++) {
        const flatX = trainX + i * 70;
        // Flatbed frame
        ctx.fillStyle = "#374151";
        ctx.fillRect(flatX, tracksY - 5, 65, 5);

        // Container box
        ctx.fillStyle = containerColors[i];
        ctx.fillRect(flatX + 5, tracksY - 25, 55, 20);

        // Rib details on container
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        for (let rx = flatX + 10; rx < flatX + 60; rx += 8) {
          ctx.beginPath();
          ctx.moveTo(rx, tracksY - 23);
          ctx.lineTo(rx, tracksY - 7);
          ctx.stroke();
        }

        // Wagon Wheels
        ctx.fillStyle = "#111827";
        ctx.beginPath();
        ctx.arc(flatX + 15, tracksY + 2, 5, 0, Math.PI * 2);
        ctx.arc(flatX + 50, tracksY + 2, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Port Gantry Crane (Loading mechanism)
      const craneAnchorX = w * 0.45;
      const craneAnchorY = waterY;
      
      // Crane legs structure
      ctx.strokeStyle = "#5C6F8E";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(craneAnchorX - 30, tracksY - 5);
      ctx.lineTo(craneAnchorX - 10, craneAnchorY);
      ctx.lineTo(craneAnchorX + 50, craneAnchorY);
      ctx.lineTo(craneAnchorX + 70, tracksY - 5);
      ctx.stroke();

      // Top Gantry Beam (Extended from train space up to the docked ship)
      const beamY = craneAnchorY - 70;
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(craneAnchorX - 80, beamY);
      ctx.lineTo(craneAnchorX + 160, beamY);
      ctx.stroke();

      // Update Crane loading state machine
      const cargoDestX = shipX + 60;
      const cargoDestY = shipY + 5;

      switch (loadStage) {
        case 0: // Crane goes down to pick container block
          if (blockY < tracksY - 25) {
            blockY += 1.5;
          } else {
            loadStage = 1;
          }
          break;
        case 1: // Crane lifts container block
          if (blockY > beamY + 12) {
            blockY -= 1.5;
          } else {
            loadStage = 2;
          }
          break;
        case 2: // Crane moves along the gantry beam towards the docked ship
          if (blockX < cargoDestX) {
            blockX += 2.0;
          } else {
            loadStage = 3;
          }
          break;
        case 3: // Crane lowers container down to ship deck
          if (blockY < cargoDestY) {
            blockY += 1.5;
          } else {
            loadStage = 4;
          }
          break;
        case 4: // Crane trolley returns to start coordinates
          if (blockX > craneAnchorX - 20) {
            blockX -= 2.5;
            blockY = beamY + 15; // lifted state
          } else {
            blockY = beamY + 15;
            loadStage = 0; // reset loop
          }
          break;
      }

      // Crane trolley & pulley cable
      const trolleyX = blockX;
      ctx.fillStyle = "#C6A75E";
      ctx.fillRect(trolleyX - 12, beamY - 4, 24, 8); // trolley

      // Cable line
      ctx.strokeStyle = "#1F2A44";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(trolleyX, beamY + 4);
      ctx.lineTo(trolleyX, blockY);
      ctx.stroke();

      // Spreader container block (The loading container)
      if (loadStage !== 4) {
        ctx.fillStyle = "#C6A75E";
        ctx.fillRect(blockX - 18, blockY, 36, 14);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.strokeRect(blockX - 18, blockY, 36, 14);
      }

      // Terminal Labels
      ctx.fillStyle = "#1F2A44";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("JNPT NHAVA SHEVA RAIL LINK", w * 0.5, tracksY + 28);
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
