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

  // Compact menu panel anchored under the hamburger
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('menu-overlay');
  var topbarEl = document.getElementById('topbar');
  var menuTimer;
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    clearTimeout(menuTimer);
    if (open) {
      if (topbarEl) overlay.style.top = Math.round(topbarEl.getBoundingClientRect().bottom + 8) + 'px';
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('open'); });
      var first = overlay.querySelector('a'); if (first) first.focus();
    } else {
      overlay.classList.remove('open');
      menuTimer = setTimeout(function () { overlay.hidden = true; }, 180);
    }
  }
  function menuOpen() { return menuBtn.getAttribute('aria-expanded') === 'true'; }
  menuBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(!menuOpen()); });
  overlay.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', function (e) { if (menuOpen() && !overlay.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen()) { setMenu(false); menuBtn.focus(); } });
  overlay.addEventListener('focusout', function (e) { var t = e.relatedTarget; if (menuOpen() && t && !overlay.contains(t) && t !== menuBtn) setMenu(false); });

  // Top bar: always fixed at the top (never hides); hairline after scroll; back-to-top
  var bar = document.getElementById('topbar');
  var toTop = document.getElementById('back-to-top');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    bar.classList.toggle('scrolled', y > 20);
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
