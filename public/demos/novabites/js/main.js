/* ============================================================
   NOVA BITES — Main JavaScript v2
   Enhanced: 3D card tilt, scroll progress, magnetic buttons,
   ripples, staggered reveals, parallax layers, smooth transitions
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Progress Bar ─────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Navbar Scroll Effect ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    updateProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile Menu ─────────────────────────────────────────── */
  const menuToggle  = document.getElementById('menu-toggle');
  const mobileNav   = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  menuToggle?.addEventListener('click', () => mobileNav?.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileNav?.classList.remove('open'));
  mobileNav?.querySelectorAll('.mobile-nav__link').forEach(link =>
    link.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') mobileNav?.classList.remove('open');
  });

  /* ── Advanced Scroll Reveal (staggered per section) ─────── */
  // Stagger children inside a parent automatically
  document.querySelectorAll('.menu-grid, .nutrition-grid, .impact-grid, .deals-grid, .app-badge-row, .rewards__how-works, .footer__links')
    .forEach(container => {
      container.querySelectorAll(':scope > *').forEach((child, i) => {
        if (!child.classList.contains('reveal') &&
            !child.classList.contains('reveal-left') &&
            !child.classList.contains('reveal-right') &&
            !child.classList.contains('reveal-scale') &&
            !child.classList.contains('reveal-flip')) {
          child.classList.add('reveal');
        }
        child.style.transitionDelay = (i * 0.09) + 's';
      });
    });

  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .reveal-flip, .reveal-blur, .reveal-drop'
  );
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── Nutrition Bar Animation ─────────────────────────────── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.dataset.width || '0%';
        setTimeout(() => { fill.style.width = target; }, 200);
        barObs.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.nutrition-bar__fill').forEach(el => barObs.observe(el));

  /* ── Rewards Progress Bar Animation ─────────────────────── */
  const rewardsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.rewards__progress-fill');
        if (fill) setTimeout(() => { fill.style.width = '68%'; }, 400);
        rewardsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  const rewardsCard = document.querySelector('.rewards__card');
  if (rewardsCard) rewardsObs.observe(rewardsCard);

  /* ── 3D Card Tilt on mouse move ──────────────────────────── */
  function initCardTilt(selector, maxTilt = 12, perspective = 900) {
    document.querySelectorAll(selector).forEach(card => {
      let raf;
      card.addEventListener('mousemove', e => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect  = card.getBoundingClientRect();
          const cx    = rect.left + rect.width  / 2;
          const cy    = rect.top  + rect.height / 2;
          const dx    = (e.clientX - cx) / (rect.width  / 2);
          const dy    = (e.clientY - cy) / (rect.height / 2);
          const rotX  = -dy * maxTilt;
          const rotY  =  dx * maxTilt;
          const glareX = (dx + 1) / 2 * 100;
          const glareY = (dy + 1) / 2 * 100;

          card.style.transform = `
            perspective(${perspective}px)
            rotateX(${rotX}deg)
            rotateY(${rotY}deg)
            translateY(-8px) scale(1.02)
          `;

          // Glare element
          let glare = card.querySelector('.card-glare');
          if (!glare) {
            glare = document.createElement('div');
            glare.className = 'card-glare';
            glare.style.cssText = `
              position:absolute;inset:0;border-radius:inherit;
              pointer-events:none;z-index:10;mix-blend-mode:screen;
              transition:opacity 0.2s;
            `;
            card.appendChild(glare);
          }
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%,
            rgba(255,255,255,0.12) 0%, transparent 65%)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        cancelAnimationFrame(raf);
        card.style.transform = '';
        const glare = card.querySelector('.card-glare');
        if (glare) glare.style.background = '';
      });
    });
  }

  // Apply tilt to menu cards and deal cards
  initCardTilt('.menu-card', 10, 900);
  initCardTilt('.deal-card', 8, 1000);
  initCardTilt('.nutrition-card', 8, 800);
  initCardTilt('.impact-card', 6, 900);

  /* ── Magnetic Button Effect ──────────────────────────────── */
  function initMagnetic(selector, strength = 0.35) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect   = btn.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) * strength;
        const dy     = (e.clientY - cy) * strength;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
  initMagnetic('.btn-primary', 0.3);
  initMagnetic('.btn-ghost', 0.25);
  initMagnetic('.cart-btn', 0.4);
  initMagnetic('.menu-card__add', 0.45);

  /* ── Ripple Effect on Buttons ────────────────────────────── */
  function addRipple(e) {
    const btn    = e.currentTarget;
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  document.querySelectorAll('.btn, .menu-card__add, .tab-btn').forEach(btn => {
    btn.addEventListener('click', addRipple);
  });

  /* ── Topic Hub Tabs ──────────────────────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      panel?.classList.add('active');

      // Cascade re-reveal
      panel?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), i * 60 + 80);
      });
      panel?.querySelectorAll('.nutrition-bar__fill').forEach(fill => {
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = fill.dataset.width || '0%'; }, 300);
      });
    });
  });

  /* ── Cart State ──────────────────────────────────────────── */
  let cartCount = 0;
  const cartBubble = document.getElementById('cart-count');

  function updateCart() {
    cartCount++;
    if (cartBubble) {
      cartBubble.textContent = cartCount;
      cartBubble.style.display = 'flex';
      cartBubble.style.animation = 'none';
      void cartBubble.offsetHeight;
      cartBubble.style.animation = '';
    }
  }

  /* ── Toast ───────────────────────────────────────────────── */
  const toast     = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');
  let toastTimer;

  function showToast(message, icon = '🛒', duration = 3000) {
    if (!toast) return;
    toastIcon.textContent = icon;
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
  }

  /* ── Add to Cart ─────────────────────────────────────────── */
  document.querySelectorAll('.menu-card__add').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.menu-card');
      const name = card?.querySelector('.menu-card__name')?.textContent || 'Item';
      updateCart();
      showToast(`${name} added!`, '✅');
      btn.textContent = '✓';
      btn.style.background = 'linear-gradient(135deg,#06d6a0,#0891b2)';
      setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 1600);
    });
  });

  document.querySelectorAll('.overlay-order-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.menu-card');
      const name = card?.querySelector('.menu-card__name')?.textContent || 'Item';
      updateCart();
      showToast(`${name} added!`, '🔥');
    });
  });

  /* ── Favourite Toggle ────────────────────────────────────── */
  document.querySelectorAll('.menu-card__fav').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
      if (btn.classList.contains('active')) showToast('Saved to favourites!', '❤️', 2000);
    });
  });

  /* ── Deal Cards ──────────────────────────────────────────── */
  document.querySelectorAll('.deal-card').forEach(card => {
    card.addEventListener('click', () => showToast('Deal applied to your next order!', '🎉'));
  });

  /* ── Countdown Timer ─────────────────────────────────────── */
  (function startCountdown() {
    const target = Date.now() + (4 * 3600 + 27 * 60 + 15) * 1000;
    const hEl = document.getElementById('timer-h');
    const mEl = document.getElementById('timer-m');
    const sEl = document.getElementById('timer-s');
    if (!hEl) return;

    let lastS = -1;
    function tick() {
      const diff = Math.max(0, target - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      hEl.textContent = String(h).padStart(2, '0');
      mEl.textContent = String(m).padStart(2, '0');
      sEl.textContent = String(s).padStart(2, '0');

      // Tick animation on seconds change
      if (s !== lastS) {
        lastS = s;
        [sEl, mEl].forEach(el => {
          el.classList.remove('tick');
          void el.offsetHeight;
          el.classList.add('tick');
          setTimeout(() => el.classList.remove('tick'), 200);
        });
      }
      if (diff > 0) setTimeout(tick, 250);
    }
    tick();
  })();

  /* ── Number Count-Up Animation ───────────────────────────── */
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const start  = performance.now();
      const dur    = 2000;

      function step(now) {
        const t     = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val   = Math.round(target * eased);
        el.textContent = val.toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      statsObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count-up').forEach(el => statsObs.observe(el));

  /* ── Multi-Layer Parallax ────────────────────────────────── */
  const parallaxMap = [
    { selector: '.hero__glow-1',    speed:  0.14 },
    { selector: '.hero__glow-2',    speed: -0.10 },
    { selector: '.hero__glow-3',    speed:  0.08 },
    { selector: '.hero__badge',     speed:  0.05 },
    { selector: '.hero__title',     speed:  0.04 },
  ];

  const parallaxEls = parallaxMap.map(({ selector, speed }) => ({
    el: document.querySelector(selector),
    speed,
  })).filter(item => item.el);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        parallaxEls.forEach(({ el, speed }) => {
          el.style.transform = `translateY(${sy * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Nav Active Link Highlight on Scroll ─────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('nav-link--active'));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`)
          ?.classList.add('nav-link--active');
      }
    });
  }, { threshold: 0.4 }).observe.apply(null, sections);

  sections.forEach(sec => {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('nav-link--active'));
          document.querySelector(`.nav-link[href="#${entry.target.id}"]`)
            ?.classList.add('nav-link--active');
        }
      });
    }, { threshold: 0.35 }).observe(sec);
  });

  /* ── Testimonials Infinite Duplicate ────────────────────── */
  const track = document.querySelector('.testimonials__track');
  if (track) track.innerHTML += track.innerHTML;

  /* ── Section Background Parallax (subtle) ────────────────── */
  const sectionParallax = [
    { el: document.querySelector('.topic-hub'),  yFactor: 0.025 },
    { el: document.querySelector('.deals'),      yFactor: 0.03  },
    { el: document.querySelector('.rewards'),    yFactor: 0.02  },
    { el: document.querySelector('.app-banner'), yFactor: 0.025 },
  ].filter(x => x.el);

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    sectionParallax.forEach(({ el, yFactor }) => {
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * yFactor;
      const pseudo = el.querySelector('::before');
      el.style.setProperty('--parallax-y', offset + 'px');
    });
  }, { passive: true });

  /* ── Smooth Anchor Scroll (override default) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id  = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY
                  - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Cursor Glow ─────────────────────────────────────────── */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

    function updateCursor() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top  = cy + 'px';
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Scale glow on hovering interactive elements
    document.querySelectorAll('a, button, .menu-card, .deal-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '600px';
        cursorGlow.style.height = '600px';
        cursorGlow.style.marginLeft = '-300px';
        cursorGlow.style.marginTop = '-300px';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
        cursorGlow.style.marginLeft = '-200px';
        cursorGlow.style.marginTop = '-200px';
      });
    });
  }

  /* ── Hero word-by-word entrance animation ────────────────── */
  (function heroEntrance() {
    const title = document.querySelector('.hero__title');
    if (!title) return;
    const words = title.querySelectorAll('.hero__title-inner');
    words.forEach((w, i) => {
      w.style.animationDelay = (0.15 + i * 0.12) + 's';
    });
  })();

  /* ── Keyboard accessibility ──────────────────────────────── */
  document.querySelectorAll('.deal-card[role="button"]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ── Hover sound (subtle visual feedback on nav items) ───── */
  document.querySelectorAll('.nav-dropdown__item').forEach((item, i) => {
    item.style.transitionDelay = i * 0.04 + 's';
  });

  /* ── Page Load finish ────────────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Trigger initial visible elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  });

})();
