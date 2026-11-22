// TOQUE CONSCIENTE . interações
(function () {
  // scroll suave só depois do load: âncora direta na URL abre instantânea
  window.addEventListener('load', () => {
    document.documentElement.style.scrollBehavior = 'smooth';
  });

  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');

  // sticky nav que muda pro tema claro ao rolar
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // menu mobile
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // parallax sutil na foto do hero: SOMENTE desktop com mouse (mobile = scroll nativo puro)
  const canParallax = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroBg = document.querySelector('.hero-bg');
  if (canParallax && heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        heroBg.style.transform = 'scale(1.12) translateY(' + window.scrollY * 0.12 + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }
})();
