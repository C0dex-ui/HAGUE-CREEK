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
  initMarquee();
  initExplorationsParallax();
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
  const heroTabs = document.querySelectorAll('.hero-tab');
  const gridContainer = document.querySelector('.listings-grid');
  
  if (!searchForm || cards.length === 0) return;

  // 1. Hero Tab Click Behavior
  heroTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const isOffMarket = tab.textContent.toLowerCase().includes('off-market');
      
      // Remove any existing no-results message
      const existingMsg = document.querySelector('.no-results-msg');
      if (existingMsg) existingMsg.remove();

      if (isOffMarket) {
        // Hide all listings and show a notice
        cards.forEach(card => card.style.display = 'none');
        if (gridContainer) {
          const msg = document.createElement('div');
          msg.className = 'no-results-msg text-center';
          msg.style.cssText = 'grid-column: 1/-1; color: var(--clr-text-light); padding: 4rem 2rem; width: 100%;';
          msg.innerHTML = '<h3 style="font-family: var(--font-serif); color: var(--clr-primary); margin-bottom: 10px;">No Off-Market Listings</h3><p>We currently have no off-market listings available. Please contact Arthur Hague directly for off-market acquisitions.</p>';
          gridContainer.appendChild(msg);
        }
      } else {
        // Reset to show all active listings
        cards.forEach(card => {
          card.style.display = 'flex';
          card.classList.remove('fade-out');
        });
        tabs.forEach(t => t.classList.remove('active'));
        const allTab = Array.from(tabs).find(t => t.getAttribute('data-filter') === 'all');
        if (allTab) allTab.classList.add('active');
      }

      // Scroll smoothly to properties results area
      const resultsSec = document.getElementById('listings-section');
      if (resultsSec) {
        resultsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. County Tab Filtering Logic
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      
      // Reset hero tabs to "For Sale"
      heroTabs.forEach(t => t.classList.remove('active'));
      const forSaleTab = Array.from(heroTabs).find(t => t.textContent.toLowerCase().includes('for sale'));
      if (forSaleTab) forSaleTab.classList.add('active');

      // Remove any existing no-results message
      const existingMsg = document.querySelector('.no-results-msg');
      if (existingMsg) existingMsg.remove();

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

  // 3. Hero Search Form Filtering (Pill Search Input)
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset hero tabs to "For Sale"
    heroTabs.forEach(t => t.classList.remove('active'));
    const forSaleTab = Array.from(heroTabs).find(t => t.textContent.toLowerCase().includes('for sale'));
    if (forSaleTab) forSaleTab.classList.add('active');

    // Remove any existing no-results message
    const existingMsg = document.querySelector('.no-results-msg');
    if (existingMsg) existingMsg.remove();

    const query = document.getElementById('hero-search-input').value.toLowerCase().trim();
    let matchCount = 0;

    cards.forEach(card => {
      const cardCounty = card.getAttribute('data-county').toLowerCase();
      const cardTitle = card.querySelector('.listing-title').textContent.toLowerCase();
      const cardAcreageText = card.querySelector('.meta-item:nth-child(1) .meta-val').textContent.toLowerCase();
      const cardZoning = card.querySelector('.meta-item:nth-child(2) .meta-val').textContent.toLowerCase();

      const matchesQuery = cardCounty.includes(query) || 
                           cardTitle.includes(query) || 
                           cardAcreageText.includes(query) || 
                           cardZoning.includes(query);

      if (matchesQuery) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.classList.remove('fade-out');
        }, 10);
        matchCount++;
      } else {
        card.classList.add('fade-out');
        setTimeout(() => {
          card.style.display = 'none';
        }, 400);
      }
    });

    if (matchCount === 0 && gridContainer) {
      const msg = document.createElement('div');
      msg.className = 'no-results-msg text-center';
      msg.style.cssText = 'grid-column: 1/-1; color: var(--clr-text-light); padding: 4rem 2rem; width: 100%;';
      msg.innerHTML = '<h3 style="font-family: var(--font-serif); color: var(--clr-primary); margin-bottom: 10px;">No Properties Found</h3><p>We couldn\'t find any properties matching "' + query + '". Try searching for "Cochise", "Yavapai", "RU-4", or "acres".</p>';
      gridContainer.appendChild(msg);
    }

    // Reset county tab active states since manual custom filter is run
    tabs.forEach(t => t.classList.remove('active'));
    const allTab = Array.from(tabs).find(t => t.getAttribute('data-filter') === 'all');
    if (allTab) allTab.classList.add('active');

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
  const counterEl = document.getElementById('preloader-counter');
  if (!preloader || !barFill) return;

  // Lock body scroll
  document.body.classList.add('body-locked');

  // Rotating words cycle
  const words = document.querySelectorAll('.rotating-word');
  let wordIndex = 0;
  const wordInterval = setInterval(() => {
    if (words.length > 0) {
      words.forEach(w => w.classList.remove('active'));
      wordIndex = (wordIndex + 1) % words.length;
      words[wordIndex].classList.add('active');
    }
  }, 675);

  // requestAnimationFrame Counter
  const duration = 2700; 
  const startCount = 0;
  const endCount = 100;
  let startTime = null;

  function animateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progressRatio = Math.min(elapsed / duration, 1);
    
    const currentCount = Math.floor(progressRatio * (endCount - startCount));
    
    if (counterEl) {
      counterEl.textContent = String(currentCount).padStart(3, '0');
    }
    if (barFill) {
      barFill.style.transform = `scaleX(${progressRatio})`;
    }

    if (progressRatio < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      // Count reached 100
      clearInterval(wordInterval);
      if (counterEl) counterEl.textContent = '100';
      if (barFill) barFill.style.transform = 'scaleX(1)';
      
      // Complete delay, then fade out
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('body-locked');
        
        // Trigger H1 line-reveal on preloader exit
        setTimeout(() => {
          const h1Reveal = document.querySelector('.hero h1 .reveal-slide-up');
          if (h1Reveal) h1Reveal.classList.add('active');
        }, 400);
      }, 400);
    }
  }

  requestAnimationFrame(animateCounter);
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

/**
 * 10. Infinite GSAP Marquee Strip
 */
function initMarquee() {
  const marquee = document.querySelector('.marquee-strip');
  if (!marquee) return;
  
  // Clone content for seamless looping
  const clone = marquee.innerHTML;
  marquee.innerHTML += clone;

  gsap.to('.marquee-strip', {
    xPercent: -50,
    ease: 'none',
    duration: 35,
    repeat: -1
  });
}

/**
 * 11. Explorations Column Scroll Parallax & Left Pinning
 */
function initExplorationsParallax() {
  if (window.innerWidth <= 1024) return;
  
  const pinContainer = document.getElementById('explorations-pin-container');
  const leftPanel = document.getElementById('explorations-left-panel');
  if (!pinContainer || !leftPanel) return;

  // Pin the left panel as the user scrolls past the gallery
  ScrollTrigger.create({
    trigger: '#explorations-section',
    start: 'top top',
    end: 'bottom bottom',
    pin: '#explorations-left-panel',
    pinSpacing: false
  });

  // Animate left column upwards relative to scroll
  gsap.fromTo('.parallax-column.col-left', 
    { y: '8%' }, 
    { 
      y: '-8%', 
      ease: 'none', 
      scrollTrigger: {
        trigger: '#explorations-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );

  // Animate right column downwards relative to scroll
  gsap.fromTo('.parallax-column.col-right', 
    { y: '-8%' }, 
    { 
      y: '8%', 
      ease: 'none', 
      scrollTrigger: {
        trigger: '#explorations-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
}
