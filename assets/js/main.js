/**
 * HAGUE CREEK LAND BROKERAGE — MAIN JAVASCRIPT
 * Handles navigation scroll states, mobile menu toggle, FAQ accordions, 
 * scroll reveals, and mock listings filter behavior.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initFaqAccordion();
  initScrollReveals();
  initMockSearch();
  initPdfDownload();
  initCustomCursor();
  initMagneticElements();
});

/**
 * 1. Sticky Header Navigation Effect
 */
function initStickyHeader() {
  const header = document.getElementById('header-nav');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and on scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Mobile Menu Panel Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navPanel = document.getElementById('mobile-nav-menu');
  if (!toggleBtn || !navPanel) return;

  const toggleMenu = () => {
    const isActive = toggleBtn.classList.toggle('active');
    navPanel.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive);
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu if links are clicked
  const links = navPanel.querySelectorAll('.mobile-menu-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navPanel.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 3. FAQ Accordion Height Interpolation
 */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
          const otherBtn = otherItem.querySelector('.accordion-header');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current accordion
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 4. Scroll-Triggered Reveal Animations using IntersectionObserver
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-slide-up');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Also trigger child reveals if parent is intersected
        const children = entry.target.querySelectorAll('.reveal-slide-up');
        children.forEach(child => child.classList.add('active'));
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 5. Dynamic Search & Listing Filter System
 */
function initMockSearch() {
  const searchForm = document.getElementById('hero-search-form');
  const cards = document.querySelectorAll('.listing-card');
  const tabs = document.querySelectorAll('.county-tab');
  
  if (!searchForm || cards.length === 0) return;

  // County Tab Filtering Logic
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      
      // Toggle active tab class
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        const county = card.getAttribute('data-county');
        if (filter === 'all' || county === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.remove('fade-out');
          }, 10);
        } else {
          card.classList.add('fade-out');
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // Hero search form filtering
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const countyFilter = document.getElementById('search-county').value;
    const acreageFilter = document.getElementById('search-acreage').value;
    const zoningFilter = document.getElementById('search-zoning').value;
    const priceFilter = document.getElementById('search-price').value;

    cards.forEach(card => {
      const cardCounty = card.getAttribute('data-county');
      const cardAcreageText = card.querySelector('.meta-item:nth-child(1) .meta-val').textContent;
      const cardAcreage = parseInt(cardAcreageText);
      const cardZoning = card.querySelector('.meta-item:nth-child(2) .meta-val').textContent.toLowerCase();
      const cardPriceText = card.querySelector('.listing-price').textContent.replace(/[$,]/g, '');
      const cardPrice = parseInt(cardPriceText);

      // Check County match
      let matchCounty = (countyFilter === 'all' || cardCounty === countyFilter);

      // Check Acreage match
      let matchAcreage = true;
      if (acreageFilter === '10-40') {
        matchAcreage = (cardAcreage >= 10 && cardAcreage <= 40);
      } else if (acreageFilter === '40-160') {
        matchAcreage = (cardAcreage >= 40 && cardAcreage <= 160);
      } else if (acreageFilter === '160+') {
        matchAcreage = (cardAcreage >= 160);
      }

      // Check Zoning match
      let matchZoning = (zoningFilter === 'all' || cardZoning === zoningFilter);

      // Check Price match
      let matchPrice = true;
      if (priceFilter === 'under-200k') {
        matchPrice = (cardPrice < 200000);
      } else if (priceFilter === '200k-500k') {
        matchPrice = (cardPrice >= 200000 && cardPrice <= 500000);
      } else if (priceFilter === '500k+') {
        matchPrice = (cardPrice > 500000);
      }

      if (matchCounty && matchAcreage && matchZoning && matchPrice) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.classList.remove('fade-out');
        }, 10);
      } else {
        card.classList.add('fade-out');
        setTimeout(() => {
          card.style.display = 'none';
        }, 400);
      }
    });

    // Reset tab active states since manual custom filters are run
    tabs.forEach(t => t.classList.remove('active'));
    const defaultTab = Array.from(tabs).find(t => t.getAttribute('data-filter') === countyFilter);
    if (defaultTab) {
      defaultTab.classList.add('active');
    } else {
      const allTab = Array.from(tabs).find(t => t.getAttribute('data-filter') === 'all');
      if (allTab) allTab.classList.add('active');
    }

    // Scroll smoothly to properties results area
    const resultsSec = document.getElementById('listings-section');
    if (resultsSec) {
      resultsSec.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Lead capture forms mock redirect/completion alert
  const leadForms = document.querySelectorAll('.lead-form');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Visitor';
      const email = form.querySelector('[name="email"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      
      alert(`Thank you, ${name}! Your inquiry has been logged. \nEmail: ${email} \nPhone: ${phone}\n\nOur broker will contact you shortly.`);
      form.reset();
    });
  });
}

/**
 * 6. Mock PDF Brochure Download Lead Capture Flow
 */
function initPdfDownload() {
  const pdfButtons = document.querySelectorAll('.pdf-download-btn');
  pdfButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const propertyName = btn.getAttribute('data-property') || 'Selected Property';
      
      // Get contact section
      const contactSec = document.getElementById('contact-section');
      if (!contactSec) return;
      
      // Smooth scroll to form
      contactSec.scrollIntoView({ behavior: 'smooth' });
      
      // Update form message with dynamic download text & timestamp
      const messageField = document.getElementById('form-message');
      if (messageField) {
        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeStr = now.toLocaleTimeString();
        messageField.value = `Please email me the printable PDF brochure for the "${propertyName}" listing. \n[Requested download: ${dateStr} at ${timeStr}]`;
      }
      
      // Set intent select to buy
      const intentSelect = document.getElementById('form-intent');
      if (intentSelect) {
        intentSelect.value = 'buy';
      }
      
      // Focus name input to trigger user interaction
      const nameInput = document.getElementById('form-name');
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 800); // Wait for smooth scroll to complete
      }
    });
  });
}

/**
 * 7. Premium Curtain Preloader
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const barFill = document.getElementById('preloader-bar-fill');
  if (!preloader || !barFill) return;

  // Lock body scroll
  document.body.classList.add('body-locked');

  // Simulate progress loading bar
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Load completed - remove preloader
      setTimeout(() => {
        barFill.style.width = '100%';
        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.remove('body-locked');
          
          // Trigger H1 line-reveal on preloader exit
          setTimeout(() => {
            const h1Reveal = document.querySelector('.hero h1 .reveal-slide-up');
            if (h1Reveal) h1Reveal.classList.add('active');
          }, 400);
        }, 300);
      }, 200);
    } else {
      barFill.style.width = progress + '%';
    }
  }, 60);

  // Fallback in case loading gets stuck or window takes too long
  window.addEventListener('load', () => {
    progress = 100;
  });
}

/**
 * 8. Custom Interactive Magnetic Cursor (Mouse-Follower)
 */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Position variables
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isMoving = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
      cursor.style.display = 'flex';
      isMoving = true;
    }
  }, { passive: true });

  // Use requestAnimationFrame for smooth cursor following (lag interpolation)
  const renderCursor = () => {
    const ease = 0.15; // Speed multiplier for lag
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Set up hover states on interactive links & buttons
  const hovers = document.querySelectorAll('a, button, select, input, textarea, .accordion-header');
  hovers.forEach(el => {
    el.addEventListener('mouseenter', () => {
      // Don't apply general hover circle if inside cards
      if (!el.closest('.listing-card') && !el.closest('.featured-prop-card') && !el.closest('.category-card')) {
        cursor.classList.add('hovering');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });

  // Set up custom text on listing card hovers
  const cards = document.querySelectorAll('.listing-card, .featured-prop-card, .category-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('has-text');
      const textSpan = cursor.querySelector('.custom-cursor-text');
      if (textSpan) textSpan.textContent = 'EXPLORE';
    });
    
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('has-text');
    });

    // Custom cursor text for listing card actions
    const pdfBtn = card.querySelector('.pdf-download-btn');
    if (pdfBtn) {
      pdfBtn.addEventListener('mouseenter', () => {
        const textSpan = cursor.querySelector('.custom-cursor-text');
        if (textSpan) textSpan.textContent = 'PDF';
      });
      pdfBtn.addEventListener('mouseleave', () => {
        const textSpan = cursor.querySelector('.custom-cursor-text');
        if (textSpan) textSpan.textContent = 'EXPLORE';
      });
    }
  });
}

/**
 * 9. Magnetic Elements Effect (Motionsites.ai Pull)
 */
function initMagneticElements() {
  const magnets = document.querySelectorAll('.btn-magnetic');
  if (magnets.length === 0 || window.innerWidth <= 1024) return;

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const bound = btn.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      
      // Pull element towards cursor (max 15px)
      btn.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Smooth return to initial state
      btn.style.transform = '';
    });
  });
}
