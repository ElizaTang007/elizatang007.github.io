/**
 * Dynamic Background with Floating Particles
 * Creates an elegant animated background for the website
 */

class DynamicBackground {
  constructor() {
    this.particles = [];
    this.config = window.DynamicBackgroundConfig || this.getDefaultConfig();
    this.container = null;
    this.animationId = null;
    this.isActive = false;
    this.currentTheme = 'light';
    
    this.init();
  }

  getDefaultConfig() {
    return {
      particles: {
        count: 50,
        minSize: 1,
        maxSize: 4,
        opacity: 0.15,
        glowIntensity: 0.3,
        animationSpeed: 6,
        movementSpeed: 0.5
      },
      background: {
        primaryGradient: { start: '#667eea', end: '#764ba2' },
        secondaryGradient: { start: 'rgba(102, 126, 234, 0.1)', end: 'rgba(118, 75, 162, 0.1)' }
      },
      animations: {
        gradientShift: { duration: 20, easing: 'ease-in-out' },
        radialShift: { duration: 15, easing: 'ease-in-out' },
        particleFloat: { duration: 6, variation: 4 }
      },
      content: {
        backdropBlur: 10,
        borderRadius: 15,
        shadowIntensity: 0.1,
        hoverEffect: true,
        fadeInAnimation: true
      },
      performance: {
        pauseOnHidden: true,
        respectReducedMotion: true,
        maxFPS: 60,
        enableOptimizations: true
      }
    };
  }

  init() {
    this.checkUserPreferences();
    this.createBackground();
    this.createParticles();
    this.animate();
    this.handleResize();
    this.handleThemeChange();
    this.applyContentStyling();
  }

  checkUserPreferences() {
    // Check for reduced motion preference
    if (this.config.performance.respectReducedMotion && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.config.particles.count = Math.floor(this.config.particles.count / 2);
      this.config.animations.gradientShift.duration *= 2;
      this.config.animations.radialShift.duration *= 2;
    }
    
    // Check for dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.currentTheme = 'dark';
      this.applyTheme('dark');
    }
  }

  createBackground() {
    // Create background container
    this.container = document.createElement('div');
    this.container.className = 'dynamic-background';
    
    // Apply gradient background
    const gradient = this.config.background.primaryGradient;
    this.container.style.background = `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)`;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    this.container.appendChild(particlesContainer);
    
    // Insert at the beginning of body
    document.body.insertBefore(this.container, document.body.firstChild);
  }

  createParticles() {
    const particlesContainer = this.container.querySelector('.particles');
    
    for (let i = 0; i < this.config.particles.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties based on config
      const size = Math.random() * 
        (this.config.particles.maxSize - this.config.particles.minSize) + 
        this.config.particles.minSize;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const delay = Math.random() * this.config.animations.particleFloat.duration;
      const duration = this.config.animations.particleFloat.duration + 
        Math.random() * this.config.animations.particleFloat.variation;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
        opacity: ${this.config.particles.opacity};
      `;
      
      particlesContainer.appendChild(particle);
      this.particles.push(particle);
    }
  }

  animate() {
    if (this.isActive || !this.config.performance.enableOptimizations) return;
    
    this.isActive = true;
    let lastTime = 0;
    const frameInterval = 1000 / this.config.performance.maxFPS;
    
    const animate = (currentTime) => {
      if (currentTime - lastTime >= frameInterval) {
        this.particles.forEach((particle, index) => {
          // Add subtle movement
          const time = currentTime * 0.001;
          const x = parseFloat(particle.style.left) + 
            Math.sin(time + index) * this.config.particles.movementSpeed;
          const y = parseFloat(particle.style.top) + 
            Math.cos(time + index) * this.config.particles.movementSpeed;
          
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
        });
        
        lastTime = currentTime;
      }
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
  }

  handleResize() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.repositionParticles();
      }, 100);
    });
  }

  handleThemeChange() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.currentTheme = e.matches ? 'dark' : 'light';
      this.applyTheme(this.currentTheme);
    });
  }

  applyTheme(theme) {
    if (this.config.themes && this.config.themes[theme]) {
      const themeConfig = this.config.themes[theme];
      
      if (themeConfig.background) {
        const gradient = themeConfig.background.primaryGradient;
        this.container.style.background = `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)`;
      }
    }
  }

  applyContentStyling() {
    if (this.config.content.fadeInAnimation) {
      const contentElements = document.querySelectorAll('.page__content');
      contentElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }

  repositionParticles() {
    this.particles.forEach(particle => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.container) {
      this.container.remove();
    }
    this.isActive = false;
  }

  // Public method to update configuration
  updateConfig(newConfig) {
    Object.assign(this.config, newConfig);
    this.destroy();
    this.init();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.dynamicBackground = new DynamicBackground();
  }
});

// Pause animation when page is not visible (performance optimization)
document.addEventListener('visibilitychange', () => {
  if (window.dynamicBackground && window.dynamicBackground.config.performance.pauseOnHidden) {
    if (document.hidden) {
      window.dynamicBackground.destroy();
    } else {
      window.dynamicBackground = new DynamicBackground();
    }
  }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DynamicBackground;
} 