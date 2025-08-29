/**
 * Dynamic Background Configuration
 * Customize the dynamic background effects
 */

window.DynamicBackgroundConfig = {
  // Particle settings
  particles: {
    count: 50,           // Number of particles
    minSize: 1,          // Minimum particle size in pixels
    maxSize: 4,          // Maximum particle size in pixels
    opacity: 0.15,       // Particle opacity (0-1)
    glowIntensity: 0.3,  // Glow effect intensity
    animationSpeed: 6,   // Base animation duration in seconds
    movementSpeed: 0.5   // Movement speed multiplier
  },
  
  // Background settings
  background: {
    primaryGradient: {
      start: '#667eea',
      end: '#764ba2'
    },
    secondaryGradient: {
      start: 'rgba(102, 126, 234, 0.1)',
      end: 'rgba(118, 75, 162, 0.1)'
    },
    radialGradients: [
      { position: '20% 80%', color: 'rgba(120, 119, 198, 0.3)', size: '50%' },
      { position: '80% 20%', color: 'rgba(255, 119, 198, 0.3)', size: '50%' },
      { position: '40% 40%', color: 'rgba(120, 219, 255, 0.2)', size: '50%' }
    ]
  },
  
  // Animation settings
  animations: {
    gradientShift: {
      duration: 20,       // Duration in seconds
      easing: 'ease-in-out'
    },
    radialShift: {
      duration: 15,       // Duration in seconds
      easing: 'ease-in-out'
    },
    particleFloat: {
      duration: 6,        // Base duration in seconds
      variation: 4        // Random variation in seconds
    }
  },
  
  // Content styling
  content: {
    backdropBlur: 10,    // Backdrop filter blur amount
    borderRadius: 15,     // Border radius in pixels
    shadowIntensity: 0.1, // Box shadow opacity
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
        primaryGradient: { start: '#667eea', end: '#764ba2' },
        secondaryGradient: { start: 'rgba(102, 126, 234, 0.1)', end: 'rgba(118, 75, 162, 0.1)' }
      },
      content: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    },
    dark: {
      background: {
        primaryGradient: { start: '#1a1a2e', end: '#16213e' },
        secondaryGradient: { start: 'rgba(26, 26, 46, 0.3)', end: 'rgba(22, 33, 62, 0.3)' }
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