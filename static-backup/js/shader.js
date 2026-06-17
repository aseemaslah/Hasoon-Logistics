/*
   Hasoon Logistics - High-Performance Canvas Shader Gradient
   Simulates flowing liquid 3D gradients using anim radial color blobs.
*/

class ShaderGradient {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    
    // Performance Optimization: Render at half-resolution and blur with CSS
    this.scale = 0.5; 
    
    // Brand Colors
    this.colors = {
      primary: '#E8DCC8',    // Beige/Cream
      secondary: '#1F2A44',  // Navy
      accent: '#C6A75E',     // Gold
      white: '#FFFFFF'
    };

    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.animate();
  }

  resize() {
    this.width = this.canvas.clientWidth * this.scale;
    this.height = this.canvas.clientHeight * this.scale;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    this.time += 0.0006; // Super slow, organic, ambient motion
    
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    
    // 1. Fill base primary beige color
    ctx.fillStyle = this.colors.primary;
    ctx.fillRect(0, 0, w, h);
    
    // 2. Draw moving Navy Blob
    const navyX = w * (0.5 + Math.sin(this.time * 2.1) * 0.3);
    const navyY = h * (0.5 + Math.cos(this.time * 1.5) * 0.25);
    const navyRadius = Math.max(w, h) * 0.75;
    
    let gradNavy = ctx.createRadialGradient(navyX, navyY, 0, navyX, navyY, navyRadius);
    gradNavy.addColorStop(0, 'rgba(31, 42, 68, 0.12)'); // Softened Navy
    gradNavy.addColorStop(1, 'rgba(31, 42, 68, 0)');
    ctx.fillStyle = gradNavy;
    ctx.beginPath();
    ctx.arc(navyX, navyY, navyRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // 3. Draw moving Gold Blob
    const goldX = w * (0.5 + Math.cos(this.time * 1.8) * 0.35);
    const goldY = h * (0.5 + Math.sin(this.time * 2.4) * 0.2);
    const goldRadius = Math.max(w, h) * 0.65;
    
    let gradGold = ctx.createRadialGradient(goldX, goldY, 0, goldX, goldY, goldRadius);
    gradGold.addColorStop(0, 'rgba(198, 167, 94, 0.15)'); // Softened Gold
    gradGold.addColorStop(1, 'rgba(198, 167, 94, 0)');
    ctx.fillStyle = gradGold;
    ctx.beginPath();
    ctx.arc(goldX, goldY, goldRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // 4. Draw moving White highlight Blob
    const whiteX = w * (0.3 + Math.sin(this.time * 1.2) * 0.2);
    const whiteY = h * (0.7 + Math.cos(this.time * 2.0) * 0.2);
    const whiteRadius = Math.max(w, h) * 0.55;
    
    let gradWhite = ctx.createRadialGradient(whiteX, whiteY, 0, whiteX, whiteY, whiteRadius);
    gradWhite.addColorStop(0, 'rgba(255, 255, 255, 0.3)'); // Softened White highlight
    gradWhite.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradWhite;
    ctx.beginPath();
    ctx.arc(whiteX, whiteY, whiteRadius, 0, Math.PI * 2);
    ctx.fill();
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM Load
window.addEventListener('DOMContentLoaded', () => {
  new ShaderGradient('shader-canvas');
});
