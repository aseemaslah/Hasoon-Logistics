"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveShip() {
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanupFn = () => {};

    try {
      let width = container.clientWidth || 300;
      let height = container.clientHeight || 550;

      let isMobile = width < 1024;
      let shipOffsetX = isMobile ? 0 : 75;

      const scene = new THREE.Scene();
      
      // Perspective camera configured for detailed ship visibility
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(150, 85, 220);
      camera.lookAt(0, 5, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      // Lights configuration
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
      mainLight.position.set(120, 200, 150);
      scene.add(mainLight);

      const goldLight = new THREE.DirectionalLight(0xC6A75E, 0.5);
      goldLight.position.set(-150, -50, -100);
      scene.add(goldLight);

      // Ocean Grid Water Base
      const gridSize = 600;
      const gridDivisions = 40;
      const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xC6A75E, 0x5C6F8E);
      gridHelper.position.y = -10.5;
      gridHelper.material.opacity = 0.22;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // Main Ship Group
      const shipGroup = new THREE.Group();
      shipGroup.position.set(shipOffsetX, 0, 0);
      scene.add(shipGroup);

      // Core Realistic Materials
      const upperHullMat = new THREE.MeshStandardMaterial({
        color: 0x0F172A, // Realistic dark steel navy upper hull
        roughness: 0.4,
        metalness: 0.6,
      });

      const lowerHullMat = new THREE.MeshStandardMaterial({
        color: 0x8C2323, // Maritime anti-fouling red bottom paint
        roughness: 0.5,
        metalness: 0.2,
      });

      const stripeMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, // water line stripe
        roughness: 0.3,
      });

      const deckMat = new THREE.MeshStandardMaterial({
        color: 0x334155, // Steel dark deck
        roughness: 0.6,
      });

      const deckTrimMat = new THREE.MeshStandardMaterial({
        color: 0xE2E8F0, // White details
        roughness: 0.4,
      });

      const bridgeMat = new THREE.MeshStandardMaterial({
        color: 0xF8FAFC, // Clean white superstructure
        roughness: 0.35,
      });

      const glassMat = new THREE.MeshBasicMaterial({
        color: 0xC6A75E, // Glowing gold window glass
      });

      const smokestackMat = new THREE.MeshStandardMaterial({
        color: 0x1E293B, // Charcoal funnel
        roughness: 0.5,
      });

      const funnelBandMat = new THREE.MeshStandardMaterial({
        color: 0x8C2323, // Red band on exhaust funnel
        roughness: 0.4,
      });

      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37, // Gold brass propeller/radar
        roughness: 0.2,
        metalness: 0.9,
      });

      const orangeLifeboatMat = new THREE.MeshStandardMaterial({
        color: 0xEA580C, // International Safety Orange
        roughness: 0.5,
      });

      // 1. WATERLINE HULL STRUCTURE (Multi-layer banding for realism)
      const hullLength = 160;
      const hullWidth = 32;

      // Lower Hull (Red Bottom paint)
      const lowerHullGeo = new THREE.BoxGeometry(hullLength, 7, hullWidth - 1);
      const lowerHull = new THREE.Mesh(lowerHullGeo, lowerHullMat);
      lowerHull.position.y = -7.5;
      shipGroup.add(lowerHull);

      // Waterline Stripe (White stripe)
      const stripeGeo = new THREE.BoxGeometry(hullLength + 0.2, 1, hullWidth + 0.1);
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.y = -3.8;
      shipGroup.add(stripe);

      // Upper Hull (Navy steel)
      const upperHullGeo = new THREE.BoxGeometry(hullLength, 7, hullWidth);
      const upperHull = new THREE.Mesh(upperHullGeo, upperHullMat);
      upperHull.position.y = -0.2;
      shipGroup.add(upperHull);

      // 2. CURVED PROW & PROMINENT BULBOUS BOW (Pointy Front Hull)
      const bowGroup = new THREE.Group();
      const bowSegments = 8;
      const segmentLen = 4;

      for (let i = 0; i < bowSegments; i++) {
        const factor = (i / bowSegments); // Taper ratio
        const segWidth = hullWidth * (1 - factor * 0.9);
        const segHeightLower = 7 * (1 - factor * 0.2);
        const segHeightUpper = 7 * (1 + factor * 0.35); // Flared front bow

        // Bow Lower (Red)
        const bLowerGeo = new THREE.BoxGeometry(segmentLen, segHeightLower, segWidth - 1);
        const bLower = new THREE.Mesh(bLowerGeo, lowerHullMat);
        bLower.position.set(hullLength / 2 + i * segmentLen + segmentLen / 2, -7.5 + (7 - segHeightLower) / 2, 0);
        bowGroup.add(bLower);

        // Bow Stripe (White)
        const bStripeGeo = new THREE.BoxGeometry(segmentLen, 1, segWidth + 0.1);
        const bStripe = new THREE.Mesh(bStripeGeo, stripeMat);
        bStripe.position.set(hullLength / 2 + i * segmentLen + segmentLen / 2, -3.8 + (factor * 2), 0);
        bowGroup.add(bStripe);

        // Bow Upper (Navy)
        const bUpperGeo = new THREE.BoxGeometry(segmentLen, segHeightUpper, segWidth);
        const bUpper = new THREE.Mesh(bUpperGeo, upperHullMat);
        bUpper.position.set(hullLength / 2 + i * segmentLen + segmentLen / 2, -0.2 + (segHeightUpper - 7) / 2 + (factor * 3.5), 0);
        bowGroup.add(bUpper);
      }

      // Bulbous Bow (Underwater torpedo bulb)
      const bulbGeo = new THREE.SphereGeometry(6, 12, 12);
      const bulb = new THREE.Mesh(bulbGeo, lowerHullMat);
      bulb.scale.set(2.0, 0.7, 0.7);
      bulb.position.set(hullLength / 2 + 18, -9, 0);
      bowGroup.add(bulb);

      shipGroup.add(bowGroup);

      // 3. STERN (Curved backside)
      const sternGroup = new THREE.Group();
      const sternGeoLower = new THREE.CylinderGeometry(hullWidth / 2 - 0.5, hullWidth / 2 - 0.5, 7, 16, 1, false, 0, Math.PI);
      const sternLower = new THREE.Mesh(sternGeoLower, lowerHullMat);
      sternLower.position.set(-hullLength / 2, -7.5, 0);
      sternLower.rotation.y = Math.PI / 2;
      sternGroup.add(sternLower);

      const sternStripe = new THREE.Mesh(new THREE.CylinderGeometry(hullWidth / 2, hullWidth / 2, 1, 16, 1, false, 0, Math.PI), stripeMat);
      sternStripe.position.set(-hullLength / 2, -3.8, 0);
      sternStripe.rotation.y = Math.PI / 2;
      sternGroup.add(sternStripe);

      const sternGeoUpper = new THREE.CylinderGeometry(hullWidth / 2, hullWidth / 2, 7, 16, 1, false, 0, Math.PI);
      const sternUpper = new THREE.Mesh(sternGeoUpper, upperHullMat);
      sternUpper.position.set(-hullLength / 2, -0.2, 0);
      sternUpper.rotation.y = Math.PI / 2;
      sternGroup.add(sternUpper);

      shipGroup.add(sternGroup);

      // 4. MAIN DECK SURFACE
      const deckGeo = new THREE.BoxGeometry(hullLength + 20, 1.2, hullWidth - 0.8);
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.set(4, 3.4, 0);
      shipGroup.add(deck);

      // 5. ROTATING PROPULSION SCREW (Brass Propeller)
      const propellerGroup = new THREE.Group();
      propellerGroup.position.set(-hullLength / 2 - 12, -9.5, 0);

      const shaftGeo = new THREE.CylinderGeometry(1.2, 1.2, 10, 8);
      const shaft = new THREE.Mesh(shaftGeo, brassMat);
      shaft.rotation.z = Math.PI / 2;
      shaft.position.x = 5;
      propellerGroup.add(shaft);

      const propHub = new THREE.Mesh(new THREE.SphereGeometry(2, 8, 8), brassMat);
      propellerGroup.add(propHub);

      const propBladeGeo = new THREE.BoxGeometry(1, 8, 3.5);
      const blade1 = new THREE.Mesh(propBladeGeo, brassMat);
      blade1.rotation.x = 0.3;
      propellerGroup.add(blade1);

      const blade2 = new THREE.Mesh(propBladeGeo, brassMat);
      blade2.rotation.z = (2 * Math.PI) / 3;
      blade2.rotation.y = 0.3;
      propellerGroup.add(blade2);

      const blade3 = new THREE.Mesh(propBladeGeo, brassMat);
      blade3.rotation.z = (4 * Math.PI) / 3;
      blade3.rotation.y = -0.3;
      propellerGroup.add(blade3);

      shipGroup.add(propellerGroup);

      // 6. DETAILED MULTI-TIERED SUPERSTRUCTURE (White Command Bridge)
      const bridgeGroup = new THREE.Group();
      bridgeGroup.position.set(-hullLength / 2 + 18, 12, 0);

      // Tier 1 (Base Living Quarters)
      const tier1 = new THREE.Mesh(new THREE.BoxGeometry(26, 8, 28), bridgeMat);
      tier1.position.y = 1;
      bridgeGroup.add(tier1);

      // Tier 2 (Intermediate bridge deck)
      const tier2 = new THREE.Mesh(new THREE.BoxGeometry(24, 7, 26), bridgeMat);
      tier2.position.y = 8.5;
      bridgeGroup.add(tier2);

      // Tier 3 (Command cab with wing extensions)
      const tier3 = new THREE.Mesh(new THREE.BoxGeometry(18, 6, 32), bridgeMat); // extended wings
      tier3.position.y = 15;
      bridgeGroup.add(tier3);

      // Bridge Roof
      const roof = new THREE.Mesh(new THREE.BoxGeometry(20, 1.2, 33), deckMat);
      roof.position.y = 18.2;
      bridgeGroup.add(roof);

      // Glowing Bridge Windows
      const winFront = new THREE.Mesh(new THREE.BoxGeometry(1, 2.5, 29), glassMat);
      winFront.position.set(9.1, 15.2, 0);
      bridgeGroup.add(winFront);

      const winSidePort = new THREE.Mesh(new THREE.BoxGeometry(14, 2.0, 0.2), glassMat);
      winSidePort.position.set(2, 15, 16.0);
      bridgeGroup.add(winSidePort);

      const winSideStbd = new THREE.Mesh(new THREE.BoxGeometry(14, 2.0, 0.2), glassMat);
      winSideStbd.position.set(2, 15, -16.0);
      bridgeGroup.add(winSideStbd);

      // 7. ROTATING DECK RADAR MAST & ANTENNAS
      const mastGroup = new THREE.Group();
      mastGroup.position.set(-4, 22, 0);

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 12, 8), deckTrimMat);
      mastGroup.add(pole);

      const crossbar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 14), deckTrimMat);
      crossbar.position.y = 4;
      mastGroup.add(crossbar);

      // The radar scanner blade (will rotate in loop)
      const radarScanner = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.8, 10), brassMat);
      radarScanner.position.y = 6.4;
      mastGroup.add(radarScanner);

      bridgeGroup.add(mastGroup);

      // 8. CHARCOAL EXHAUST FUNNEL (Smokestack)
      const funnelGroup = new THREE.Group();
      funnelGroup.position.set(-20, 12, 0);

      const casing = new THREE.Mesh(new THREE.BoxGeometry(10, 15, 12), bridgeMat);
      casing.position.y = 4.5;
      funnelGroup.add(casing);

      // Angled smokestack cylinders
      const pipeGroup = new THREE.Group();
      pipeGroup.position.set(-1, 13, 0);
      pipeGroup.rotation.z = -0.15; // Realistic backward tilt

      const mainPipe = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.8, 10, 8), smokestackMat);
      pipeGroup.add(mainPipe);

      const decorativeBand = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 2, 8), funnelBandMat);
      decorativeBand.position.y = 1.5;
      pipeGroup.add(decorativeBand);

      const exhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 11, 8), smokestackMat);
      exhaustPipe.position.set(0.5, 1, 0);
      pipeGroup.add(exhaustPipe);

      funnelGroup.add(pipeGroup);
      bridgeGroup.add(funnelGroup);

      // 9. SAFETY LIFEBOATS MOUNTED ON HULL SIDES
      const portLifeboat = new THREE.Mesh(new THREE.SphereGeometry(3.5, 12, 8), orangeLifeboatMat);
      portLifeboat.scale.set(2.0, 0.9, 0.8);
      portLifeboat.position.set(-4, 9, 14.5);
      bridgeGroup.add(portLifeboat);

      const stbdLifeboat = new THREE.Mesh(new THREE.SphereGeometry(3.5, 12, 8), orangeLifeboatMat);
      stbdLifeboat.scale.set(2.0, 0.9, 0.8);
      stbdLifeboat.position.set(-4, 9, -14.5);
      bridgeGroup.add(stbdLifeboat);

      shipGroup.add(bridgeGroup);

      // 10. NEATLY BAY-STACKED CARGO CONTAINERS
      const cargoGroup = new THREE.Group();
      const containerColors = [
        0x1E40AF, // Ocean Blue
        0x16A34A, // Evergreen Green
        0xD97706, // Hapag Orange
        0x991B1B, // Red
        0xC6A75E, // Hasoon Luxury Gold
        0xF8FAFC, // Slate white
      ];

      const cLength = 16;
      const cHeight = 9.5;
      const cWidth = 8;

      // Defined container bays along the deck length
      const baysX = [-50, -32, -14, 4, 22, 40, 58];
      const slotsZ = [-9, 0, 9];

      baysX.forEach((x, bayIdx) => {
        // Taper stack heights toward the bow (front) for aerodynamics
        let maxStack = 3;
        if (bayIdx >= 5) maxStack = 2; // Taper at bow

        slotsZ.forEach((z) => {
          // Add random vacant container slots for realistic variation
          if (Math.random() > 0.90 && bayIdx !== 3) return;

          const stackHeight = 1 + Math.floor(Math.random() * maxStack);

          for (let y = 0; y < stackHeight; y++) {
            const containerColor = containerColors[(bayIdx + Math.abs(z) + y) % containerColors.length];

            const boxMat = new THREE.MeshStandardMaterial({
              color: containerColor,
              roughness: 0.35,
              metalness: 0.45,
            });

            // Container Box geometry
            const boxGeo = new THREE.BoxGeometry(cLength - 0.8, cHeight - 0.4, cWidth - 0.4);
            const box = new THREE.Mesh(boxGeo, boxMat);
            box.position.set(x, 4.0 + cHeight / 2 + y * cHeight, z);

            // Container corrugated edge wireframe effect
            const edges = new THREE.EdgesGeometry(boxGeo);
            const line = new THREE.LineSegments(
              edges,
              new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.15 })
            );
            box.add(line);
            cargoGroup.add(box);
          }
        });
      });

      shipGroup.add(cargoGroup);

      // 11. DECK CARGO CRANES (Between Container Bays)
      const craneGroup = new THREE.Group();
      const craneBaseMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.4 });
      
      const craneX = [-23, 13]; // Cranes positioned between container bays
      craneX.forEach((cx) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.2, 16, 8), craneBaseMat);
        pillar.position.set(cx, 11, 0);
        craneGroup.add(pillar);

        const cab = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.5, 3.5), craneBaseMat);
        cab.position.set(cx, 19.5, 0);
        craneGroup.add(cab);

        const boom = new THREE.Mesh(new THREE.BoxGeometry(18, 1, 1), craneBaseMat);
        boom.position.set(cx + 8, 20, 0);
        boom.rotation.z = 0.25; // angled upwards
        craneGroup.add(boom);
      });
      shipGroup.add(craneGroup);

      // 12. DYNAMIC WAKE & BOW SPRAY FOAM PARTICLES
      const particleCount = 140;
      const particleGeo = new THREE.SphereGeometry(1.6, 6, 6);
      const particleMat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.5,
      });

      const particlesGroup = new THREE.Group();
      const particlesArray = [];

      for (let i = 0; i < particleCount; i++) {
        const p = new THREE.Mesh(particleGeo, particleMat);

        const isBowSpray = Math.random() > 0.6;
        let px, py, pz;

        if (isBowSpray) {
          // Spray ejecting outward from front bow points
          px = hullLength / 2 + 10 + (Math.random() - 0.5) * 8;
          py = -9.0;
          pz = (Math.random() > 0.5 ? 1 : -1) * (hullWidth / 2 + Math.random() * 8);
        } else {
          // Trail expanding behind ship stern
          px = -hullLength / 2 - 15 - Math.random() * 160;
          py = -9.8;
          pz = (Math.random() - 0.5) * 35;
        }

        p.position.set(px, py, pz);

        particlesArray.push({
          mesh: p,
          speedX: isBowSpray ? -0.8 - Math.random() * 1.5 : -1.5 - Math.random() * 2.0,
          speedZ: isBowSpray ? (pz > 0 ? 0.6 : -0.6) * (0.5 + Math.random() * 1.2) : (Math.random() - 0.5) * 0.8,
          initialX: px,
          initialZ: pz,
          isBow: isBowSpray,
          life: Math.random(),
          scaleSpeed: isBowSpray ? 0.015 + Math.random() * 0.015 : 0.004 + Math.random() * 0.008,
        });

        particlesGroup.add(p);
      }
      shipGroup.add(particlesGroup);

      // Interactivity State & Listeners
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let rotationSpeed = { x: 0.002, y: 0 };
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

      // Handle viewport resize
      const handleResize = () => {
        width = container.clientWidth;
        height = container.clientHeight || 550;
        if (width <= 0 || height <= 0) return;
        camera.aspect = width / height;

        const newMobile = width < 1024;
        const newOffsetX = newMobile ? 0 : 75;

        shipGroup.position.x = newOffsetX;
        camera.position.set(150, 85, 220);
        camera.lookAt(0, 5, 0);

        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener("resize", handleResize);

      // Wave physics and rotation animate loop
      let time = 0;
      let animationFrameId;
      
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        time += 0.015;

        const scrollSpeed = typeof window !== "undefined" && window.scrollVelocity && !isNaN(window.scrollVelocity) ? Math.min(window.scrollVelocity, 4.0) : 0;
        const speedMultiplier = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);

        // Spin propeller screw
        propellerGroup.rotation.x += 0.25 * speedMultiplier;

        // Spin radar antenna mast
        radarScanner.rotation.y += 0.06 * speedMultiplier;

        if (!isDragging) {
          rotationSpeed.y *= friction;
          rotationSpeed.x *= friction;

          // Default rotation drift and ocean wave pitch/roll sway
          shipGroup.rotation.y += rotationSpeed.y + 0.001 * speedMultiplier;
          shipGroup.rotation.x = rotationSpeed.x + Math.sin(time) * 0.02; // pitching
          shipGroup.rotation.z = Math.cos(time * 0.7) * 0.015; // rolling
          shipGroup.position.y = Math.sin(time * 1.1) * 2.0; // heaving
        } else {
          shipGroup.position.y = 0;
        }

        // Foam wave emission update
        particlesArray.forEach((p) => {
          p.mesh.position.x += p.speedX * speedMultiplier;
          p.mesh.position.z += p.speedZ * speedMultiplier;

          p.life += p.scaleSpeed * speedMultiplier;
          const scaleVal = Math.max(0, 1 - p.life);
          p.mesh.scale.set(scaleVal, scaleVal, scaleVal);
          p.mesh.material.opacity = scaleVal * 0.55;

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

      cleanupFn = () => {
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
    } catch (err) {
      console.error("Three.js WebGL error caught:", err);
      container.innerHTML = `
        <div style="width: 100%; height: 100%; background: rgba(31, 42, 68, 0.03); display: flex; align-items: center; justify-content: center; border-radius: 20px; text-align: center; padding: 2rem; box-sizing: border-box;">
          <div>
            <span style="font-size: 2.5rem; color: var(--color-accent-gold); display: block; margin-bottom: 1rem;">✦</span>
            <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 500;">Hasoon Logistics Intercontinental Shipping</p>
            <p style="font-family: var(--font-sans); font-size: 0.85rem; color: var(--color-text-muted); margin: 0;">Securing maritime trade lanes across Dubai, Saudi Arabia, India, and China.</p>
          </div>
        </div>
      `;
      cleanupFn = () => {
        container.innerHTML = "";
      };
    }

    return () => cleanupFn();
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
