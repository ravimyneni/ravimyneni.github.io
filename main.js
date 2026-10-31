(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  // Theme toggle (light by default, dark persisted)
  var themeBtn = document.getElementById('theme-btn');
  function syncThemeLabel() {
    var dark = doc.classList.contains('dark');
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#111214' : '#faf9f6');
  }
  themeBtn.addEventListener('click', function () {
    doc.classList.toggle('dark');
    try { localStorage.setItem('rm-theme', doc.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
    syncThemeLabel();
  });
  syncThemeLabel();

  // Full-screen menu
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('menu-overlay');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
    if (open) {
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('open'); });
      var first = overlay.querySelector('a'); if (first) first.focus();
    } else {
      overlay.classList.remove('open');
      setTimeout(function () { overlay.hidden = true; }, 300);
    }
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  overlay.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) { setMenu(false); menuBtn.focus(); } });

  // Top bar: frosted after scroll, hides on scroll down, shows on scroll up; back-to-top
  var bar = document.getElementById('topbar');
  var toTop = document.getElementById('back-to-top');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    bar.classList.toggle('scrolled', y > 20);
    bar.classList.toggle('hide', y > lastY && y > 300 && overlay.hidden);
    toTop.classList.toggle('show', y > window.innerHeight);
    lastY = y;
  }, { passive: true });

  // Active nav link
  var links = document.querySelectorAll('.topnav a');
  var ids = ['top', 'about', 'work', 'experience', 'skills'];
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) navIO.observe(el); });
  }
})();
