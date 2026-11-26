// Mobile menu
const body = document.body;
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-menu');
function setMenu(open) {
  body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', !open);
}
toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Scroll reveals, once each (B7)
const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

// Tagline: wrap words, light each one as it crosses a line 60% down the viewport (B11)
document.querySelectorAll('[data-words]').forEach(p => {
  p.innerHTML = p.innerHTML.split(/(<br>\s*)/).map(part =>
    part.startsWith('<br') ? part : part.split(/\s+/).filter(Boolean).map(w => `<span class="w">${w}</span>`).join(' ')
  ).join('');
});
const wordIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('on'); wordIO.unobserve(e.target); }
}), { rootMargin: '0px 0px -40% 0px' });
document.querySelectorAll('.w').forEach(w => wordIO.observe(w));

// Current section in the nav
const links = [...document.querySelectorAll('.nav-links a')];
const navIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(a => a.setAttribute('aria-current', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = document.querySelector(a.hash); if (s) navIO.observe(s); });
