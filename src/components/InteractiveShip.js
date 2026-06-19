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
      let width = container.clientWidth;
      let height = container.clientHeight || 550;

      // Responsive offset: X=75 on desktop, X=0 on mobile (centered)
      let isMobile = width < 1024;
      let shipOffsetX = isMobile ? 0 : 75;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
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

        const scrollSpeed = typeof window !== "undefined" ? Math.min(window.scrollVelocity || 0, 4.0) : 0;
        const speedMultiplier = (isHovered.current ? 2.5 : 1.0) * (1.0 + scrollSpeed * 1.5);

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
