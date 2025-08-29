/**
 * Dynamic Background Configuration
 * Customize the dynamic background effects
 */

window.DynamicBackgroundConfig = {
  // Particle settings
  particles: {
    count: 120,           // Number of particles
    minSize: 1,          // Minimum particle size in pixels
    maxSize: 4,          // Maximum particle size in pixels
    opacity: 0.2,       // Particle opacity (0-1)
    glowIntensity: 0.5,  // Glow effect intensity
    animationSpeed: 6,   // Base animation duration in seconds
    movementSpeed: 0.6   // Movement speed multiplier
  },
  
  // Background settings
  background: {
    primaryGradient: {
      start: '#000814',  // deep space blue
      end: '#001d3d'     // darker blue
    },
    secondaryGradient: {
      start: 'rgba(0, 168, 255, 0.12)',
      end: 'rgba(0, 95, 183, 0.10)'
    },
    radialGradients: [
      { position: '18% 78%', color: 'rgba(0, 255, 255, 0.28)', size: '45%' },
      { position: '78% 22%', color: 'rgba(120, 119, 255, 0.22)', size: '50%' },
      { position: '42% 42%', color: 'rgba(0, 200, 255, 0.18)', size: '55%' }
    ]
  },
  
  // Animation settings
  animations: {
    gradientShift: {
      duration: 24,       // Duration in seconds
      easing: 'ease-in-out'
    },
    radialShift: {
      duration: 18,       // Duration in seconds
      easing: 'ease-in-out'
    },
    particleFloat: {
      duration: 6,        // Base duration in seconds
      variation: 4        // Random variation in seconds
    }
  },
  
  // Content styling
  content: {
    backdropBlur: 12,    // Backdrop filter blur amount
    borderRadius: 15,     // Border radius in pixels
    shadowIntensity: 0.12, // Box shadow opacity
    hoverEffect: true,    // Enable hover animations
    fadeInAnimation: true // Enable content fade-in
  },
  
  // Performance settings
  performance: {
    pauseOnHidden: true,  // Pause animation when page is hidden
    respectReducedMotion: true, // Respect user's motion preferences
    maxFPS: 60,          // Maximum frames per second
    enableOptimizations: true
  },
  
  // Theme support
  themes: {
    light: {
      background: {
        primaryGradient: { start: '#000814', end: '#001d3d' },
        secondaryGradient: { start: 'rgba(0, 168, 255, 0.12)', end: 'rgba(0, 95, 183, 0.10)' }
      },
      content: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    },
    dark: {
      background: {
        primaryGradient: { start: '#000814', end: '#001d3d' },
        secondaryGradient: { start: 'rgba(0, 168, 255, 0.12)', end: 'rgba(0, 95, 183, 0.10)' }
      },
      content: {
        background: 'rgba(26, 26, 46, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
};

// Helper function to update configuration
window.updateDynamicBackgroundConfig = function(newConfig) {
  Object.assign(window.DynamicBackgroundConfig, newConfig);
  
  // If background is already running, restart it with new config
  if (window.dynamicBackground) {
    window.dynamicBackground.destroy();
    window.dynamicBackground = new DynamicBackground();
  }
};

// Example usage:
// updateDynamicBackgroundConfig({
//   particles: { count: 100, maxSize: 6 },
//   content: { backdropBlur: 20 }
// }); 