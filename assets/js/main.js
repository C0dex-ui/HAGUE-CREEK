/**
 * HAGUE CREEK LAND BROKERAGE — MAIN JAVASCRIPT
 * Handles navigation scroll states, mobile menu toggle, FAQ accordions, 
 * scroll reveals, and mock listings filter behavior.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFaqAccordion();
  initScrollReveals();
  initMockSearch();
  initPdfDownload();
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
  const toggleBtn = document.getElementById('nav-toggle');
  const navPanel = document.getElementById('mobile-nav-panel');
  if (!toggleBtn || !navPanel) return;

  const toggleMenu = () => {
    const isActive = toggleBtn.classList.toggle('active');
    navPanel.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive);
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu if links are clicked
  const links = navPanel.querySelectorAll('.mobile-menu-link, .mobile-sub-link');
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
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null, // Viewport
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before element is fully visible
    threshold: 0.15 // 15% visibility required
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 5. Mock Search & Listing Filter Submission Action
 */
function initMockSearch() {
  const searchForm = document.getElementById('hero-search-form');
  if (!searchForm) return;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get filter inputs
    const type = document.getElementById('search-type')?.value || 'any';
    const county = document.getElementById('search-county')?.value || 'any';
    const acreage = document.getElementById('search-acreage')?.value || 'any';
    const price = document.getElementById('search-price')?.value || 'any';

    // Mock search confirmation popup
    alert(`Searching Listings:\n- Type: ${type}\n- County: ${county}\n- Acreage: ${acreage}\n- Max Price: ${price}\n\nNote: The listings filter system is a Phase 1 mockup. Real listing data will load dynamically in Phase 3.`);
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
