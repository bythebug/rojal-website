/* ============================================
   RSJ Numerology — Main JavaScript
   ============================================ */

/* ---- Daily Quote ---- */
const QUOTES = [
  { day: 'Sunday — Day of Sun',       planet: '☀️', text: 'Confidence is the quiet fire the number 1 lights within us.' },
  { day: 'Monday — Day of Moon',      planet: '🌙', text: 'My intuition is my quiet compass; I trust its gentle pull.' },
  { day: 'Tuesday — Day of Mars',     planet: '🔴', text: 'Today I move with the fire of Mars — bold, brave, unstoppable.' },
  { day: 'Wednesday — Day of Mercury',planet: '💚', text: 'Curiosity is the compass that leads me to growth.' },
  { day: 'Thursday — Day of Jupiter', planet: '💛', text: 'Thursday\'s energy reminds me: give generously, and generously it returns.' },
  { day: 'Friday — Day of Venus',     planet: '🤍', text: 'Like Venus, I attract what I embody — grace, warmth, and harmony.' },
  { day: 'Saturday — Day of Saturn',  planet: '🔵', text: 'Like Saturn, I build slowly, but I build to last.' },
];

function renderQuote() {
  const dayIndex = new Date().getDay();
  const q = QUOTES[dayIndex];
  const labelEl = document.getElementById('quote-day-label');
  const textEl  = document.getElementById('quote-text');
  if (labelEl) labelEl.textContent = q.planet + '  ' + q.day;
  if (textEl)  textEl.textContent  = '"' + q.text + '"';
}

/* ---- Numerology Logic ---- */
const PLANET_MAP = {
  1: { planet: 'Sun',     symbol: '☀️', keyword: 'Leadership & Independence' },
  2: { planet: 'Moon',    symbol: '🌙', keyword: 'Intuition & Sensitivity' },
  3: { planet: 'Jupiter', symbol: '♃',  keyword: 'Wisdom & Optimism' },
  4: { planet: 'Rahu',    symbol: '☊',  keyword: 'Transformation & Mystery' },
  5: { planet: 'Mercury', symbol: '☿',  keyword: 'Curiosity & Communication' },
  6: { planet: 'Venus',   symbol: '♀',  keyword: 'Creativity & Harmony' },
  7: { planet: 'Ketu',    symbol: '☋',  keyword: 'Spirituality & Detachment' },
  8: { planet: 'Saturn',  symbol: '♄',  keyword: 'Discipline & Endurance' },
  9: { planet: 'Mars',    symbol: '♂',  keyword: 'Courage & Determination' },
};

const BLOG_MAP = {
  1: 'blogs/mulank-1-sun.html',
  3: 'blogs/mulank-3-jupiter.html',
  5: 'blogs/mulank-5-mercury.html',
  6: 'blogs/mulank-6-venus.html',
  8: 'blogs/mulank-8-saturn.html',
  9: 'blogs/mulank-9-mars.html',
};

// From inner blog pages, prefix with '../'
const BLOG_MAP_INNER = {
  1: '../blogs/mulank-1-sun.html',
  3: '../blogs/mulank-3-jupiter.html',
  5: '../blogs/mulank-5-mercury.html',
  6: '../blogs/mulank-6-venus.html',
  8: '../blogs/mulank-8-saturn.html',
  9: '../blogs/mulank-9-mars.html',
};

function reduceToSingleDigit(n) {
  while (n > 9) {
    n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}

function calcMulank(dob) {
  if (!dob) return null;
  const parts = dob.split('-');
  if (parts.length < 3) return null;
  const day = parseInt(parts[2], 10);
  if (isNaN(day)) return null;
  return reduceToSingleDigit(day);
}

function calcBhagyank(dob) {
  if (!dob) return null;
  const digits = dob.replace(/-/g, '').split('').map(Number);
  if (digits.some(isNaN)) return null;
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

function showResult(resultEl, number, isInnerPage) {
  if (!resultEl || !number) return;
  const info = PLANET_MAP[number];
  const map  = isInnerPage ? BLOG_MAP_INNER : BLOG_MAP;
  const link = map[number];

  resultEl.innerHTML = `
    <div class="result-number">${number}</div>
    <div class="result-planet">${info.symbol} Ruled by ${info.planet}</div>
    <div class="result-trait">${info.keyword}</div>
    ${link ? `<a href="${link}" class="result-link">Explore Mulank ${number} Traits →</a>` : ''}
  `;
  resultEl.classList.add('visible');
}

function initCalculators(isInnerPage) {
  // Personality Number (Mulank)
  const mulankForm = document.getElementById('mulank-form');
  if (mulankForm) {
    mulankForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const dob    = document.getElementById('mulank-dob').value;
      const result = document.getElementById('mulank-result');
      const num    = calcMulank(dob);
      if (num) {
        showResult(result, num, isInnerPage);
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Destiny Number (Bhagyank)
  const bhagyankForm = document.getElementById('bhagyank-form');
  if (bhagyankForm) {
    bhagyankForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const dob    = document.getElementById('bhagyank-dob').value;
      const result = document.getElementById('bhagyank-result');
      const num    = calcBhagyank(dob);
      if (num) {
        showResult(result, num, isInnerPage);
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
}

/* ---- Mobile Nav ---- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('main-nav');
  const navClose  = document.getElementById('nav-close');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  if (navClose) {
    navClose.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Active nav link ---- */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href.includes('index')
      || (path.includes('about')   && href.includes('about'))
      || (path.includes('service') && href.includes('service'))
      || (path.includes('blog')    && href.includes('blog'))
      || (path.includes('contact') && href.includes('contact'))
    ) {
      a.classList.add('active');
    }
  });
}

/* ---- Live clock in topbar ---- */
function updateClock() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function updateDate() {
  const el = document.getElementById('live-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/* ---- Scroll fade-in observer ---- */
function initObserver() {
  const els = document.querySelectorAll('.observe');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('fade-in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ---- Contact form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value;
    const phone   = document.getElementById('cf-phone').value;
    const service = document.getElementById('cf-service').value;
    const msg     = document.getElementById('cf-message').value;

    const waText = encodeURIComponent(
      `Hi Rojal, I'm ${name}.\nService: ${service}\nPhone: ${phone}\n\n${msg}`
    );
    window.open(`https://wa.me/919913633183?text=${waText}`, '_blank');
  });
}

/* ---- Instagram Carousel ---- */
function initInstaCarousel() {
  const track = document.getElementById('insta-track');
  const prev  = document.getElementById('insta-prev');
  const next  = document.getElementById('insta-next');
  const dots  = document.querySelectorAll('#insta-dots .carousel-dot');
  if (!track || !prev || !next) return;

  let current    = 0;
  const totalPages = 2;
  const gap      = 20;

  function goTo(page) {
    current = Math.max(0, Math.min(totalPages - 1, page));
    const vpWidth = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${current * (vpWidth + gap)}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    prev.disabled = current === 0;
    next.disabled = current === totalPages - 1;
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  window.addEventListener('resize', () => goTo(current));

  goTo(0);
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', function() {
  const isInnerPage = window.location.pathname.includes('/blogs/');

  renderQuote();
  initCalculators(isInnerPage);
  initMobileNav();
  setActiveNav();
  updateDate();
  updateClock();
  setInterval(updateClock, 60000);
  initObserver();
  initContactForm();
  initInstaCarousel();
});
