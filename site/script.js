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
      if (!hovered) movePill(activeLink());
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

// Nav highlight: a single pill glides to the hovered link and back to the active one.
const navBar = document.querySelector('.nav-links');
const pill = document.querySelector('.nav-pill');
let hovered = null;
const activeLink = () => navBar.querySelector('a.active');

function movePill(link) {
  if (!link) {
    pill.classList.remove('show');
    return;
  }
  // Appearing from nothing: jump into place first, then fade in, instead of sliding from the edge.
  if (!pill.classList.contains('show')) {
    pill.classList.add('instant');
    pill.getBoundingClientRect();
  }
  pill.style.setProperty('--x', `${link.offsetLeft}px`);
  pill.style.setProperty('--w', `${link.offsetWidth}px`);
  pill.getBoundingClientRect();
  pill.classList.remove('instant');
  pill.classList.add('show');
}

navLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => { hovered = link; movePill(link); });
  link.addEventListener('focus', () => movePill(link));
  link.addEventListener('blur', () => movePill(activeLink()));
});
navBar.addEventListener('mouseleave', () => { hovered = null; movePill(activeLink()); });
window.addEventListener('resize', () => movePill(hovered || activeLink()));

document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();

// Stacking project cards: each card sticks 16px lower than the previous one and
// dims as the next card slides over it, leaving an even 16px edge of every card.
const cards = [...document.querySelectorAll('.project-stack .project')];
const STACK_TOP = 96;
const STACK_STEP = 16;
let stickyTops = [];
let offsets = cards.map(() => 0);

function layoutCards() {
  stickyTops = cards.map((card, i) => {
    // A card taller than the space left would hide its bottom while stuck,
    // so it sticks higher and slides down into the deck once it is covered.
    const top = Math.min(STACK_TOP + i * STACK_STEP, window.innerHeight - card.offsetHeight - 24);
    card.style.setProperty('--top', `${top}px`);
    return top;
  });
  updateCards();
}

function updateCards() {
  // Read everything first: where each card sits without our transform.
  const layoutTops = cards.map((card, i) => card.getBoundingClientRect().top - offsets[i]);
  const last = cards.length - 1;
  // Once the last card starts scrolling away, the whole deck goes with it.
  const exit = Math.min(0, layoutTops[last] - stickyTops[last]);

  const progress = cards.map((card, i) => {
    if (i === last) return 0;
    // 0 while the next card is below the fold, 1 once it has reached its sticky spot.
    const travel = window.innerHeight - stickyTops[i + 1];
    return Math.min(Math.max(1 - (layoutTops[i + 1] - stickyTops[i + 1]) / travel, 0), 1);
  });
  offsets = cards.map((card, i) => progress[i] * (STACK_TOP + i * STACK_STEP + exit - layoutTops[i]));

  cards.forEach((card, i) => {
    card.style.setProperty('--p', progress[i].toFixed(3));
    card.style.setProperty('--y', `${offsets[i].toFixed(1)}px`);
    if (i === last) return;
    // Hide whatever sits below the next card's top (plus its rounded corner),
    // so a tall card never peeks out under a shorter one.
    const visible = layoutTops[i + 1] + offsets[i + 1] - (layoutTops[i] + offsets[i]) + 32;
    card.style.setProperty('--clip', `${Math.max(0, card.offsetHeight - visible).toFixed(1)}px`);
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
