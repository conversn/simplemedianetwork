/**
 * SIMPLE MEDIA NETWORK - PREMIUM INTERACTIONS
 * Advanced micro-interactions and animation system
 */

// ========== CONFIGURATION ==========
const CONFIG = {
  animation: {
    duration: 400,
    easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
    staggerDelay: 100
  },
  scroll: {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  },
  stats: {
    duration: 2000,
    easing: 'easeOutCubic'
  }
};

// ========== UTILITY FUNCTIONS ==========
const lerp = (start, end, factor) => start + (end - start) * factor;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ========== HEADER SCROLL BEHAVIOR ==========
class HeaderController {
  constructor() {
    this.header = document.getElementById('header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for backdrop blur effect
    if (currentScroll > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
    
    this.lastScroll = currentScroll;
  }
}

// ========== SCROLL REVEAL ANIMATIONS ==========
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.stat-item, .system-block, .fade-in, .icon-animated');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersect(entries),
        {
          threshold: CONFIG.scroll.threshold,
          rootMargin: CONFIG.scroll.rootMargin
        }
      );

      this.elements.forEach(el => this.observer.observe(el));
    } else {
      // Fallback for older browsers
      this.elements.forEach(el => el.classList.add('visible'));
    }
  }

  handleIntersect(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * CONFIG.animation.staggerDelay);
        
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ========== ANIMATED NUMBER COUNTERS ==========
class NumberCounter {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number[data-target]');
    this.hasAnimated = false;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersect(entries),
        { threshold: 0.5 }
      );

      // Observe the first counter only - when it's visible, animate all
      if (this.counters.length > 0) {
        this.observer.observe(this.counters[0]);
      }
    }
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.hasAnimated = true;
        // Animate ALL counters when first one becomes visible
        this.counters.forEach(counter => this.animateCounter(counter));
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = CONFIG.stats.duration;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = Math.floor(easedProgress * target);
      element.textContent = this.formatNumber(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = this.formatNumber(target) + '+';
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return num.toString();
  }
}

// ========== MAGNETIC HOVER EFFECTS ==========
class MagneticButton {
  constructor() {
    this.buttons = document.querySelectorAll('.brand-card, .vertical-card, .principle-item');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
      button.addEventListener('mouseleave', () => this.handleMouseLeave(button));
    });
  }

  handleMouseMove(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const moveX = deltaX * 8;
    const moveY = deltaY * 8;
    
    button.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-4px)`;
  }

  handleMouseLeave(button) {
    button.style.transform = '';
  }
}

// ========== PARALLAX IMAGES ==========
class ParallaxController {
  constructor() {
    this.images = document.querySelectorAll('.image-full-bleed');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }

  handleScroll() {
    this.images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = (scrollPercent - 0.5) * 50;
        
        image.style.transform = `translateY(${translateY}px) scale(1.1)`;
      }
    });
  }
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// ========== WORD-BY-WORD TEXT REVEAL ==========
class TextReveal {
  constructor() {
    this.headlines = document.querySelectorAll('.hero-headline');
    this.init();
  }

  init() {
    this.headlines.forEach(headline => {
      const text = headline.textContent;
      const words = text.split(' ');
      
      headline.innerHTML = words.map((word, index) => {
        return `<span style="display: inline-block; opacity: 0; animation: fadeInWord 0.6s cubic-bezier(0.33, 1, 0.68, 1) ${index * 0.08}s forwards;">${word}</span>`;
      }).join(' ');
    });
  }
}

// Add CSS animation for word reveal
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInWord {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ========== CUSTOM CURSOR (OPTIONAL - PREMIUM TOUCH) ==========
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.init();
  }

  init() {
    // Only initialize on desktop
    if (window.innerWidth < 1024) return;
    
    this.createCursor();
    this.bindEvents();
  }

  createCursor() {
    // Main cursor dot
    this.cursor = document.createElement('div');
    this.cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--color-accent-green);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.15s ease;
      display: none;
    `;
    
    // Follower circle
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      border: 1px solid var(--color-accent-green);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
      display: none;
    `;
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
  }

  bindEvents() {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      this.cursor.style.display = 'block';
      this.cursorFollower.style.display = 'block';
      
      this.cursor.style.left = mouseX - 4 + 'px';
      this.cursor.style.top = mouseY - 4 + 'px';
    });
    
    // Smooth follower animation
    const animateFollower = () => {
      followerX = lerp(followerX, mouseX, 0.1);
      followerY = lerp(followerY, mouseY, 0.1);
      
      this.cursorFollower.style.left = followerX - 16 + 'px';
      this.cursorFollower.style.top = followerY - 16 + 'px';
      
      requestAnimationFrame(animateFollower);
    };
    animateFollower();
    
    // Expand cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .brand-card, .vertical-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(1.5)';
        this.cursorFollower.style.transform = 'scale(1.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursorFollower.style.transform = 'scale(1)';
      });
    });
  }
}

// ========== LAZY LOADING IMAGES ==========
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      this.images.forEach(img => imageObserver.observe(img));
    }
  }
}

// ========== PERFORMANCE MONITORING ==========
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Silently fail if not supported
      }
    }
  }
}

// ========== INITIALIZE ALL MODULES ==========
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  new HeaderController();
  new SmoothScroll();
  new ScrollReveal();
  new NumberCounter();
  new LazyImageLoader();
  
  // Premium interactions
  new MagneticButton();
  new ParallaxController();
  new TextReveal();
  
  // Optional premium features
  // new CustomCursor(); // Uncomment for custom cursor
  
  // Performance monitoring (development only)
  // new PerformanceMonitor(); // Uncomment for performance tracking
  
  console.log('Simple Media Network - Premium experience initialized');
});

// ========== RESPONSIVE BEHAVIOR ==========
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-initialize components that need to know about size changes
    console.log('Window resized, recalculating...');
  }, 250);
});

// ========== ACCESSIBILITY ENHANCEMENTS ==========
document.addEventListener('keydown', (e) => {
  // Add visible focus for keyboard navigation
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========== EXPORT FOR EXTERNAL USE ==========
window.SimpleMediaNetwork = {
  version: '2.0.0',
  features: {
    scrollReveal: true,
    numberCounters: true,
    magneticHover: true,
    parallax: true,
    textReveal: true
  }
};