// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const contactForm = document.querySelector('.form');
const sections = document.querySelectorAll('section[id]');

// Mobile Navigation Toggle
function toggleMobileNav() {
  navMenu.classList.toggle('show');
  navToggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('show')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
  navMenu.classList.remove('show');
  navToggle.classList.remove('active');
  document.body.style.overflow = '';
}

// Smooth scroll to sections
function scrollToSection(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const headerHeight = header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
  
  // Close mobile nav after clicking
  closeMobileNav();
}

// Header scroll effect
function handleHeaderScroll() {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    header.style.backdropFilter = 'blur(20px)';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
    header.style.backdropFilter = 'blur(10px)';
  }
}

// Active navigation link based on scroll position
function setActiveNavLink() {
  const scrollY = window.scrollY;
  const headerHeight = header.offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Remove active class from all nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current nav link
      if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
      }
    }
  });
}

// Contact form handling
function handleContactForm(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Validate form fields
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields.', 'error');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  const submitButton = this.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'SENDING...';
  submitButton.disabled = true;
  submitButton.style.opacity = '0.7';
  
  setTimeout(() => {
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
    
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = '1';
  }, 2000);
}

// Show form feedback message
function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message--${type}`;
  messageElement.textContent = message;
  
  // Style the message
  messageElement.style.cssText = `
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 2px solid;
    animation: slideInDown 0.3s ease-out;
    ${type === 'success' 
      ? 'background-color: rgba(255, 255, 255, 0.1); color: #ffffff; border-color: #ffffff;' 
      : 'background-color: rgba(255, 100, 100, 0.1); color: #ff6464; border-color: #ff6464;'
    }
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#form-message-animations')) {
    const style = document.createElement('style');
    style.id = 'form-message-animations';
    style.textContent = `
      @keyframes slideInDown {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Insert message before the form
  contactForm.parentNode.insertBefore(messageElement, contactForm);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.style.animation = 'slideInDown 0.3s ease-out reverse';
      setTimeout(() => messageElement.remove(), 300);
    }
  }, 5000);
}

// Intersection Observer for animations
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .education__item, .experience__item');
  
  animatedElements.forEach((element, index) => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    
    observer.observe(element);
  });
}

// Scroll to top functionality
function createScrollToTop() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  
  // Style the button
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    border: 2px solid #000;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  // Show/hide button based on scroll position
  function toggleScrollToTop() {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  }
  
  // Scroll to top when clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add hover effect
  scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.backgroundColor = '#333';
    scrollToTopBtn.style.transform = 'translateY(-4px) scale(1.05)';
    scrollToTopBtn.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.backgroundColor = '#000';
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
  });
  
  window.addEventListener('scroll', throttle(toggleScrollToTop, 100));
}

// Keyboard navigation support
function handleKeyboardNavigation(e) {
  // Close mobile nav with Escape key
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    closeMobileNav();
  }
  
  // Navigate sections with arrow keys when focused
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (document.activeElement.classList.contains('nav__link')) {
      e.preventDefault();
      const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
      let nextIndex;
      
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % navLinks.length;
      } else {
        nextIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
      }
      
      navLinks[nextIndex].focus();
    }
  }
}

// Project card hover effects with enhanced animation
function addProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.03)';
      this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
      
      // Add shimmer effect
      const shimmer = this.querySelector('::before');
      if (shimmer) {
        shimmer.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    });
    
    // Add focus support for keyboard navigation
    card.setAttribute('tabindex', '0');
    card.addEventListener('focus', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('blur', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    });
  });
}

// Enhanced skill tag animations
function addSkillTagAnimations() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(15px)';
    tag.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
  });
}

// Initialize typing effect for hero subtitle
function initTypingEffect() {
  const subtitle = document.querySelector('.hero__subtitle');
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '2px solid #000';
  
  let index = 0;
  function typeText() {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 100);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        subtitle.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  // Start typing effect after page loads
  setTimeout(typeText, 1500);
}

// Parallax effect for hero section
function addParallaxEffect() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  }, 16));
}

// Add smooth reveal animation for sections
function addSectionRevealAnimations() {
  const sectionTitles = document.querySelectorAll('.section__title');
  
  sectionTitles.forEach(title => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate the underline
          const afterElement = entry.target;
          setTimeout(() => {
            afterElement.classList.add('title-revealed');
          }, 300);
        }
      });
    }, { threshold: 0.5 });
    
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    observer.observe(title);
  });
  
  // Add CSS for title reveal animation
  const style = document.createElement('style');
  style.textContent = `
    .section__title::after {
      width: 0;
      transition: width 0.8s ease 0.3s;
    }
    .section__title.title-revealed::after {
      width: 60px;
    }
  `;
  document.head.appendChild(style);
}

// Performance optimization: Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Add loading animation
function addLoadingAnimation() {
  // Add fade-in animation to main elements
  const mainElements = document.querySelectorAll('main > section');
  
  mainElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 + (index * 200));
  });
}

// Enhanced button interactions
function addButtonEnhancements() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    .btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

// Add experience timeline animations
function addTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.experience__item');
  
  timelineItems.forEach((item, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.3 });
    
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    
    observer.observe(item);
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Initialize features
  observeElements();
  createScrollToTop();
  addProjectCardEffects();
  addSkillTagAnimations();
  initTypingEffect();
  addParallaxEffect();
  addSectionRevealAnimations();
  addLoadingAnimation();
  addButtonEnhancements();
  addTimelineAnimations();
  
  // Set initial states
  handleHeaderScroll();
  setActiveNavLink();
});

// Handle resize events
window.addEventListener('resize', function() {
  // Close mobile nav on resize to larger screen
  if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
    closeMobileNav();
  }
});

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  handleHeaderScroll();
  setActiveNavLink();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add smooth scrolling for browsers that don't support it natively
if (!('scrollBehavior' in document.documentElement.style)) {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
  .nav__link.active {
    color: var(--color-primary-hover) !important;
  }
  
  .nav__link.active::after {
    transform: scaleX(1) !important;
  }
  
  .animate-in {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(navStyle);

// Performance monitoring
let startTime = performance.now();

window.addEventListener('load', function() {
  const loadTime = performance.now() - startTime;
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  
  // Add loaded class for any final animations
  document.body.classList.add('loaded');
});

// Error handling for failed image loads or other resources
window.addEventListener('error', function(e) {
  console.warn('Resource failed to load:', e.target);
}, true);

// Add intersection observer polyfill check
if (!window.IntersectionObserver) {
  console.warn('IntersectionObserver not supported, falling back to scroll-based animations');
  
  // Fallback for older browsers
  window.addEventListener('scroll', throttle(() => {
    const animatedElements = document.querySelectorAll('[style*="opacity: 0"]');
    
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }, 100));
}