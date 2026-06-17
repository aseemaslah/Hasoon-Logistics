"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
// 1. Interactive Stylized 2D Container Truck Component
function InteractiveTruck() {
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


// 2. Reusable Animated Stat Counter
function StatCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let observer;
    let timer;
    const currentRef = elementRef.current;

    if (currentRef) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let start = 0;
              const end = target;
              const duration = 2000;
              const stepTime = Math.max(Math.floor(duration / end), 15);

              timer = setInterval(() => {
                start += Math.ceil(end / (duration / stepTime));
                if (start >= end) {
                  setCount(end);
                  clearInterval(timer);
                } else {
                  setCount(start);
                }
              }, stepTime);

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(currentRef);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
      if (timer) clearInterval(timer);
    };
  }, [target]);

  return (
    <div ref={elementRef} className="stat-number">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// 3. WebGL Interactive Stylized 3D Cargo Ship Component (Full Width / Background Responsive)
function InteractiveShip() {
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 550;

    // Responsive offset: X=75 on desktop, X=0 on mobile (centered)
    let isMobile = width < 1024;
    let shipOffsetX = isMobile ? 0 : 75;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // Keep camera centered at 0, 0, 0 so ship offset pushes it to the right
    camera.position.set(130, 90, 240);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.85);
    mainLight.position.set(150, 200, 100);
    scene.add(mainLight);

    const goldLight = new THREE.DirectionalLight(0xC6A75E, 0.6);
    goldLight.position.set(-150, -50, -100);
    scene.add(goldLight);

    // Grid Water Plane / Sea Grid (Covers whole background)
    const gridSize = 500;
    const gridDivisions = 45;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xC6A75E, 0x5C6F8E);
    gridHelper.position.y = -8.5;
    gridHelper.material.opacity = 0.22;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Ship Group (Offset to the right on desktop, centered on mobile)
    const shipGroup = new THREE.Group();
    shipGroup.position.set(shipOffsetX, 0, 0);
    scene.add(shipGroup);

    // Materials
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x1F2A44, // Luxury Navy
      roughness: 0.2,
      metalness: 0.8,
    });

    const deckMat = new THREE.MeshStandardMaterial({
      color: 0xE8DCC8, // Cream Deck
      roughness: 0.5,
    });

    const bridgeMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.1,
    });

    const windowMat = new THREE.MeshBasicMaterial({
      color: 0xC6A75E, // Glowing Gold Windows
      transparent: true,
      opacity: 0.95,
    });

    // 1. Hull Base (Center Section)
    const hullGeo = new THREE.BoxGeometry(160, 16, 36);
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.y = -2;
    shipGroup.add(hull);

    // 2. Stern (Rounded Back)
    const sternGeo = new THREE.CylinderGeometry(18, 18, 16, 16, 1, false, 0, Math.PI);
    const stern = new THREE.Mesh(sternGeo, hullMat);
    stern.position.set(-80, -2, 0);
    stern.rotation.x = Math.PI / 2;
    stern.rotation.z = Math.PI / 2;
    shipGroup.add(stern);

    // 3. Bow Segment (Pinching front)
    const bowGroup = new THREE.Group();
    const segments = 6;
    const segWidth = 5;
    for (let i = 0; i < segments; i++) {
      const d = 36 * (1 - i / segments);
      const segmentGeo = new THREE.BoxGeometry(segWidth, 16, d);
      const segment = new THREE.Mesh(segmentGeo, hullMat);
      segment.position.set(80 + i * segWidth + segWidth / 2, -2, 0);
      bowGroup.add(segment);
    }
    shipGroup.add(bowGroup);

    // 4. Deck Overlay
    const deckGeo = new THREE.BoxGeometry(150, 1.5, 34);
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.y = 6.2;
    shipGroup.add(deck);

    // 5. Command Bridge Structure (Back of the ship)
    const bridgeGroup = new THREE.Group();
    const towerGeo = new THREE.BoxGeometry(20, 22, 28);
    const tower = new THREE.Mesh(towerGeo, bridgeMat);
    tower.position.set(-50, 17, 0);
    bridgeGroup.add(tower);

    // Bridge roof canopy
    const canopyGeo = new THREE.BoxGeometry(24, 2, 32);
    const canopy = new THREE.Mesh(canopyGeo, deckMat);
    canopy.position.set(-50, 28, 0);
    bridgeGroup.add(canopy);

    // Glowing windows strip
    const winGeo = new THREE.BoxGeometry(16, 3, 29);
    const win = new THREE.Mesh(winGeo, windowMat);
    win.position.set(-48, 23, 0);
    bridgeGroup.add(win);

    shipGroup.add(bridgeGroup);

    // 6. Cargo Containers Stack
    const cargoGroup = new THREE.Group();
    const containerColors = [
      0xC6A75E, // Gold
      0x1F2A44, // Navy
      0xFFFFFF, // White
      0x5C6F8E, // Slate
    ];

    const containerLength = 18;
    const containerHeight = 11;
    const containerWidth = 10;

    const rowsX = [-20, 2, 24, 46, 68];
    const slotsZ = [-10, 0, 10];

    rowsX.forEach((x, rIdx) => {
      const stackHeight = 2 + (rIdx % 2);

      for (let zVal of slotsZ) {
        if (Math.random() > 0.85) continue;

        for (let yLevel = 0; yLevel < stackHeight; yLevel++) {
          const colorHex = containerColors[(rIdx + yLevel + Math.abs(zVal)) % containerColors.length];

          const boxMat = new THREE.MeshStandardMaterial({
            color: colorHex,
            roughness: 0.3,
            metalness: 0.5,
            transparent: true,
            opacity: 0.85,
          });

          const boxGeo = new THREE.BoxGeometry(containerLength - 1, containerHeight - 1, containerWidth - 1);
          const box = new THREE.Mesh(boxGeo, boxMat);

          box.position.set(
            x + (Math.random() - 0.5) * 0.4,
            6.5 + containerHeight / 2 + yLevel * containerHeight,
            zVal
          );

          const wireGeo = new THREE.EdgesGeometry(boxGeo);
          const wireMat = new THREE.LineBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.25,
          });
          const wire = new THREE.LineSegments(wireGeo, wireMat);
          box.add(wire);

          cargoGroup.add(box);
        }
      }
    });
    shipGroup.add(cargoGroup);

    // 7. Sea Foam / Wake Particle System (Local to shipGroup so it offsets automatically)
    const particleCount = 120;
    const particleGeo = new THREE.SphereGeometry(1.5, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.6,
    });

    const particlesGroup = new THREE.Group();
    const particlesArray = [];

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);

      const isWake = Math.random() > 0.4;
      let px, py, pz;

      if (isWake) {
        px = -90 - Math.random() * 150;
        py = -8;
        pz = (Math.random() - 0.5) * 20;
      } else {
        px = -80 + Math.random() * 160;
        py = -8;
        pz = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 10);
      }

      p.position.set(px, py, pz);

      particlesArray.push({
        mesh: p,
        speedX: -1.2 - Math.random() * 1.5,
        speedZ: (Math.random() - 0.5) * 0.4,
        initialX: px,
        initialZ: pz,
        life: Math.random(),
        scaleSpeed: 0.005 + Math.random() * 0.01,
      });

      particlesGroup.add(p);
    }
    shipGroup.add(particlesGroup);

    // Interactivity
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = { x: 0.003, y: 0 };
    const friction = 0.95;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      rotationSpeed.y = deltaMove.x * 0.002;
      rotationSpeed.x = deltaMove.y * 0.002;

      shipGroup.rotation.y += rotationSpeed.y;
      shipGroup.rotation.x += rotationSpeed.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;

      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };

      rotationSpeed.y = deltaMove.x * 0.003;
      rotationSpeed.x = deltaMove.y * 0.003;

      shipGroup.rotation.y += rotationSpeed.y;
      shipGroup.rotation.x += rotationSpeed.x;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Resize handles responsive offsets
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight || 550;
      camera.aspect = width / height;

      const newMobile = width < 1024;
      const newOffsetX = newMobile ? 0 : 75;

      shipGroup.position.x = newOffsetX;
      camera.position.x = 130;
      camera.lookAt(0, 0, 0);

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Wave motion loop
    let time = 0;
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.015;

      const speedMultiplier = isHovered.current ? 2.5 : 1.0;

      if (!isDragging) {
        rotationSpeed.y *= friction;
        rotationSpeed.x *= friction;

        shipGroup.rotation.y += rotationSpeed.y + 0.0015 * speedMultiplier;
        shipGroup.rotation.x = rotationSpeed.x + Math.sin(time) * 0.03;
        shipGroup.rotation.z = Math.cos(time * 0.8) * 0.02;
        shipGroup.position.y = Math.sin(time * 1.2) * 2.5;
      } else {
        shipGroup.position.y = 0;
      }

      particlesArray.forEach((p) => {
        p.mesh.position.x += p.speedX * speedMultiplier;
        p.mesh.position.z += p.speedZ * speedMultiplier;

        p.life += p.scaleSpeed * speedMultiplier;
        const scaleVal = Math.max(0, 1 - p.life);
        p.mesh.scale.set(scaleVal, scaleVal, scaleVal);
        p.mesh.material.opacity = scaleVal * 0.6;

        if (p.life >= 1.0) {
          p.life = 0;
          p.mesh.position.x = p.initialX;
          p.mesh.position.z = p.initialZ;
          p.mesh.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      if (container) {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "auto",
      }}
    />
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Contact form state bindings
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const canvasRef = useRef(null);

  // 1. Mount State
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // 2. Global Body Scroll Prevention
  useEffect(() => {
    if (privacyModalOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [privacyModalOpen, mobileMenuOpen]);

  // 3. Canvas Shader Background Animation + 3D Parallax particles
  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

  // 4. Shrink Header on Scroll & Track Active Navigation Section
  useEffect(() => {
    if (!mounted) return;

    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollY = window.pageYOffset;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // 5. Beveled 3D Button Mouse Move Tilt Trackers
  useEffect(() => {
    if (!mounted) return;

    const links = document.querySelectorAll(".nav-links a");

    const handleMouseMove = (e) => {
      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const rotateX = ((yc - y) / yc) * 15;
      const rotateY = ((x - xc) / xc) * 15;

      link.style.setProperty("--rx", `${rotateX}deg`);
      link.style.setProperty("--ry", `${rotateY}deg`);
    };

    const handleMouseLeave = (e) => {
      const link = e.currentTarget;
      link.style.setProperty("--rx", `0deg`);
      link.style.setProperty("--ry", `0deg`);
    };

    links.forEach((link) => {
      link.addEventListener("mousemove", handleMouseMove);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mousemove", handleMouseMove);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mounted, mobileMenuOpen]);

  // 6. Scroll Reveal Observer
  useEffect(() => {
    if (!mounted) return;

    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealElements.forEach((el) => {
        try {
          revealObserver.unobserve(el);
        } catch (e) {}
      });
    };
  }, [mounted]);

  // 7. Interactive Form Handler with Validation state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace("contact-", "");
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email formatting";
    }
    if (!formData.phone.trim()) newErrors.phone = "Direct phone is required";
    if (!formData.service) newErrors.service = "Select a capability";
    if (!formData.message.trim()) newErrors.message = "Requirements details are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setErrors({});
    setFormSubmitted(false);
  };

  // 8. WhatsApp Widget Trigger
  const handleWhatsAppClick = () => {
    const phoneNumber = "971501234567";
    const message = encodeURIComponent(
      "Hello Hasoon Logistics corporate desk, I am visiting your single page website and would like to request an enterprise quote."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating 3D Navbar Header */}
      <header className={scrolled ? "scrolled" : ""} id="site-header">
        <div className="container">
          <div className="nav-glass-bar">
            <a href="#home" className="logo" id="logo-link" style={{ padding: "0.25rem 0" }}>
              <Image
                src="/images/logo.png"
                alt="Hasoon Logistics Logo"
                width={170}
                height={36}
                style={{ objectFit: "contain", height: "auto" }}
                priority
              />
            </a>

            <nav aria-label="Main Navigation">
              <ul className="nav-links">
                <li className={activeSection === "home" ? "active" : ""}>
                  <a href="#home" id="nav-home">Home</a>
                </li>
                <li className={activeSection === "about" ? "active" : ""}>
                  <a href="#about" id="nav-about">About</a>
                </li>
                <li className={activeSection === "services" ? "active" : ""}>
                  <a href="#services" id="nav-services">Services</a>
                </li>
                <li className={activeSection === "mission-vision" ? "active" : ""}>
                  <a href="#mission-vision" id="nav-mission-vision">Our Mission</a>
                </li>
                <li className={activeSection === "contact" ? "active" : ""}>
                  <a href="#contact" id="nav-contact">Contact Us</a>
                </li>
              </ul>
            </nav>

            <div className="nav-socials">
              <a
                href="https://www.instagram.com/hasoonlogistics/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Hasoon Logistics Instagram"
                id="header-ig"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Hasoon Logistics WhatsApp"
                id="header-wa"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
                </svg>
              </a>
            </div>

            {/* Mobile Nav Hamburger Toggle */}
            <button
              className="mobile-nav-toggle"
              aria-label="Toggle Mobile Navigation"
              id="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(45deg) translate(4px, 4px)" }
                    : {}
                }
              ></span>
              <span style={mobileMenuOpen ? { opacity: 0 } : {}}></span>
              <span
                style={
                  mobileMenuOpen
                    ? { transform: "rotate(-45deg) translate(4px, -4px)" }
                    : {}
                }
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(31, 42, 68, 0.2)",
            backdropFilter: "blur(4px)",
            zIndex: 1040,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Mobile Menu Drawer Content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: mobileMenuOpen ? "0" : "-100%",
          width: "80%",
          maxWidth: "300px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(25px)",
          borderLeft: "1px solid var(--color-border-glass)",
          zIndex: 1050,
          padding: "6rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          transition: "right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-10px 0 30px rgba(31, 42, 68, 0.05)",
        }}
      >
        <ul className="mobile-nav-links">
          <li className={activeSection === "home" ? "active" : ""}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
          </li>
          <li className={activeSection === "about" ? "active" : ""}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </li>
          <li className={activeSection === "services" ? "active" : ""}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
          </li>
          <li className={activeSection === "mission-vision" ? "active" : ""}>
            <a href="#mission-vision" onClick={() => setMobileMenuOpen(false)}>
              Our Mission
            </a>
          </li>
          <li className={activeSection === "contact" ? "active" : ""}>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </a>
          </li>
        </ul>
        <div className="mobile-nav-socials">
          <a
            href="https://www.instagram.com/hasoonlogistics/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram Link"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="WhatsApp Link"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16-1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Dynamic Background Shader Canvas */}
      <canvas ref={canvasRef} id="shader-canvas"></canvas>

      <main>
        {/* Section 1: Hero Showcase (Restructured with full width sea grid backdrop) */}
        <section className="hero" id="home" aria-label="Hasoon Logistics Global Network Banner">
          {mounted && <InteractiveShip />}
          
          <div className="container hero-grid">
            <div className="hero-content scroll-reveal scroll-revealed">
              <span className="hero-subtitle">Intercontinental Precision</span>
              <h1>Engineered Supply Chains</h1>
              <p>
                Welcome to Hasoon Logistics. We establish global paths for security, compliance, and velocity. From specialized climate-controlled warehousing to express intercontinental cargo charters, we carry your assets with absolute care.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn-glass-3d" id="hero-btn-quote">
                  Request Private Quote
                </a>
                <a href="#services" className="btn-glass-3d btn-secondary" id="hero-btn-services">
                  Explore Services
                </a>
              </div>
            </div>

            {/* Spacer taking right column (desktop grid alignment) */}
            <div className="hero-spacer"></div>
          </div>
        </section>

        {/* Scrolling Capabilities Marquee */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[1, 2].map((loop) => (
              <React.Fragment key={loop}>
                <div className="marquee-item"><span>✦</span> PRIORITY AIR FREIGHT</div>
                <div className="marquee-item"><span>✦</span> INTERCONTINENTAL OCEAN FREIGHT</div>
                <div className="marquee-item"><span>✦</span> SECURE OVERLAND DISPATCH</div>
                <div className="marquee-item"><span>✦</span> GDP TEMP-CONTROLLED WAREHOUSING</div>
                <div className="marquee-item"><span>✦</span> WCO AEO CERTIFIED OPERATOR</div>
                <div className="marquee-item"><span>✦</span> 24/7 EXECUTIVE COMPLIANCE DESK</div>
                <div className="marquee-item"><span>✦</span> DUBAI ENTERPRISE HQ</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Section 2: About Us */}
        <section className="section-padding" id="about" aria-label="About Hasoon Logistics">
          <div className="container">
            <div className="services-split">
              <div className="scroll-reveal">
                <span className="hero-subtitle">Elite Heritage</span>
                <h2>Our Corporate Legacy</h2>
                <p>
                  At Hasoon Logistics, we believe that cargo is not merely commodities—it is our clients&rsquo; reputation, hard work, and business security. Headquartered in Dubai, the absolute crossroads of international commerce, we connect critical trade lanes between East and West.
                </p>
                <p>
                  Guided by logistics veterans Aseem Aslah Hasoon and our executive compliance desk, we support large-scale industrial cargo movements with complete safety guarantees and strict biometrics.
                </p>
              </div>

              <div className="glass-panel scroll-reveal">
                <h3 style={{ marginBottom: "2rem" }}>Our Core Credentials</h3>
                <ul className="service-list" style={{ margin: 0 }}>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>WCO AEO Certified Operator status</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>ISO 9001:2015 &amp; ISO 28000 Compliance</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>GDP Certified Temperature Cold-Chains</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>24/7 Priority Support Hotlines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Product & Services */}
        <section className="section-padding" id="services" aria-label="Our Services">
          <div className="container">
            <div className="services-split" style={{ direction: "rtl" }}>
              <div className="scroll-reveal" style={{ direction: "ltr" }}>
                <span className="hero-subtitle">Capabilities</span>
                <h2>Global Transport Systems</h2>
                <p>
                  Our shipping capabilities span air charters, oceanic lanes, and overland logistics systems, optimized dynamically by modern tracking systems.
                </p>
                <ul className="service-list">
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Priority Air Cargo: 12-36 hours express global transit</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Oceanic Freight: High capacity FCL/LCL spaces</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Luxury Warehousing: &plusmn;0.2&deg;C temperature precision vaulting</span>
                  </li>
                </ul>
              </div>

              {/* 2D Cargo Truck Interactive Container */}
              <div className="services-visual-panel scroll-reveal" style={{ direction: "ltr" }}>
                {mounted && <InteractiveTruck />}
              </div>
            </div>

            {/* Global network counter numbers */}
            {mounted && (
              <div className="stats-container scroll-reveal">
                <div>
                  <StatCounter target={150} suffix="+" />
                  <div className="stat-label">Global Ports &amp; Hubs</div>
                </div>
                <div>
                  <StatCounter target={99} suffix=".9%" />
                  <div className="stat-label">On-Time Precision</div>
                </div>
                <div>
                  <StatCounter target={25} suffix="M+" />
                  <div className="stat-label">Tons Transported</div>
                </div>
                <div>
                  <StatCounter target={100} suffix="%" />
                  <div className="stat-label">Satisfied Corporates</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Our Mission & Vision */}
        <section className="section-padding" id="mission-vision" aria-label="Our Mission and Our Vision">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 5rem auto" }} className="scroll-reveal">
              <span className="hero-subtitle">Strategy &amp; Horizons</span>
              <h2>Securing the Future of Trade</h2>
              <p>We blend daily operational discipline with long-term ecological goals to build a green, sustainable logistics network.</p>
            </div>

            <div className="mission-vision-grid">
              {/* Mission Panel */}
              <div className="glass-panel scroll-reveal">
                <h3 className="text-gold">Our Corporate Mission</h3>
                <p style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
                  &ldquo;To establish the world&rsquo;s most secure, reliable, and high-performance logistics network, prioritizing absolute customer custody and zero-delay execution.&rdquo;
                </p>
                <p>
                  By combining strict compliance security audits with advanced route telemetry, we eliminate uncertainties and ensure seamless cargo handoffs.
                </p>
              </div>

              {/* Vision Horizons Panel */}
              <div className="glass-panel scroll-reveal">
                <h3 className="text-gold">Our Future Vision</h3>
                <p style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "1.5rem" }}>
                  &ldquo;Leading the next generation of global supply chain networks through hyper-velocity transit models and green fuel oceanic carriage.&rdquo;
                </p>
                <div style={{ borderTop: "1px solid var(--color-border-glass)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.875rem", margin: 0 }}>
                    <strong>Horizon 2028:</strong> API customs integrations &amp; micro-sensor expansions.
                  </p>
                  <p style={{ fontSize: "0.875rem", margin: "0.5rem 0 0 0" }}>
                    <strong>Horizon 2030:</strong> Carbon-neutral shipping lanes &amp; electric overland linehauls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Contact Us */}
        <section className="section-padding" id="contact" aria-label="Contact Our Corporate Desk">
          <div className="container contact-split">
            {/* Interactive Form */}
            <div className="glass-panel scroll-reveal">
              {!formSubmitted ? (
                <form id="logistics-contact-form" onSubmit={handleFormSubmit} noValidate>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        className="form-input"
                        placeholder="e.g. Aseem Aslah"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={errors.name ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                        required
                      />
                      {errors.name && (
                        <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">Business Email</label>
                      <input
                        type="email"
                        id="contact-email"
                        className="form-input"
                        placeholder="e.g. office@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={errors.email ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                        required
                      />
                      {errors.email && (
                        <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="contact-phone" className="form-label">Direct Phone</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className="form-input"
                        placeholder="e.g. +971 50 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={errors.phone ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                        required
                      />
                      {errors.phone && (
                        <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-service" className="form-label">Service Required</label>
                      <select
                        id="contact-service"
                        className="form-input"
                        value={formData.service}
                        onChange={handleInputChange}
                        style={errors.service ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                        required
                      >
                        <option value="" disabled>Select capability needed</option>
                        <option value="air">Priority Air Cargo</option>
                        <option value="sea">Intercontinental Ocean freight</option>
                        <option value="land">Secure Overland linehauls</option>
                        <option value="warehousing">Luxury climate storage</option>
                      </select>
                      {errors.service && (
                        <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                          {errors.service}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Specific Requirements</label>
                    <textarea
                      id="contact-message"
                      className="form-input"
                      placeholder="Origin, destination, weight, or special handling rules..."
                      value={formData.message}
                      onChange={handleInputChange}
                      style={errors.message ? { borderColor: "rgba(220, 53, 69, 0.5)" } : {}}
                      required
                    ></textarea>
                    {errors.message && (
                      <span style={{ fontSize: "0.7rem", color: "rgba(220, 53, 69, 0.9)", marginTop: "2px" }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      type="submit"
                      className="btn-glass-3d"
                      disabled={submitting}
                      style={submitting ? { opacity: 0.7 } : {}}
                    >
                      {submitting ? "SENDING Clearance SECURELY..." : "Submit secure request"}
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      border: "2px solid var(--color-accent-gold)",
                      display: "flex",
                      alignItems: "center",
                      margin: "0 auto 2rem auto",
                      boxShadow: "0 0 20px rgba(198, 167, 94, 0.2)",
                      justifyContent: "center",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="var(--color-accent-gold)">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "2rem", marginBottom: "1rem" }} className="text-gold">
                    Clearance request received
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      marginBottom: "2rem",
                      maxWidth: "440px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Your request has been routed to our corporate private support desk. A representative will contact you in under 2 hours.
                  </p>
                  <button onClick={resetForm} className="btn-glass-3d">
                    Send another request
                  </button>
                </div>
              )}
            </div>

            {/* HQ Details */}
            <div className="scroll-reveal">
              <span className="hero-subtitle">Coordinates</span>
              <h2>Corporate Headquarters</h2>
              <p>Get in touch with our desk directly to secure shipping slots and custom warehousing contracts.</p>

              <div className="contact-info-panel">
                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Dubai HQ</div>
                    <div className="info-card-value">Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Direct Desk</div>
                    <div className="info-card-value">desk@hasoonlogistics.com</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="info-card-content">
                    <div className="info-card-title">Priority Phone</div>
                    <div className="info-card-value">+971 50 123 4567</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Widget */}
      <div
        className="whatsapp-widget"
        aria-label="Chat on WhatsApp"
        role="button"
        id="wa-floating-btn"
        onClick={handleWhatsAppClick}
      >
        <svg viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.464L0 24zm6.587-3.61c1.642.975 3.264 1.488 4.9 1.489 5.532 0 10.033-4.502 10.036-10.038.002-2.683-1.042-5.205-2.941-7.106C16.73 2.833 14.216 1.785 11.536 1.784c-5.534 0-10.038 4.502-10.041 10.04-.001 1.957.513 3.865 1.492 5.541l-.985 3.593 3.68-.966c1.6.877 3.197 1.398 4.962 1.398zm11.758-7.794c-.32-.16-1.895-.935-2.188-1.042-.294-.107-.507-.16-.72.16-.213.32-.826 1.042-1.013 1.255-.187.213-.374.24-.694.08-1.41-.715-2.428-1.252-3.414-2.94-.26-.45.26-.418.744-1.383.08-.16.04-.3-.02-.46-.06-.16-.507-1.226-.694-1.68-.182-.438-.367-.378-.507-.385-.13-.006-.28-.007-.428-.007-.146 0-.387.054-.587.273-.2.22-.76.743-.76 1.815 0 1.072.78 2.105.89 2.253.11.148 1.523 2.327 3.69 3.263.516.223.918.356 1.233.456.518.165.99.141 1.362.086.414-.06 1.895-.775 2.16 1.52.267-.746.267-1.387.187-1.52-.08-.133-.293-.24-.613-.4z" />
        </svg>
      </div>

      {/* Antigravity High-Tech Footer */}
      <footer className="antigravity-footer">
        <div className="container">
          <div className="antigravity-footer-brand">
            <h3 className="antigravity-footer-title">Hasoon Logistics</h3>
            <p className="antigravity-footer-subtitle">Secure Enterprise Supply Chains</p>
            <div className="antigravity-footer-badge">
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#C6A75E", boxShadow: "0 0 10px #C6A75E" }}></span>
              secured with Antigravity AI Engine
            </div>
          </div>

          <div className="antigravity-footer-grid">
            <div className="antigravity-footer-col">
              <h4>Direct Desk</h4>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "#94A3B8" }}>
                Engineering world-class shipping, freight forwarding, and warehousing contracts with absolute custody.
              </p>
            </div>

            <div className="antigravity-footer-col">
              <h4>System Links</h4>
              <ul className="antigravity-footer-links">
                <li>
                  <a href="#home">Home Base</a>
                </li>
                <li>
                  <a href="#about">Corporate Legacy</a>
                </li>
                <li>
                  <a href="#services">Global Capabilities</a>
                </li>
                <li>
                  <a href="#mission-vision">Mission Operations</a>
                </li>
                <li>
                  <a href="#contact">Private Desk</a>
                </li>
              </ul>
            </div>

            <div className="antigravity-footer-col">
              <h4>Coordinates</h4>
              <ul className="antigravity-footer-links" style={{ gap: "0.5rem" }}>
                <li style={{ fontSize: "0.875rem" }}>Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE</li>
                <li style={{ fontSize: "0.875rem" }}>desk@hasoonlogistics.com</li>
                <li style={{ fontSize: "0.875rem", color: "var(--color-accent-gold)", fontWeight: 700 }}>+971 50 123 4567</li>
              </ul>
            </div>
          </div>

          <div className="antigravity-footer-bottom">
            <p>&copy; 2026 HASOON LOGISTICS // ENTERPRISE DATA LAYER // CUSTODY SECURED</p>
            <ul className="antigravity-footer-links" style={{ flexDirection: "row", gap: "2rem" }}>
              <li>
                <a href="/sitemap.xml" id="footer-sitemap">
                  Sitemap Node
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="footer-privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    setPrivacyModalOpen(true);
                  }}
                >
                  Privacy Protocol
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Privacy Modal Overlay */}
      <div className={`modal-overlay ${privacyModalOpen ? "active" : ""}`} id="privacy-modal">
        <div className="modal-content glass-panel">
          <h3 className="text-gold" style={{ marginBottom: "1.5rem" }}>
            Privacy &amp; Custody Protocols
          </h3>
          <p style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
            At Hasoon Logistics, secure data stewardship is fundamental to our enterprise solutions.
          </p>
          <p style={{ fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            We implement advanced security databases to keep your logistics records, shipping coordinates, and corporate clearances completely private. No telemetry is shared with external parties except where required for international customs regulations.
          </p>
          <p style={{ fontSize: "0.9375rem", marginBottom: "2rem" }}>
            All GPS monitoring logs, temperature logs, and billing details are encrypted and belong strictly to you.
          </p>
          <div style={{ textAlign: "right" }}>
            <button className="btn-glass-3d" id="close-modal-btn" onClick={() => setPrivacyModalOpen(false)}>
              Close Protocol
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
