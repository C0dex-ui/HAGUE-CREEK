/**
 * HAGUE CREEK — Homepage interactions + motion system
 * Inspired by premium MotionSites / luxury RE patterns:
 * staged hero entrance, stagger grids, parallax, scroll progress
 */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initFaqAccordion();
  initCountUp(); // before stagger so welcome can call __runWelcomeCounts
  initScrollReveals();
  initStaggerGroups();
  initHeroParallax();
  initScrollProgress();
  initSmoothAnchors();
  initListingsFilter();
  initFeaturedCarousel();
  initTestimonialCarousel();
  initLeadForm();
  initJumpFilters();
  initFloatBar();
  initPdfDownload();
});

/* --------------------------------------------------------------------------
   Preloader → then hero entrance
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const barFill = document.getElementById('preloader-bar-fill');
  const counterEl = document.getElementById('preloader-counter');

  const finish = () => {
    document.body.classList.add('hero-ready');
    document.body.classList.remove('body-locked');
  };

  if (!preloader || prefersReducedMotion()) {
    if (preloader) {
      preloader.classList.add('done');
      setTimeout(() => preloader.remove(), 200);
    }
    finish();
    return;
  }

  document.body.classList.add('body-locked');

  const duration = 1400;
  let startTime = null;

  function tick(ts) {
    if (!startTime) startTime = ts;
    const ratio = Math.min((ts - startTime) / duration, 1);
    if (counterEl) counterEl.textContent = String(Math.floor(ratio * 100)).padStart(3, '0');
    if (barFill) barFill.style.transform = `scaleX(${ratio})`;

    if (ratio < 1) {
      requestAnimationFrame(tick);
    } else {
      preloader.classList.add('done');
      // Slight beat after curtain so hero staged entrance feels intentional
      setTimeout(() => {
        finish();
        preloader.remove();
      }, 280);
    }
  }

  requestAnimationFrame(tick);
}

/* --------------------------------------------------------------------------
   Sticky header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('header-nav');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Mobile menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navPanel = document.getElementById('mobile-nav-menu');
  if (!toggleBtn || !navPanel) return;

  const close = () => {
    toggleBtn.classList.remove('active');
    navPanel.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navPanel.setAttribute('aria-hidden', 'true');
  };

  toggleBtn.addEventListener('click', () => {
    const open = toggleBtn.classList.toggle('active');
    navPanel.classList.toggle('active', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    navPanel.setAttribute('aria-hidden', String(!open));
  });

  // Mobile accordion submenus (Properties, Resources)
  navPanel.querySelectorAll('.mobile-sub-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.mobile-has-sub');
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  navPanel.querySelectorAll('.mobile-menu-link').forEach((link) => {
    link.addEventListener('click', close);
  });
}

/* --------------------------------------------------------------------------
   FAQ accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const oc = other.querySelector('.accordion-content');
          if (oc) oc.style.maxHeight = null;
          const ob = other.querySelector('.accordion-header');
          if (ob) ob.setAttribute('aria-expanded', 'false');
        }
      });

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

/* --------------------------------------------------------------------------
   Scroll reveals (expo ease via CSS)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  els.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   Stagger groups (grids) + welcome metrics
   -------------------------------------------------------------------------- */
function initStaggerGroups() {
  const groups = document.querySelectorAll(
    '.stagger-children, .welcome-wrap, .process-grid, .services-grid, .listings-grid, .team-grid, .blog-grid, .neighborhoods-grid, .categories-grid'
  );
  if (!groups.length) return;

  if (prefersReducedMotion()) {
    groups.forEach((g) => g.classList.add('is-inview'));
    // Still jump counts to final values
    if (typeof window.__runWelcomeCounts === 'function') window.__runWelcomeCounts();
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        entry.target.querySelectorAll('.reveal').forEach((r) => r.classList.add('active'));

        // Start ALL welcome metric counters when welcome band enters view
        if (
          entry.target.classList.contains('welcome-wrap') ||
          entry.target.querySelector?.('.welcome-metrics')
        ) {
          if (typeof window.__runWelcomeCounts === 'function') {
            // slight delay so numbers animate after metrics fade in
            setTimeout(() => window.__runWelcomeCounts(), 280);
          }
        }

        obs.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );

  groups.forEach((g) => {
    if (
      !g.classList.contains('stagger-children') &&
      (g.classList.contains('process-grid') ||
        g.classList.contains('services-grid') ||
        g.classList.contains('listings-grid') ||
        g.classList.contains('team-grid') ||
        g.classList.contains('blog-grid') ||
        g.classList.contains('neighborhoods-grid') ||
        g.classList.contains('categories-grid'))
    ) {
      g.classList.add('stagger-children');
    }
    io.observe(g);
  });
}

/* --------------------------------------------------------------------------
   Hero parallax (subtle — luxury RE feel)
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const video = document.querySelector('.hero-bg-video');
  const hero = document.getElementById('hero-section');
  if (!video || !hero || prefersReducedMotion()) return;

  let ticking = false;

  const update = () => {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      ticking = false;
      return;
    }
    const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    const y = progress * 48;
    video.style.transform = `scale(1.06) translate3d(0, ${y}px, 0)`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

/* --------------------------------------------------------------------------
   Scroll progress bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar || prefersReducedMotion()) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Smooth anchor offsets (native smooth + focus)
   -------------------------------------------------------------------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });
}

/* --------------------------------------------------------------------------
   Unified listings system — hero search form ↔ status tabs ↔ listing cards
   Single filter state drives cards, tabs, chips, counts, and load-more.
   -------------------------------------------------------------------------- */
function initListingsFilter() {
  const cards = Array.from(document.querySelectorAll('.listing-card'));
  const tabs = Array.from(document.querySelectorAll('.filter-tab'));
  const grid = document.getElementById('listings-grid');
  const section = document.getElementById('listings-section');
  const loadMoreBtn = document.getElementById('load-more-listings');
  const searchForm = document.getElementById('hero-search-form');
  const clearBtn = document.getElementById('listings-clear-btn');
  const activeFiltersEl = document.getElementById('listings-active-filters');
  const locationInput = document.getElementById('search-location');
  const typeSelect = document.getElementById('search-type');
  const statusSelect = document.getElementById('search-status');
  const heroHint = document.getElementById('hero-search-hint');

  if (!cards.length) return;

  const INITIAL_COUNT = 4;
  const STATUS_KEYS = ['available', 'pending', 'sold'];
  const TYPE_KEYS = ['ranch', 'agriculture', 'recreational', 'riverfront'];

  const state = {
    location: '',
    type: '',
    status: '', // '' | available | pending | sold
    showAll: false,
    fromHero: false,
  };

  function clearNoResults() {
    grid?.querySelector('.no-results-msg')?.remove();
  }

  /** Match a card against location + type + status (AND). */
  function cardMatches(card, overrides = {}) {
    const location = overrides.location !== undefined ? overrides.location : state.location;
    const typeFilter = overrides.type !== undefined ? overrides.type : state.type;
    const statusFilter = overrides.status !== undefined ? overrides.status : state.status;

    const status = (card.dataset.status || '').toLowerCase();
    const county = (card.dataset.county || '').toLowerCase();
    const type = (card.dataset.type || '').toLowerCase();
    const searchBlob = (card.dataset.search || '').toLowerCase();
    const title = (card.querySelector('.listing-title')?.textContent || '').toLowerCase();
    const locText = (card.querySelector('.listing-loc')?.textContent || '').toLowerCase();
    const q = (location || '').toLowerCase().trim();

    const locOk =
      !q ||
      searchBlob.includes(q) ||
      title.includes(q) ||
      county.includes(q) ||
      locText.includes(q) ||
      type.includes(q);

    const typeOk = !typeFilter || type === typeFilter;
    const statusOk = !statusFilter || status === statusFilter;

    return locOk && typeOk && statusOk;
  }

  function hasActiveFilters() {
    return Boolean(state.location || state.type || state.status);
  }

  function updateTabCounts() {
    // Counts respect location + type filters, but not status (so tabs stay useful)
    const base = { all: 0, available: 0, pending: 0, sold: 0 };
    cards.forEach((card) => {
      if (!cardMatches(card, { status: '' })) return;
      base.all += 1;
      const s = (card.dataset.status || '').toLowerCase();
      if (base[s] !== undefined) base[s] += 1;
    });

    document.querySelectorAll('[data-count-for]').forEach((el) => {
      const key = el.getAttribute('data-count-for');
      if (key && base[key] !== undefined) el.textContent = String(base[key]);
    });
  }

  function updateResultsBar(visibleCount, matchCount) {
    const resultsText = document.getElementById('listings-results-text');
    if (!resultsText) return;

    if (matchCount === 0) {
      resultsText.innerHTML = `No listings match your search`;
    } else if (hasActiveFilters()) {
      resultsText.innerHTML = `Showing <strong>${visibleCount}</strong> of <strong>${matchCount}</strong> matching listing${matchCount === 1 ? '' : 's'}`;
    } else {
      resultsText.innerHTML = `Showing <strong>${visibleCount}</strong> of <strong>${matchCount}</strong> listing${matchCount === 1 ? '' : 's'}`;
    }
  }

  function updateHeroHint(matchCount) {
    if (!heroHint) return;
    if (!hasActiveFilters()) {
      heroHint.textContent = 'Filters the Arizona land listings below';
      return;
    }
    if (matchCount === 0) {
      heroHint.textContent = 'No listings match — try another county, type, or status';
    } else {
      heroHint.textContent = `${matchCount} listing${matchCount === 1 ? '' : 's'} match — scrolled to portfolio`;
    }
  }

  function updateActiveFiltersUI() {
    const chips = [];
    if (state.location) {
      const display = locationInput?.value?.trim() || state.location;
      chips.push(`Keyword: “${display}”`);
    }
    if (state.type) {
      const label = typeSelect?.selectedOptions?.[0]?.text || state.type;
      chips.push(`Type: ${label}`);
    }
    if (state.status) {
      const label =
        state.status === 'available'
          ? 'For Sale'
          : state.status.charAt(0).toUpperCase() + state.status.slice(1);
      chips.push(`Status: ${label}`);
    }

    const hasFilters = chips.length > 0;
    if (clearBtn) clearBtn.hidden = !hasFilters;
    if (activeFiltersEl) {
      activeFiltersEl.hidden = !hasFilters;
      activeFiltersEl.innerHTML = hasFilters
        ? chips.map((c) => `<span class="filter-chip">${c}</span>`).join('')
        : '';
    }
  }

  function syncHeroFromState() {
    if (locationInput) {
      // Keep user casing if they typed it; otherwise restore from state
      if ((locationInput.value || '').toLowerCase().trim() !== state.location) {
        locationInput.value = state.location
          ? state.location.charAt(0).toUpperCase() + state.location.slice(1)
          : '';
      }
    }
    if (typeSelect) typeSelect.value = state.type;
    if (statusSelect) statusSelect.value = state.status;
  }

  function syncTabsFromState() {
    const tabKey = state.status || 'all';
    tabs.forEach((t) => {
      const key = t.dataset.filter || 'all';
      const active = key === tabKey;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function pulseSection() {
    if (!section) return;
    section.classList.remove('listings-filter-flash');
    // reflow so animation can restart
    void section.offsetWidth;
    section.classList.add('listings-filter-flash');
    window.setTimeout(() => section.classList.remove('listings-filter-flash'), 1400);
  }

  function scrollToListings() {
    if (!section) return;
    section.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    pulseSection();
  }

  function renderListings({ scroll = false } = {}) {
    clearNoResults();
    syncTabsFromState();
    updateActiveFiltersUI();
    updateTabCounts();

    let matchCount = 0;
    let visibleCount = 0;
    const useLimit = !state.showAll && !hasActiveFilters();

    cards.forEach((card) => {
      const matches = cardMatches(card);
      if (!matches) {
        card.classList.add('is-hidden');
        card.classList.remove('listing-match-pulse');
        return;
      }
      matchCount++;
      const shouldShow = !useLimit || visibleCount < INITIAL_COUNT;
      if (shouldShow) {
        card.classList.remove('is-hidden', 'is-hidden-initial');
        visibleCount++;
        if (state.fromHero) {
          card.classList.add('listing-match-pulse');
          window.setTimeout(() => card.classList.remove('listing-match-pulse'), 1200);
        }
      } else {
        card.classList.add('is-hidden');
      }
    });

    updateResultsBar(visibleCount, matchCount);
    if (state.fromHero || hasActiveFilters()) updateHeroHint(matchCount);
    else if (heroHint) heroHint.textContent = 'Filters the Arizona land listings below';

    if (loadMoreBtn) {
      const moreExist = useLimit && matchCount > INITIAL_COUNT;
      loadMoreBtn.style.display = moreExist ? 'inline-flex' : 'none';
      loadMoreBtn.hidden = !moreExist;
    }

    if (matchCount === 0 && grid) {
      const msg = document.createElement('div');
      msg.className = 'no-results-msg';
      msg.innerHTML = `
        <h3>No properties found</h3>
        <p>Try another county (Cochise, Yavapai, Pima), type, or status — or <button type="button" class="linkish" id="no-results-clear">clear your search</button>.</p>
      `;
      grid.appendChild(msg);
      msg.querySelector('#no-results-clear')?.addEventListener('click', clearSearch);
    }

    if (scroll) scrollToListings();

    state.fromHero = false;
  }

  function applyTabFilter(filter) {
    const key = (filter || 'all').toLowerCase();

    if (key === 'all') {
      // Full reset when jumping to "all"
      state.location = '';
      state.type = '';
      state.status = '';
      state.showAll = true;
      syncHeroFromState();
      renderListings();
      return;
    }

    if (STATUS_KEYS.includes(key)) {
      state.status = key;
      state.showAll = true;
      syncHeroFromState();
      renderListings();
      return;
    }

    if (TYPE_KEYS.includes(key)) {
      state.type = key;
      state.status = '';
      state.showAll = true;
      syncHeroFromState();
      renderListings();
      return;
    }

    // County / free keyword from nav or area cards
    state.location = key;
    state.status = '';
    state.showAll = true;
    syncHeroFromState();
    renderListings();
  }

  function readHeroForm() {
    state.location = (locationInput?.value || '').toLowerCase().trim();
    state.type = typeSelect?.value || '';
    state.status = statusSelect?.value || '';
    state.showAll = true;
    state.fromHero = true;
  }

  function clearSearch() {
    state.location = '';
    state.type = '';
    state.status = '';
    state.showAll = false;
    state.fromHero = false;
    if (locationInput) locationInput.value = '';
    if (typeSelect) typeSelect.value = '';
    if (statusSelect) statusSelect.value = '';
    if (heroHint) heroHint.textContent = 'Filters the Arizona land listings below';
    renderListings();
  }

  // Initial view: first row only
  cards.forEach((card, i) => {
    if (i >= INITIAL_COUNT) card.classList.add('is-hidden');
  });
  renderListings();

  // Status tabs under listings
  tabs.forEach((tab) => {
    tab.setAttribute('role', 'tab');
    tab.addEventListener('click', () => {
      applyTabFilter(tab.dataset.filter || 'all');
    });
  });

  loadMoreBtn?.addEventListener('click', () => {
    state.showAll = true;
    renderListings();
  });

  clearBtn?.addEventListener('click', clearSearch);

  // Hero horizontal search → listing cards
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    readHeroForm();
    renderListings({ scroll: true });

    const btn = document.getElementById('hero-search-submit');
    if (btn) {
      btn.classList.add('is-searching');
      window.setTimeout(() => btn.classList.remove('is-searching'), 600);
    }
  });

  // Live apply when type / status change (same pipeline as submit)
  [typeSelect, statusSelect].forEach((el) => {
    el?.addEventListener('change', () => {
      readHeroForm();
      state.fromHero = false;
      renderListings();
    });
  });

  // Debounced keyword typing while focused (optional live filter without leaving hero)
  let locTimer = null;
  locationInput?.addEventListener('input', () => {
    window.clearTimeout(locTimer);
    locTimer = window.setTimeout(() => {
      // Only live-filter if user already has type/status set or has scrolled to listings
      const nearListings = section && section.getBoundingClientRect().top < window.innerHeight;
      if (nearListings || typeSelect?.value || statusSelect?.value) {
        readHeroForm();
        state.fromHero = false;
        renderListings();
      }
    }, 320);
  });

  // Jump filters from nav / county cards
  window.__applyListingFilter = (filter) => {
    applyTabFilter(filter);
    scrollToListings();
  };

  window.__clearListingSearch = clearSearch;
}

/* --------------------------------------------------------------------------
   Featured carousel
   -------------------------------------------------------------------------- */
function initFeaturedCarousel() {
  const track = document.getElementById('featured-track');
  const prev = document.getElementById('featured-prev');
  const next = document.getElementById('featured-next');
  const dotsWrap = document.getElementById('featured-dots');
  if (!track) return;

  const slides = track.querySelectorAll('.featured-slide');
  if (!slides.length) return;

  let index = 0;

  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'featured-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to featured property ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap?.querySelectorAll('.featured-dot').forEach((d, di) => {
      d.classList.toggle('active', di === index);
    });
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));

  let timer = setInterval(() => goTo(index + 1), 7000);
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(index + 1), 7000);
  });
}

/* --------------------------------------------------------------------------
   Testimonials carousel + pagination
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonials-track');
  const dotsWrap = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const pageLabel = document.getElementById('testimonial-page-label');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;
  const total = slides.length;

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Client review ${i + 1} of ${total}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goTo(i);
        restartTimer();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap?.querySelectorAll('.testimonial-dot').forEach((d, di) => {
      const on = di === index;
      d.classList.toggle('active', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (pageLabel) pageLabel.textContent = `${index + 1} / ${total}`;
  }

  function restartTimer() {
    if (prefersReducedMotion()) return;
    if (timer) clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 6500);
  }

  prevBtn?.addEventListener('click', () => {
    goTo(index - 1);
    restartTimer();
  });
  nextBtn?.addEventListener('click', () => {
    goTo(index + 1);
    restartTimer();
  });

  const carousel = track.closest('.testimonial-carousel');
  carousel?.addEventListener('mouseenter', () => {
    if (timer) clearInterval(timer);
  });
  carousel?.addEventListener('mouseleave', restartTimer);

  // Touch swipe
  let touchX = null;
  track.addEventListener(
    'touchstart',
    (e) => {
      touchX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  track.addEventListener(
    'touchend',
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 40) {
        goTo(index + (dx < 0 ? 1 : -1));
        restartTimer();
      }
      touchX = null;
    },
    { passive: true }
  );

  goTo(0);
  restartTimer();
}

/* --------------------------------------------------------------------------
   Lead form element
   -------------------------------------------------------------------------- */
function initLeadForm() {
  document.querySelectorAll('.lead-form, .hc-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value?.trim() || 'Visitor';
      const email = form.querySelector('[name="email"]')?.value?.trim() || '';
      const phone = form.querySelector('[name="phone"]')?.value?.trim() || '';
      const intent = form.querySelector('[name="intent"]')?.value || '';
      const acreage = form.querySelector('[name="acreage"]')?.value || '';
      const budget = form.querySelector('[name="budget"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value?.trim() || '';

      form.classList.add('is-sending');

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Intent: ${intent}`,
        `Acreage: ${acreage}`,
        `Budget: ${budget}`,
        '',
        message,
      ].join('\n');

      const subject = encodeURIComponent(`Hague Creek inquiry — ${intent || 'consultation'}`);
      const mailto = `mailto:info@haguecreek.com?subject=${subject}&body=${encodeURIComponent(body)}`;

      const success = form.querySelector('#form-success') || document.getElementById('form-success');
      if (success) {
        success.hidden = false;
      }

      // Open client email with prefilled inquiry (production can swap to API endpoint)
      window.setTimeout(() => {
        window.location.href = mailto;
        form.classList.remove('is-sending');
        form.reset();
        // re-seed count-up placeholders if any
        form.querySelectorAll('.count-up').forEach(() => {});
      }, 450);
    });
  });
}

/* --------------------------------------------------------------------------
   County / category jump filters
   -------------------------------------------------------------------------- */
function initJumpFilters() {
  document.querySelectorAll('[data-jump-filter]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const filter = el.getAttribute('data-jump-filter');
      if (!filter || !window.__applyListingFilter) return;
      e.preventDefault();
      window.__applyListingFilter(filter);
    });
  });
}

/* --------------------------------------------------------------------------
   Animated stats count-up — ALL Welcome metrics (and any .count-up)
   -------------------------------------------------------------------------- */
function initCountUp() {
  const nodes = Array.from(document.querySelectorAll('.count-up'));
  if (!nodes.length) return;

  const formatValue = (value, el) => {
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const formatted = Number(value).toLocaleString('en-US');
    return prefix + formatted + suffix;
  };

  // Reset all counters to zero on load
  nodes.forEach((el) => {
    el.textContent = formatValue(0, el);
    el.dataset.counted = '0';
  });

  const animate = (el, delayMs = 0) => {
    if (el.dataset.counted === '1') return;
    el.dataset.counted = '1';

    const target = Number(el.dataset.target || 0);
    const duration = Number(el.dataset.duration || 2000);

    el.textContent = formatValue(0, el);

    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        const value = Math.round(target * eased);
        el.textContent = formatValue(value, el);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = formatValue(target, el);
      };
      requestAnimationFrame(step);
    };

    if (delayMs > 0) setTimeout(run, delayMs);
    else run();
  };

  /** Animate every .count-up inside Welcome (or a root) — public so stagger can call it */
  const runWelcomeCounts = () => {
    const welcomeCounters = document.querySelectorAll(
      '.welcome-metrics .count-up, #welcome-section .count-up, [data-count-group] .count-up'
    );
    const list = welcomeCounters.length ? welcomeCounters : nodes;
    list.forEach((el, i) => {
      el.dataset.counted = '0'; // allow run
      animate(el, i * 140);
    });
  };

  window.__runWelcomeCounts = runWelcomeCounts;

  if (prefersReducedMotion()) {
    nodes.forEach((el) => {
      el.textContent = formatValue(Number(el.dataset.target || 0), el);
      el.dataset.counted = '1';
    });
    return;
  }

  // Observe the whole welcome section + metrics row so all four fire together
  const roots = document.querySelectorAll(
    '#welcome-section, .welcome-wrap, .welcome-metrics, [data-count-group]'
  );

  let started = false;
  const startOnce = () => {
    if (started) return;
    started = true;
    runWelcomeCounts();
  };

  if (!roots.length) {
    // Fallback: each node on its own
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        startOnce();
        roots.forEach((r) => obs.unobserve(r));
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.15 }
  );

  roots.forEach((r) => io.observe(r));
}

/* --------------------------------------------------------------------------
   Floating conversion bar (after first scroll)
   -------------------------------------------------------------------------- */
function initFloatBar() {
  const bar = document.getElementById('float-bar');
  const closeBtn = document.getElementById('float-bar-close');
  if (!bar) return;

  bar.hidden = false;
  let dismissed = sessionStorage.getItem('hc-float-dismissed') === '1';

  const update = () => {
    if (dismissed) {
      bar.classList.remove('is-visible');
      return;
    }
    const show = window.scrollY > window.innerHeight * 0.55;
    bar.classList.toggle('is-visible', show);
  };

  closeBtn?.addEventListener('click', () => {
    dismissed = true;
    sessionStorage.setItem('hc-float-dismissed', '1');
    bar.classList.remove('is-visible');
  });

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* --------------------------------------------------------------------------
   PDF specs → prefill contact form
   -------------------------------------------------------------------------- */
function initPdfDownload() {
  document.querySelectorAll('.pdf-download-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const propertyName = btn.getAttribute('data-property') || 'Selected Property';
      const contactSec = document.getElementById('contact-section');
      contactSec?.scrollIntoView({ behavior: 'smooth' });

      const messageField = document.getElementById('form-message');
      if (messageField) {
        const now = new Date();
        messageField.value = `Please send the PDF brochure / specs for "${propertyName}".\n[Requested: ${now.toLocaleString()}]`;
      }
      const intent = document.getElementById('form-intent');
      if (intent) intent.value = 'buy';
      setTimeout(() => document.getElementById('form-name')?.focus(), 700);
    });
  });
}
