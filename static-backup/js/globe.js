/*
   Hasoon Logistics - Three.js Interactive Luxury Globe
   WebGL-powered Navy & Gold logistics globe with real-time cargo routes.
*/

class LuxuryGlobe {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight || 500;
    
    this.radius = 140;
    this.hubs = [
      { name: "New York", lat: 40.7128, lon: -74.0060 },
      { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
      { name: "Dubai", lat: 25.2048, lon: 55.2708 },
      { name: "Singapore", lat: 1.3521, lon: 103.8198 }
    ];
    
    this.routes = [
      { from: "New York", to: "London" },
      { from: "London", to: "Dubai" },
      { from: "Dubai", to: "Singapore" },
      { from: "Singapore", to: "Tokyo" },
      { from: "Tokyo", to: "New York" },
      { from: "New York", to: "Dubai" },
      { from: "London", to: "Singapore" }
    ];
    
    this.init();
  }

  init() {
    // 1. Scene & Setup
    this.scene = new THREE.Scene();
    
    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 400;
    
    // 3. Renderer Setup (Transparent background)
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any previous canvas and append
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
    
    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    const dirLight1 = new THREE.DirectionalLight(0xD4AF37, 0.8);
    dirLight1.position.set(200, 300, 200);
    this.scene.add(dirLight1);
    
    const dirLight2 = new THREE.DirectionalLight(0x003566, 0.6);
    dirLight2.position.set(-200, -300, -200);
    this.scene.add(dirLight2);

    // 5. Create Globe Group
    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);
    
    this.createBaseGlobe();
    this.createHubs();
    this.createRoutes();
    
    // 6. Interaction Setup
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationSpeed = { x: 0.005, y: 0 };
    this.friction = 0.95;
    
    this.addEventListeners();
    
    // 7. Animation Loop
    this.animate();
  }

  // Convert lat/long to 3D Cartesian space on sphere
  latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.sin(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);
    
    return new THREE.Vector3(x, y, z);
  }

  createBaseGlobe() {
    // Solid Translucent Base Sphere
    const sphereGeo = new THREE.SphereGeometry(this.radius, 40, 40);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x050e1e,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });
    const baseSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.globeGroup.add(baseSphere);

    // Dotted Grid Overlay (Luxury styling)
    const pointsGeo = new THREE.SphereGeometry(this.radius + 1, 36, 36);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1d3557,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframeSphere = new THREE.Mesh(pointsGeo, wireframeMat);
    this.globeGroup.add(wireframeSphere);

    // Subtle Halo Glow (outer ring)
    const ringGeo = new THREE.RingGeometry(this.radius + 5, this.radius + 6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12
    });
    const halo = new THREE.Mesh(ringGeo, ringMat);
    halo.position.z = -10;
    this.scene.add(halo);
  }

  createHubs() {
    this.hubMeshes = [];
    
    this.hubs.forEach(hub => {
      const position = this.latLongToVector3(hub.lat, hub.lon, this.radius);
      
      // Hub Group
      const hubGroup = new THREE.Group();
      hubGroup.position.copy(position);
      
      // Look away from center
      hubGroup.lookAt(new THREE.Vector3(0, 0, 0));
      
      // Small glowing center sphere (Gold)
      const dotGeo = new THREE.SphereGeometry(2.5, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.9
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      hubGroup.add(dot);
      
      // Pulsing Ring
      const ringGeo = new THREE.RingGeometry(3, 5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      hubGroup.add(ring);
      
      this.globeGroup.add(hubGroup);
      
      // Track pulse state
      this.hubMeshes.push({
        group: hubGroup,
        ring: ring,
        pulseScale: 1.0,
        pulseDirection: 1
      });
    });
  }

  createRoutes() {
    this.arcRoutes = [];
    
    this.routes.forEach(route => {
      const fromHub = this.hubs.find(h => h.name === route.from);
      const toHub = this.hubs.find(h => h.name === route.to);
      
      if (!fromHub || !toHub) return;
      
      const start = this.latLongToVector3(fromHub.lat, fromHub.lon, this.radius);
      const end = this.latLongToVector3(toHub.lat, toHub.lon, this.radius);
      
      // Calculate mid-point and elevate it to form an arch
      const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      
      // Elevation proportional to distance
      const elevation = this.radius + (distance * 0.25);
      midPoint.normalize().multiplyScalar(elevation);
      
      // Create Quadratic Bezier curve
      const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
      
      // Draw static line
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.25
      });
      const line = new THREE.Line(lineGeo, lineMat);
      this.globeGroup.add(line);
      
      // Glowing Signal Particle (representing real-time cargo movement)
      const particleGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const particleMat = new THREE.MeshBasicMaterial({
        color: 0xF3C63F,
        transparent: true,
        opacity: 0.9
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      this.globeGroup.add(particle);
      
      this.arcRoutes.push({
        curve: curve,
        particle: particle,
        t: Math.random(), // Random initial progress
        speed: 0.003 + (Math.random() * 0.004)
      });
    });
  }

  addEventListeners() {
    // Mouse Events
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const deltaMove = {
        x: e.clientX - this.previousMousePosition.x,
        y: e.clientY - this.previousMousePosition.y
      };
      
      // Adjust rotation speed based on drag
      this.rotationSpeed.y = deltaMove.x * 0.002;
      this.rotationSpeed.x = deltaMove.y * 0.002;
      
      this.globeGroup.rotation.y += this.rotationSpeed.y;
      this.globeGroup.rotation.x += this.rotationSpeed.x;
      
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch Support for Mobile
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
    
    this.container.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      
      const deltaMove = {
        x: e.touches[0].clientX - this.previousMousePosition.x,
        y: e.touches[0].clientY - this.previousMousePosition.y
      };
      
      this.rotationSpeed.y = deltaMove.x * 0.003;
      this.rotationSpeed.x = deltaMove.y * 0.003;
      
      this.globeGroup.rotation.y += this.rotationSpeed.y;
      this.globeGroup.rotation.x += this.rotationSpeed.x;
      
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    
    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
    
    // Resize Listener
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight || 500;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // 1. Automatic spin if user is not dragging
    if (!this.isDragging) {
      // Damping the velocity
      this.rotationSpeed.y *= this.friction;
      this.rotationSpeed.x *= this.friction;
      
      // Apply inertia + constant small rotation
      this.globeGroup.rotation.y += this.rotationSpeed.y + 0.0015;
      this.globeGroup.rotation.x += this.rotationSpeed.x;
    }
    
    // 2. Animate Hub Pulses
    this.hubMeshes.forEach(hub => {
      hub.pulseScale += 0.02 * hub.pulseDirection;
      if (hub.pulseScale > 1.8) {
        hub.pulseDirection = -1;
      } else if (hub.pulseScale < 1.0) {
        hub.pulseDirection = 1;
      }
      hub.ring.scale.set(hub.pulseScale, hub.pulseScale, 1);
      hub.ring.material.opacity = 0.6 * (1 - (hub.pulseScale - 1) / 0.8);
    });
    
    // 3. Animate Signals Along Arcs
    this.arcRoutes.forEach(route => {
      route.t += route.speed;
      if (route.t > 1.0) {
        route.t = 0;
      }
      
      const newPos = route.curve.getPoint(route.t);
      route.particle.position.copy(newPos);
      
      // Pulse scale of the particle near middle of flight
      const pulse = Math.sin(route.t * Math.PI);
      route.particle.scale.set(0.8 + pulse * 0.6, 0.8 + pulse * 0.6, 0.8 + pulse * 0.6);
    });
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate globe when window finishes loading
window.addEventListener('DOMContentLoaded', () => {
  const globe = new LuxuryGlobe('globe-canvas');
});
