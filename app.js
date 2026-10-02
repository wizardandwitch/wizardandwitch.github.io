/* ── HASH-FREE SMOOTH SCROLL ── */
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  /* Watch trailer is handled separately */
  if (link.getAttribute('onclick')) return;
  e.preventDefault();
  const target = document.querySelector(hash);
  if (!target) return;
  const offsets = { '#download': 80, '#gallery': 250 };
  const offset = offsets[hash] ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  /* Keep URL clean — no hash */
  history.replaceState(null, '', window.location.pathname);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('copy', (e) => e.preventDefault());