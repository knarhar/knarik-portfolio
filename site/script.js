// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Highlight the nav link for the section in view
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();

// Stacking project cards: each card sticks a little lower than the previous one,
// then shrinks and dims as the next card slides over it.
const cards = [...document.querySelectorAll('.project-stack .project')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function layoutCards() {
  cards.forEach((card, i) => {
    const top = 96 + i * 16;
    // A card taller than the space left would hide its bottom while stuck,
    // so it scrolls fully into view first and sticks after that.
    const fit = window.innerHeight - card.offsetHeight - 24;
    card.style.setProperty('--top', `${Math.min(top, fit)}px`);
  });
  updateCards();
}

function updateCards() {
  if (reduceMotion.matches) return;
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    // 0 while the next card is below the fold, 1 once it has reached its sticky spot.
    const stickAt = parseFloat(next.style.getPropertyValue('--top'));
    const travel = window.innerHeight - stickAt;
    const p = Math.min(Math.max(1 - (next.getBoundingClientRect().top - stickAt) / travel, 0), 1);
    card.style.setProperty('--p', p.toFixed(3));
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateCards(); ticking = false; });
}, { passive: true });
window.addEventListener('resize', layoutCards);
window.addEventListener('load', layoutCards);
layoutCards();
